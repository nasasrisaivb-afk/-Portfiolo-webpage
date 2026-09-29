// ============================================================================
// SPECIMEN SHEET + SCREENS — assembled from instances, laid out with auto-layout
// ============================================================================

function sectionHeading(eyebrowText, titleText, leadText, titleSize, colW) {
  const wrap = AL('Section head', 'VERTICAL', { gap: 20 });
  const eb = AL('Eyebrow', 'HORIZONTAL', { gap: 16, align: 'CENTER' });
  const rule = BOX('Rule', 32, 1, {});
  fillVar(rule, V.color['color/accent']);
  eb.appendChild(rule);
  const ebt = TXT('Label', eyebrowText, null, V.color['color/ink-subtle'], { font: F.semibold, size: 12, ls: 12, case: 'UPPER', lh: 140 });
  eb.appendChild(ebt); styled(ebt, 'Label/Micro');
  wrap.appendChild(eb);

  const row = AL('Head row', 'HORIZONTAL', { gap: 64, align: 'MAX' });
  const title = TXT('Title', titleText, null, V.color['color/ink'], {
    font: F.display, size: titleSize, ls: -3, lh: 104, width: colW,
  });
  row.appendChild(title);
  if (leadText) {
    const lead = TXT('Lead', leadText, null, V.color['color/ink-muted'], { font: F.regular, size: 21, lh: 150, width: 500 });
    row.appendChild(lead); styled(lead, 'Body/Lead');
  }
  wrap.appendChild(row);
  return wrap;
}

function section(name, opts) {
  const o = opts || {};
  const s = AL(name, 'VERTICAL', {
    gap: o.gap === undefined ? 48 : o.gap,
    px: o.px === undefined ? 96 : o.px,
    py: o.py === undefined ? 112 : o.py,
    fillVar: o.fillVar,
  });
  s.primaryAxisSizingMode = 'AUTO';
  s.counterAxisSizingMode = 'FIXED';
  return s;
}

