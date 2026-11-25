let vibrationEnabled = true;

export function setVibrationEnabled(enabled) {
  vibrationEnabled = Boolean(enabled);
}

export function triggerHaptic(pattern = 'tap') {
  if (!vibrationEnabled) return;
  if (typeof navigator === 'undefined' || typeof navigator.vibrate !== 'function') return;

  const patterns = {
    tap: 12,
    place: 20,
    rotate: 10,
    hardDrop: [18, 12, 28],
    clear: [22, 24, 36],
    multiClear: [26, 20, 42, 20, 52],
    invalid: [35, 30, 35],
    gameOver: [60, 40, 80, 40, 120],
  };

  try {
    navigator.vibrate(patterns[pattern] ?? 15);
  } catch {
    // Ignore unsupported devices
  }
}
