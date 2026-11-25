import express from 'express';
import UserScore from '../models/UserScore.js';
import { requireAuth } from '../middleware/auth.js';
import { BACKGROUND_CATALOG, BACKGROUND_CATALOG_MAP } from '../config/constants.js';

export { BACKGROUND_CATALOG };

const router = express.Router();

// GET /api/shop/catalog
router.get('/catalog', (_req, res) => {
  return res.json({ items: BACKGROUND_CATALOG });
});

// POST /api/shop/buy (JWT protected; atomic balance check & deduction)
router.post('/buy', requireAuth, async (req, res, next) => {
  try {
    const backgroundId = String(req.body?.backgroundId || '').trim();
    const item = BACKGROUND_CATALOG_MAP[backgroundId];

    if (!item) {
      return res.status(404).json({ error: 'Không tìm thấy giao diện nền này.' });
    }

    if (req.user.ownedBackgrounds.includes(backgroundId)) {
      return res.status(400).json({ error: 'Bạn đã sở hữu giao diện nền này.' });
    }

    const updatedUser = await UserScore.findOneAndUpdate(
      {
        _id: req.userId,
        ownedBackgrounds: { $ne: backgroundId },
        coins: { $gte: item.price },
      },
      {
        $inc: { coins: -item.price },
        $addToSet: { ownedBackgrounds: backgroundId },
        $set: { equippedBackground: backgroundId },
      },
      { new: true }
    );

    if (!updatedUser) {
      const fresh = await UserScore.findById(req.userId);
      if (fresh?.ownedBackgrounds.includes(backgroundId)) {
        return res.status(400).json({ error: 'Bạn đã sở hữu giao diện nền này.' });
      }
      return res.status(400).json({
        error: `Không đủ Xu. Bạn cần ${item.price.toLocaleString()} Xu.`,
      });
    }

    return res.json({
      purchased: item,
      user: updatedUser.toPublicProfile(),
    });
  } catch (err) {
    return next(err);
  }
});

// POST /api/shop/equip (JWT protected)
router.post('/equip', requireAuth, async (req, res, next) => {
  try {
    const backgroundId = String(req.body?.backgroundId || '').trim();
    const item = BACKGROUND_CATALOG_MAP[backgroundId];

    if (!item) {
      return res.status(404).json({ error: 'Background item not found.' });
    }

    if (!req.user.ownedBackgrounds.includes(backgroundId)) {
      return res.status(403).json({
        error: 'You must purchase this background before equipping it.',
      });
    }

    const updatedUser = await UserScore.findByIdAndUpdate(
      req.userId,
      { $set: { equippedBackground: backgroundId } },
      { new: true }
    );

    return res.json({
      equippedBackground: backgroundId,
      user: updatedUser.toPublicProfile(),
    });
  } catch (err) {
    return next(err);
  }
});

export default router;