// ------------------------------------------------------- foundations sheet --
function buildFoundationsSheet() {
  const page = AL('Foundations — specimen', 'VERTICAL', { gap: 80, px: 80, py: 80, fillVar: V.color['color/canvas'] });
  page.counterAxisSizingMode = 'FIXED';
  page.resize(1680, 100);

  const head = AL('Cover', 'VERTICAL', { gap: 16 });
  head.appendChild(TXT('Eyebrow', 'DESIGN SYSTEM', null, V.color['color/accent'], { font: F.semibold, size: 12, ls: 12, case: 'UPPER', lh: 140 }));
  head.appendChild(TXT('Name', DATA.profile.name, null, V.color['color/ink'], { font: F.display, size: 56, ls: -3, lh: 104 }));
  const intro = TXT('Intro', 'Portfolio design system. Every value here is a Figma variable bound to the same token the site ships — change it once and both follow.', null, V.color['color/ink-muted'], { font: F.regular, size: 17, lh: 168, width: 760 });
  head.appendChild(intro); styled(intro, 'Body/Base');
  page.appendChild(head); fill(head);

  // ---- colour ----
  const colourBlock = AL('Colour', 'VERTICAL', { gap: 24 });
  colourBlock.appendChild(TXT('Title', 'Colour', null, V.color['color/ink'], { font: F.display, size: 34, ls: -1, lh: 116 }));
  const note = TXT('Note', 'Two modes over one semantic layer. Ratios are measured against the token’s own canvas. Select a swatch and switch the Color collection between Light and Dark to see both.', null, V.color['color/ink-muted'], { font: F.regular, size: 14, lh: 155, width: 720 });
  colourBlock.appendChild(note);

  const swatches = AL('Swatches', 'HORIZONTAL', { gap: 16, wrap: true, crossGap: 16 });
  swatches.counterAxisSizingMode = 'FIXED';
  const names = Object.keys(TOKENS.semantic);
  for (const name of names) {
    const cell = AL(name, 'VERTICAL', { gap: 10, p: 16, fillVar: V.color['color/surface'], strokeVar: V.color['color/hairline'], radiusVar: V.radius.md });
    cell.counterAxisSizingMode = 'FIXED';
    cell.resize(244, 10);
    const chip = BOX('Swatch', 212, 56, { fillVar: V.color[name], strokeVar: V.color['color/hairline'], radiusVar: V.radius.sm });
    cell.appendChild(chip); fill(chip);
    cell.appendChild(TXT('Token', name, null, V.color['color/ink'], { font: F.medium, size: 13, lh: 140, width: 212 }));
    const d = TXT('Description', TOKENS.semantic[name][4], null, V.color['color/ink-subtle'], { font: F.regular, size: 11, lh: 145, width: 212 });
    cell.appendChild(d);
    swatches.appendChild(cell);
  }
  colourBlock.appendChild(swatches); fill(swatches);
  page.appendChild(colourBlock); fill(colourBlock);

  // ---- type ----
  const typeBlock = AL('Typography', 'VERTICAL', { gap: 28 });
  typeBlock.appendChild(TXT('Title', 'Typography', null, V.color['color/ink'], { font: F.display, size: 34, ls: -1, lh: 116 }));
  const SAMPLES = {
    'Display/XL': 'Designing digital products',
    'Display/L': 'Products where the hard part was the thinking',
    'Heading/H2': 'Tell me what you are trying to build',
    'Heading/H3': 'Information architecture',
    'Heading/H4': 'What comes out of this stage',
    'Heading/H5': 'Key contribution',
    'Body/Lead': 'I design digital products that turn complex problems into simple, useful experiences.',
    'Body/Base': 'Loading, empty, error and not-found states are designed alongside the populated view.',
    'Body/Small': 'Evidence: 7 of 9 participants misread the reference range on first encounter.',
    'Label/Micro': 'Selected work',
    'Label/Button': 'View my work',
    'Serif/Quote': 'Just tell me if I need to worry.',
  };
  for (const row of TYPE_RAMP) {
    const specimen = AL('Type — ' + row[0], 'VERTICAL', { gap: 8 });
    const metaRow = AL('Meta', 'HORIZONTAL', { gap: 20 });
    metaRow.appendChild(TXT('Style', row[0], null, V.color['color/accent'], { font: F.semibold, size: 12, ls: 10, lh: 140 }));
    metaRow.appendChild(TXT('Spec', row[1] + ' ' + row[2] + ' · ' + row[3] + 'px · ' + row[4] + '%', null, V.color['color/ink-subtle'], { font: F.regular, size: 12, lh: 140 }));
    specimen.appendChild(metaRow);
    const sample = TXT('Specimen', SAMPLES[row[0]], null, V.color['color/ink'], {
      font: { family: row[1], style: row[2] }, size: row[3], lh: row[4], ls: row[5],
      case: row[0] === 'Label/Micro' ? 'UPPER' : undefined, width: 1400,
    });
    specimen.appendChild(sample); styled(sample, row[0]);
    typeBlock.appendChild(specimen); fill(specimen);
  }
  page.appendChild(typeBlock); fill(typeBlock);

  // ---- spacing & radius ----
  const scaleBlock = AL('Spacing & radius', 'VERTICAL', { gap: 24 });
  scaleBlock.appendChild(TXT('Title', 'Spacing — 8px grid', null, V.color['color/ink'], { font: F.display, size: 34, ls: -1, lh: 116 }));
  const bars = AL('Spacing scale', 'HORIZONTAL', { gap: 18, align: 'MIN' });
  for (const k of Object.keys(TOKENS.spacing)) {
    const v = TOKENS.spacing[k];
    const col = AL('spacing/' + k, 'VERTICAL', { gap: 8, align: 'CENTER' });
    const bar = BOX('Bar', v, 48, { fillVar: V.color['color/accent-soft'], strokeVar: V.color['color/accent'], radius: 2 });
    col.appendChild(bar);
    col.appendChild(TXT('Value', String(v), null, V.color['color/ink-subtle'], { font: F.medium, size: 11, lh: 140 }));
    bars.appendChild(col);
  }
  scaleBlock.appendChild(bars);
  scaleBlock.appendChild(TXT('Radius title', 'Radius', null, V.color['color/ink'], { font: F.display, size: 34, ls: -1, lh: 116 }));
  const radii = AL('Radius scale', 'HORIZONTAL', { gap: 20 });
  for (const k of Object.keys(TOKENS.radius)) {
    const col = AL('radius/' + k, 'VERTICAL', { gap: 10, align: 'CENTER' });
    const sq = BOX('Sample', 96, 72, { fillVar: V.color['color/surface'], strokeVar: V.color['color/border'], radiusVar: V.radius[k] });
    col.appendChild(sq);
    col.appendChild(TXT('Name', k, null, V.color['color/ink-subtle'], { font: F.medium, size: 12, lh: 140 }));
    radii.appendChild(col);
  }
  scaleBlock.appendChild(radii);
  page.appendChild(scaleBlock); fill(scaleBlock);

  return page;
}

// ------------------------------------------------------------ hero artboard --
function heroArtboard(w, h) {
  const art = AL('Hero artboard', 'VERTICAL', { gap: 16, p: 28, fillVar: V.color['color/surface'], strokeVar: V.color['color/hairline'], radiusVar: V.radius.xl });
  art.counterAxisSizingMode = 'FIXED';
  art.resize(w, h);
  art.appendChild(TXT('Caption', 'WIREFRAME → INTERFACE', null, V.color['color/ink-subtle'], { font: F.semibold, size: 11, ls: 12, lh: 140 }));
  const b1 = BOX('Heading bar', 240, 16, { fillVar: V.color['color/ink'], radius: 3 });
  art.appendChild(b1);
  const b2 = BOX('Sub bar', 160, 12, { fillVar: V.color['color/ink-subtle'], radius: 3 });
  art.appendChild(b2);
  const media = BOX('Media', w - 56, 180, { fillVar: V.color['color/canvas-contrast'], radiusVar: V.radius.md });
  art.appendChild(media); fill(media);
  const row = AL('Cards', 'HORIZONTAL', { gap: 16 });
  const c1 = BOX('Card', (w - 72) / 2, 100, { fillVar: V.color['color/canvas-contrast'], radiusVar: V.radius.md });
  const c2 = BOX('Card', (w - 72) / 2, 100, { fillVar: V.color['color/canvas-contrast'], radiusVar: V.radius.md });
  row.appendChild(c1); row.appendChild(c2);
  art.appendChild(row); fill(row);
  const actions = AL('Actions', 'HORIZONTAL', { gap: 16 });
  const a1 = BOX('Primary', 176, 46, { fillVar: V.color['color/accent'], radiusVar: V.radius.full });
  const a2 = BOX('Secondary', 140, 46, { strokeVar: V.color['color/border'], radiusVar: V.radius.full });
  actions.appendChild(a1); actions.appendChild(a2);
  art.appendChild(actions);
  return art;
}

