// ============================================================================
// FOUNDATIONS — variable collections, text styles, specimen sheet
// ============================================================================

const TOKENS = {
  primitives: {
    'paper/50': '#ffffff', 'paper/100': '#f7f5f0', 'paper/200': '#efebe3',
    'paper/300': '#e4e0d6', 'paper/400': '#d9d4c8',
    'stone/500': '#7e7a6e', 'stone/600': '#6f6b60', 'stone/700': '#56544c',
    'ink/900': '#14140f',
    'rust/300': '#ff9b6a', 'rust/400': '#f0875c', 'rust/600': '#a8401c', 'rust/700': '#9c3a17',
    'rust/050': '#f4e5df', 'rust/950': '#2a211c',
    'night/950': '#0d0c0a', 'night/900': '#12110e', 'night/800': '#1a1915',
    'night/700': '#24231e', 'night/650': '#272620', 'night/600': '#34322b',
    'night/500': '#7a756b', 'night/400': '#948f85', 'night/300': '#b0aba0', 'night/50': '#f4f1ea',
    'green/600': '#186b42', 'green/300': '#6bdca6', 'green/050': '#e4f0ea', 'green/950': '#17241e',
    'red/600': '#b3261e', 'red/300': '#f98a80', 'red/050': '#f8e7e6', 'red/950': '#2a1a18',
    'amber/700': '#8a5300', 'amber/300': '#f0c05a', 'amber/050': '#f6ecd9', 'amber/950': '#2a2113',
  },
  // token: [light primitive, dark primitive, scopes, css var, description]
  semantic: {
    'color/canvas':          ['paper/100', 'night/900', ['FRAME_FILL', 'SHAPE_FILL'], '--canvas', '60% of the page. The base canvas.'],
    'color/canvas-contrast': ['paper/200', 'night/800', ['FRAME_FILL', 'SHAPE_FILL'], '--canvas-contrast', 'Alternating section band.'],
    'color/surface':         ['paper/50',  'night/800', ['FRAME_FILL', 'SHAPE_FILL'], '--surface', '30% layer — cards, inputs, panels.'],
    'color/surface-sunken':  ['paper/200', 'night/950', ['FRAME_FILL', 'SHAPE_FILL'], '--surface-sunken', 'Recessed wells and media placeholders.'],
    'color/surface-inverse': ['ink/900',   'night/50',  ['FRAME_FILL', 'SHAPE_FILL'], '--surface-inverse', 'Inverted statement panels.'],
    'color/hairline':        ['paper/300', 'night/650', ['STROKE_COLOR', 'FRAME_FILL', 'SHAPE_FILL'], '--hairline', 'Dividers and quiet borders.'],
    'color/border':          ['paper/400', 'night/600', ['STROKE_COLOR'], '--border', 'Decorative borders.'],
    'color/border-strong':   ['stone/500', 'night/500', ['STROKE_COLOR'], '--border-strong', 'Control borders. 3.94:1 on canvas — WCAG 1.4.11.'],
    'color/ink':             ['ink/900',   'night/50',  ['TEXT_FILL', 'SHAPE_FILL', 'FRAME_FILL'], '--ink', 'Primary text. 16.96:1 on canvas.'],
    'color/ink-muted':       ['stone/700', 'night/300', ['TEXT_FILL'], '--ink-muted', 'Secondary text. 6.96:1 on canvas.'],
    'color/ink-subtle':      ['stone/600', 'night/400', ['TEXT_FILL'], '--ink-subtle', 'Tertiary text. 4.88:1 on canvas.'],
    'color/ink-inverse':     ['paper/100', 'night/900', ['TEXT_FILL'], '--ink-inverse', 'Text on inverted surfaces.'],
    'color/accent':          ['rust/600',  'rust/400',  ['TEXT_FILL', 'FRAME_FILL', 'SHAPE_FILL', 'STROKE_COLOR'], '--accent', 'The rationed 10%. 5.64:1 on canvas.'],
    'color/accent-strong':   ['rust/700',  'rust/300',  ['TEXT_FILL', 'FRAME_FILL', 'SHAPE_FILL'], '--accent-strong', 'Accent hover. 6.36:1 on canvas.'],
    'color/accent-soft':     ['rust/050',  'rust/950',  ['FRAME_FILL', 'SHAPE_FILL'], '--accent-soft', 'Accent tint for quiet emphasis.'],
    'color/on-accent':       ['paper/50',  'night/900', ['TEXT_FILL'], '--on-accent', 'Text on an accent fill. 6.15:1.'],
    'color/success':         ['green/600', 'green/300', ['TEXT_FILL', 'SHAPE_FILL'], '--success', 'Positive state. 5.98:1 on canvas.'],
    'color/success-soft':    ['green/050', 'green/950', ['FRAME_FILL', 'SHAPE_FILL'], '--success-soft', 'Positive background.'],
    'color/danger':          ['red/600',   'red/300',   ['TEXT_FILL', 'SHAPE_FILL', 'STROKE_COLOR'], '--danger', 'Error state. 6.00:1 on canvas.'],
    'color/danger-soft':     ['red/050',   'red/950',   ['FRAME_FILL', 'SHAPE_FILL'], '--danger-soft', 'Error background.'],
    'color/warning':         ['amber/700', 'amber/300', ['TEXT_FILL', 'SHAPE_FILL'], '--warning', 'Warning state.'],
    'color/warning-soft':    ['amber/050', 'amber/950', ['FRAME_FILL', 'SHAPE_FILL'], '--warning-soft', 'Warning background.'],
  },
  spacing: { '1': 4, '2': 8, '3': 12, '4': 16, '5': 24, '6': 32, '7': 40, '8': 48, '9': 64, '10': 80, '11': 96, '12': 128 },
  radius: { xs: 3, sm: 6, md: 10, lg: 16, xl: 24, full: 999 },
};

