/**
 * Generates the project cover artwork as SVG.
 *
 * These are original, abstract renderings of each product's core interaction —
 * not screenshots and not stock. Built on a solid tinted plate so they read
 * correctly in both light and dark themes without needing two files, and they
 * stay crisp at any size for ~3 KB each.
 *
 * Run: node scripts/build-covers.mjs
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const out = resolve(root, 'public/media');
mkdirSync(out, { recursive: true });

const W = 1320;
const H = 900;

/** Shared chrome: plate, grid, and a paper-white panel to compose inside. */
const frame = (tint, accent, body) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img">
  <defs>
    <linearGradient id="plate" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${tint}"/>
      <stop offset="1" stop-color="${shade(tint, -26)}"/>
    </linearGradient>
    <pattern id="grid" width="44" height="44" patternUnits="userSpaceOnUse">
      <path d="M44 0H0v44" fill="none" stroke="#ffffff" stroke-opacity=".07" stroke-width="1"/>
    </pattern>
    <filter id="lift" x="-12%" y="-12%" width="124%" height="124%">
      <feDropShadow dx="0" dy="14" stdDeviation="20" flood-color="#000" flood-opacity=".22"/>
    </filter>
  </defs>

  <rect width="${W}" height="${H}" fill="url(#plate)"/>
  <rect width="${W}" height="${H}" fill="url(#grid)"/>
  <circle cx="${W - 120}" cy="130" r="230" fill="${accent}" fill-opacity=".14"/>

  ${body}
</svg>
`;

/** Darken/lighten a hex colour by `amount` (−100…100). */
function shade(hex, amount) {
  const n = parseInt(hex.slice(1), 16);
  const clamp = (v) => Math.max(0, Math.min(255, v));
  const r = clamp((n >> 16) + amount);
  const g = clamp(((n >> 8) & 0xff) + amount);
  const b = clamp((n & 0xff) + amount);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

const PAPER = '#faf8f4';
const INK = '#1b1b17';
const MUTED = '#8f8b81';
const LINE = '#e3ded4';

const bar = (x, y, w, h, fill, r = 4) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}"/>`;