// ------------------------------------------------------------- home desktop --
function buildHomeDesktop(modeName) {
  const W = 1440;
  const screen = AL('Home — Desktop' + (modeName === 'Dark' ? ' (Dark)' : ''), 'VERTICAL', { gap: 0, fillVar: V.color['color/canvas'] });
  screen.counterAxisSizingMode = 'FIXED';
  screen.resize(W, 100);
  screen.clipsContent = true;

  const nav = C.Nav.createInstance();
  screen.appendChild(nav); fill(nav);

  // ---- hero ----
  const hero = section('Hero', { py: 96 });
  hero.resize(W, 10);
  const heroRow = AL('Hero row', 'HORIZONTAL', { gap: 72, align: 'CENTER' });
  const heroCol = AL('Hero copy', 'VERTICAL', { gap: 32 });
  heroCol.counterAxisSizingMode = 'FIXED';
  heroCol.resize(700, 10);

  const avail = AL('Availability', 'HORIZONTAL', { gap: 16, align: 'CENTER' });
  const availRule = BOX('Rule', 32, 1, {});
  fillVar(availRule, V.color['color/accent']);
  avail.appendChild(availRule);
  avail.appendChild(TXT('Label', DATA.profile.availability, null, V.color['color/ink-subtle'], { font: F.semibold, size: 12, ls: 12, case: 'UPPER', lh: 140 }));
  heroCol.appendChild(avail);

  const h1 = TXT('H1', 'Designing digital products that turn complex problems into simple, useful experiences.', null, V.color['color/ink'], { font: F.display, size: 62, ls: -3.5, lh: 100, width: 700 });
  heroCol.appendChild(h1); fill(h1);

  const intro = TXT('Intro', 'I’m ' + DATA.profile.name + ' — a UX/UI and product designer working end to end: research and strategy, through information architecture and interface design, into design systems and shipped product.', null, V.color['color/ink-muted'], { font: F.regular, size: 21, lh: 150, width: 620 });
  heroCol.appendChild(intro); styled(intro, 'Body/Lead');

  const ctas = AL('CTAs', 'HORIZONTAL', { gap: 16 });
  const cta1 = C.Button.defaultVariant.createInstance();
  cta1.setProperties({ Emphasis: 'Primary', Size: 'Large' });
  const cta2 = C.Button.defaultVariant.createInstance();
  cta2.setProperties({ Emphasis: 'Secondary', Size: 'Large' });
  const cta2Label = cta2.findOne((n) => n.type === 'TEXT');
  if (cta2Label) cta2Label.characters = 'Let’s connect';
  ctas.appendChild(cta1); ctas.appendChild(cta2);
  heroCol.appendChild(ctas);

  const facts = AL('Facts', 'HORIZONTAL', { gap: 56 });
  const factRows = [['Case studies', String(DATA.allProjects.length)], ['Industries', String(DATA.industriesCovered.length)], ['Practice', 'End to end']];
  for (const f of factRows) {
    const col = AL('Fact — ' + f[0], 'VERTICAL', { gap: 6 });
    col.appendChild(TXT('Label', f[0], null, V.color['color/ink-subtle'], { font: F.semibold, size: 12, ls: 12, case: 'UPPER', lh: 140 }));
    col.appendChild(TXT('Value', f[1], null, V.color['color/ink'], { font: F.display, size: 26, lh: 120 }));
    facts.appendChild(col);
  }
  heroCol.appendChild(facts);
  heroRow.appendChild(heroCol);
  heroRow.appendChild(heroArtboard(440, 520));
  hero.appendChild(heroRow); fill(heroRow);
  screen.appendChild(hero); fill(hero);

  // ---- domain strip ----
  const strip = AL('Domain strip', 'HORIZONTAL', { gap: 48, px: 96, py: 28, align: 'CENTER', fillVar: V.color['color/canvas-contrast'] });
  strip.counterAxisSizingMode = 'AUTO';
  strip.appendChild(TXT('Label', 'DOMAIN EXPERIENCE', null, V.color['color/ink-subtle'], { font: F.semibold, size: 12, ls: 12, case: 'UPPER', lh: 140 }));
  const inds = AL('Industries', 'HORIZONTAL', { gap: 24, align: 'CENTER' });
  const allInd = DATA.industriesCovered.concat(['SaaS', 'Fintech', 'E-commerce']);
  for (const ind of allInd) {
    inds.appendChild(TXT(ind, ind, null, V.color['color/ink'], { font: { family: FR, style: 'Regular' }, size: 21, lh: 130 }));
  }
  strip.appendChild(inds);
  screen.appendChild(strip); fill(strip);

  // ---- selected work ----
  const work = section('Selected work');
  work.resize(W, 10);
  work.appendChild(sectionHeading('Selected work', 'Products where the hard part was the thinking',
    'Five projects across agriculture, logistics, healthcare and brand. Each one is a full case study — research, the arguments, the decisions, the things I got wrong.', 48, 560));

  for (let i = 0; i < 2; i += 1) {
    const p = DATA.featuredProjects[i];
    const row = AL('Project — ' + p.title, 'HORIZONTAL', { gap: 64, align: 'CENTER' });
    const art = artwork(p.cover.tint, 548, 374);
    const body = AL('Body', 'VERTICAL', { gap: 16 });
    body.counterAxisSizingMode = 'FIXED';
    body.resize(536, 10);
    body.appendChild(TXT('Index', '0' + (i + 1) + ' — ' + p.industry.toUpperCase(), null, V.color['color/accent'], { font: F.semibold, size: 12, ls: 12, lh: 140 }));
    body.appendChild(TXT('Title', p.title, null, V.color['color/ink'], { font: F.display, size: 48, ls: -3, lh: 104 }));
    const tg = TXT('Tagline', p.tagline, null, V.color['color/ink'], { font: F.regular, size: 21, lh: 130, width: 536 });
    body.appendChild(tg); fill(tg);
    const desc = TXT('Description', p.description, null, V.color['color/ink-muted'], { font: F.regular, size: 17, lh: 160, width: 520 });
    body.appendChild(desc); fill(desc); styled(desc, 'Body/Base');

    const metaRow = AL('Meta', 'HORIZONTAL', { gap: 32, py: 20 });
    const metaCells = [['Role', p.role.split('—')[0].trim()], ['Type', p.projectType], ['Timeline', p.timeline]];
    for (const m of metaCells) {
      const col = AL(m[0], 'VERTICAL', { gap: 6 });
      col.counterAxisSizingMode = 'FIXED';
      col.resize(156, 10);
      col.appendChild(TXT('Label', m[0], null, V.color['color/ink-subtle'], { font: F.semibold, size: 11, ls: 12, case: 'UPPER', lh: 140 }));
      const val = TXT('Value', m[1], null, V.color['color/ink'], { font: F.regular, size: 14, lh: 140, width: 156 });
      col.appendChild(val); fill(val);
      metaRow.appendChild(col);
    }
    body.appendChild(metaRow); fill(metaRow);

    const contrib = AL('Key contribution', 'VERTICAL', { gap: 8, px: 20, py: 16, fillVar: V.color['color/surface'], radiusVar: V.radius.md });
    contrib.counterAxisSizingMode = 'FIXED';
    contrib.resize(536, 10);
    // A left rule only. Set a uniform weight first, then zero the other three
    // sides — going the other way leaves strokeWeight "mixed" and throws.
    strokeVar(contrib, V.color['color/accent'], 3);
    try {
      contrib.strokeTopWeight = 0;
      contrib.strokeRightWeight = 0;
      contrib.strokeBottomWeight = 0;
      contrib.strokeLeftWeight = 3;
    } catch (e) {
      warn('per-side stroke rejected on the contribution block: ' + e.message);
    }
    contrib.appendChild(TXT('Label', 'KEY CONTRIBUTION', null, V.color['color/accent'], { font: F.semibold, size: 11, ls: 12, lh: 140 }));
    const ctext = TXT('Text', p.contribution, null, V.color['color/ink'], { font: F.regular, size: 14, lh: 150, width: 496 });
    contrib.appendChild(ctext); fill(ctext);
    body.appendChild(contrib); fill(contrib);

    const btn = C.Button.defaultVariant.createInstance();
    btn.setProperties({ Emphasis: 'Secondary', Size: 'Medium' });
    const bl = btn.findOne((n) => n.type === 'TEXT');
    if (bl) bl.characters = 'View case study';
    body.appendChild(btn);

    if (i % 2 === 1) { row.appendChild(body); row.appendChild(art); }
    else { row.appendChild(art); row.appendChild(body); }
    work.appendChild(row); fill(row);
  }
  screen.appendChild(work); fill(work);

  // ---- contact ----
  const contact = section('Contact', { fillVar: V.color['color/canvas-contrast'] });
  contact.resize(W, 10);
  contact.appendChild(sectionHeading('Contact', 'Tell me what you are trying to build',
    'Hiring, a project, or a second opinion on something that is not working — all welcome. I reply to everything within two working days.', 48, 500));
  const contactRow = AL('Contact row', 'HORIZONTAL', { gap: 64, align: 'MIN' });
  const form = AL('Form', 'VERTICAL', { gap: 24, p: 32, fillVar: V.color['color/surface'], strokeVar: V.color['color/hairline'], radiusVar: V.radius.lg });
  form.counterAxisSizingMode = 'FIXED';
  form.resize(640, 10);
  const nameRow = AL('Row', 'HORIZONTAL', { gap: 24 });
  const f1 = C.Field.defaultVariant.createInstance();
  const f2 = C.Field.defaultVariant.createInstance();
  f2.setProperties({ State: 'Error' });
  nameRow.appendChild(f1); nameRow.appendChild(f2);
  form.appendChild(nameRow); fill(nameRow);
  const f3 = C.Field.defaultVariant.createInstance();
  form.appendChild(f3); fill(f3);
  const submit = C.Button.defaultVariant.createInstance();
  submit.setProperties({ Emphasis: 'Primary', Size: 'Large' });
  const sl = submit.findOne((n) => n.type === 'TEXT');
  if (sl) sl.characters = 'Send message';
  form.appendChild(submit);
  contactRow.appendChild(form);

  const aside = AL('Aside', 'VERTICAL', { gap: 32 });
  aside.counterAxisSizingMode = 'FIXED';
  aside.resize(540, 10);
  const emailBlock = AL('Email', 'VERTICAL', { gap: 12 });
  emailBlock.appendChild(TXT('Label', 'EMAIL', null, V.color['color/ink-subtle'], { font: F.semibold, size: 11, ls: 12, lh: 140 }));
  emailBlock.appendChild(TXT('Address', DATA.profile.email, null, V.color['color/accent'], { font: F.display, size: 26, lh: 130 }));
  aside.appendChild(emailBlock); fill(emailBlock);
  const socialBlock = AL('Elsewhere', 'VERTICAL', { gap: 12 });
  socialBlock.appendChild(TXT('Label', 'ELSEWHERE', null, V.color['color/ink-subtle'], { font: F.semibold, size: 11, ls: 12, lh: 140 }));
  for (const s of DATA.profile.social) {
    const r = AL(s.label, 'HORIZONTAL', { gap: 16, py: 12, justify: 'SPACE_BETWEEN' });
    r.counterAxisSizingMode = 'AUTO';
    r.appendChild(TXT('Name', s.label, null, V.color['color/ink'], { font: F.medium, size: 17, lh: 140 }));
    r.appendChild(TXT('Handle', s.handle, null, V.color['color/ink-subtle'], { font: F.regular, size: 12, lh: 140 }));
    socialBlock.appendChild(r); fill(r);
  }
  aside.appendChild(socialBlock); fill(socialBlock);
  const statusBlock = AL('Status', 'VERTICAL', { gap: 12 });
  statusBlock.appendChild(TXT('Label', 'STATUS', null, V.color['color/ink-subtle'], { font: F.semibold, size: 11, ls: 12, lh: 140 }));
  const badge = C.Badge.defaultVariant.createInstance();
  badge.setProperties({ Tone: 'Success' });
  const bt = badge.findOne((n) => n.type === 'TEXT');
  if (bt) bt.characters = DATA.profile.availability;
  statusBlock.appendChild(badge);
  aside.appendChild(statusBlock); fill(statusBlock);
  contactRow.appendChild(aside);
  contact.appendChild(contactRow); fill(contactRow);
  screen.appendChild(contact); fill(contact);

  return screen;
}