const FR = 'Fraunces', IN = 'Inter';
// Fraunces uses "SemiBold" (no space); Inter uses "Semi Bold" (with one).
const FONTS = [
  { family: FR, style: 'SemiBold' }, { family: FR, style: 'SemiBold Italic' },
  { family: FR, style: 'Bold' }, { family: FR, style: 'Regular' },
  { family: IN, style: 'Regular' }, { family: IN, style: 'Medium' },
  { family: IN, style: 'Semi Bold' }, { family: IN, style: 'Bold' },
];

const TYPE_RAMP = [
  ['Display/XL',   FR, 'SemiBold',        72, 98,  -3.5],
  ['Display/L',    FR, 'SemiBold',        56, 104, -3.0],
  ['Heading/H2',   FR, 'SemiBold',        48, 104, -3.0],
  ['Heading/H3',   IN, 'Semi Bold',       34, 116, -1.5],
  ['Heading/H4',   IN, 'Semi Bold',       26, 116, -1.5],
  ['Heading/H5',   IN, 'Semi Bold',       21, 120, -1.0],
  ['Body/Lead',    IN, 'Regular',         21, 150,  0],
  ['Body/Base',    IN, 'Regular',         17, 168,  0],
  ['Body/Small',   IN, 'Regular',         14, 150,  0],
  ['Label/Micro',  IN, 'Semi Bold',       12, 140, 12],
  ['Label/Button', IN, 'Semi Bold',       14, 100,  4],
  ['Serif/Quote',  FR, 'SemiBold Italic', 21, 116, -1.0],
];

/** Font shorthands used directly by builders. */
const F = {
  display: { family: FR, style: 'SemiBold' },
  displayItalic: { family: FR, style: 'SemiBold Italic' },
  serif: { family: FR, style: 'SemiBold' },
  regular: { family: IN, style: 'Regular' },
  medium: { family: IN, style: 'Medium' },
  semibold: { family: IN, style: 'Semi Bold' },
};

async function loadAllFonts() {
  await Promise.all(FONTS.map((f) => figma.loadFontAsync(f)));
}

/** V.color['color/ink'], V.space['5'], V.radius.full — filled by buildTokens. */
const V = { color: {}, space: {}, radius: {}, prim: {}, modes: {}, collections: {} };

