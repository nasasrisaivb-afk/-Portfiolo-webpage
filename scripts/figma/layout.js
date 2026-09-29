/* eslint-disable */
/**
 * SVG artboard layout, evaluated inside a headless browser so text can be
 * measured with the real fonts (canvas measureText). That is what keeps
 * wrapping honest — no guessed character widths, no clipped lines.
 *
 * Output is plain SVG with presentation attributes and `id` on every group,
 * because Figma turns <g id> into a named layer and <text> into an editable
 * text layer. No CSS, no classes — Figma's importer handles attributes best.
 *
 * Defines: buildArtboards(data) -> { "Name.svg": "<svg…>" }
 */

function buildArtboards(data) {
  // ------------------------------------------------------------- palette ---
  const L = {
    canvas: '#f7f5f0', canvasContrast: '#efebe3', surface: '#ffffff',
    surfaceSunken: '#efebe3', surfaceInverse: '#14140f',
    hairline: '#e4e0d6', border: '#d9d4c8', borderStrong: '#7e7a6e',
    ink: '#14140f', inkMuted: '#56544c', inkSubtle: '#6f6b60', inkInverse: '#f7f5f0',
    accent: '#a8401c', accentStrong: '#9c3a17', accentSoft: '#f4e5df', onAccent: '#ffffff',
    success: '#186b42', successSoft: '#e4f0ea', danger: '#b3261e', dangerSoft: '#f8e7e6',
  };
  const D = {
    canvas: '#12110e', canvasContrast: '#1a1915', surface: '#1a1915',
    surfaceSunken: '#0d0c0a', surfaceInverse: '#f4f1ea',
    hairline: '#272620', border: '#34322b', borderStrong: '#7a756b',
    ink: '#f4f1ea', inkMuted: '#b0aba0', inkSubtle: '#948f85', inkInverse: '#12110e',
    accent: '#f0875c', accentStrong: '#ff9b6a', accentSoft: '#2a211c', onAccent: '#12110e',
    success: '#6bdca6', successSoft: '#17241e', danger: '#f98a80', dangerSoft: '#2a1a18',
  };

  const FR = 'Fraunces', IN = 'Inter';

  // --------------------------------------------------------- measurement ---
  const cv = document.createElement('canvas');
  const cx = cv.getContext('2d');
  const measure = (str, size, weight, family, ls = 0) => {
    cx.font = `${weight} ${size}px "${family}"`;
    // Canvas ignores letter-spacing, but SVG applies it per gap — so a tracked
    // string is wider than measureText reports. Add it back or tracked text
    // (every uppercase eyebrow) wraps too late and overflows.
    const gaps = Math.max(0, String(str).length - 1);
    return cx.measureText(str).width + gaps * ls;
  };

  // ------------------------------------------------------------- builder ---
  function Board(name, w, h, bg) {
    const parts = [];
    const stack = [];
    const esc = (s) => String(s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

    const api = {
      name, w, h,
      group(id, fn) {
        parts.push(`<g id="${esc(id)}">`);
        stack.push(id);
        fn();
        stack.pop();
        parts.push('</g>');
        return api;
      },
      rect(x, y, width, height, o = {}) {
        const a = [`x="${r(x)}"`, `y="${r(y)}"`, `width="${r(width)}"`, `height="${r(height)}"`];
        if (o.r) {
          // SVG clamps rx to width/2 and ry to height/2 separately, so the CSS
          // trick of "radius: 999" yields an ellipse rather than a pill.
          const rad = Math.min(o.r, width / 2, height / 2);
          a.push(`rx="${r(rad)}"`);
        }
        a.push(`fill="${o.fill || 'none'}"`);
        if (o.stroke) a.push(`stroke="${o.stroke}"`, `stroke-width="${o.sw || 1}"`);
        if (o.id) a.push(`id="${esc(o.id)}"`);
        parts.push(`<rect ${a.join(' ')}/>`);
        return api;
      },
      circle(cxp, cyp, rad, o = {}) {
        parts.push(`<circle cx="${r(cxp)}" cy="${r(cyp)}" r="${rad}" fill="${o.fill || 'none'}"${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 1}"` : ''}${o.id ? ` id="${esc(o.id)}"` : ''}/>`);
        return api;
      },
      line(x1, y1, x2, y2, o = {}) {
        parts.push(`<line x1="${r(x1)}" y1="${r(y1)}" x2="${r(x2)}" y2="${r(y2)}" stroke="${o.stroke}" stroke-width="${o.sw || 1}"${o.dash ? ` stroke-dasharray="${o.dash}"` : ''}/>`);
        return api;
      },
      path(d, o = {}) {
        parts.push(`<path d="${d}" fill="${o.fill || 'none'}"${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 1}" stroke-linecap="round" stroke-linejoin="round"` : ''}/>`);
        return api;
      },
      /** Single line of text. `y` is the baseline. */
      text(x, y, str, o = {}) {
        const size = o.size || 17;
        const weight = o.weight || 400;
        const family = o.family || IN;
        const a = [
          `x="${r(x)}"`, `y="${r(y)}"`,
          `font-family="${family}"`, `font-size="${size}"`, `font-weight="${weight}"`,
          `fill="${o.fill || L.ink}"`,
        ];
        if (o.anchor) a.push(`text-anchor="${o.anchor}"`);
        if (o.ls) a.push(`letter-spacing="${o.ls}"`);
        if (o.italic) a.push('font-style="italic"');
        a.push(`id="${esc(o.id || truncate(str, 28))}"`);
        parts.push(`<text ${a.join(' ')}>${esc(str)}</text>`);
        return api;
      },
      /**
       * Wrapped paragraph. Emits one <text> per line inside a named group so
       * Figma gets predictable, editable layers. Returns the y after the block.
       */
      para(x, y, str, o = {}) {
        const size = o.size || 17;
        const weight = o.weight || 400;
        const family = o.family || IN;
        const lh = o.lh || 1.6;
        const maxW = o.maxW || 600;
        const lines = wrap(str, maxW, size, weight, family, o.ls || 0);
        const id = o.id || `Text — ${truncate(str, 34)}`;
        parts.push(`<g id="${esc(id)}">`);
        lines.forEach((ln, i) => {
          api.text(x, y + i * size * lh, ln, { ...o, id: `line ${i + 1}` });
        });
        parts.push('</g>');
        return y + lines.length * size * lh;
      },
      measureText: measure,
      wrapText: (s, maxW, size, weight, family, ls) => wrap(s, maxW, size, weight, family, ls || 0),
      toSVG() {
        return `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
<g id="${esc(name)}">
<rect x="0" y="0" width="${w}" height="${h}" fill="${bg}" id="Background"/>
${parts.join('\n')}
</g>
</svg>`;
      },
    };

    function wrap(str, maxW, size, weight, family, ls = 0) {
      const words = String(str).split(/\s+/).filter(Boolean);
      const lines = [];
      let line = '';
      for (const word of words) {
        const next = line ? `${line} ${word}` : word;
        if (measure(next, size, weight, family, ls) > maxW && line) {
          lines.push(line);
          line = word;
        } else {
          line = next;
        }
      }
      if (line) lines.push(line);
      return lines;
    }

    return api;
  }

  const r = (n) => Math.round(n * 100) / 100;
  const truncate = (s, n) => (String(s).length > n ? `${String(s).slice(0, n)}…` : String(s));

  // ----------------------------------------------------- shared fragments --
  /** Pill button. Returns its width. */
  function button(b, x, y, label, variant, T, size = 'md') {
    const pad = size === 'lg' ? 28 : size === 'sm' ? 16 : 24;
    const h = size === 'lg' ? 52 : size === 'sm' ? 36 : 44;
    const fs = size === 'lg' ? 17 : size === 'sm' ? 12 : 14;
    const tw = b.measureText(label, fs, 600, IN);
    const w = tw + pad * 2;
    const style = {
      primary: { fill: T.ink, text: T.inkInverse, stroke: null },
      accent: { fill: T.accent, text: T.onAccent, stroke: null },
      secondary: { fill: 'none', text: T.ink, stroke: T.borderStrong },
      ghost: { fill: 'none', text: T.inkMuted, stroke: null },
    }[variant];
    b.group(`Button / ${variant} / ${size} — ${label}`, () => {
      b.rect(x, y, w, h, { r: 999, fill: style.fill, stroke: style.stroke, sw: 1 });
      b.text(x + w / 2, y + h / 2 + fs * 0.35, label, {
        size: fs, weight: 600, fill: style.text, anchor: 'middle', ls: 0.5, id: 'Label',
      });
    });
    return w;
  }

  /** Metadata pill. Returns its width. */
  function tag(b, x, y, label, T, kind = 'plain') {
    const fs = 12;
    const w = b.measureText(label, fs, 500, IN) + 28;
    const h = 28;
    const fill = kind === 'accent' ? T.accentSoft : kind === 'solid' ? T.surface : 'none';
    const stroke = kind === 'accent' ? T.accent : T.border;
    const color = kind === 'accent' ? T.accent : T.inkMuted;
    b.group(`Tag — ${label}`, () => {
      b.rect(x, y, w, h, { r: 999, fill, stroke, sw: 1 });
      b.text(x + w / 2, y + h / 2 + 4, label, { size: fs, weight: 500, fill: color, anchor: 'middle', id: 'Label' });
    });
    return w;
  }

  /** Small-caps eyebrow with the accent rule. Returns the baseline y. */
  function eyebrow(b, x, y, label, T, withRule = true) {
    b.group(`Eyebrow — ${label}`, () => {
      if (withRule) b.line(x, y - 4, x + 32, y - 4, { stroke: T.accent, sw: 1 });
      b.text(withRule ? x + 48 : x, y, label.toUpperCase(), {
        size: 12, weight: 600, fill: T.inkSubtle, ls: 1.4, id: 'Label',
      });
    });
    return y;
  }

  /** Sticky top navigation. Returns its height. */
  function nav(b, w, T, active) {
    const h = 76;
    b.group('Nav / Sticky', () => {
      b.rect(0, 0, w, h, { fill: T.canvas });
      b.line(0, h, w, h, { stroke: T.hairline, sw: 1 });
      b.group('Brand', () => {
        b.rect(64, 20, 36, 36, { r: 6, fill: T.ink });
        b.text(82, 43, 'NS', { size: 14, weight: 700, family: FR, fill: T.inkInverse, anchor: 'middle', id: 'Monogram' });
        b.text(112, 33, data.profile.name, { size: 14, weight: 600, fill: T.ink, id: 'Name' });
        b.text(112, 50, data.profile.role, { size: 12, weight: 400, fill: T.inkSubtle, id: 'Role' });
      });
      b.group('Links', () => {
        let x = w / 2 - 210;
        for (const item of data.navigation) {
          const tw = b.measureText(item.label, 14, item.label === active ? 600 : 500, IN);
          b.text(x, 43, item.label, {
            size: 14, weight: item.label === active ? 600 : 500,
            fill: item.label === active ? T.ink : T.inkMuted, id: item.label,
          });
          if (item.label === active) b.circle(x + tw / 2, 54, 2.5, { fill: T.accent, id: 'Active dot' });
          x += tw + 36;
        }
      });
      button(b, w - 64 - 104, 18, 'Let’s talk', 'primary', T, 'sm');
    });
    return h;
  }

  /** Section heading pair: eyebrow + serif title + optional lead. Returns next y. */
  function sectionHead(b, x, y, eb, title, lead, T, opts = {}) {
    const titleSize = opts.titleSize || 48;
    const colW = opts.colW || 620;
    eyebrow(b, x, y, eb, T);
    let cy = y + 44;
    const lines = b.wrapText(title, colW, titleSize, 600, FR);
    b.group(`Heading — ${truncate(title, 30)}`, () => {
      lines.forEach((ln, i) => {
        b.text(x, cy + i * titleSize * 1.04, ln, { size: titleSize, weight: 600, family: FR, fill: T.ink, ls: -1.4, id: `line ${i + 1}` });
      });
    });
    const titleBottom = cy + (lines.length - 1) * titleSize * 1.04;
    if (lead) {
      b.para(opts.leadX || x + 760, y + 44, lead, {
        size: 21, lh: 1.5, maxW: opts.leadW || 520, fill: T.inkMuted, id: 'Lead',
      });
    }
    return titleBottom + 48;
  }

  const boards = {};

  // =========================================================================
  // 1 — FOUNDATIONS
  // =========================================================================
  {
    const W = 1680, H = 2560;
    const b = Board('01 — Foundations', W, H, L.canvas);
    const M = 80;

    b.group('Cover', () => {
      eyebrow(b, M, 96, 'Design system', L);
      b.text(M, 168, data.profile.name, { size: 56, weight: 600, family: FR, fill: L.ink, ls: -1.6, id: 'Name' });
      b.para(M, 210, 'Portfolio design system — colour, type, space and radius. Every value here matches src/styles/tokens.css in the repository, so the design file and the built site cannot drift.', { size: 17, lh: 1.6, maxW: 720, fill: L.inkMuted, id: 'Intro' });
      b.line(M, 290, W - M, 290, { stroke: L.hairline });
    });

    // ---- colour ----
    const SEM = [
      ['canvas', L.canvas, D.canvas, '60% — page canvas'],
      ['canvas-contrast', L.canvasContrast, D.canvasContrast, 'Alternating section band'],
      ['surface', L.surface, D.surface, '30% — cards, inputs'],
      ['surface-inverse', L.surfaceInverse, D.surfaceInverse, 'Inverted panels'],
      ['hairline', L.hairline, D.hairline, 'Dividers'],
      ['border', L.border, D.border, 'Decorative borders'],
      ['border-strong', L.borderStrong, D.borderStrong, 'Control borders — 3:1'],
      ['ink', L.ink, D.ink, 'Body text — 16.96:1'],
      ['ink-muted', L.inkMuted, D.inkMuted, 'Secondary text — 6.96:1'],
      ['ink-subtle', L.inkSubtle, D.inkSubtle, 'Tertiary text — 4.88:1'],
      ['accent', L.accent, D.accent, '10% — the rationed accent'],
      ['accent-strong', L.accentStrong, D.accentStrong, 'Accent hover'],
      ['success', L.success, D.success, 'Positive state'],
      ['danger', L.danger, D.danger, 'Error state'],
    ];

    b.group('Colour', () => {
      b.text(M, 356, 'Colour', { size: 34, weight: 600, family: FR, fill: L.ink, ls: -1, id: 'Title' });
      b.para(M, 384, 'Two modes over one semantic layer. The ratio beside each text token is its measured contrast against its own canvas.', { size: 14, lh: 1.55, maxW: 640, fill: L.inkMuted, id: 'Note' });
      b.text(M, 452, 'TOKEN', { size: 12, weight: 600, fill: L.inkSubtle, ls: 1.4, id: 'Col token' });
      b.text(M + 400, 452, 'LIGHT', { size: 12, weight: 600, fill: L.inkSubtle, ls: 1.4, id: 'Col light' });
      b.text(M + 620, 452, 'DARK', { size: 12, weight: 600, fill: L.inkSubtle, ls: 1.4, id: 'Col dark' });
      b.text(M + 840, 452, 'ROLE', { size: 12, weight: 600, fill: L.inkSubtle, ls: 1.4, id: 'Col role' });
      b.line(M, 466, W - M, 466, { stroke: L.hairline });

      SEM.forEach(([name, light, dark, role], i) => {
        const y = 486 + i * 52;
        b.group(`Token — color/${name}`, () => {
          b.text(M, y + 22, `color/${name}`, { size: 14, weight: 500, fill: L.ink, id: 'Name' });
          b.rect(M + 400, y, 40, 34, { r: 6, fill: light, stroke: L.border, sw: 1 });
          b.text(M + 452, y + 22, light.toUpperCase(), { size: 12, weight: 400, fill: L.inkSubtle, id: 'Light hex' });
          b.rect(M + 620, y, 40, 34, { r: 6, fill: dark, stroke: L.border, sw: 1 });
          b.text(M + 672, y + 22, dark.toUpperCase(), { size: 12, weight: 400, fill: L.inkSubtle, id: 'Dark hex' });
          b.text(M + 840, y + 22, role, { size: 14, weight: 400, fill: L.inkMuted, id: 'Role' });
          b.line(M, y + 42, W - M, y + 42, { stroke: L.hairline });
        });
      });
    });

    // ---- type ----
    const typeTop = 486 + SEM.length * 52 + 56;
    const RAMP = [
      ['Display/XL', FR, 600, 72, 'Designing digital products'],
      ['Display/L', FR, 600, 56, 'Products where the hard part was the thinking'],
      ['Heading/H2', FR, 600, 48, 'Tell me what you are trying to build'],
      ['Heading/H3', IN, 600, 34, 'Information architecture'],
      ['Heading/H4', IN, 600, 26, 'What comes out of this stage'],
      ['Body/Lead', IN, 400, 21, 'I design digital products that turn complex problems into simple, useful experiences.'],
      ['Body/Base', IN, 400, 17, 'Loading, empty, error and not-found states are designed alongside the populated view.'],
      ['Body/Small', IN, 400, 14, 'Evidence: 7 of 9 participants misread the reference range on first encounter.'],
      ['Label/Micro', IN, 600, 12, 'SELECTED WORK'],
    ];
    b.group('Typography', () => {
      b.text(M, typeTop, 'Typography', { size: 34, weight: 600, family: FR, fill: L.ink, ls: -1, id: 'Title' });
      b.para(M, typeTop + 28, 'Fraunces for display, Inter for interface. On the site these are fluid clamps; the sizes here are the desktop end of each range.', { size: 14, lh: 1.55, maxW: 640, fill: L.inkMuted, id: 'Note' });
      let y = typeTop + 100;
      for (const [name, fam, wt, size, sample] of RAMP) {
        b.group(`Type — ${name}`, () => {
          b.text(M, y, name, { size: 12, weight: 600, fill: L.accent, ls: 1.2, id: 'Style name' });
          b.text(M + 200, y, `${fam} ${wt} · ${size}px`, { size: 12, weight: 400, fill: L.inkSubtle, id: 'Spec' });
          b.text(M, y + size * 0.92 + 14, sample, {
            size, weight: wt, family: fam, fill: L.ink,
            ls: fam === FR ? -size * 0.03 : 0, id: 'Specimen',
          });
        });
        y += size * 1.1 + 58;
      }
      b.group('Spacing & radius', () => {
        b.text(M, y + 20, 'Spacing — 8px grid', { size: 21, weight: 600, fill: L.ink, id: 'Spacing title' });
        const steps = [4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128];
        let sx = M;
        steps.forEach((s, i) => {
          b.rect(sx, y + 44, s, 40, { fill: L.accentSoft, stroke: L.accent, sw: 1, r: 2 });
          b.text(sx, y + 102, String(s), { size: 11, weight: 500, fill: L.inkSubtle, id: `spacing/${i + 1}` });
          sx += s + 18;
        });
        b.text(M, y + 160, 'Radius', { size: 21, weight: 600, fill: L.ink, id: 'Radius title' });
        const radii = [['xs', 3], ['sm', 6], ['md', 10], ['lg', 16], ['xl', 24], ['full', 999]];
        let rx = M;
        for (const [nm, rad] of radii) {
          b.rect(rx, y + 184, 84, 64, { r: rad, fill: L.surface, stroke: L.border, sw: 1 });
          b.text(rx + 42, y + 268, nm, { size: 12, weight: 500, fill: L.inkSubtle, anchor: 'middle', id: `radius/${nm}` });
          rx += 104;
        }
      });
    });

    boards['01-foundations.svg'] = b.toSVG();
  }

  // =========================================================================
  // 2 — COMPONENTS
  // =========================================================================
  {
    const W = 1680, H = 1720;
    const b = Board('02 — Components', W, H, L.canvas);
    const M = 80;

    b.group('Header', () => {
      eyebrow(b, M, 96, 'Component library', L);
      b.text(M, 160, 'Components', { size: 48, weight: 600, family: FR, fill: L.ink, ls: -1.4, id: 'Title' });
      b.para(M, 200, 'Every state drawn, including the ones that only appear when something goes wrong. Convert each group to a Figma component and the variants are already laid out in rows.', { size: 17, lh: 1.6, maxW: 780, fill: L.inkMuted, id: 'Intro' });
      b.line(M, 280, W - M, 280, { stroke: L.hairline });
    });

    b.group('Buttons', () => {
      b.text(M, 330, 'Button', { size: 26, weight: 600, fill: L.ink, id: 'Title' });
      b.text(M, 356, '4 emphases × 3 sizes', { size: 14, weight: 400, fill: L.inkSubtle, id: 'Spec' });
      const variants = ['primary', 'accent', 'secondary', 'ghost'];
      const sizes = ['sm', 'md', 'lg'];
      let y = 390;
      for (const v of variants) {
        b.text(M, y + 26, v, { size: 12, weight: 600, fill: L.inkSubtle, ls: 1.2, id: `Row ${v}` });
        let x = M + 120;
        for (const s of sizes) x += button(b, x, y, 'View my work', v, L, s) + 24;
        y += 76;
      }
    });

    b.group('Tags, badges & chips', () => {
      const y0 = 720;
      b.text(M, y0, 'Tag · Badge · Chip', { size: 26, weight: 600, fill: L.ink, id: 'Title' });
      let x = M;
      const yy = y0 + 30;
      x += tag(b, x, yy, 'End-to-end product design', L, 'accent') + 12;
      x += tag(b, x, yy, 'Marketplace', L, 'plain') + 12;
      x += tag(b, x, yy, 'Design system', L, 'solid') + 12;

      // badges
      let bx = M;
      const by = yy + 52;
      for (const [label, fill, color] of [['Shipped', L.successSoft, L.success], ['In progress', '#f6ecd9', '#8a5300'], ['Critical', L.dangerSoft, L.danger]]) {
        const w = b.measureText(label.toUpperCase(), 12, 600, IN) + 32;
        b.group(`Badge — ${label}`, () => {
          b.rect(bx, by, w, 26, { r: 6, fill });
          b.circle(bx + 14, by + 13, 3.5, { fill: color });
          b.text(bx + 24, by + 17, label.toUpperCase(), { size: 12, weight: 600, fill: color, ls: 1, id: 'Label' });
        });
        bx += w + 12;
      }

      // chips
      let chx = M;
      const chy = by + 52;
      [['All', true, 5], ['Healthcare', false, 2], ['Agriculture', false, 1], ['Logistics', false, 1]].forEach(([label, pressed, count]) => {
        const labelW = b.measureText(label.toUpperCase(), 12, 600, IN, 1.2);
        const countW = b.measureText(String(count), 12, 600, IN);
        const w = 18 + labelW + 14 + countW + 18;
        b.group(`Chip — ${label}${pressed ? ' (pressed)' : ''}`, () => {
          b.rect(chx, chy, w, 38, { r: 999, fill: pressed ? L.ink : 'none', stroke: pressed ? L.ink : L.border, sw: 1 });
          b.text(chx + 18, chy + 24, label.toUpperCase(), { size: 12, weight: 600, fill: pressed ? L.inkInverse : L.inkMuted, ls: 1.2, id: 'Label' });
          b.text(chx + w - 18, chy + 24, String(count), { size: 12, weight: 600, fill: pressed ? L.inkInverse : L.inkSubtle, anchor: 'end', id: 'Count' });
        });
        chx += w + 12;
      });
    });

    b.group('Form field', () => {
      const y0 = 940;
      b.text(M, y0, 'Form field', { size: 26, weight: 600, fill: L.ink, id: 'Title' });
      b.text(M, y0 + 26, 'Default · Focus · Error · Disabled', { size: 14, weight: 400, fill: L.inkSubtle, id: 'Spec' });
      const states = [
        ['Default', L.surface, L.borderStrong, 'Jane Reviewer', L.ink, null],
        ['Focus', L.surface, L.accent, 'Jane Reviewer', L.ink, null],
        ['Error', L.dangerSoft, L.danger, 'not-an-email', L.ink, 'That email address does not look complete.'],
        ['Disabled', L.surfaceSunken, L.border, 'Unavailable', L.inkSubtle, null],
      ];
      states.forEach(([label, fill, stroke, value, valueColor, error], i) => {
        const x = M + i * 380;
        const y = y0 + 60;
        b.group(`Field — ${label}`, () => {
          b.text(x, y, 'Email', { size: 14, weight: 600, fill: L.ink, id: 'Label' });
          b.text(x + 48, y, '*', { size: 14, weight: 600, fill: L.accent, id: 'Required' });
          b.rect(x, y + 12, 340, 48, { r: 10, fill, stroke, sw: label === 'Focus' ? 2 : 1 });
          if (label === 'Focus') b.rect(x - 3, y + 9, 346, 54, { r: 13, fill: 'none', stroke: L.accentSoft, sw: 3 });
          b.text(x + 16, y + 42, value, { size: 17, weight: 400, fill: valueColor, id: 'Value' });
          if (error) b.para(x, y + 82, error, { size: 12, lh: 1.4, maxW: 320, fill: L.danger, id: 'Error message' });
        });
      });
    });

    b.group('Card', () => {
      const y0 = 1190;
      b.text(M, y0, 'Project card', { size: 26, weight: 600, fill: L.ink, id: 'Title' });
      const p = data.allProjects[0];
      const x = M, y = y0 + 34;
      b.group('Card — CropVibe', () => {
        b.rect(x, y, 420, 420, { r: 16, fill: L.surface, stroke: L.hairline, sw: 1 });
        b.rect(x + 20, y + 20, 380, 200, { r: 10, fill: '#4c7a34' });
        b.rect(x + 50, y + 54, 200, 130, { r: 8, fill: '#faf8f4' });
        b.rect(x + 66, y + 74, 120, 10, { r: 3, fill: '#1b1b17' });
        b.rect(x + 66, y + 94, 160, 8, { r: 3, fill: '#c9c4ba' });
        b.rect(x + 66, y + 116, 90, 24, { r: 12, fill: '#4c7a34' });
        b.rect(x + 264, y + 84, 110, 110, { r: 8, fill: '#faf8f4' });
        b.text(x + 20, y + 252, 'AGRICULTURE · 2026', { size: 12, weight: 600, fill: L.inkSubtle, ls: 1.2, id: 'Meta' });
        b.text(x + 20, y + 288, p.title, { size: 26, weight: 600, family: FR, fill: L.ink, ls: -0.6, id: 'Title' });
        b.para(x + 20, y + 316, p.tagline, { size: 14, lh: 1.5, maxW: 370, fill: L.inkMuted, id: 'Tagline' });
        tag(b, x + 20, y + 366, 'End-to-end product design', L, 'accent');
      });
      b.group('Nav preview', () => {
        b.rect(M + 480, y, 1040, 90, { r: 16, fill: L.surface, stroke: L.hairline, sw: 1 });
        b.text(M + 504, y + 30, 'Nav / Sticky', { size: 12, weight: 600, fill: L.inkSubtle, ls: 1.2, id: 'Label' });
        b.group('Nav sample', () => {
          b.rect(M + 504, y + 42, 992, 1, { fill: L.hairline });
          let nx = M + 504;
          for (const item of data.navigation) {
            const active = item.label === 'Work';
            b.text(nx, y + 70, item.label, { size: 14, weight: active ? 600 : 500, fill: active ? L.ink : L.inkMuted, id: item.label });
            const tw = b.measureText(item.label, 14, 500, IN);
            if (active) b.circle(nx + tw / 2, y + 80, 2.5, { fill: L.accent });
            nx += tw + 36;
          }
        });
      });
      b.group('Empty state', () => {
        const ex = M + 480, ey = y + 130;
        b.rect(ex, ey, 500, 200, { r: 16, fill: 'none', stroke: L.border, sw: 1 });
        b.circle(ex + 250, ey + 60, 16, { fill: 'none', stroke: L.inkSubtle, sw: 1.6 });
        b.path(`M${ex + 262} ${ey + 72} l10 10`, { stroke: L.inkSubtle, sw: 1.6 });
        b.text(ex + 250, ey + 112, 'No projects in that industry yet', { size: 21, weight: 600, family: FR, fill: L.ink, anchor: 'middle', id: 'Title' });
        b.text(ex + 250, ey + 140, 'Clear the filter to see everything.', { size: 14, weight: 400, fill: L.inkMuted, anchor: 'middle', id: 'Body' });
        button(b, ex + 250 - 78, ey + 156, 'Show all', 'secondary', L, 'sm');
      });
    });

    boards['02-components.svg'] = b.toSVG();
  }

  return { boards, Board, button, tag, eyebrow, nav, sectionHead, L, D, FR, IN };
}
