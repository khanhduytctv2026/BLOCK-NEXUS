export const TIMEZONE = 'Asia/Ho_Chi_Minh';

export const WEEKLY_REWARDS = {
  1: 1500,
  2: 800,
  3: 400,
};

export const BACKGROUND_CATALOG = [
  // STANDARD Tier (0 – 400 Coins)
  { id: 'BG_DEFAULT', name: 'Deep Space Navy', price: 0, tier: 'STANDARD' },
  { id: 'BG_MIDNIGHT_SLATE', name: 'Obsidian Stealth', price: 200, tier: 'STANDARD' },
  { id: 'BG_DEEP_OCEAN', name: 'Mariana Abyss', price: 300, tier: 'STANDARD' },
  { id: 'BG_EMERALD_SHADOW', name: 'Matrix Terminal', price: 350, tier: 'STANDARD' },
  { id: 'BG_CRIMSON_DUSK', name: 'Velvet Eclipse', price: 400, tier: 'STANDARD' },

  // RARE Tier (600 – 1,000 Coins)
  { id: 'BG_CYBER_GRID', name: 'Cyberpunk Tokyo', price: 600, tier: 'RARE' },
  { id: 'BG_SYNTHWAVE_84', name: 'Synthwave 1984', price: 700, tier: 'RARE' },
  { id: 'BG_ELECTRIC_PULSE', name: 'Volt Overdrive', price: 800, tier: 'RARE' },
  { id: 'BG_TOXIC_NEON', name: 'Biohazard Lab', price: 850, tier: 'RARE' },
  { id: 'BG_VIOLET_STORM', name: 'Ultraviolet Surge', price: 900, tier: 'RARE' },
  { id: 'BG_MIAMI_NIGHTS', name: 'Miami Vice Neon', price: 1000, tier: 'RARE' },

  // EPIC Tier (1,200 – 1,800 Coins)
  { id: 'BG_DEEP_COSMOS', name: 'Tinh Vân Orion', price: 1200, tier: 'EPIC' },
  { id: 'BG_AURORA_NEBULA', name: 'Cực Quang Bắc Cực', price: 1350, tier: 'EPIC' },
  { id: 'BG_ANDROMEDA_CORE', name: 'Lõi Thiên Hà Andromeda', price: 1500, tier: 'EPIC' },
  { id: 'BG_BLOOD_MOON', name: 'Nguyệt Thực Đỏ', price: 1600, tier: 'EPIC' },
  { id: 'BG_CRYSTAL_CAVERN', name: 'Hang Động Pha Lê', price: 1700, tier: 'EPIC' },
  { id: 'BG_CHERRY_NIGHT', name: 'Đêm Hoa Anh Đào', price: 1800, tier: 'EPIC' },

  // LEGENDARY Tier (2,200 – 3,000 Coins)
  { id: 'BG_SOLAR_ECLIPSE', name: 'Nhật Thực Hoàng Kim', price: 2200, tier: 'LEGENDARY' },
  { id: 'BG_SUPERNOVA_BLAST', name: 'Vụ Nổ Siêu Tân Tinh', price: 2400, tier: 'LEGENDARY' },
  { id: 'BG_FROST_GLACIER', name: 'Kỷ Băng Hà Vĩnh Cửu', price: 2600, tier: 'LEGENDARY' },
  { id: 'BG_DRAGON_FIRE', name: 'Hỏa Long Rực Cháy', price: 2800, tier: 'LEGENDARY' },
  { id: 'BG_QUANTUM_REALM', name: 'Thế Giới Lượng Tử', price: 3000, tier: 'LEGENDARY' },

  // MYTHIC Tier (3,500 – 5,000 Coins)
  { id: 'BG_PRISM_HOLOGRAM', name: 'Lăng Kính Vô Cực', price: 3500, tier: 'MYTHIC' },
  { id: 'BG_CELESTIAL_PALACE', name: 'Thiên Cung Hoàng Đế', price: 4200, tier: 'MYTHIC' },
  { id: 'BG_OMEGA_SINGULARITY', name: 'Hố Đen Omega', price: 5000, tier: 'MYTHIC' },
];

export const SHOP_BACKGROUNDS = BACKGROUND_CATALOG;

export const BACKGROUND_CATALOG_MAP = Object.fromEntries(
  BACKGROUND_CATALOG.map((bg) => [bg.id, bg])
);

export const SHOP_BACKGROUND_MAP = BACKGROUND_CATALOG_MAP;

export const VALID_MODES = ['dragMode', 'dropMode'];

export function normalizeMode(rawMode) {
  if (rawMode === 'drag' || rawMode === 'dragMode' || rawMode === '8x8') {
    return 'dragMode';
  }
  if (rawMode === 'drop' || rawMode === 'dropMode' || rawMode === '10x20') {
    return 'dropMode';
  }
  return null;
}

export function isFounderUsername(username) {
  const configured = (process.env.FOUNDER_USERNAME || '')
    .split(',')
    .map((u) => u.trim().toLowerCase())
    .filter(Boolean);
  if (configured.length === 0) return false;
  return configured.includes(String(username || '').trim().toLowerCase());
}