async function buildTokens() {
  const existingCollections = await figma.variables.getLocalVariableCollectionsAsync();
  const existingVars = await figma.variables.getLocalVariablesAsync();

  const collection = (name, modeNames) => {
    let c = existingCollections.find((x) => x.name === name);
    if (!c) {
      c = figma.variables.createVariableCollection(name);
      c.renameMode(c.modes[0].modeId, modeNames[0]);
      for (const m of modeNames.slice(1)) c.addMode(m);
    }
    const modes = {};
    for (const m of c.modes) modes[m.name] = m.modeId;
    return { c, modes };
  };
  const variable = (name, coll, type) => {
    let v = existingVars.find((x) => x.name === name && x.variableCollectionId === coll.id);
    if (!v) v = figma.variables.createVariable(name, coll, type);
    return v;
  };

  // primitives — hidden from every picker so only semantics are selectable
  const prim = collection('Primitives', ['Value']);
  for (const name of Object.keys(TOKENS.primitives)) {
    const v = variable(name, prim.c, 'COLOR');
    v.setValueForMode(prim.modes.Value, hex(TOKENS.primitives[name]));
    v.scopes = [];
    V.prim[name] = v;
  }

  // semantic colour with two modes
  const color = collection('Color', ['Light', 'Dark']);
  V.modes = color.modes;
  V.collections.color = color.c;
  for (const name of Object.keys(TOKENS.semantic)) {
    const spec = TOKENS.semantic[name];
    const v = variable(name, color.c, 'COLOR');
    v.setValueForMode(color.modes.Light, { type: 'VARIABLE_ALIAS', id: V.prim[spec[0]].id });
    v.setValueForMode(color.modes.Dark, { type: 'VARIABLE_ALIAS', id: V.prim[spec[1]].id });
    v.scopes = spec[2];
    v.setVariableCodeSyntax('WEB', 'var(' + spec[3] + ')');
    v.description = spec[4];
    V.color[name] = v;
  }

  const space = collection('Spacing', ['Value']);
  for (const k of Object.keys(TOKENS.spacing)) {
    const v = variable('spacing/' + k, space.c, 'FLOAT');
    v.setValueForMode(space.modes.Value, TOKENS.spacing[k]);
    v.scopes = ['GAP', 'WIDTH_HEIGHT'];
    v.setVariableCodeSyntax('WEB', 'var(--space-' + k + ')');
    V.space[k] = v;
  }

  const radius = collection('Radius', ['Value']);
  for (const k of Object.keys(TOKENS.radius)) {
    const v = variable('radius/' + k, radius.c, 'FLOAT');
    v.setValueForMode(radius.modes.Value, TOKENS.radius[k]);
    v.scopes = ['CORNER_RADIUS'];
    v.setVariableCodeSyntax('WEB', 'var(--radius-' + k + ')');
    V.radius[k] = v;
  }

  return {
    primitives: Object.keys(V.prim).length,
    semantic: Object.keys(V.color).length,
    spacing: Object.keys(V.space).length,
    radius: Object.keys(V.radius).length,
  };
}

const TEXT_STYLES = {};

async function buildTextStyles() {
  const existing = await figma.getLocalTextStylesAsync();
  for (const row of TYPE_RAMP) {
    const name = row[0];
    let s = existing.find((x) => x.name === name);
    if (!s) { s = figma.createTextStyle(); s.name = name; }
    s.fontName = { family: row[1], style: row[2] };
    s.fontSize = row[3];
    s.lineHeight = { unit: 'PERCENT', value: row[4] };
    s.letterSpacing = { unit: 'PERCENT', value: row[5] };
    if (name === 'Label/Micro') s.textCase = 'UPPER';
    TEXT_STYLES[name] = s;
  }
  return Object.keys(TEXT_STYLES).length;
}

/** Text nodes queued for a style, applied together (setTextStyleIdAsync). */
const STYLE_QUEUE = [];
function styled(node, styleName) {
  if (TEXT_STYLES[styleName]) STYLE_QUEUE.push([node, TEXT_STYLES[styleName].id]);
  else warn('unknown text style: ' + styleName);
  return node;
}
async function applyQueuedStyles() {
  for (const pair of STYLE_QUEUE) {
    try { await pair[0].setTextStyleIdAsync(pair[1]); }
    catch (e) { warn('could not apply text style: ' + e.message); }
  }
  return STYLE_QUEUE.length;
}
