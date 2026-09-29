// ============================================================================
// COMPONENTS — real component sets with variants, bound to variables
// ============================================================================

const C = {};   // component sets and single components, by name

/** Lay variants out in a grid; combineAsVariants stacks them all at 0,0. */
function gridVariants(set, cols, gapX, gapY) {
  const kids = set.children;
  let x = 0, y = 0, rowH = 0, col = 0;
  for (const k of kids) {
    k.x = x; k.y = y;
    rowH = Math.max(rowH, k.height);
    col += 1;
    if (col >= cols) { col = 0; x = 0; y += rowH + gapY; rowH = 0; }
    else { x += k.width + gapX; }
  }
  let w = 0, h = 0;
  for (const k of kids) { w = Math.max(w, k.x + k.width); h = Math.max(h, k.y + k.height); }
  set.resize(w + 48, h + 48);
  for (const k of kids) { k.x += 24; k.y += 24; }
  return set;
}

// ------------------------------------------------------------------ Button --
function buildButton() {
  const EMPHASIS = [
    ['Primary',   'color/ink',     'color/ink-inverse', null],
    ['Accent',    'color/accent',  'color/on-accent',   null],
    ['Secondary', null,            'color/ink',         'color/border-strong'],
    ['Ghost',     null,            'color/ink-muted',   null],
  ];
  const SIZES = [['Small', 8, 16, 12], ['Medium', 12, 24, 14], ['Large', 16, 28, 17]];

  const variants = [];
  for (const e of EMPHASIS) {
    for (const s of SIZES) {
      const comp = figma.createComponent();
      comp.name = 'Emphasis=' + e[0] + ', Size=' + s[0];
      comp.layoutMode = 'HORIZONTAL';
      comp.primaryAxisSizingMode = 'AUTO';
      comp.counterAxisSizingMode = 'AUTO';
      comp.counterAxisAlignItems = 'CENTER';
      comp.paddingTop = s[1]; comp.paddingBottom = s[1];
      comp.paddingLeft = s[2]; comp.paddingRight = s[2];
      comp.itemSpacing = 8;
      comp.cornerRadius = 0;
      bindRadius(comp, V.radius.full);
      bindNum(comp, 'itemSpacing', V.space['2']);
      comp.fills = [];
      if (e[1]) fillVar(comp, V.color[e[1]]);
      if (e[3]) strokeVar(comp, V.color[e[3]], 1);

      const label = TXT('Label', 'View my work', null, V.color[e[2]], {
        font: F.semibold, size: s[3], ls: 4, lh: 100,
      });
      comp.appendChild(label);
      styled(label, 'Label/Button');
      if (s[3] !== 14) STYLE_QUEUE.pop();   // only Medium matches the ramp exactly
      variants.push(comp);
    }
  }
  const set = figma.combineAsVariants(variants, figma.currentPage);
  set.name = 'Button';
  set.description = 'Primary is ink on paper — the strongest element on a page. '
    + 'Accent is reserved for the single most important action in a view (the 10%). '
    + 'Every size keeps a 44px minimum target except Small, which is for dense toolbars.';
  fillVar(set, V.color['color/canvas-contrast']);
  gridVariants(set, 3, 24, 24);
  C.Button = set;
  return set;
}

// --------------------------------------------------------------------- Tag --
function buildTag() {
  const KINDS = [
    ['Plain',  null,               'color/ink-muted', 'color/border'],
    ['Accent', 'color/accent-soft', 'color/accent',   'color/accent'],
    ['Solid',  'color/surface',    'color/ink-muted', 'color/border'],
  ];
  const variants = KINDS.map((k) => {
    const comp = figma.createComponent();
    comp.name = 'Kind=' + k[0];
    comp.layoutMode = 'HORIZONTAL';
    comp.primaryAxisSizingMode = 'AUTO';
    comp.counterAxisSizingMode = 'AUTO';
    comp.counterAxisAlignItems = 'CENTER';
    comp.paddingTop = 6; comp.paddingBottom = 6;
    comp.paddingLeft = 12; comp.paddingRight = 12;
    comp.cornerRadius = 0;
    bindRadius(comp, V.radius.full);
    comp.fills = [];
    if (k[1]) fillVar(comp, V.color[k[1]]);
    strokeVar(comp, V.color[k[3]], 1);
    comp.appendChild(TXT('Label', 'Design system', null, V.color[k[2]], { font: F.medium, size: 12, lh: 140 }));
    return comp;
  });
  const set = figma.combineAsVariants(variants, figma.currentPage);
  set.name = 'Tag';
  set.description = 'Metadata pill. Accent marks the project type; Plain carries secondary facets.';
  fillVar(set, V.color['color/canvas-contrast']);
  gridVariants(set, 3, 20, 20);
  C.Tag = set;
  return set;
}