const panel = (x, y, w, h, r = 18, fill = PAPER) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" filter="url(#lift)"/>`;

// ---------------------------------------------------------------------------
// CropVibe — one account, five roles: a role switcher above a marketplace card
// and a three-step booking sheet.
// ---------------------------------------------------------------------------
const cropvibe = frame(
  '#4c7a34',
  '#cdf06a',
  `
  ${panel(96, 120, 640, 680)}
  ${bar(140, 168, 200, 18, INK)}
  ${bar(140, 200, 300, 12, MUTED)}

  <!-- role switcher -->
  ${bar(140, 244, 552, 62, '#f1eee7', 31)}
  ${bar(150, 254, 172, 42, '#4c7a34', 21)}
  ${bar(178, 269, 118, 12, '#ffffff')}
  ${bar(352, 269, 80, 12, MUTED)}
  ${bar(462, 269, 96, 12, MUTED)}
  ${bar(588, 269, 72, 12, MUTED)}

  <!-- listing cards -->
  ${bar(140, 342, 264, 180, '#f1eee7', 14)}
  ${bar(164, 366, 216, 86, '#dfe9d3', 8)}
  ${bar(164, 468, 130, 13, INK)}
  ${bar(164, 492, 92, 11, MUTED)}

  ${bar(428, 342, 264, 180, '#f1eee7', 14)}
  ${bar(452, 366, 216, 86, '#e6e2d8', 8)}
  ${bar(452, 468, 156, 13, INK)}
  ${bar(452, 492, 74, 11, MUTED)}

  <!-- availability strip -->
  ${bar(140, 558, 552, 1, LINE, 0)}
  ${bar(140, 586, 140, 12, INK)}
  ${Array.from({ length: 10 })
    .map((_, i) =>
      bar(140 + i * 56, 618, 44, 44, i === 3 || i === 6 ? '#4c7a34' : '#ece8e0', 10),
    )
    .join('')}

  <!-- primary action -->
  ${bar(140, 700, 220, 56, '#4c7a34', 28)}
  ${bar(182, 721, 136, 14, '#ffffff')}
  ${bar(384, 700, 160, 56, 'transparent', 28)}
  <rect x="384" y="700" width="160" height="56" rx="28" fill="none" stroke="${LINE}" stroke-width="2"/>

  <!-- booking sheet, floating -->
  ${panel(788, 250, 436, 470, 22)}
  ${bar(828, 296, 132, 14, INK)}
  ${bar(828, 326, 240, 11, MUTED)}
  <!-- 3 steps -->
  ${[0, 1, 2]
    .map((i) => {
      const y = 372 + i * 76;
      const active = i === 0;
      return `<circle cx="850" cy="${y + 20}" r="18" fill="${active ? '#4c7a34' : '#ece8e0'}"/>
        ${bar(884, y + 8, active ? 180 : 140, 13, active ? INK : MUTED)}
        ${bar(884, y + 30, 236, 10, '#ded9cf')}`;
    })
    .join('')}
  ${bar(828, 616, 356, 1, LINE, 0)}
  ${bar(828, 644, 356, 54, '#4c7a34', 27)}
  ${bar(930, 664, 152, 14, '#ffffff')}
`,
);

// ---------------------------------------------------------------------------
// DEXA — exception queue ordered by consequence, with an in-place detail panel.
// ---------------------------------------------------------------------------
const rows = [
  { sev: '#d94f3d', w: 300 },
  { sev: '#d94f3d', w: 250 },
  { sev: '#e0a23c', w: 330 },
  { sev: '#e0a23c', w: 220 },
  { sev: '#8f8b81', w: 290 },
  { sev: '#8f8b81', w: 260 },
];

const dexa = frame(
  '#2b5f7e',
  '#7fd4f5',
  `
  ${panel(84, 118, 740, 684)}
  ${bar(124, 162, 168, 16, INK)}
  ${bar(124, 192, 236, 11, MUTED)}
  <!-- severity legend -->
  ${bar(600, 158, 184, 30, '#f1eee7', 15)}
  <circle cx="622" cy="173" r="5" fill="#d94f3d"/>
  ${bar(636, 167, 34, 10, MUTED)}
  <circle cx="686" cy="173" r="5" fill="#e0a23c"/>
  ${bar(700, 167, 34, 10, MUTED)}

  ${bar(124, 226, 660, 1, LINE, 0)}

  ${rows
    .map((row, i) => {
      const y = 250 + i * 88;
      return `${bar(124, y, 660, 72, i === 0 ? '#f4f0e9' : 'transparent', 12)}
      ${bar(140, y + 16, 5, 40, row.sev, 2)}
      ${bar(164, y + 18, row.w, 13, INK)}
      ${bar(164, y + 44, row.w - 60, 10, MUTED)}
      ${bar(660, y + 24, 108, 26, '#ece8e0', 13)}
      ${bar(124, y + 80, 660, 1, LINE, 0)}`;
    })
    .join('')}

  <!-- in-place detail panel -->
  ${panel(792, 214, 444, 520, 22)}
  ${bar(832, 258, 148, 15, INK)}
  ${bar(832, 288, 268, 11, MUTED)}
  ${bar(832, 324, 372, 1, LINE, 0)}
  <!-- route timeline -->
  ${[0, 1, 2, 3]
    .map((i) => {
      const y = 360 + i * 74;
      const done = i < 2;
      return `<circle cx="852" cy="${y}" r="9" fill="${done ? '#2b5f7e' : '#ded9cf'}"/>
      ${i < 3 ? `<line x1="852" y1="${y + 12}" x2="852" y2="${y + 62}" stroke="${LINE}" stroke-width="2"/>` : ''}
      ${bar(878, y - 12, 190, 12, INK)}
      ${bar(878, y + 8, 132, 10, MUTED)}`;
    })
    .join('')}
  ${bar(832, 664, 372, 1, LINE, 0)}
  ${bar(832, 690, 180, 44, '#2b5f7e', 22)}
  ${bar(872, 706, 100, 12, '#ffffff')}
`,
);

// ---------------------------------------------------------------------------
// Mr. Yoda — a plain-language result card above a trend, answer first.
// ---------------------------------------------------------------------------
const trend = [700, 676, 690, 640, 612, 566, 530];
const mrYoda = frame(
  '#3d6b5e',
  '#9ff0cf',
  `
  ${panel(120, 118, 700, 684)}
  ${bar(164, 166, 128, 13, MUTED)}

  <!-- answer first -->
  ${bar(164, 202, 612, 116, '#eaf3ee', 14)}
  <circle cx="204" cy="248" r="18" fill="#3d6b5e"/>
  <path d="M196 248l6 7 12-14" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  ${bar(238, 226, 380, 16, INK)}
  ${bar(238, 256, 470, 12, MUTED)}
  ${bar(238, 278, 320, 12, MUTED)}

  <!-- a value with its typical range -->
  ${bar(164, 352, 612, 1, LINE, 0)}
  ${bar(164, 382, 176, 14, INK)}
  ${bar(164, 410, 96, 26, '#e6efe9', 13)}
  ${bar(600, 382, 176, 14, MUTED)}
  <!-- range band, deliberately not drawn like a score -->
  ${bar(164, 462, 612, 12, '#ece8e0', 6)}
  ${bar(300, 462, 300, 12, '#cfe3d8', 6)}
  <circle cx="392" cy="468" r="13" fill="#3d6b5e"/>
  ${bar(300, 492, 66, 9, MUTED)}
  ${bar(546, 492, 54, 9, MUTED)}

  <!-- trend -->
  ${bar(164, 542, 612, 1, LINE, 0)}
  ${bar(164, 570, 128, 13, INK)}
  <polyline points="${trend.map((v, i) => `${200 + i * 92},${v + 40}`).join(' ')}" fill="none" stroke="#3d6b5e" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  ${trend.map((v, i) => `<circle cx="${200 + i * 92}" cy="${v + 40}" r="6" fill="#3d6b5e"/>`).join('')}
  ${bar(164, 762, 260, 12, MUTED)}

  <!-- next step, tiered -->
  ${panel(860, 292, 372, 330, 22)}
  ${bar(900, 334, 120, 12, MUTED)}
  ${bar(900, 366, 236, 16, INK)}
  ${bar(900, 400, 292, 11, MUTED)}
  ${bar(900, 422, 252, 11, MUTED)}
  ${bar(900, 462, 292, 1, LINE, 0)}
  ${bar(900, 490, 292, 50, '#3d6b5e', 25)}
  ${bar(964, 508, 164, 14, '#ffffff')}
  ${bar(900, 556, 160, 12, MUTED)}
`,
);

// ---------------------------------------------------------------------------
// CianaHealth — one shared patient timeline, four role lenses, a diff panel.
// ---------------------------------------------------------------------------
const ciana = frame(
  '#3e5a99',
  '#9db8f5',
  `
  ${panel(96, 118, 700, 684)}
  ${bar(140, 164, 220, 17, INK)}
  ${bar(140, 196, 150, 11, MUTED)}

  <!-- four role lenses over one record -->
  ${[0, 1, 2, 3]
    .map((i) =>
      `${bar(140 + i * 154, 234, 138, 46, i === 0 ? '#3e5a99' : '#f1eee7', 23)}
       ${bar(170 + i * 154, 253, 78, 10, i === 0 ? '#ffffff' : MUTED)}`,
    )
    .join('')}

  ${bar(140, 312, 612, 1, LINE, 0)}

  <!-- shared timeline -->
  ${[0, 1, 2, 3, 4]
    .map((i) => {
      const y = 356 + i * 84;
      return `<circle cx="164" cy="${y}" r="10" fill="${i === 0 ? '#3e5a99' : '#ded9cf'}"/>
      ${i < 4 ? `<line x1="164" y1="${y + 14}" x2="164" y2="${y + 70}" stroke="${LINE}" stroke-width="2"/>` : ''}
      ${bar(196, y - 14, 84, 20, i === 0 ? '#e5eaf7' : '#f1eee7', 10)}
      ${bar(296, y - 12, 250 - i * 22, 13, INK)}
      ${bar(296, y + 10, 330 - i * 30, 10, MUTED)}`;
    })
    .join('')}

  <!-- "since you last looked" diff -->
  ${panel(764, 236, 460, 430, 22)}
  ${bar(804, 280, 208, 14, INK)}
  ${bar(804, 308, 160, 11, MUTED)}
  ${bar(804, 342, 380, 1, LINE, 0)}
  ${[0, 1, 2]
    .map((i) => {
      const y = 374 + i * 92;
      return `${bar(804, y, 380, 72, '#f4f2ec', 12)}
      ${bar(820, y + 14, 4, 44, '#3e5a99', 2)}
      ${bar(842, y + 16, 210 - i * 20, 12, INK)}
      ${bar(842, y + 38, 280 - i * 30, 10, MUTED)}`;
    })
    .join('')}
`,
);

// ---------------------------------------------------------------------------
// Branding — a wordmark, a type specimen and a colour-token sheet with
// 60/30/10 proportions.
// ---------------------------------------------------------------------------
const brand = frame(
  '#7a4a86',
  '#e3b6f0',
  `
  ${panel(110, 130, 512, 640)}
  <text x="166" y="292" font-family="Georgia, serif" font-size="128" font-weight="700" fill="${INK}">Aa</text>
  ${bar(166, 336, 400, 1, LINE, 0)}
  ${bar(166, 368, 296, 22, INK)}
  ${bar(166, 408, 358, 16, MUTED)}
  ${bar(166, 440, 236, 14, MUTED)}
  ${bar(166, 468, 300, 12, '#c9c4ba')}
  ${bar(166, 492, 258, 12, '#c9c4ba')}
  ${bar(166, 534, 400, 1, LINE, 0)}
  <!-- monogram sizes -->
  ${bar(166, 566, 88, 88, '#7a4a86', 16)}
  ${bar(274, 594, 56, 56, '#7a4a86', 12)}
  ${bar(350, 610, 32, 32, '#7a4a86', 8)}
  ${bar(400, 620, 20, 20, '#7a4a86', 5)}
  ${bar(166, 690, 240, 12, MUTED)}

  <!-- colour token sheet, 60 / 30 / 10 -->
  ${panel(662, 196, 552, 508, 22)}
  ${bar(706, 240, 170, 14, INK)}
  ${bar(706, 268, 240, 11, MUTED)}

  ${bar(706, 308, 464, 128, '#efece4', 14)}
  ${bar(726, 400, 44, 14, MUTED)}

  ${bar(706, 456, 228, 96, '#d8d2c6', 14)}
  ${bar(950, 456, 220, 96, '#bdb6a8', 14)}
  ${bar(726, 520, 40, 12, MUTED)}
  ${bar(970, 520, 40, 12, MUTED)}

  ${bar(706, 572, 464, 64, '#7a4a86', 14)}
  ${bar(726, 596, 48, 14, '#ffffff')}
  ${bar(706, 656, 300, 12, MUTED)}
`,
);

const covers = {
  'cropvibe-cover.svg': cropvibe,
  'dexa-cover.svg': dexa,
  'mr-yoda-cover.svg': mrYoda,
  'cianahealth-cover.svg': ciana,
  'brand-cover.svg': brand,
};

for (const [name, svg] of Object.entries(covers)) {
  writeFileSync(resolve(out, name), svg, 'utf8');
  console.log(`✓ ${name} (${(Buffer.byteLength(svg) / 1024).toFixed(1)} KB)`);
}