// -------------------------------------------------------------- home mobile --
function buildHomeMobile() {
  const W = 390;
  const screen = AL('Home — Mobile 390', 'VERTICAL', { gap: 0, fillVar: V.color['color/canvas'] });
  screen.counterAxisSizingMode = 'FIXED';
  screen.resize(W, 100);
  screen.clipsContent = true;

  const nav = AL('Nav / Mobile', 'HORIZONTAL', { px: 20, py: 16, justify: 'SPACE_BETWEEN', align: 'CENTER', fillVar: V.color['color/canvas'] });
  nav.counterAxisSizingMode = 'AUTO';
  const brand = AL('Brand', 'HORIZONTAL', { gap: 12, align: 'CENTER' });
  const mark = AL('Monogram', 'HORIZONTAL', { align: 'CENTER', justify: 'CENTER' });
  mark.primaryAxisSizingMode = 'FIXED'; mark.counterAxisSizingMode = 'FIXED';
  mark.resize(36, 36);
  fillVar(mark, V.color['color/ink']);
  mark.cornerRadius = 0; bindRadius(mark, V.radius.sm);
  mark.appendChild(TXT('NS', 'NS', null, V.color['color/ink-inverse'], { font: { family: FR, style: 'Bold' }, size: 14, lh: 100 }));
  brand.appendChild(mark);
  brand.appendChild(TXT('Name', DATA.profile.name, null, V.color['color/ink'], { font: F.semibold, size: 14, lh: 130 }));
  nav.appendChild(brand);
  const burger = AL('Burger', 'VERTICAL', { gap: 5, align: 'CENTER', justify: 'CENTER' });
  burger.primaryAxisSizingMode = 'FIXED'; burger.counterAxisSizingMode = 'FIXED';
  burger.resize(44, 44);
  for (let i = 0; i < 3; i += 1) {
    const bar = BOX('Bar', 20, 2, { radius: 1 });
    fillVar(bar, V.color['color/ink']);
    burger.appendChild(bar);
  }
  nav.appendChild(burger);
  screen.appendChild(nav); fill(nav);

  const hero = AL('Hero', 'VERTICAL', { gap: 24, px: 20, py: 40 });
  hero.counterAxisSizingMode = 'FIXED';
  hero.resize(W, 10);
  hero.appendChild(TXT('Eyebrow', DATA.profile.availability, null, V.color['color/ink-subtle'], { font: F.semibold, size: 11, ls: 12, case: 'UPPER', lh: 150, width: 350 }));
  const mh1 = TXT('H1', 'Designing digital products that turn complex problems into simple, useful experiences.', null, V.color['color/ink'], { font: F.display, size: 40, ls: -3, lh: 104, width: 350 });
  hero.appendChild(mh1); fill(mh1);
  const mintro = TXT('Intro', 'I’m ' + DATA.profile.name + ' — a UX/UI and product designer working end to end: research and strategy, through IA and interface design, into design systems and shipped product.', null, V.color['color/ink-muted'], { font: F.regular, size: 17, lh: 160, width: 350 });
  hero.appendChild(mintro); fill(mintro);
  const mb1 = C.Button.defaultVariant.createInstance();
  mb1.setProperties({ Emphasis: 'Primary', Size: 'Large' });
  hero.appendChild(mb1); fill(mb1);
  const mb2 = C.Button.defaultVariant.createInstance();
  mb2.setProperties({ Emphasis: 'Secondary', Size: 'Large' });
  const mb2l = mb2.findOne((n) => n.type === 'TEXT');
  if (mb2l) mb2l.characters = 'Let’s connect';
  hero.appendChild(mb2); fill(mb2);
  hero.appendChild(heroArtboard(350, 300));
  screen.appendChild(hero); fill(hero);

  const workM = AL('Selected work', 'VERTICAL', { gap: 24, px: 20, py: 40, fillVar: V.color['color/canvas-contrast'] });
  workM.counterAxisSizingMode = 'FIXED';
  workM.resize(W, 10);
  workM.appendChild(TXT('Eyebrow', 'SELECTED WORK', null, V.color['color/ink-subtle'], { font: F.semibold, size: 11, ls: 12, lh: 140 }));
  const mTitle = TXT('Title', 'Products where the hard part was the thinking', null, V.color['color/ink'], { font: F.display, size: 32, ls: -2, lh: 106, width: 350 });
  workM.appendChild(mTitle); fill(mTitle);
  for (let i = 0; i < 2; i += 1) {
    const card = C.ProjectCard.createInstance();
    card.resize(350, card.height);
    const p = DATA.allProjects[i];
    const t = card.findOne((n) => n.type === 'TEXT' && n.name === 'Title');
    if (t) t.characters = p.title;
    const tag = card.findOne((n) => n.type === 'TEXT' && n.name === 'Tagline');
    if (tag) tag.characters = p.tagline;
    const meta = card.findOne((n) => n.type === 'TEXT' && n.name === 'Meta');
    if (meta) meta.characters = p.industry.toUpperCase() + ' · ' + p.year;
    const art = card.findOne((n) => n.name === 'Artwork');
    if (art) art.fills = [solid(p.cover.tint)];
    workM.appendChild(card); fill(card);
  }
  screen.appendChild(workM); fill(workM);

  return screen;
}

