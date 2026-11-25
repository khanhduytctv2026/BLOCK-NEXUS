import mongoose from 'mongoose';

const winnerEntrySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'UserScore', required: true },
    username: { type: String, required: true },
    rank: { type: Number, required: true },
    score: { type: Number, required: true },
    coinsAwarded: { type: Number, required: true },
  },
  { _id: false }
);

const resetHistorySchema = new mongoose.Schema(
  {
    weekLabel: { type: String, required: true },
    resetAt: { type: Date, default: Date.now },
    dragModeWinners: { type: [winnerEntrySchema], default: [] },
    dropModeWinners: { type: [winnerEntrySchema], default: [] },
  },
  { _id: false }
);

const weeklyCycleSchema = new mongoose.Schema(
  {
    singletonKey: {
      type: String,
      default: 'ACTIVE_WEEKLY_CYCLE',
      unique: true,
      index: true,
    },
    currentWeekKey: {
      type: String,
      required: true,
    },
    lastResetAt: {
      type: Date,
      default: Date.now,
    },
    history: {
      type: [resetHistorySchema],
      default: [],
    },
  },
  { timestamps: true }
);

const WeeklyCycle = mongoose.model('WeeklyCycle', weeklyCycleSchema);
export default WeeklyCycle;
