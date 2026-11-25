import express from 'express';
import UserScore from '../models/UserScore.js';
import { requireAuth } from '../middleware/auth.js';

const router = express.Router();

// POST /api/rewards/claim
router.post('/claim', requireAuth, async (req, res, next) => {
  try {
    const rewardId = req.body?.rewardId ? String(req.body.rewardId) : null;

    let updatedUser;
    if (rewardId) {
      updatedUser = await UserScore.findOneAndUpdate(
        { _id: req.userId, 'rewards._id': rewardId },
        { $set: { 'rewards.$.claimed': true } },
        { new: true }
      );
      if (!updatedUser) {
        return res.status(404).json({ error: 'Reward notification not found.' });
      }
    } else {
      updatedUser = await UserScore.findByIdAndUpdate(
        req.userId,
        { $set: { 'rewards.$[elem].claimed': true } },
        {
          arrayFilters: [{ 'elem.claimed': false }],
          new: true,
        }
      );
    }

    return res.json({
      success: true,
      user: updatedUser.toPublicProfile(),
    });
  } catch (err) {
    return next(err);
  }
});

export default router;