// --------------------------------------------------------------- work index --
function buildWorkIndex() {
  const W = 1440;
  const screen = AL('Work — Desktop 1440', 'VERTICAL', { gap: 0, fillVar: V.color['color/canvas'] });
  screen.counterAxisSizingMode = 'FIXED';
  screen.resize(W, 100);
  screen.clipsContent = true;

  const nav = C.Nav.createInstance();
  screen.appendChild(nav); fill(nav);

  const body = section('Work', { gap: 56 });
  body.resize(W, 10);
  body.appendChild(sectionHeading('Selected work', 'Case studies, end to end',
    'Every project here is written up in full: the research, the options I rejected, the decisions and why, what testing changed, and what I would do differently.', 48, 620));

  const filters = AL('Filter bar', 'VERTICAL', { gap: 16 });
  const chips = AL('Chips', 'HORIZONTAL', { gap: 12, wrap: true, crossGap: 12 });
  for (let i = 0; i < DATA.industryFacets.length; i += 1) {
    const f = DATA.industryFacets[i];
    const chip = C.Chip.defaultVariant.createInstance();
    chip.setProperties({ State: i === 0 ? 'Pressed' : 'Default' });
    const lbl = chip.findOne((n) => n.type === 'TEXT' && n.name === 'Label');
    if (lbl) lbl.characters = f.value;
    const cnt = chip.findOne((n) => n.type === 'TEXT' && n.name === 'Count');
    if (cnt) cnt.characters = String(f.count);
    chips.appendChild(chip);
  }
  filters.appendChild(chips); fill(chips);
  filters.appendChild(TXT('Status', 'SHOWING ALL ' + DATA.allProjects.length + ' PROJECTS', null, V.color['color/ink-subtle'], { font: F.semibold, size: 11, ls: 12, lh: 140 }));
  body.appendChild(filters); fill(filters);

  const grid = AL('Project grid', 'HORIZONTAL', { gap: 32, wrap: true, crossGap: 32 });
  grid.counterAxisSizingMode = 'FIXED';
  for (const p of DATA.allProjects) {
    const card = C.ProjectCard.createInstance();
    const t = card.findOne((n) => n.type === 'TEXT' && n.name === 'Title');
    if (t) t.characters = p.title;
    const tag = card.findOne((n) => n.type === 'TEXT' && n.name === 'Tagline');
    if (tag) tag.characters = p.tagline;
    const meta = card.findOne((n) => n.type === 'TEXT' && n.name === 'Meta');
    if (meta) meta.characters = p.industry.toUpperCase() + ' · ' + p.year;
    const art = card.findOne((n) => n.name === 'Artwork');
    if (art) art.fills = [solid(p.cover.tint)];
    const tagText = card.findOne((n) => n.type === 'TEXT' && n.name === 'Label');
    if (tagText) tagText.characters = p.projectType;
    grid.appendChild(card);
  }
  body.appendChild(grid); fill(grid);
  screen.appendChild(body); fill(body);
  return screen;
}