// ------------------------------------------------------------------- Badge --
function buildBadge() {
  const TONES = [
    ['Success', 'color/success-soft', 'color/success', 'Shipped'],
    ['Warning', 'color/warning-soft', 'color/warning', 'In progress'],
    ['Danger',  'color/danger-soft',  'color/danger',  'Critical'],
  ];
  const variants = TONES.map((t) => {
    const comp = figma.createComponent();
    comp.name = 'Tone=' + t[0];
    comp.layoutMode = 'HORIZONTAL';
    comp.primaryAxisSizingMode = 'AUTO';
    comp.counterAxisSizingMode = 'AUTO';
    comp.counterAxisAlignItems = 'CENTER';
    comp.paddingTop = 5; comp.paddingBottom = 5;
    comp.paddingLeft = 12; comp.paddingRight = 12;
    comp.itemSpacing = 8;
    comp.cornerRadius = 0;
    bindRadius(comp, V.radius.sm);
    fillVar(comp, V.color[t[1]]);

    const dot = figma.createEllipse();
    dot.name = 'Dot';
    dot.resize(7, 7);
    fillVar(dot, V.color[t[2]]);
    comp.appendChild(dot);
    comp.appendChild(TXT('Label', t[3], null, V.color[t[2]], {
      font: F.semibold, size: 12, ls: 8, case: 'UPPER', lh: 140,
    }));
    return comp;
  });
  const set = figma.combineAsVariants(variants, figma.currentPage);
  set.name = 'Badge';
  set.description = 'Status. Tone is carried by a word and a dot as well as hue, so it survives greyscale and colour blindness.';
  fillVar(set, V.color['color/canvas-contrast']);
  gridVariants(set, 3, 20, 20);
  C.Badge = set;
  return set;
}

// -------------------------------------------------------------------- Chip --
function buildChip() {
  const STATES = [['Default', false], ['Pressed', true]];
  const variants = STATES.map((s) => {
    const comp = figma.createComponent();
    comp.name = 'State=' + s[0];
    comp.layoutMode = 'HORIZONTAL';
    comp.primaryAxisSizingMode = 'AUTO';
    comp.counterAxisSizingMode = 'FIXED';
    comp.resize(180, 38);
    comp.counterAxisAlignItems = 'CENTER';
    comp.primaryAxisAlignItems = 'SPACE_BETWEEN';
    comp.paddingLeft = 18; comp.paddingRight = 18;
    comp.itemSpacing = 14;
    comp.cornerRadius = 0;
    bindRadius(comp, V.radius.full);
    comp.fills = [];
    if (s[1]) fillVar(comp, V.color['color/ink']);
    strokeVar(comp, V.color[s[1] ? 'color/ink' : 'color/border'], 1);
    const inkVar = V.color[s[1] ? 'color/ink-inverse' : 'color/ink-muted'];
    comp.appendChild(TXT('Label', 'Healthcare', null, inkVar, { font: F.semibold, size: 12, ls: 12, case: 'UPPER', lh: 140 }));
    comp.appendChild(TXT('Count', '2', null, V.color[s[1] ? 'color/ink-inverse' : 'color/ink-subtle'], { font: F.semibold, size: 12, lh: 140 }));
    return comp;
  });
  const set = figma.combineAsVariants(variants, figma.currentPage);
  set.name = 'Chip';
  set.description = 'Filter control. Pressed maps to aria-pressed="true" in the build.';
  fillVar(set, V.color['color/canvas-contrast']);
  gridVariants(set, 2, 20, 20);
  C.Chip = set;
  return set;
}

