/* eslint-disable */
/**
 * Screen artboards. Receives the toolkit returned by buildArtboards() so the
 * button / tag / nav / heading fragments are the same ones the component
 * sheet documents — the screens are literally assembled from them.
 *
 * Defines: buildScreens(data, kit) -> { "Name.svg": "<svg…>" }
 */
function buildScreens(data, kit) {
  const { Board, button, tag, eyebrow, nav, sectionHead, L, D, FR, IN } = kit;
  const out = {};

  // =========================================================================
  // HOME — DESKTOP
  // =========================================================================
  {
    const W = 1440, H = 5160, M = 96, T = L;
    const b = Board('Home — Desktop 1440', W, H, T.canvas);
    // The decorative wash goes down FIRST. Painted after the nav it sits on
    // top of the CTA, which a bounds check would never catch.
    b.group('Background wash', () => { b.circle(W - 120, 60, 300, { fill: '#f6eee9' }); });
    const navH = nav(b, W, T, 'Home');

    // ---- hero ----
    let heroBottom = 0;
    b.group('Hero', () => {
      eyebrow(b, M, navH + 90, data.profile.availability, T);
      let y = navH + 160;
      // Wrapped to the text column, not hardcoded: the artboard motif starts at
      // x=880, so a hardcoded line can silently slide underneath it.
      const HERO_SIZE = 62, HERO_LS = -2.2, HERO_COL = 700;
      const ACCENT = 'complex problems';
      const heroLines = b.wrapText(
        'Designing digital products that turn complex problems into simple, useful experiences.',
        HERO_COL, HERO_SIZE, 600, FR,
      );
      heroLines.forEach((ln, i) => {
        const at = ln.indexOf(ACCENT);
        const ly = y + i * (HERO_SIZE * 1.06);
        b.group(`Hero title line ${i + 1}`, () => {
          if (at === -1) {
            b.text(M, ly, ln, { size: HERO_SIZE, weight: 600, family: FR, fill: T.ink, ls: HERO_LS, id: 'Line' });
            return;
          }
          // Split the line into runs so the accent phrase keeps its own colour
          // and italic without breaking the measured layout.
          const pre = ln.slice(0, at);
          const post = ln.slice(at + ACCENT.length);
          let cx2 = M;
          if (pre) {
            b.text(cx2, ly, pre.trimEnd(), { size: HERO_SIZE, weight: 600, family: FR, fill: T.ink, ls: HERO_LS, id: 'Before' });
            cx2 += b.measureText(pre.trimEnd(), HERO_SIZE, 600, FR, HERO_LS)
                 + b.measureText(' ', HERO_SIZE, 600, FR) * (pre.length - pre.trimEnd().length);
          }
          b.text(cx2, ly, ACCENT, { size: HERO_SIZE, weight: 600, family: FR, fill: T.accent, ls: HERO_LS, italic: true, id: 'Accent' });
          cx2 += b.measureText(ACCENT, HERO_SIZE, 600, FR, HERO_LS);
          if (post) {
            // SVG collapses a run's leading whitespace, so advance by the space
            // width manually rather than losing the word gap.
            const lead = post.match(/^\s+/);
            if (lead) cx2 += b.measureText(' ', HERO_SIZE, 600, FR) * lead[0].length;
            b.text(cx2, ly, post.trimStart(), { size: HERO_SIZE, weight: 600, family: FR, fill: T.ink, ls: HERO_LS, id: 'After' });
          }
        });
      });
      y += heroLines.length * (HERO_SIZE * 1.06) + 24;
      y = b.para(M, y, `I’m ${data.profile.name} — a UX/UI and product designer working end to end: research and strategy, through information architecture and interface design, into design systems and shipped product.`, { size: 21, lh: 1.5, maxW: 620, fill: T.inkMuted, id: 'Intro' });
      y += 32;
      const w1 = button(b, M, y, 'View my work', 'primary', T, 'lg');
      button(b, M + w1 + 16, y, 'Let’s connect', 'secondary', T, 'lg');
      y += 100;
      b.line(M, y, M + 560, y, { stroke: T.hairline });
      const facts = [['Case studies', String(data.allProjects.length)], ['Industries', String(data.industriesCovered.length)], ['Practice', 'End to end']];
      facts.forEach(([label, value], i) => {
        const fx = M + i * 190;
        b.group(`Fact — ${label}`, () => {
          b.text(fx, y + 30, label.toUpperCase(), { size: 12, weight: 600, fill: T.inkSubtle, ls: 1.4, id: 'Label' });
          b.text(fx, y + 66, value, { size: 26, weight: 600, family: FR, fill: T.ink, id: 'Value' });
        });
      });

      // artboard motif
      b.group('Hero artboard', () => {
        const ax = 880, ay = navH + 150, aw = 440, ah = 540;
        b.rect(ax, ay, aw, ah, { r: 24, fill: T.surface, stroke: T.hairline, sw: 1 });
        b.text(ax + 28, ay + 40, 'WIREFRAME → INTERFACE', { size: 11, weight: 600, fill: T.inkSubtle, ls: 1.4, id: 'Caption' });
        b.rect(ax + 28, ay + 64, 240, 16, { r: 3, fill: T.ink });
        b.rect(ax + 28, ay + 90, 160, 12, { r: 3, fill: T.inkSubtle });
        b.rect(ax + 312, ay + 62, 100, 24, { r: 12, fill: '#f4e5df' });
        b.rect(ax + 28, ay + 126, 384, 180, { r: 10, fill: T.canvasContrast });
        b.circle(ax + 70, ay + 168, 12, { fill: T.accent });
        b.rect(ax + 94, ay + 160, 110, 9, { r: 3, fill: T.ink });
        b.rect(ax + 94, ay + 178, 76, 8, { r: 3, fill: T.inkSubtle });
        b.path(`M${ax + 52} ${ay + 282} L${ax + 112} ${ay + 254} L${ax + 172} ${ay + 266} L${ax + 232} ${ay + 218} L${ax + 292} ${ay + 238} L${ax + 352} ${ay + 196} L${ax + 392} ${ay + 208}`, { stroke: T.accent, sw: 3 });
        b.rect(ax + 28, ay + 326, 184, 104, { r: 10, fill: T.canvasContrast });
        b.rect(ax + 228, ay + 326, 184, 104, { r: 10, fill: T.canvasContrast });
        b.rect(ax + 28, ay + 456, 176, 46, { r: 23, fill: T.accent });
        b.rect(ax + 228, ay + 456, 140, 46, { r: 23, fill: 'none', stroke: T.border, sw: 1 });
        heroBottom = Math.max(heroBottom, ay + ah);
      });
      heroBottom = Math.max(heroBottom, y + 90);
    });

    // ---- industry strip ----
    const stripY = heroBottom + 96;
    b.group('Industry strip', () => {
      b.rect(0, stripY, W, 88, { fill: T.canvasContrast });
      b.line(0, stripY, W, stripY, { stroke: T.hairline });
      b.line(0, stripY + 88, W, stripY + 88, { stroke: T.hairline });
      b.text(M, stripY + 50, 'DOMAIN EXPERIENCE', { size: 12, weight: 600, fill: T.inkSubtle, ls: 1.4, id: 'Label' });
      let x = M + 230;
      const all = [...data.industriesCovered, 'SaaS', 'Fintech', 'E-commerce'];
      for (const ind of all) {
        b.text(x, stripY + 52, ind, { size: 21, weight: 400, family: FR, fill: T.ink, id: ind });
        const tw = b.measureText(ind, 21, 400, FR);
        x += tw + 22;
        if (ind !== all[all.length - 1]) { b.circle(x - 11, stripY + 46, 2, { fill: T.accent }); }
      }
    });

    // ---- selected work ----
    let y = stripY + 88 + 120;
    let workBottom = y;
    b.group('Selected work', () => {
      y = sectionHead(b, M, y, 'Selected work', 'Products where the hard part was the thinking',
        'Five projects across agriculture, logistics, healthcare and brand. Each one is a full case study — research, the arguments, the decisions, the things I got wrong.', T,
        { colW: 560, leadX: M + 700, leadW: 540 });
      b.text(M, y - 6, 'SEE ALL CASE STUDIES', { size: 12, weight: 600, fill: T.ink, ls: 1.4, id: 'Link' });
      b.line(M + 190, y - 10, M + 226, y - 10, { stroke: T.ink });
      y += 60;

      data.featuredProjects.slice(0, 2).forEach((p, idx) => {
        let rowBottom = y + 374;
        const flip = idx % 2 === 1;
        const mediaX = flip ? M + 700 : M;
        const bodyX = flip ? M : M + 700;
        b.group(`Project ${idx + 1} — ${p.title}`, () => {
          b.rect(mediaX, y, 548, 374, { r: 16, fill: p.cover.tint });
          b.rect(mediaX + 44, y + 44, 300, 250, { r: 10, fill: '#faf8f4' });
          b.rect(mediaX + 72, y + 76, 140, 12, { r: 3, fill: '#1b1b17' });
          b.rect(mediaX + 72, y + 100, 200, 9, { r: 3, fill: '#c9c4ba' });
          b.rect(mediaX + 72, y + 128, 244, 56, { r: 8, fill: '#efece4' });
          b.rect(mediaX + 72, y + 200, 110, 30, { r: 15, fill: p.cover.tint });
          b.rect(mediaX + 300, y + 130, 200, 180, { r: 10, fill: '#faf8f4' });

          b.text(bodyX, y + 22, `0${idx + 1} — ${p.industry.toUpperCase()}`, { size: 12, weight: 600, fill: T.accent, ls: 1.4, id: 'Index' });
          b.text(bodyX, y + 74, p.title, { size: 48, weight: 600, family: FR, fill: T.ink, ls: -1.4, id: 'Title' });
          let py = b.para(bodyX, y + 116, p.tagline, { size: 21, lh: 1.25, maxW: 540, fill: T.ink, id: 'Tagline' });
          py = b.para(bodyX, py + 16, p.description, { size: 17, lh: 1.6, maxW: 520, fill: T.inkMuted, id: 'Description' });
          py += 22;
          b.line(bodyX, py, bodyX + 540, py, { stroke: T.hairline });
          const meta = [['Role', p.role.split('—')[0].trim()], ['Type', p.projectType], ['Timeline', p.timeline]];
          meta.forEach(([k, v], i) => {
            const mx = bodyX + i * 182;
            b.text(mx, py + 28, k.toUpperCase(), { size: 11, weight: 600, fill: T.inkSubtle, ls: 1.3, id: `${k} label` });
            b.para(mx, py + 50, v, { size: 14, lh: 1.35, maxW: 168, fill: T.ink, id: `${k} value` });
          });
          b.line(bodyX, py + 96, bodyX + 540, py + 96, { stroke: T.hairline });
          b.group('Key contribution', () => {
            const cy = py + 120;
            const lines = b.wrapText(p.contribution, 480, 14, 400, IN);
            const boxH = 40 + lines.length * 14 * 1.5;
            b.rect(bodyX, cy, 540, boxH, { r: 10, fill: T.surface });
            b.rect(bodyX, cy, 3, boxH, { fill: T.accent });
            b.text(bodyX + 22, cy + 24, 'KEY CONTRIBUTION', { size: 11, weight: 600, fill: T.accent, ls: 1.3, id: 'Label' });
            lines.forEach((ln, i) => b.text(bodyX + 22, cy + 46 + i * 21, ln, { size: 14, weight: 400, fill: T.ink, id: `line ${i + 1}` }));
            rowBottom = Math.max(rowBottom, cy + boxH);
          });
        });
        y = rowBottom + 96;   // measured, not assumed
      });
      workBottom = y;
    });

    // ---- about ----
    const aboutY = workBottom + 40;
    b.group('About', () => {
      b.rect(0, aboutY, W, 600, { fill: T.canvasContrast });
      let ay = sectionHead(b, M, aboutY + 96, 'About', 'I design the parts of a product people have to think hardest about',
        'Marketplaces, operations tooling, diagnostics and care coordination — where the hard part is how much complexity you can take away.', T,
        { titleSize: 44, colW: 560, leadX: M + 700, leadW: 520 });
      b.para(M, ay + 10, 'I work end to end. I am in the room when the problem is still being argued about, and still there when the build hits the states nobody drew. My design philosophy is short: decide what the person is trying to finish, and remove everything in the way of them finishing it.', { size: 17, lh: 1.65, maxW: 600, fill: T.inkMuted, id: 'Body' });
      b.group('At a glance', () => {
        const gx = M + 700, gy = ay - 20;
        b.rect(gx, gy, 548, 300, { r: 16, fill: T.surface, stroke: T.hairline, sw: 1 });
        const facts = [['Based in', data.profile.location], ['Working across', data.industriesCovered.join(' · ')], ['Tools', 'Figma · Adobe CC · HTML & CSS · Design tokens'], ['Currently', data.profile.availability]];
        let fy = gy + 44;
        for (const [k, v] of facts) {
          b.text(gx + 28, fy, k.toUpperCase(), { size: 11, weight: 600, fill: T.inkSubtle, ls: 1.3, id: `${k} label` });
          fy = b.para(gx + 28, fy + 22, v, { size: 14, lh: 1.5, maxW: 480, fill: T.ink, id: `${k} value` }) + 18;
        }
      });
    });

    // ---- process ----
    const procY = aboutY + 700;
    b.group('Process', () => {
      let py = sectionHead(b, M, procY, 'Design process', 'Discover → Define → Explore → Design → Validate → Deliver',
        'Six stages, but the useful part is what leaves each one and how user feedback changes the next decision.', T,
        { titleSize: 42, colW: 600, leadX: M + 760, leadW: 480 });
      data.processStages.slice(0, 3).forEach((s, i) => {
        b.group(`Stage ${s.number} — ${s.name}`, () => {
          const sy = py + i * 200;
          b.circle(M + 22, sy + 22, 22, { fill: T.canvas, stroke: T.border, sw: 1 });
          b.text(M + 22, sy + 28, s.number, { size: 14, weight: 600, fill: T.accent, anchor: 'middle', id: 'Number' });
          if (i < 2) b.line(M + 22, sy + 48, M + 22, sy + 190, { stroke: T.hairline });
          b.text(M + 80, sy + 30, s.name, { size: 34, weight: 600, family: FR, fill: T.ink, ls: -1, id: 'Name' });
          let ny = b.para(M + 80, sy + 66, s.promise, { size: 21, lh: 1.25, maxW: 620, fill: T.ink, id: 'Promise' });
          ny += 14;
          b.line(M + 80, ny, M + 80 + 1160, ny, { stroke: T.hairline });
          b.text(M + 80, ny + 24, 'WHAT I DO', { size: 11, weight: 600, fill: T.inkSubtle, ls: 1.3, id: 'Col 1' });
          b.text(M + 740, ny + 24, 'WHAT COMES OUT', { size: 11, weight: 600, fill: T.inkSubtle, ls: 1.3, id: 'Col 2' });
          s.activities.slice(0, 3).forEach((a, k) => {
            b.circle(M + 84, ny + 46 + k * 26, 2.5, { fill: T.accent });
            b.text(M + 98, ny + 50 + k * 26, a.length > 62 ? `${a.slice(0, 62)}…` : a, { size: 14, weight: 400, fill: T.inkMuted, id: `Activity ${k + 1}` });
          });
          s.outputs.slice(0, 3).forEach((o, k) => {
            b.circle(M + 744, ny + 46 + k * 26, 2.5, { fill: T.accent });
            b.text(M + 758, ny + 50 + k * 26, o, { size: 14, weight: 400, fill: T.inkMuted, id: `Output ${k + 1}` });
          });
        });
      });
    });

    // ---- contact ----
    const contactY = procY + 820;
    b.group('Contact', () => {
      b.rect(0, contactY, W, H - contactY, { fill: T.canvasContrast });
      let cy = sectionHead(b, M, contactY + 96, 'Contact', 'Tell me what you are trying to build',
        'Hiring, a project, or a second opinion on something that is not working — all welcome. I reply to everything within two working days.', T,
        { colW: 500, leadX: M + 700, leadW: 520 });
      b.group('Form', () => {
        b.rect(M, cy, 640, 460, { r: 16, fill: T.surface, stroke: T.hairline, sw: 1 });
        const fields = [['Name', 0, 0, 280], ['Email', 300, 0, 280], ['Company or team', 0, 100, 580], ['Message', 0, 200, 580]];
        for (const [label, dx, dy, fw] of fields) {
          const fx = M + 32 + dx, fy = cy + 40 + dy;
          b.group(`Field — ${label}`, () => {
            b.text(fx, fy, label, { size: 14, weight: 600, fill: T.ink, id: 'Label' });
            if (label !== 'Company or team') b.text(fx + b.measureText(label, 14, 600, IN) + 6, fy, '*', { size: 14, weight: 600, fill: T.accent, id: 'Required' });
            else b.text(fx + b.measureText(label, 14, 600, IN) + 10, fy, 'OPTIONAL', { size: 11, weight: 400, fill: T.inkSubtle, ls: 1, id: 'Optional' });
            b.rect(fx, fy + 12, fw, label === 'Message' ? 130 : 48, { r: 10, fill: T.surface, stroke: T.borderStrong, sw: 1 });
          });
        }
        button(b, M + 32, cy + 388, 'Send message', 'primary', T, 'lg');
        b.text(M + 210, cy + 418, 'Or email me directly at ' + data.profile.email, { size: 12, weight: 400, fill: T.inkSubtle, id: 'Direct email' });
      });
      b.group('Contact aside', () => {
        const ax = M + 700;
        b.text(ax, cy + 14, 'EMAIL', { size: 11, weight: 600, fill: T.inkSubtle, ls: 1.3, id: 'Email label' });
        b.line(ax, cy + 26, ax + 548, cy + 26, { stroke: T.hairline });
        b.text(ax, cy + 62, data.profile.email, { size: 26, weight: 600, family: FR, fill: T.accent, id: 'Email' });
        b.text(ax, cy + 110, 'ELSEWHERE', { size: 11, weight: 600, fill: T.inkSubtle, ls: 1.3, id: 'Social label' });
        b.line(ax, cy + 122, ax + 548, cy + 122, { stroke: T.hairline });
        data.profile.social.forEach((s, i) => {
          const sy = cy + 158 + i * 52;
          b.text(ax, sy, s.label, { size: 17, weight: 500, fill: T.ink, id: `${s.label} name` });
          b.text(ax + 110, sy, s.handle, { size: 12, weight: 400, fill: T.inkSubtle, id: `${s.label} handle` });
          b.path(`M${ax + 534} ${sy - 8} h10 v10 M${ax + 544} ${sy - 8} l-9 9`, { stroke: T.inkSubtle, sw: 1.4 });
          b.line(ax, sy + 16, ax + 548, sy + 16, { stroke: T.hairline });
        });
        b.text(ax, cy + 330, 'STATUS', { size: 11, weight: 600, fill: T.inkSubtle, ls: 1.3, id: 'Status label' });
        const sw = b.measureText(data.profile.availability.toUpperCase(), 12, 600, IN) + 40;
        b.rect(ax, cy + 344, sw, 26, { r: 6, fill: '#e4f0ea' });
        b.circle(ax + 16, cy + 357, 3.5, { fill: T.success });
        b.text(ax + 28, cy + 361, data.profile.availability.toUpperCase(), { size: 12, weight: 600, fill: T.success, ls: 0.8, id: 'Status' });
      });
    });

    out['03-home-desktop.svg'] = b.toSVG();
  }

  // =========================================================================
  // HOME — MOBILE
  // =========================================================================
  {
    const W = 390, H = 2420, M = 20, T = L;
    const b = Board('Home — Mobile 390', W, H, T.canvas);
    b.group('Nav / Mobile', () => {
      b.rect(0, 0, W, 68, { fill: T.canvas });
      b.line(0, 68, W, 68, { stroke: T.hairline });
      b.rect(M, 16, 36, 36, { r: 6, fill: T.ink });
      b.text(M + 18, 39, 'NS', { size: 14, weight: 700, family: FR, fill: T.inkInverse, anchor: 'middle', id: 'Monogram' });
      b.text(M + 48, 39, data.profile.name, { size: 14, weight: 600, fill: T.ink, id: 'Name' });
      b.group('Burger', () => {
        for (let i = 0; i < 3; i++) b.rect(W - 44, 27 + i * 7, 20, 1.5, { r: 1, fill: T.ink });
      });
      b.circle(W - 74, 34, 9, { fill: 'none', stroke: T.inkMuted, sw: 1.4, id: 'Theme toggle' });
    });

    b.group('Hero', () => {
      let y = 116;
      y = b.para(M, y, data.profile.availability.toUpperCase(), { size: 11, lh: 1.5, maxW: 340, weight: 600, fill: T.inkSubtle, ls: 1.3, id: 'Eyebrow' });
      y += 24;
      const words = ['Designing digital', 'products that turn', 'complex problems', 'into simple, useful', 'experiences.'];
      words.forEach((ln, i) => {
        b.text(M, y + i * 44, ln, { size: 40, weight: 600, family: FR, ls: -1.4, italic: ln === 'complex problems', fill: ln === 'complex problems' ? T.accent : T.ink, id: `Title line ${i + 1}` });
      });
      y += words.length * 44 + 24;
      y = b.para(M, y, `I’m ${data.profile.name} — a UX/UI and product designer working end to end: research and strategy, through IA and interface design, into design systems and shipped product.`, { size: 17, lh: 1.6, maxW: 340, fill: T.inkMuted, id: 'Intro' });
      y += 28;
      b.rect(M, y, 350, 52, { r: 26, fill: T.ink });
      b.text(M + 175, y + 32, 'View my work', { size: 17, weight: 600, fill: T.inkInverse, anchor: 'middle', id: 'CTA primary' });
      b.rect(M, y + 64, 350, 52, { r: 26, fill: 'none', stroke: T.borderStrong, sw: 1 });
      b.text(M + 175, y + 96, 'Let’s connect', { size: 17, weight: 600, fill: T.ink, anchor: 'middle', id: 'CTA secondary' });
    });

    b.group('Hero artboard', () => {
      const ay = 780;
      b.rect(M, ay, 350, 300, { r: 20, fill: T.surface, stroke: T.hairline, sw: 1 });
      b.text(M + 20, ay + 30, 'WIREFRAME → INTERFACE', { size: 10, weight: 600, fill: T.inkSubtle, ls: 1.3, id: 'Caption' });
      b.rect(M + 20, ay + 48, 180, 12, { r: 3, fill: T.ink });
      b.rect(M + 20, ay + 70, 120, 9, { r: 3, fill: T.inkSubtle });
      b.rect(M + 20, ay + 96, 310, 110, { r: 8, fill: T.canvasContrast });
      b.path(`M${M + 40} ${ay + 188} L${M + 100} ${ay + 162} L${M + 160} ${ay + 172} L${M + 220} ${ay + 134} L${M + 280} ${ay + 150} L${M + 316} ${ay + 126}`, { stroke: T.accent, sw: 2.5 });
      b.rect(M + 20, ay + 222, 140, 40, { r: 20, fill: T.accent });
      b.rect(M + 176, ay + 222, 110, 40, { r: 20, fill: 'none', stroke: T.border, sw: 1 });
    });

    b.group('Selected work', () => {
      let y = 1140;
      b.line(M, y - 40, W - M, y - 40, { stroke: T.hairline });
      b.text(M, y, 'SELECTED WORK', { size: 11, weight: 600, fill: T.inkSubtle, ls: 1.3, id: 'Eyebrow' });
      const lines = b.wrapText('Products where the hard part was the thinking', 340, 32, 600, FR);
      lines.forEach((ln, i) => b.text(M, y + 44 + i * 34, ln, { size: 32, weight: 600, family: FR, fill: T.ink, ls: -1, id: `Title line ${i + 1}` }));
      y += 44 + lines.length * 34 + 28;
      data.featuredProjects.slice(0, 2).forEach((p) => {
        b.group(`Card — ${p.title}`, () => {
          b.rect(M, y, 350, 400, { r: 16, fill: T.surface, stroke: T.hairline, sw: 1 });
          b.rect(M + 16, y + 16, 318, 180, { r: 10, fill: p.cover.tint });
          b.rect(M + 40, y + 44, 170, 124, { r: 8, fill: '#faf8f4' });
          b.rect(M + 56, y + 62, 90, 9, { r: 3, fill: '#1b1b17' });
          b.rect(M + 56, y + 80, 120, 7, { r: 3, fill: '#c9c4ba' });
          b.rect(M + 230, y + 70, 86, 98, { r: 8, fill: '#faf8f4' });
          b.text(M + 16, y + 224, `${p.industry.toUpperCase()} · ${p.year}`, { size: 11, weight: 600, fill: T.inkSubtle, ls: 1.2, id: 'Meta' });
          b.text(M + 16, y + 262, p.title, { size: 26, weight: 600, family: FR, fill: T.ink, ls: -0.6, id: 'Title' });
          b.para(M + 16, y + 292, p.tagline, { size: 14, lh: 1.5, maxW: 310, fill: T.inkMuted, id: 'Tagline' });
          tag(b, M + 16, y + 352, p.projectType, T, 'accent');
        });
        y += 432;
      });
    });

    b.group('Contact', () => {
      const cy = 2160;
      b.rect(0, cy, W, H - cy, { fill: T.canvasContrast });
      b.text(M, cy + 44, 'CONTACT', { size: 11, weight: 600, fill: T.inkSubtle, ls: 1.3, id: 'Eyebrow' });
      const lines = b.wrapText('Tell me what you are trying to build', 340, 32, 600, FR);
      lines.forEach((ln, i) => b.text(M, cy + 86 + i * 34, ln, { size: 32, weight: 600, family: FR, fill: T.ink, ls: -1, id: `Title line ${i + 1}` }));
      b.rect(M, cy + 170, 350, 52, { r: 26, fill: T.ink });
      b.text(M + 175, cy + 202, 'Start a conversation', { size: 17, weight: 600, fill: T.inkInverse, anchor: 'middle', id: 'CTA' });
    });

    out['04-home-mobile.svg'] = b.toSVG();
  }

  // =========================================================================
  // WORK INDEX
  // =========================================================================
  {
    const W = 1440, H = 1700, M = 96, T = L;
    const b = Board('Work — Desktop 1440', W, H, T.canvas);
    const navH = nav(b, W, T, 'Work');

    let y = sectionHead(b, M, navH + 110, 'Selected work', 'Case studies, end to end',
      'Every project here is written up in full: the research, the options I rejected, the decisions and why, what testing changed, and what I would do differently.', T,
      { colW: 620, leadX: M + 760, leadW: 500 });

    b.group('Filter bar', () => {
      let x = M;
      data.industryFacets.forEach((f, i) => {
        const label = f.value.toUpperCase();
        const labelW = b.measureText(label, 12, 600, IN, 1.2);
        const countW = b.measureText(String(f.count), 12, 600, IN);
        const w = 20 + labelW + 16 + countW + 20;
        b.group(`Chip — ${f.value}`, () => {
          b.rect(x, y, w, 38, { r: 999, fill: i === 0 ? T.ink : 'none', stroke: i === 0 ? T.ink : T.border, sw: 1 });
          b.text(x + 20, y + 24, label, { size: 12, weight: 600, fill: i === 0 ? T.inkInverse : T.inkMuted, ls: 1.2, id: 'Label' });
          b.text(x + w - 20, y + 24, String(f.count), { size: 12, weight: 600, fill: i === 0 ? T.inkInverse : T.inkSubtle, anchor: 'end', id: 'Count' });
        });
        x += w + 12;
      });
      b.text(M, y + 66, `SHOWING ALL ${data.allProjects.length} PROJECTS`, { size: 11, weight: 600, fill: T.inkSubtle, ls: 1.3, id: 'Status' });
      b.line(M, y + 90, W - M, y + 90, { stroke: T.hairline });
    });

    y += 130;
    b.group('Project grid', () => {
      data.allProjects.slice(0, 3).forEach((p, i) => {
        const x = M + i * 420;
        b.group(`Card — ${p.title}`, () => {
          b.rect(x, y, 388, 500, { r: 16, fill: T.surface, stroke: T.hairline, sw: 1 });
          b.rect(x + 20, y + 20, 348, 238, { r: 10, fill: p.cover.tint });
          b.rect(x + 46, y + 50, 190, 150, { r: 8, fill: '#faf8f4' });
          b.rect(x + 64, y + 72, 100, 9, { r: 3, fill: '#1b1b17' });
          b.rect(x + 64, y + 90, 130, 7, { r: 3, fill: '#c9c4ba' });
          b.rect(x + 64, y + 112, 120, 40, { r: 6, fill: '#efece4' });
          b.rect(x + 252, y + 86, 92, 114, { r: 8, fill: '#faf8f4' });
          b.text(x + 20, y + 290, `${p.industry.toUpperCase()} · ${p.year}`, { size: 11, weight: 600, fill: T.inkSubtle, ls: 1.2, id: 'Meta' });
          b.text(x + 20, y + 330, p.title, { size: 26, weight: 600, family: FR, fill: T.ink, ls: -0.6, id: 'Title' });
          b.para(x + 20, y + 360, p.tagline, { size: 14, lh: 1.5, maxW: 340, fill: T.inkMuted, id: 'Tagline' });
          tag(b, x + 20, y + 430, p.projectType, T, 'accent');
          b.text(x + 20, y + 484, 'VIEW CASE STUDY', { size: 11, weight: 600, fill: T.ink, ls: 1.3, id: 'CTA' });
          b.line(x + 150, y + 480, x + 172, y + 480, { stroke: T.ink });
        });
      });
    });

    out['05-work-index.svg'] = b.toSVG();
  }

  // =========================================================================
  // CASE STUDY
  // =========================================================================
  {
    const W = 1440, H = 3020, M = 96, T = L;
    const p = data.allProjects[0];
    const b = Board('Case study — CropVibe', W, H, T.canvas);
    const navH = nav(b, W, T, 'Work');

    b.group('Case study hero', () => {
      const by = navH + 56;
      b.text(M, by, 'Home  /  Work  /  CropVibe', { size: 12, weight: 400, fill: T.inkSubtle, id: 'Breadcrumb' });
      eyebrow(b, M, by + 48, `${p.industry} · ${p.year}`, T);
      b.text(M, by + 124, p.title, { size: 68, weight: 600, family: FR, fill: T.ink, ls: -2.4, id: 'Title' });
      b.para(M, by + 168, p.tagline, { size: 26, lh: 1.25, maxW: 620, fill: T.inkMuted, id: 'Tagline' });
      let tx = M;
      const tags = [p.status, p.projectType, ...p.tags.slice(0, 3)];
      tags.forEach((t, i) => { tx += tag(b, tx, by + 256, t, T, i === 0 ? 'accent' : 'plain') + 10; });

      b.group('Cover', () => {
        const cy = by + 320;
        b.rect(M, cy, W - M * 2, 500, { r: 24, fill: p.cover.tint });
        b.rect(M + 80, cy + 50, 520, 400, { r: 14, fill: '#faf8f4' });
        b.rect(M + 120, cy + 90, 200, 14, { r: 4, fill: '#1b1b17' });
        b.rect(M + 120, cy + 118, 300, 10, { r: 3, fill: '#8f8b81' });
        b.rect(M + 120, cy + 152, 440, 56, { r: 28, fill: '#f1eee7' });
        b.rect(M + 132, cy + 162, 150, 36, { r: 18, fill: p.cover.tint });
        b.rect(M + 120, cy + 240, 200, 130, { r: 10, fill: '#f1eee7' });
        b.rect(M + 340, cy + 240, 200, 130, { r: 10, fill: '#f1eee7' });
        b.rect(M + 680, cy + 110, 400, 330, { r: 14, fill: '#faf8f4' });
        b.rect(M + 716, cy + 150, 160, 12, { r: 3, fill: '#1b1b17' });
        [0, 1, 2].forEach((i) => {
          b.circle(M + 730, cy + 210 + i * 70, 16, { fill: i === 0 ? p.cover.tint : '#ece8e0' });
          b.rect(M + 760, cy + 202 + i * 70, 180, 11, { r: 3, fill: i === 0 ? '#1b1b17' : '#8f8b81' });
          b.rect(M + 760, cy + 222 + i * 70, 240, 9, { r: 3, fill: '#ded9cf' });
        });
        b.rect(M + 716, cy + 380, 330, 46, { r: 23, fill: p.cover.tint });
      });

      b.group('Meta bar', () => {
        const my = by + 880;
        b.line(M, my, W - M, my, { stroke: T.hairline });
        const cells = [['My role', p.role], ['Team', p.team.join('\n')], ['Timeline', p.timeline], ['Project type', p.projectType]];
        cells.forEach(([k, v], i) => {
          const cx = M + i * 312;
          b.text(cx, my + 34, k.toUpperCase(), { size: 11, weight: 600, fill: T.inkSubtle, ls: 1.3, id: `${k} label` });
          if (k === 'Team') {
            p.team.forEach((member, j) => b.text(cx, my + 60 + j * 22, member, { size: 14, weight: 400, fill: T.ink, id: `Member ${j + 1}` }));
          } else {
            b.para(cx, my + 60, v, { size: 14, lh: 1.5, maxW: 280, fill: T.ink, id: `${k} value` });
          }
        });
        b.line(M, my + 170, W - M, my + 170, { stroke: T.hairline });
      });
    });

    // ---- overview block ----
    b.group('01 Overview', () => {
      const oy = navH + 1120;
      b.line(0, oy - 40, W, oy - 40, { stroke: T.hairline });
      b.text(M, oy, '01', { size: 12, weight: 600, fill: T.accent, ls: 1.3, id: 'Number' });
      b.text(M, oy + 40, 'Overview', { size: 34, weight: 600, family: FR, fill: T.ink, ls: -1, id: 'Title' });
      let ny = b.para(M + 320, oy, p.overview.narrative, { size: 17, lh: 1.7, maxW: 860, fill: T.inkMuted, id: 'Narrative' });
      ny = b.para(M + 320, ny + 20, p.overview.narrativeExtra, { size: 17, lh: 1.7, maxW: 860, fill: T.inkMuted, id: 'Narrative 2' }) + 32;
      p.overview.highlights.forEach((m, i) => {
        const mx = M + 320 + (i % 3) * 292;
        const my2 = ny + Math.floor(i / 3) * 150;
        b.group(`Metric — ${m.label}`, () => {
          b.rect(mx, my2, 272, 132, { r: 10, fill: T.surface, stroke: T.hairline, sw: 1 });
          b.text(mx + 20, my2 + 48, m.value, { size: 34, weight: 600, family: FR, fill: T.accent, ls: -1, id: 'Value' });
          b.para(mx + 20, my2 + 74, m.label, { size: 14, lh: 1.35, maxW: 230, fill: T.ink, id: 'Label' });
          if (m.note) b.para(mx + 20, my2 + 104, m.note, { size: 11, lh: 1.35, maxW: 230, fill: T.inkSubtle, id: 'Note' });
        });
      });
    });

    // ---- insights block ----
    b.group('07 User insights', () => {
      const iy = navH + 1800;
      b.rect(0, iy - 48, W, 900, { fill: T.canvasContrast });
      b.line(0, iy - 48, W, iy - 48, { stroke: T.hairline });
      b.text(M, iy, '07', { size: 12, weight: 600, fill: T.accent, ls: 1.3, id: 'Number' });
      b.text(M, iy + 40, 'User insights', { size: 34, weight: 600, family: FR, fill: T.ink, ls: -1, id: 'Title' });
      b.para(M + 320, iy, 'The findings that changed what got built. Each one carries the evidence it came from, because a design decision defended by an unsourced insight is just an opinion with a diagram.', { size: 17, lh: 1.7, maxW: 860, fill: T.inkMuted, id: 'Narrative' });
      p.insights.slice(0, 4).forEach((ins, i) => {
        const cx = M + 320 + (i % 2) * 452;
        const cy = iy + 120 + Math.floor(i / 2) * 320;
        b.group(`Insight — ${ins.title.slice(0, 30)}`, () => {
          const titleLines = b.wrapText(ins.title, 380, 21, 600, IN);
          const detailLines = b.wrapText(ins.detail, 380, 14, 400, IN);
          const quoteLines = ins.quote ? b.wrapText(`“${ins.quote}”`, 360, 21, 600, FR) : [];
          const h = 48 + titleLines.length * 26 + detailLines.length * 21 + (quoteLines.length ? quoteLines.length * 26 + 24 : 0) + 40;
          b.rect(cx, cy, 420, h, { r: 10, fill: T.surface, stroke: T.hairline, sw: 1 });
          let ty = cy + 40;
          titleLines.forEach((ln, k) => b.text(cx + 20, ty + k * 26, ln, { size: 21, weight: 600, fill: T.ink, ls: -0.3, id: `Title ${k + 1}` }));
          ty += titleLines.length * 26 + 8;
          detailLines.forEach((ln, k) => b.text(cx + 20, ty + k * 21, ln, { size: 14, weight: 400, fill: T.inkMuted, id: `Detail ${k + 1}` }));
          ty += detailLines.length * 21 + 16;
          if (quoteLines.length) {
            b.rect(cx + 20, ty - 16, 2, quoteLines.length * 26 + 6, { fill: T.accent });
            quoteLines.forEach((ln, k) => b.text(cx + 36, ty + k * 26, ln, { size: 21, weight: 600, family: FR, fill: T.ink, italic: true, id: `Quote ${k + 1}` }));
            ty += quoteLines.length * 26 + 12;
          }
          if (ins.evidence) b.text(cx + 20, ty + 4, ins.evidence.toUpperCase(), { size: 11, weight: 600, fill: T.inkSubtle, ls: 1.2, id: 'Evidence' });
        });
      });
    });

    out['06-case-study.svg'] = b.toSVG();
  }

  // =========================================================================
  // 404
  // =========================================================================
  {
    const W = 1440, H = 900, M = 96, T = L;
    const b = Board('404 — Not found', W, H, T.canvas);
    const navH = nav(b, W, T, null);
    b.group('Not found', () => {
      eyebrow(b, M, navH + 110, 'Error 404', T);
      b.text(M, navH + 190, 'This page', { size: 68, weight: 600, family: FR, fill: T.ink, ls: -2.4, id: 'Title line 1' });
      b.text(M, navH + 262, 'does not exist.', { size: 68, weight: 600, family: FR, fill: T.ink, ls: -2.4, id: 'Title line 2' });
      const y = b.para(M, navH + 320, 'The link may be out of date, or I may have moved something. Either way, here is the way back — and three case studies that do exist.', { size: 21, lh: 1.5, maxW: 620, fill: T.inkMuted, id: 'Body' });
      const w1 = button(b, M, y + 24, 'Back to home', 'primary', T, 'lg');
      button(b, M + w1 + 16, y + 24, 'See the work', 'secondary', T, 'lg');
      b.line(M, y + 128, W - M, y + 128, { stroke: T.hairline });
      b.text(M, y + 164, 'CASE STUDIES', { size: 11, weight: 600, fill: T.inkSubtle, ls: 1.3, id: 'Label' });
      data.allProjects.slice(0, 3).forEach((p, i) => {
        b.group(`Suggestion — ${p.title}`, () => {
          const sy = y + 204 + i * 54;
          b.text(M, sy, p.title, { size: 26, weight: 600, family: FR, fill: T.ink, ls: -0.6, id: 'Title' });
          b.text(M + 260, sy, `${p.industry} · ${p.tagline}`, { size: 12, weight: 400, fill: T.inkSubtle, id: 'Meta' });
          b.line(M, sy + 18, W - M, sy + 18, { stroke: T.hairline });
        });
      });
    });
    out['07-404.svg'] = b.toSVG();
  }

  return out;
}
