import express from 'express';
import UserScore from '../models/UserScore.js';
import { requireAdmin, requireAuth } from '../middleware/auth.js';
import { BACKGROUND_CATALOG } from '../config/constants.js';

const router = express.Router();

const ALL_BACKGROUND_IDS = BACKGROUND_CATALOG.map((bg) => bg.id);

// Optional Founder elevation via FOUNDER_ADMIN_SECRET (disabled if env var is unset)
router.post('/claim-founder', requireAuth, async (req, res, next) => {
  try {
    const configuredSecret = (process.env.FOUNDER_ADMIN_SECRET || '').trim();
    if (!configuredSecret) {
      return res.status(403).json({
        error: 'Founder secret claim is disabled on this server.',
      });
    }

    const suppliedSecret = String(req.body?.secret || '').trim();
    if (!suppliedSecret || suppliedSecret !== configuredSecret) {
      return res.status(403).json({ error: 'Invalid Founder Admin secret.' });
    }

    const updated = await UserScore.findByIdAndUpdate(
      req.userId,
      { $set: { role: 'ADMIN' } },
      { new: true }
    );

    return res.json({
      success: true,
      user: updated.toPublicProfile(),
    });
  } catch (err) {
    return next(err);
  }
});

// All routes below require Founder ADMIN role
router.use(requireAuth, requireAdmin);

// GET /api/admin/users?search=
router.get('/users', async (req, res, next) => {
  try {
    const search = String(req.query?.search || '').trim();
    const filter = search
      ? { usernameLower: { $regex: search.toLowerCase().replace(/[.*+?^${}()|[\]\\]/g, '\\$&') } }
      : {};

    const users = await UserScore.find(filter)
      .sort({ role: 1, coins: -1, createdAt: -1 })
      .limit(200);

    return res.json({
      total: users.length,
      users: users.map((u) => u.toPublicProfile()),
    });
  } catch (err) {
    return next(err);
  }
});

// POST /api/admin/buff-coins
// Body: { targetUserId? , targetUsername? , amount (int != 0), reason? }
router.post('/buff-coins', async (req, res, next) => {
  try {
    const targetUserId = req.body?.targetUserId ? String(req.body.targetUserId).trim() : null;
    const targetUsername = req.body?.targetUsername ? String(req.body.targetUsername).trim() : null;
    const amount = Math.trunc(Number(req.body?.amount));
    const reason = String(req.body?.reason || 'Founder Admin Coin Buff').trim().slice(0, 120);

    if (!Number.isFinite(amount) || amount === 0) {
      return res.status(400).json({ error: 'Coin buff amount must be a non-zero integer.' });
    }

    if (Math.abs(amount) > 10_000_000) {
      return res.status(400).json({ error: 'Single coin adjustment cannot exceed 10,000,000.' });
    }

    let targetUser = null;
    if (targetUserId) {
      targetUser = await UserScore.findById(targetUserId);
    } else if (targetUsername) {
      targetUser = await UserScore.findOne({ usernameLower: targetUsername.toLowerCase() });
    } else {
      targetUser = req.user;
    }

    if (!targetUser) {
      return res.status(404).json({ error: 'Target player account not found.' });
    }

    const newCoins = Math.max(0, (targetUser.coins || 0) + amount);
    const actualDelta = newCoins - (targetUser.coins || 0);

    const updatedTarget = await UserScore.findByIdAndUpdate(
      targetUser._id,
      { $set: { coins: newCoins } },
      { new: true }
    );

    console.log(
      `[FounderAdmin] ${req.user.username} adjusted coins for ${updatedTarget.username} by ${actualDelta >= 0 ? '+' : ''}${actualDelta} (now ${updatedTarget.coins}) | Reason: ${reason}`
    );

    return res.json({
      success: true,
      delta: actualDelta,
      reason,
      targetUser: updatedTarget.toPublicProfile(),
      isSelf: updatedTarget._id.toString() === req.userId,
    });
  } catch (err) {
    return next(err);
  }
});

// POST /api/admin/unlock-all-backgrounds
router.post('/unlock-all-backgrounds', async (req, res, next) => {
  try {
    const targetUserId = req.body?.targetUserId
      ? String(req.body.targetUserId).trim()
      : req.userId;

    const updatedTarget = await UserScore.findByIdAndUpdate(
      targetUserId,
      { $addToSet: { ownedBackgrounds: { $each: ALL_BACKGROUND_IDS } } },
      { new: true }
    );

    if (!updatedTarget) {
      return res.status(404).json({ error: 'Target player account not found.' });
    }

    console.log(
      `[FounderAdmin] ${req.user.username} unlocked all ${ALL_BACKGROUND_IDS.length} backgrounds for ${updatedTarget.username}`
    );

    return res.json({
      success: true,
      unlockedCount: ALL_BACKGROUND_IDS.length,
      targetUser: updatedTarget.toPublicProfile(),
      isSelf: updatedTarget._id.toString() === req.userId,
    });
  } catch (err) {
    return next(err);
  }
});

// POST /api/admin/set-role
router.post('/set-role', async (req, res, next) => {
  try {
    const targetUserId = String(req.body?.targetUserId || '').trim();
    const role = String(req.body?.role || '').toUpperCase();

    if (!targetUserId || !['USER', 'ADMIN'].includes(role)) {
      return res.status(400).json({ error: 'Valid targetUserId and role (USER or ADMIN) are required.' });
    }

    if (targetUserId === req.userId && role !== 'ADMIN') {
      return res.status(400).json({ error: 'Cannot remove ADMIN role from your own active session.' });
    }

    const updatedTarget = await UserScore.findByIdAndUpdate(
      targetUserId,
      { $set: { role } },
      { new: true }
    );

    if (!updatedTarget) {
      return res.status(404).json({ error: 'Target player account not found.' });
    }

    return res.json({
      success: true,
      targetUser: updatedTarget.toPublicProfile(),
    });
  } catch (err) {
    return next(err);
  }
});

export default router;