// -------------------------------------------------------------- case study --
function buildCaseStudy() {
  const W = 1440;
  const p = DATA.allProjects[0];
  const screen = AL('Case study — ' + p.title, 'VERTICAL', { gap: 0, fillVar: V.color['color/canvas'] });
  screen.counterAxisSizingMode = 'FIXED';
  screen.resize(W, 100);
  screen.clipsContent = true;

  const nav = C.Nav.createInstance();
  screen.appendChild(nav); fill(nav);

  const hero = section('Case study hero', { gap: 32, py: 64 });
  hero.resize(W, 10);
  hero.appendChild(TXT('Breadcrumb', 'Home  /  Work  /  ' + p.title, null, V.color['color/ink-subtle'], { font: F.regular, size: 12, lh: 140 }));
  hero.appendChild(TXT('Eyebrow', p.industry.toUpperCase() + ' · ' + p.year, null, V.color['color/accent'], { font: F.semibold, size: 12, ls: 12, lh: 140 }));
  hero.appendChild(TXT('Title', p.title, null, V.color['color/ink'], { font: F.display, size: 68, ls: -3.5, lh: 100 }));
  const tagline = TXT('Tagline', p.tagline, null, V.color['color/ink-muted'], { font: F.regular, size: 26, lh: 125, width: 640 });
  hero.appendChild(tagline);

  const tagRow = AL('Tags', 'HORIZONTAL', { gap: 10, wrap: true, crossGap: 10 });
  const tagLabels = [p.status, p.projectType].concat(p.tags.slice(0, 3));
  for (let i = 0; i < tagLabels.length; i += 1) {
    const t = C.Tag.defaultVariant.createInstance();
    t.setProperties({ Kind: i === 0 ? 'Accent' : 'Plain' });
    const tl = t.findOne((n) => n.type === 'TEXT');
    if (tl) tl.characters = tagLabels[i];
    tagRow.appendChild(t);
  }
  hero.appendChild(tagRow); fill(tagRow);
  hero.appendChild(artwork(p.cover.tint, 1248, 520));

  const meta = AL('Meta bar', 'HORIZONTAL', { gap: 32, py: 32 });
  const metaCells = [['My role', p.role], ['Team', p.team.join('\n')], ['Timeline', p.timeline], ['Project type', p.projectType]];
  for (const m of metaCells) {
    const col = AL(m[0], 'VERTICAL', { gap: 8 });
    col.counterAxisSizingMode = 'FIXED';
    col.resize(288, 10);
    col.appendChild(TXT('Label', m[0], null, V.color['color/ink-subtle'], { font: F.semibold, size: 11, ls: 12, case: 'UPPER', lh: 140 }));
    const val = TXT('Value', m[1], null, V.color['color/ink'], { font: F.regular, size: 14, lh: 150, width: 288 });
    col.appendChild(val); fill(val);
    meta.appendChild(col);
  }
  hero.appendChild(meta); fill(meta);
  screen.appendChild(hero); fill(hero);

  // ---- overview ----
  const overview = section('01 Overview', { gap: 32, py: 80 });
  overview.resize(W, 10);
  const ovRow = AL('Row', 'HORIZONTAL', { gap: 64, align: 'MIN' });
  const ovHead = AL('Head', 'VERTICAL', { gap: 8 });
  ovHead.counterAxisSizingMode = 'FIXED';
  ovHead.resize(256, 10);
  ovHead.appendChild(TXT('Number', '01', null, V.color['color/accent'], { font: F.semibold, size: 12, ls: 12, lh: 140 }));
  ovHead.appendChild(TXT('Title', 'Overview', null, V.color['color/ink'], { font: F.display, size: 34, ls: -1.5, lh: 116 }));
  ovRow.appendChild(ovHead);
  const ovBody = AL('Body', 'VERTICAL', { gap: 24 });
  ovBody.counterAxisSizingMode = 'FIXED';
  ovBody.resize(864, 10);
  const n1 = TXT('Narrative', p.overview.narrative, null, V.color['color/ink-muted'], { font: F.regular, size: 17, lh: 170, width: 864 });
  ovBody.appendChild(n1); fill(n1); styled(n1, 'Body/Base');
  const n2 = TXT('Narrative 2', p.overview.narrativeExtra, null, V.color['color/ink-muted'], { font: F.regular, size: 17, lh: 170, width: 864 });
  ovBody.appendChild(n2); fill(n2); styled(n2, 'Body/Base');
  const metrics = AL('Metrics', 'HORIZONTAL', { gap: 20, wrap: true, crossGap: 20 });
  metrics.counterAxisSizingMode = 'FIXED';
  for (const m of p.overview.highlights) {
    const cell = AL('Metric — ' + m.label, 'VERTICAL', { gap: 8, p: 20, fillVar: V.color['color/surface'], strokeVar: V.color['color/hairline'], radiusVar: V.radius.md });
    cell.counterAxisSizingMode = 'FIXED';
    cell.resize(274, 10);
    cell.appendChild(TXT('Value', m.value, null, V.color['color/accent'], { font: F.display, size: 34, ls: -1.5, lh: 110 }));
    const ml = TXT('Label', m.label, null, V.color['color/ink'], { font: F.medium, size: 14, lh: 140, width: 234 });
    cell.appendChild(ml); fill(ml);
    if (m.note) { const mn = TXT('Note', m.note, null, V.color['color/ink-subtle'], { font: F.regular, size: 11, lh: 140, width: 234 }); cell.appendChild(mn); fill(mn); }
    metrics.appendChild(cell);
  }
  ovBody.appendChild(metrics); fill(metrics);
  ovRow.appendChild(ovBody);
  overview.appendChild(ovRow); fill(ovRow);
  screen.appendChild(overview); fill(overview);

  // ---- insights ----
  const ins = section('07 User insights', { gap: 32, py: 80, fillVar: V.color['color/canvas-contrast'] });
  ins.resize(W, 10);
  const insRow = AL('Row', 'HORIZONTAL', { gap: 64, align: 'MIN' });
  const insHead = AL('Head', 'VERTICAL', { gap: 8 });
  insHead.counterAxisSizingMode = 'FIXED';
  insHead.resize(256, 10);
  insHead.appendChild(TXT('Number', '07', null, V.color['color/accent'], { font: F.semibold, size: 12, ls: 12, lh: 140 }));
  insHead.appendChild(TXT('Title', 'User insights', null, V.color['color/ink'], { font: F.display, size: 34, ls: -1.5, lh: 116 }));
  insRow.appendChild(insHead);
  const insBody = AL('Body', 'VERTICAL', { gap: 24 });
  insBody.counterAxisSizingMode = 'FIXED';
  insBody.resize(864, 10);
  const insNote = TXT('Narrative', 'The findings that changed what got built. Each one carries the evidence it came from, because a design decision defended by an unsourced insight is just an opinion with a diagram.', null, V.color['color/ink-muted'], { font: F.regular, size: 17, lh: 170, width: 864 });
  insBody.appendChild(insNote); fill(insNote);
  const cards = AL('Insight cards', 'HORIZONTAL', { gap: 24, wrap: true, crossGap: 24 });
  cards.counterAxisSizingMode = 'FIXED';
  for (const it of p.insights.slice(0, 4)) {
    const card = AL('Insight', 'VERTICAL', { gap: 12, p: 24, fillVar: V.color['color/surface'], strokeVar: V.color['color/hairline'], radiusVar: V.radius.md });
    card.counterAxisSizingMode = 'FIXED';
    card.resize(420, 10);
    const ct = TXT('Title', it.title, null, V.color['color/ink'], { font: F.semibold, size: 21, ls: -1, lh: 125, width: 372 });
    card.appendChild(ct); fill(ct);
    const cd = TXT('Detail', it.detail, null, V.color['color/ink-muted'], { font: F.regular, size: 14, lh: 155, width: 372 });
    card.appendChild(cd); fill(cd);
    if (it.quote) {
      const q = AL('Quote', 'HORIZONTAL', { gap: 14, px: 0 });
      const bar = BOX('Rule', 2, 40, {});
      fillVar(bar, V.color['color/accent']);
      q.appendChild(bar);
      const qt = TXT('Text', '“' + it.quote + '”', null, V.color['color/ink'], { font: F.displayItalic, size: 21, lh: 125, width: 344 });
      q.appendChild(qt);
      card.appendChild(q); fill(q); fill(bar);
    }
    if (it.evidence) card.appendChild(TXT('Evidence', it.evidence.toUpperCase(), null, V.color['color/ink-subtle'], { font: F.semibold, size: 11, ls: 10, lh: 140, width: 372 }));
    cards.appendChild(card);
  }
  insBody.appendChild(cards); fill(cards);
  insRow.appendChild(insBody);
  ins.appendChild(insRow); fill(insRow);
  screen.appendChild(ins); fill(ins);

  return screen;
}

