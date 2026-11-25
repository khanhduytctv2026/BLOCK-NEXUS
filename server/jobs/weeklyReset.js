import cron from 'node-cron';
import mongoose from 'mongoose';
import UserScore from '../models/UserScore.js';
import WeeklyCycle from '../models/WeeklyCycle.js';
import { TIMEZONE, WEEKLY_REWARDS } from '../config/constants.js';

const UTC_PLUS_7_MS = 7 * 60 * 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;

let lastVerifiedWeekKey = null;
let inFlightResetPromise = null;

/**
 * Computes the current weekly window anchored at Monday 00:00:00 Asia/Ho_Chi_Minh (UTC+7).
 * Vietnam observes UTC+7 year-round with no DST.
 */
export function getHoChiMinhWeekInfo(referenceDate = new Date()) {
  const vnShifted = new Date(referenceDate.getTime() + UTC_PLUS_7_MS);
  const dayOfWeek = vnShifted.getUTCDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  const daysSinceMonday = (dayOfWeek + 6) % 7;

  const mondayStartShifted = Date.UTC(
    vnShifted.getUTCFullYear(),
    vnShifted.getUTCMonth(),
    vnShifted.getUTCDate() - daysSinceMonday,
    0,
    0,
    0,
    0
  );

  const nextMondayShifted = mondayStartShifted + 7 * DAY_MS;

  const mondayDate = new Date(mondayStartShifted);
  const year = mondayDate.getUTCFullYear();
  const month = String(mondayDate.getUTCMonth() + 1).padStart(2, '0');
  const day = String(mondayDate.getUTCDate()).padStart(2, '0');

  return {
    weekKey: `${year}-${month}-${day}`,
    weekStartAt: new Date(mondayStartShifted - UTC_PLUS_7_MS),
    nextResetAt: new Date(nextMondayShifted - UTC_PLUS_7_MS),
  };
}

async function awardModeTopThree(mode, previousWeekLabel) {
  const scoreField = `records.${mode}.weeklyScore`;
  const updatedField = `records.${mode}.updatedAt`;

  const topPlayers = await UserScore.find({ [scoreField]: { $gt: 0 } })
    .sort({ [scoreField]: -1, [updatedField]: 1, createdAt: 1 })
    .limit(3);

  const winnersSummary = [];
  const awardedAt = new Date();

  for (let i = 0; i < topPlayers.length; i += 1) {
    const rank = i + 1;
    const player = topPlayers[i];
    const coinsAwarded = WEEKLY_REWARDS[rank];
    const score = player.records?.[mode]?.weeklyScore ?? 0;

    await UserScore.updateOne(
      { _id: player._id },
      {
        $inc: { coins: coinsAwarded },
        $push: {
          rewards: {
            weekLabel: previousWeekLabel,
            mode,
            rank,
            coinsAwarded,
            claimed: false,
            awardedAt,
          },
        },
      }
    );

    winnersSummary.push({
      userId: player._id,
      username: player.username,
      rank,
      score,
      coinsAwarded,
    });
  }

  return winnersSummary;
}

/**
 * Checks whether the weekly reset boundary (Monday 00:00 Asia/Ho_Chi_Minh) has passed.
 * Uses an atomic document guard in MongoDB so concurrent requests or cold-start restarts
 * never double-award rewards.
 */
export async function checkAndRunWeeklyReset({ forceDbCheck = false } = {}) {
  if (mongoose.connection.readyState !== 1) {
    return { skipped: true, reason: 'db_not_connected' };
  }

  const { weekKey, nextResetAt } = getHoChiMinhWeekInfo();

  if (!forceDbCheck && lastVerifiedWeekKey === weekKey) {
    return { resetPerformed: false, weekKey, nextResetAt };
  }

  if (inFlightResetPromise) {
    return inFlightResetPromise;
  }

  inFlightResetPromise = (async () => {
    try {
      let cycle = await WeeklyCycle.findOne({ singletonKey: 'ACTIVE_WEEKLY_CYCLE' });

      if (!cycle) {
        try {
          cycle = await WeeklyCycle.create({
            singletonKey: 'ACTIVE_WEEKLY_CYCLE',
            currentWeekKey: weekKey,
            lastResetAt: new Date(),
            history: [],
          });
        } catch (err) {
          if (err?.code === 11000) {
            cycle = await WeeklyCycle.findOne({ singletonKey: 'ACTIVE_WEEKLY_CYCLE' });
          } else {
            throw err;
          }
        }
        lastVerifiedWeekKey = cycle.currentWeekKey;
        return { resetPerformed: false, weekKey: cycle.currentWeekKey, nextResetAt };
      }

      if (cycle.currentWeekKey === weekKey) {
        lastVerifiedWeekKey = weekKey;
        return { resetPerformed: false, weekKey, nextResetAt };
      }

      const previousWeekKey = cycle.currentWeekKey;

      // Atomically claim the transition to the new week so only one worker awards prizes
      const lockedCycle = await WeeklyCycle.findOneAndUpdate(
        {
          singletonKey: 'ACTIVE_WEEKLY_CYCLE',
          currentWeekKey: previousWeekKey,
        },
        {
          $set: {
            currentWeekKey: weekKey,
            lastResetAt: new Date(),
          },
        },
        { new: true }
      );

      if (!lockedCycle) {
        lastVerifiedWeekKey = weekKey;
        return { resetPerformed: false, weekKey, nextResetAt };
      }

      console.log(
        `[WeeklyReset] Transitioning week ${previousWeekKey} -> ${weekKey} (${TIMEZONE})`
      );

      const dragModeWinners = await awardModeTopThree('dragMode', previousWeekKey);
      const dropModeWinners = await awardModeTopThree('dropMode', previousWeekKey);

      // Reset weekly scores to 0 while preserving allTimeHigh, maxCombo, and maxLines
      await UserScore.updateMany(
        {},
        {
          $set: {
            'records.dragMode.weeklyScore': 0,
            'records.dropMode.weeklyScore': 0,
          },
        }
      );

      await WeeklyCycle.updateOne(
        { singletonKey: 'ACTIVE_WEEKLY_CYCLE' },
        {
          $push: {
            history: {
              $each: [
                {
                  weekLabel: previousWeekKey,
                  resetAt: new Date(),
                  dragModeWinners,
                  dropModeWinners,
                },
              ],
              $slice: -52,
            },
          },
        }
      );

      lastVerifiedWeekKey = weekKey;
      console.log(
        `[WeeklyReset] Completed! Drag winners: ${dragModeWinners.length}, Drop winners: ${dropModeWinners.length}`
      );

      return {
        resetPerformed: true,
        previousWeekKey,
        weekKey,
        nextResetAt,
        dragModeWinners,
        dropModeWinners,
      };
    } finally {
      inFlightResetPromise = null;
    }
  })();

  return inFlightResetPromise;
}

export function initWeeklyResetCron() {
  // Runs every Monday at 00:00 Asia/Ho_Chi_Minh
  const task = cron.schedule(
    '0 0 * * 1',
    async () => {
      try {
        await checkAndRunWeeklyReset({ forceDbCheck: true });
      } catch (err) {
        console.error('[WeeklyReset] Scheduled cron error:', err);
      }
    },
    {
      scheduled: true,
      timezone: TIMEZONE,
    }
  );

  // Startup fallback check for Render cold starts
  checkAndRunWeeklyReset({ forceDbCheck: true }).catch((err) => {
    console.error('[WeeklyReset] Startup fallback check failed:', err);
  });

  return task;
}