// ------------------------------------------------------------------- Field --
function buildField() {
  const STATES = [
    ['Default',  'color/surface',      'color/border-strong', 1, 'color/ink',        false],
    ['Focus',    'color/surface',      'color/accent',        2, 'color/ink',        false],
    ['Error',    'color/danger-soft',  'color/danger',        1, 'color/ink',        true],
    ['Disabled', 'color/surface-sunken', 'color/border',      1, 'color/ink-subtle', false],
  ];
  const variants = STATES.map((s) => {
    const comp = figma.createComponent();
    comp.name = 'State=' + s[0];
    comp.layoutMode = 'VERTICAL';
    comp.primaryAxisSizingMode = 'AUTO';
    comp.counterAxisSizingMode = 'FIXED';
    comp.resize(340, 10);
    comp.itemSpacing = 8;
    comp.fills = [];

    const labelRow = AL('Label row', 'HORIZONTAL', { gap: 6, align: 'CENTER' });
    labelRow.appendChild(TXT('Label', 'Email', null, V.color['color/ink'], { font: F.semibold, size: 14, lh: 150 }));
    labelRow.appendChild(TXT('Required', '*', null, V.color['color/accent'], { font: F.semibold, size: 14, lh: 150 }));
    comp.appendChild(labelRow);
    fill(labelRow);

    const input = AL('Input', 'HORIZONTAL', { px: 16, py: 14, align: 'CENTER' });
    input.counterAxisSizingMode = 'FIXED';
    input.primaryAxisSizingMode = 'FIXED';
    fillVar(input, V.color[s[1]]);
    strokeVar(input, V.color[s[2]], s[3]);
    input.cornerRadius = 0;
    bindRadius(input, V.radius.md);
    input.appendChild(TXT('Value', s[0] === 'Error' ? 'not-an-email' : 'jane@example.com', null, V.color[s[4]], { font: F.regular, size: 17, lh: 150 }));
    comp.appendChild(input);
    input.resize(340, 48);
    fill(input);

    if (s[5]) {
      const err = TXT('Error message', 'That email address does not look complete.', null, V.color['color/danger'], { font: F.medium, size: 12, lh: 140, width: 340 });
      comp.appendChild(err);
      fill(err);
    }
    return comp;
  });
  const set = figma.combineAsVariants(variants, figma.currentPage);
  set.name = 'Field';
  set.description = 'Text input. Error carries a message as well as a colour — colour alone is never the only signal.';
  fillVar(set, V.color['color/canvas-contrast']);
  gridVariants(set, 2, 40, 32);
  C.Field = set;
  return set;
}

// -------------------------------------------------------------- ProjectCard --
/** Abstract product artwork — the same motif the site's SVG covers use. */
function artwork(tint, w, h) {
  const art = BOX('Artwork', w, h, { fill: tint, radius: 10, clip: true });
  const panel = BOX('Panel', Math.round(w * 0.52), Math.round(h * 0.62), { fill: '#faf8f4', radius: 8 });
  panel.x = Math.round(w * 0.08); panel.y = Math.round(h * 0.16);
  art.appendChild(panel);
  const bar1 = BOX('Heading bar', Math.round(w * 0.26), 9, { fill: '#1b1b17', radius: 3 });
  bar1.x = Math.round(w * 0.13); bar1.y = Math.round(h * 0.25);
  art.appendChild(bar1);
  const bar2 = BOX('Text bar', Math.round(w * 0.34), 7, { fill: '#c9c4ba', radius: 3 });
  bar2.x = Math.round(w * 0.13); bar2.y = Math.round(h * 0.34);
  art.appendChild(bar2);
  const pill = BOX('Action', Math.round(w * 0.2), 22, { fill: tint, radius: 11 });
  pill.x = Math.round(w * 0.13); pill.y = Math.round(h * 0.46);
  art.appendChild(pill);
  const panel2 = BOX('Sheet', Math.round(w * 0.3), Math.round(h * 0.5), { fill: '#faf8f4', radius: 8 });
  panel2.x = Math.round(w * 0.64); panel2.y = Math.round(h * 0.3);
  art.appendChild(panel2);
  return art;
}

