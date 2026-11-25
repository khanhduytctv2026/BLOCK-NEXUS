import jwt from 'jsonwebtoken';
import UserScore from '../models/UserScore.js';

function getJwtSecret() {
  return process.env.JWT_SECRET || 'block-nexus-dev-jwt-secret-change-in-production';
}

export function signAuthToken(user) {
  return jwt.sign(
    {
      sub: user._id.toString(),
      username: user.username,
      role: user.role || 'USER',
    },
    getJwtSecret(),
    { expiresIn: '30d' }
  );
}

export async function requireAuth(req, res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    if (!authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'Authentication required. Guest sessions cannot access this feature.',
      });
    }

    const token = authHeader.slice(7).trim();
    const payload = jwt.verify(token, getJwtSecret());
    const user = await UserScore.findById(payload.sub);

    if (!user) {
      return res.status(401).json({ error: 'Account not found. Please log in again.' });
    }

    req.userId = user._id.toString();
    req.user = user;
    return next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired authentication token.' });
  }
}

export function requireAdmin(req, res, next) {
  if (!req.user || req.user.role !== 'ADMIN') {
    return res.status(403).json({
      error: 'Forbidden. Founder Admin privileges are required for this action.',
    });
  }
  return next();
}

export async function optionalAuth(req, _res, next) {
  try {
    const authHeader = req.headers.authorization || '';
    if (authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7).trim();
      const payload = jwt.verify(token, getJwtSecret());
      if (payload?.sub) {
        req.userId = payload.sub;
      }
    }
  } catch {
    // Ignore invalid tokens for public endpoints
  }
  return next();
}
