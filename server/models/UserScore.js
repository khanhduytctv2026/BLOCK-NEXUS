import mongoose from 'mongoose';

const rewardSchema = new mongoose.Schema(
  {
    weekLabel: { type: String, required: true },
    mode: { type: String, enum: ['dragMode', 'dropMode'], required: true },
    rank: { type: Number, enum: [1, 2, 3], required: true },
    coinsAwarded: { type: Number, required: true },
    claimed: { type: Boolean, default: false },
    awardedAt: { type: Date, default: Date.now },
  },
  { _id: true }
);

const userScoreSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      maxlength: 20,
      index: true,
    },
    usernameLower: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['USER', 'ADMIN'],
      default: 'USER',
      index: true,
    },
    coins: {
      type: Number,
      default: 200,
      min: 0,
    },
    ownedBackgrounds: {
      type: [String],
      default: ['BG_DEFAULT'],
    },
    equippedBackground: {
      type: String,
      default: 'BG_DEFAULT',
    },
    records: {
      dragMode: {
        allTimeHigh: { type: Number, default: 0, min: 0 },
        weeklyScore: { type: Number, default: 0, min: 0 },
        maxCombo: { type: Number, default: 0, min: 0 },
        updatedAt: { type: Date, default: Date.now },
      },
      dropMode: {
        allTimeHigh: { type: Number, default: 0, min: 0 },
        weeklyScore: { type: Number, default: 0, min: 0 },
        maxLines: { type: Number, default: 0, min: 0 },
        updatedAt: { type: Date, default: Date.now },
      },
    },
    rewards: {
      type: [rewardSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

userScoreSchema.index({
  'records.dragMode.weeklyScore': -1,
  'records.dragMode.updatedAt': 1,
});

userScoreSchema.index({
  'records.dropMode.weeklyScore': -1,
  'records.dropMode.updatedAt': 1,
});

userScoreSchema.methods.toPublicProfile = function toPublicProfile() {
  return {
    id: this._id.toString(),
    username: this.username,
    role: this.role || 'USER',
    coins: this.coins,
    ownedBackgrounds: this.ownedBackgrounds,
    equippedBackground: this.equippedBackground,
    records: {
      dragMode: {
        allTimeHigh: this.records?.dragMode?.allTimeHigh ?? 0,
        weeklyScore: this.records?.dragMode?.weeklyScore ?? 0,
        maxCombo: this.records?.dragMode?.maxCombo ?? 0,
        updatedAt: this.records?.dragMode?.updatedAt ?? null,
      },
      dropMode: {
        allTimeHigh: this.records?.dropMode?.allTimeHigh ?? 0,
        weeklyScore: this.records?.dropMode?.weeklyScore ?? 0,
        maxLines: this.records?.dropMode?.maxLines ?? 0,
        updatedAt: this.records?.dropMode?.updatedAt ?? null,
      },
    },
    rewards: (this.rewards || []).map((r) => ({
      id: r._id.toString(),
      weekLabel: r.weekLabel,
      mode: r.mode,
      rank: r.rank,
      coinsAwarded: r.coinsAwarded,
      claimed: r.claimed,
      awardedAt: r.awardedAt,
    })),
    createdAt: this.createdAt,
  };
};

const UserScore = mongoose.model('UserScore', userScoreSchema);
export default UserScore;
