import { DEFAULT_SETTINGS } from '../constants/themes';

const KEYS = {
  AUTH_TOKEN: 'auth_token',
  GUEST_SESSION: 'guest_session',
  GUEST_RECORDS: 'block_nexus_guest_records',
  SETTINGS: 'block_nexus_settings',
  CACHED_USER: 'block_nexus_cached_user',
};

export function getAuthToken() {
  try {
    return localStorage.getItem(KEYS.AUTH_TOKEN) || null;
  } catch {
    return null;
  }
}

export function setAuthToken(token) {
  try {
    if (token) {
      localStorage.setItem(KEYS.AUTH_TOKEN, token);
    } else {
      localStorage.removeItem(KEYS.AUTH_TOKEN);
    }
  } catch {
    // Ignore storage quota errors
  }
}

export function getCachedUser() {
  try {
    const raw = localStorage.getItem(KEYS.CACHED_USER);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function setCachedUser(user) {
  try {
    if (user) {
      localStorage.setItem(KEYS.CACHED_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(KEYS.CACHED_USER);
    }
  } catch {
    // Ignore
  }
}

export function getGuestSession() {
  try {
    const raw = localStorage.getItem(KEYS.GUEST_SESSION);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function createGuestSession() {
  const randomDigits = String(Math.floor(1000 + Math.random() * 9000));
  const session = {
    username: `Khách_${randomDigits}`,
    isGuest: true,
    createdAt: new Date().toISOString(),
  };
  try {
    localStorage.setItem(KEYS.GUEST_SESSION, JSON.stringify(session));
  } catch {
    // Ignore
  }
  return session;
}

export function clearGuestSession() {
  try {
    localStorage.removeItem(KEYS.GUEST_SESSION);
  } catch {
    // Ignore
  }
}

export function getGuestRecords() {
  const fallback = {
    dragMode: { allTimeHigh: 0, weeklyScore: 0, maxCombo: 0 },
    dropMode: { allTimeHigh: 0, weeklyScore: 0, maxLines: 0 },
  };
  try {
    const raw = localStorage.getItem(KEYS.GUEST_RECORDS);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return {
      dragMode: { ...fallback.dragMode, ...(parsed.dragMode || {}) },
      dropMode: { ...fallback.dropMode, ...(parsed.dropMode || {}) },
    };
  } catch {
    return fallback;
  }
}

export function saveGuestScore(mode, { score, maxCombo = 0, linesCleared = 0 }) {
  const current = getGuestRecords();
  const prev = current[mode] || { allTimeHigh: 0, weeklyScore: 0, maxCombo: 0, maxLines: 0 };
  const isNewRecord = score > (prev.allTimeHigh || 0);

  if (mode === 'dragMode') {
    current.dragMode = {
      allTimeHigh: Math.max(prev.allTimeHigh || 0, score),
      weeklyScore: 0, // Guests do not participate in weekly leaderboard
      maxCombo: Math.max(prev.maxCombo || 0, maxCombo),
    };
  } else {
    current.dropMode = {
      allTimeHigh: Math.max(prev.allTimeHigh || 0, score),
      weeklyScore: 0,
      maxLines: Math.max(prev.maxLines || 0, linesCleared),
    };
  }

  try {
    localStorage.setItem(KEYS.GUEST_RECORDS, JSON.stringify(current));
  } catch {
    // Ignore
  }

  return { records: current, isNewRecord };
}

export function clearGuestRecords() {
  try {
    localStorage.removeItem(KEYS.GUEST_RECORDS);
  } catch {
    // Ignore
  }
}

export function loadSettings() {
  try {
    const raw = localStorage.getItem(KEYS.SETTINGS);
    if (!raw) return { ...DEFAULT_SETTINGS };
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(settings));
  } catch {
    // Ignore
  }
}
