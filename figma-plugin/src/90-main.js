// ============================================================================
// MAIN — orchestrates the build, then reports what it made
// ============================================================================

async function getPage(name, index) {
  let p = figma.root.children.find((c) => c.name === name);
  if (!p) {
    if (index === 0) { p = figma.root.children[0]; p.name = name; }
    else {
      try { p = figma.createPage(); p.name = name; }
      catch (e) {
        // Starter plans cap a file at 3 pages; fall back to the last one.
        warn('could not create page "' + name + '" (' + e.message + ') — reusing an existing page');
        p = figma.root.children[figma.root.children.length - 1];
      }
    }
  }
  await p.loadAsync();
  return p;
}

/** Remove anything a previous run of this plugin created, so re-running is safe. */
function clearGenerated(page) {
  for (const child of page.children.slice()) {
    if (child.getPluginData && child.getPluginData('generated') === 'portfolio-ds') child.remove();
  }
}
function markGenerated(node) {
  if (node.setPluginData) node.setPluginData('generated', 'portfolio-ds');
  return node;
}

async function main() {
  const t0 = Date.now();
  const summary = {};

  await loadAllFonts();

  // ---- 1. tokens + text styles ------------------------------------------
  summary.variables = await buildTokens();
  summary.textStyles = await buildTextStyles();

  // ---- 2. foundations page ----------------------------------------------
  const pFoundations = await getPage('01 — Foundations', 0);
  await figma.setCurrentPageAsync(pFoundations);
  clearGenerated(pFoundations);
  const sheet = buildFoundationsSheet();
  pFoundations.appendChild(sheet);
  place(markGenerated(sheet), 0, 0);

  // ---- 3. components page ------------------------------------------------
  const pComponents = await getPage('02 — Components', 1);
  await figma.setCurrentPageAsync(pComponents);
  clearGenerated(pComponents);

  buildButton(); buildTag(); buildBadge(); buildChip(); buildField();
  buildProjectCard(); buildNav();

  // Components are created on currentPage by combineAsVariants; lay them out.
  const order = ['Button', 'Tag', 'Badge', 'Chip', 'Field', 'ProjectCard', 'Nav'];
  let cx = 0, cy = 0, rowH = 0;
  for (const key of order) {
    const node = C[key];
    if (!node) continue;
    if (node.parent !== pComponents) pComponents.appendChild(node);
    markGenerated(node);
    if (cx > 0 && cx + node.width > 2400) { cx = 0; cy += rowH + 80; rowH = 0; }
    place(node, cx, cy);
    cx += node.width + 80;
    rowH = Math.max(rowH, node.height);
  }
  summary.components = order.filter((k) => C[k]).length;
  summary.variants = (C.Button ? C.Button.children.length : 0)
    + (C.Tag ? C.Tag.children.length : 0) + (C.Badge ? C.Badge.children.length : 0)
    + (C.Chip ? C.Chip.children.length : 0) + (C.Field ? C.Field.children.length : 0);

  // ---- 4. screens page ---------------------------------------------------
  const pScreens = await getPage('03 — Screens', 2);
  await figma.setCurrentPageAsync(pScreens);
  clearGenerated(pScreens);

  const screens = [];
  const homeLight = buildHomeDesktop('Light');
  pScreens.appendChild(homeLight);
  screens.push(homeLight);

  const homeDark = buildHomeDesktop('Dark');
  pScreens.appendChild(homeDark);
  // Same components, other mode — the whole point of a two-mode collection.
  try { homeDark.setExplicitVariableModeForCollection(V.collections.color, V.modes.Dark); }
  catch (e) { warn('could not set the Dark mode on the dark screen: ' + e.message); }
  screens.push(homeDark);

  const mobile = buildHomeMobile();
  pScreens.appendChild(mobile);
  screens.push(mobile);

  const work = buildWorkIndex();
  pScreens.appendChild(work);
  screens.push(work);

  const cs = buildCaseStudy();
  pScreens.appendChild(cs);
  screens.push(cs);

  const nf = build404();
  pScreens.appendChild(nf);
  screens.push(nf);

  let x = 0;
  for (const s of screens) {
    markGenerated(s);
    place(s, x, 0);
    x += s.width + 160;
  }
  summary.screens = screens.length;

  // ---- 5. apply text styles ---------------------------------------------
  summary.styledNodes = await applyQueuedStyles();

  // ---- 6. land the user somewhere useful ---------------------------------
  await figma.setCurrentPageAsync(pScreens);
  figma.viewport.scrollAndZoomIntoView([screens[0]]);

  summary.ms = Date.now() - t0;
  summary.warnings = WARNINGS;
  return summary;
}

main()
  .then((s) => {
    const lines = [
      'Portfolio design system built.',
      '',
      'Variables:  ' + s.variables.primitives + ' primitives, ' + s.variables.semantic
        + ' semantic (Light + Dark), ' + s.variables.spacing + ' spacing, ' + s.variables.radius + ' radius',
      'Text styles: ' + s.textStyles + ' (applied to ' + s.styledNodes + ' nodes)',
      'Components:  ' + s.components + ' (' + s.variants + ' variants)',
      'Screens:     ' + s.screens,
      'Built in ' + (s.ms / 1000).toFixed(1) + 's',
    ];
    if (s.warnings.length) {
      lines.push('', 'Warnings (' + s.warnings.length + '):');
      for (const w of s.warnings.slice(0, 12)) lines.push('  · ' + w);
    }
    console.log(lines.join('\n'));
    figma.closePlugin(
      'Built ' + s.components + ' components, ' + s.screens + ' screens and '
      + (s.variables.semantic + s.variables.primitives) + ' variables'
      + (s.warnings.length ? ' — ' + s.warnings.length + ' warning(s), see console' : ''),
    );
  })
  .catch((err) => {
    console.error(err);
    figma.closePlugin('Build failed: ' + (err && err.message ? err.message : String(err)));
  });