function buildProjectCard() {
  const comp = figma.createComponent();
  comp.name = 'Project card';
  comp.description = 'Grid card for the work index. Swap the artwork fill and the text; the layout hugs.';
  comp.layoutMode = 'VERTICAL';
  comp.primaryAxisSizingMode = 'AUTO';
  comp.counterAxisSizingMode = 'FIXED';
  comp.resize(388, 10);
  comp.itemSpacing = 12;
  bindNum(comp, 'itemSpacing', V.space['3']);
  comp.paddingTop = 20; comp.paddingBottom = 20; comp.paddingLeft = 20; comp.paddingRight = 20;
  bindPadding(comp, V.space['5']);
  fillVar(comp, V.color['color/surface']);
  strokeVar(comp, V.color['color/hairline'], 1);
  comp.cornerRadius = 0;
  bindRadius(comp, V.radius.lg);

  const art = artwork('#4c7a34', 348, 214);
  comp.appendChild(art); fill(art);
  const meta = TXT('Meta', 'AGRICULTURE · 2026', null, V.color['color/ink-subtle'], { font: F.semibold, size: 12, ls: 12, lh: 140 });
  comp.appendChild(meta); styled(meta, 'Label/Micro');
  const title = TXT('Title', 'CropVibe', null, V.color['color/ink'], { font: F.display, size: 26, ls: -1.5, lh: 116 });
  comp.appendChild(title);
  const tagline = TXT('Tagline', 'Five businesses, one account: designing a multi-sided agricultural marketplace', null, V.color['color/ink-muted'], { font: F.regular, size: 14, lh: 150, width: 348 });
  comp.appendChild(tagline); fill(tagline); styled(tagline, 'Body/Small');

  const tagRow = AL('Tags', 'HORIZONTAL', { gap: 8, wrap: true, crossGap: 8 });
  const t1 = C.Tag.defaultVariant.createInstance();
  t1.setProperties({ Kind: 'Accent' });
  tagRow.appendChild(t1);
  comp.appendChild(tagRow); fill(tagRow);

  C.ProjectCard = comp;
  return comp;
}

// --------------------------------------------------------------------- Nav --
function buildNav() {
  const comp = figma.createComponent();
  comp.name = 'Nav / Sticky';
  comp.description = 'Sticky header. The active link carries a dot as well as weight, so the indicator is not colour-only.';
  comp.layoutMode = 'HORIZONTAL';
  comp.primaryAxisSizingMode = 'FIXED';
  comp.counterAxisSizingMode = 'FIXED';
  comp.resize(1440, 76);
  comp.primaryAxisAlignItems = 'SPACE_BETWEEN';
  comp.counterAxisAlignItems = 'CENTER';
  comp.paddingLeft = 96; comp.paddingRight = 96;
  fillVar(comp, V.color['color/canvas']);

  const brand = AL('Brand', 'HORIZONTAL', { gap: 12, align: 'CENTER' });
  const mark = AL('Monogram', 'HORIZONTAL', { align: 'CENTER', justify: 'CENTER' });
  mark.primaryAxisSizingMode = 'FIXED'; mark.counterAxisSizingMode = 'FIXED';
  mark.resize(36, 36);
  fillVar(mark, V.color['color/ink']);
  mark.cornerRadius = 0; bindRadius(mark, V.radius.sm);
  mark.appendChild(TXT('NS', 'NS', null, V.color['color/ink-inverse'], { font: { family: FR, style: 'Bold' }, size: 14, lh: 100 }));
  brand.appendChild(mark);
  const names = AL('Name', 'VERTICAL', { gap: 2 });
  names.appendChild(TXT('Full name', DATA.profile.name, null, V.color['color/ink'], { font: F.semibold, size: 14, lh: 130 }));
  names.appendChild(TXT('Role', DATA.profile.role, null, V.color['color/ink-subtle'], { font: F.regular, size: 12, lh: 130 }));
  brand.appendChild(names);
  comp.appendChild(brand);

  const links = AL('Links', 'HORIZONTAL', { gap: 32, align: 'CENTER' });
  for (let i = 0; i < DATA.navigation.length; i += 1) {
    const item = DATA.navigation[i];
    const active = i === 0;
    const col = AL('Link — ' + item.label, 'VERTICAL', { gap: 6, align: 'CENTER' });
    col.appendChild(TXT('Label', item.label, null, V.color[active ? 'color/ink' : 'color/ink-muted'], {
      font: active ? F.semibold : F.medium, size: 14, lh: 140,
    }));
    if (active) {
      const dot = figma.createEllipse();
      dot.name = 'Active dot';
      dot.resize(5, 5);
      fillVar(dot, V.color['color/accent']);
      col.appendChild(dot);
    }
    links.appendChild(col);
  }
  comp.appendChild(links);

  const cta = C.Button.defaultVariant.createInstance();
  cta.setProperties({ Emphasis: 'Primary', Size: 'Small' });
  const ctaLabel = cta.findOne((n) => n.type === 'TEXT');
  if (ctaLabel) ctaLabel.characters = 'Let’s talk';
  comp.appendChild(cta);

  C.Nav = comp;
  return comp;
}