// --------------------------------------------------------------------- 404 --
function build404() {
  const W = 1440;
  const screen = AL('404 — Not found', 'VERTICAL', { gap: 0, fillVar: V.color['color/canvas'] });
  screen.counterAxisSizingMode = 'FIXED';
  screen.resize(W, 100);
  screen.clipsContent = true;
  const nav = C.Nav.createInstance();
  screen.appendChild(nav); fill(nav);

  const body = section('Not found', { gap: 32, py: 120 });
  body.resize(W, 10);
  body.appendChild(TXT('Eyebrow', 'ERROR 404', null, V.color['color/accent'], { font: F.semibold, size: 12, ls: 12, lh: 140 }));
  body.appendChild(TXT('Title', 'This page does not exist.', null, V.color['color/ink'], { font: F.display, size: 68, ls: -3.5, lh: 100, width: 700 }));
  const b = TXT('Body', 'The link may be out of date, or I may have moved something. Either way, here is the way back — and three case studies that do exist.', null, V.color['color/ink-muted'], { font: F.regular, size: 21, lh: 150, width: 620 });
  body.appendChild(b);
  const row = AL('Actions', 'HORIZONTAL', { gap: 16 });
  const home = C.Button.defaultVariant.createInstance();
  home.setProperties({ Emphasis: 'Primary', Size: 'Large' });
  const hl = home.findOne((n) => n.type === 'TEXT');
  if (hl) hl.characters = 'Back to home';
  const seeWork = C.Button.defaultVariant.createInstance();
  seeWork.setProperties({ Emphasis: 'Secondary', Size: 'Large' });
  const sl2 = seeWork.findOne((n) => n.type === 'TEXT');
  if (sl2) sl2.characters = 'See the work';
  row.appendChild(home); row.appendChild(seeWork);
  body.appendChild(row);
  screen.appendChild(body); fill(body);
  return screen;
}
