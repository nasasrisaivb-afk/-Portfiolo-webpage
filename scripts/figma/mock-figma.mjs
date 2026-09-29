/**
 * A partial Figma Plugin API mock, faithful enough to execute the plugin and
 * catch the failures that matter: typos, undefined references, wrong call
 * order, unawaited promises, unknown properties, and auto-layout sizing rules
 * applied to nodes that cannot accept them.
 *
 * It is NOT a layout engine — it does not compute real text metrics. It proves
 * the script runs end to end and builds the structure it claims to.
 *
 * Used by scripts/figma/test-plugin.mjs.
 */

export function createFigmaMock() {
  const issues = [];
  const note = (msg) => issues.push(msg);
  let idSeq = 1;
  const nextId = (t) => `${t}:${idSeq++}`;

  const FONT_CATALOGUE = {
    Fraunces: ['Thin', 'Light', 'Regular', 'SemiBold', 'Bold', 'Black',
      'Thin Italic', 'Light Italic', 'Italic', 'SemiBold Italic', 'Bold Italic', 'Black Italic'],
    Inter: ['Thin', 'Extra Light', 'Light', 'Regular', 'Medium', 'Semi Bold', 'Bold',
      'Extra Bold', 'Black', 'Italic', 'Medium Italic', 'Semi Bold Italic'],
  };
  const loadedFonts = new Set();
  const fontKey = (f) => `${f.family}|${f.style}`;

  const AUTO_LAYOUT_TYPES = new Set(['FRAME', 'COMPONENT', 'INSTANCE', 'COMPONENT_SET']);

  class Node {
    constructor(type, name) {
      this.type = type;
      this.id = nextId(type);
      this.name = name || type;
      this.children = [];
      this.parent = null;
      this.width = 100;
      this.height = 100;
      this.x = 0;
      this.y = 0;
      this.fills = [];
      this.strokes = [];
      this.strokeWeight = 1;
      this.opacity = 1;
      this.visible = true;
      this.boundVariables = {};
      this._pluginData = {};
      this.cornerRadius = 0;
    }

    appendChild(child) {
      if (!child) { note(`appendChild(undefined) on ${this.name}`); return; }
      if (child === this) { note(`appendChild(self) on ${this.name}`); return; }
      if (child.parent) {
        const i = child.parent.children.indexOf(child);
        if (i >= 0) child.parent.children.splice(i, 1);
      }
      child.parent = this;
      this.children.push(child);
    }

    remove() {
      if (this.parent) {
        const i = this.parent.children.indexOf(this);
        if (i >= 0) this.parent.children.splice(i, 1);
      }
      this.removed = true;
    }

    resize(w, h) {
      if (typeof w !== 'number' || Number.isNaN(w)) note(`resize() got a non-number width on ${this.name}: ${w}`);
      if (typeof h !== 'number' || Number.isNaN(h)) note(`resize() got a non-number height on ${this.name}: ${h}`);
      this.width = w;
      this.height = h;
      // Real Figma resets sizing modes to FIXED here.
      this._layoutSizingHorizontal = 'FIXED';
      this._layoutSizingVertical = 'FIXED';
    }

    findOne(fn) {
      for (const c of this.children) {
        if (fn(c)) return c;
        const deep = c.findOne(fn);
        if (deep) return deep;
      }
      return null;
    }

    findAll(fn) {
      const out = [];
      for (const c of this.children) {
        if (!fn || fn(c)) out.push(c);
        out.push(...c.findAll(fn));
      }
      return out;
    }

    setPluginData(k, v) { this._pluginData[k] = String(v); }
    getPluginData(k) { return this._pluginData[k] || ''; }

    setBoundVariable(field, variable) {
      const NUMERIC = new Set([
        'itemSpacing', 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom',
        'topLeftRadius', 'topRightRadius', 'bottomLeftRadius', 'bottomRightRadius',
        'width', 'height', 'counterAxisSpacing', 'strokeWeight', 'opacity',
      ]);
      if (!NUMERIC.has(field)) throw new Error(`in setBoundVariable: unsupported field "${field}"`);
      if (!variable || !variable.id) throw new Error('in setBoundVariable: variable is required');
      if (field.startsWith('padding') || field === 'itemSpacing' || field === 'counterAxisSpacing') {
        if (!AUTO_LAYOUT_TYPES.has(this.type) || !this.layoutMode) {
          throw new Error(`in setBoundVariable: ${field} requires an auto-layout frame`);
        }
      }
      this.boundVariables[field] = { type: 'VARIABLE_ALIAS', id: variable.id };
    }

    setExplicitVariableModeForCollection(collection, modeId) {
      if (!collection || !collection.id) throw new Error('setExplicitVariableModeForCollection: bad collection');
      if (!collection.modes.some((m) => m.modeId === modeId)) {
        throw new Error('setExplicitVariableModeForCollection: mode not in collection');
      }
      this._explicitModes = this._explicitModes || {};
      this._explicitModes[collection.id] = modeId;
    }

    // ---- auto-layout child sizing, with the real value restrictions --------
    set layoutSizingHorizontal(v) {
      if (!['FIXED', 'HUG', 'FILL'].includes(v)) {
        throw new Error(`in set_layoutSizingHorizontal: expected FIXED | HUG | FILL, received ${v}`);
      }
      if (v === 'FILL') {
        if (!this.parent || !AUTO_LAYOUT_TYPES.has(this.parent.type) || !this.parent.layoutMode) {
          throw new Error('in set_layoutSizingHorizontal: FILL can only be set on children of auto-layout frames');
        }
      }
      if (v === 'HUG' && !(this.layoutMode || this.type === 'TEXT')) {
        throw new Error('in set_layoutSizingHorizontal: HUG requires an auto-layout frame or a text node');
      }
      this._layoutSizingHorizontal = v;
    }
    get layoutSizingHorizontal() { return this._layoutSizingHorizontal || 'FIXED'; }

    set layoutSizingVertical(v) {
      if (!['FIXED', 'HUG', 'FILL'].includes(v)) {
        throw new Error(`in set_layoutSizingVertical: expected FIXED | HUG | FILL, received ${v}`);
      }
      this._layoutSizingVertical = v;
    }
    get layoutSizingVertical() { return this._layoutSizingVertical || 'FIXED'; }

    set primaryAxisSizingMode(v) {
      if (!['FIXED', 'AUTO'].includes(v)) throw new Error(`Expected 'FIXED' | 'AUTO', received '${v}'`);
      this._primaryAxisSizingMode = v;
    }
    get primaryAxisSizingMode() { return this._primaryAxisSizingMode; }

    set counterAxisSizingMode(v) {
      if (!['FIXED', 'AUTO'].includes(v)) throw new Error(`Expected 'FIXED' | 'AUTO', received '${v}'`);
      this._counterAxisSizingMode = v;
    }
    get counterAxisSizingMode() { return this._counterAxisSizingMode; }

    set counterAxisAlignItems(v) {
      if (!['MIN', 'CENTER', 'MAX', 'BASELINE'].includes(v)) throw new Error(`bad counterAxisAlignItems: ${v}`);
      this._counterAxisAlignItems = v;
    }
    get counterAxisAlignItems() { return this._counterAxisAlignItems; }

    set primaryAxisAlignItems(v) {
      if (!['MIN', 'CENTER', 'MAX', 'SPACE_BETWEEN'].includes(v)) throw new Error(`bad primaryAxisAlignItems: ${v}`);
      this._primaryAxisAlignItems = v;
    }
    get primaryAxisAlignItems() { return this._primaryAxisAlignItems; }

    set layoutMode(v) {
      if (!['NONE', 'HORIZONTAL', 'VERTICAL'].includes(v)) throw new Error(`bad layoutMode: ${v}`);
      this._layoutMode = v === 'NONE' ? undefined : v;
    }
    get layoutMode() { return this._layoutMode; }
  }

  class TextNode extends Node {
    constructor() {
      super('TEXT', 'Text');
      this._characters = '';
      this._fontName = { family: 'Inter', style: 'Regular' };
      this.fontSize = 12;
      this.textAutoResize = 'WIDTH_AND_HEIGHT';
    }
    set fontName(f) {
      if (!f || !f.family || !f.style) throw new Error('fontName needs {family, style}');
      const styles = FONT_CATALOGUE[f.family];
      if (!styles) throw new Error(`Cannot load font "${f.family}" — not available`);
      if (!styles.includes(f.style)) {
        throw new Error(`Font style "${f.style}" not found for ${f.family}. Available: ${styles.join(', ')}`);
      }
      if (!loadedFonts.has(fontKey(f))) {
        throw new Error(`Cannot write to node with unloaded font "${f.family} ${f.style}"`);
      }
      this._fontName = f;
    }
    get fontName() { return this._fontName; }

    set characters(v) {
      if (!loadedFonts.has(fontKey(this._fontName))) {
        throw new Error(`Cannot write to node with unloaded font "${this._fontName.family} ${this._fontName.style}"`);
      }
      if (typeof v !== 'string') throw new Error(`characters must be a string, got ${typeof v}`);
      if (v.includes('undefined')) note(`text contains the literal "undefined": ${v.slice(0, 60)}`);
      this._characters = v;
      // Crude but enough to notice a node that never got sized.
      this.width = Math.max(1, Math.min(v.length * this.fontSize * 0.52, this.width || 9999));
      this.height = this.fontSize * 1.4;
    }
    get characters() { return this._characters; }

    set lineHeight(v) {
      if (!v || typeof v !== 'object' || !('unit' in v)) throw new Error('lineHeight needs {unit, value}');
      this._lineHeight = v;
    }
    get lineHeight() { return this._lineHeight; }

    set letterSpacing(v) {
      if (!v || typeof v !== 'object' || !('unit' in v)) throw new Error('letterSpacing needs {unit, value}');
      this._letterSpacing = v;
    }
    get letterSpacing() { return this._letterSpacing; }

    set textCase(v) {
      if (v === undefined) return;
      if (!['ORIGINAL', 'UPPER', 'LOWER', 'TITLE'].includes(v)) throw new Error(`bad textCase: ${v}`);
      this._textCase = v;
    }
    get textCase() { return this._textCase; }

    set textAlignHorizontal(v) {
      if (v === undefined) return;
      if (!['LEFT', 'CENTER', 'RIGHT', 'JUSTIFIED'].includes(v)) throw new Error(`bad textAlignHorizontal: ${v}`);
      this._align = v;
    }
    get textAlignHorizontal() { return this._align; }

    async setTextStyleIdAsync(id) {
      if (!styleRegistry.has(id)) throw new Error(`No text style with id ${id}`);
      this.textStyleId = id;
    }
  }

  class ComponentNode extends Node {
    constructor() { super('COMPONENT', 'Component'); }
    createInstance() {
      const inst = new Node('INSTANCE', `${this.name} (instance)`);
      inst.mainComponent = this;
      inst.width = this.width;
      inst.height = this.height;
      inst._layoutMode = this._layoutMode;
      // Deep-ish clone so findOne() on an instance behaves like the real thing.
      const clone = (src, dst) => {
        for (const c of src.children) {
          let copy;
          if (c.type === 'TEXT') {
            copy = new TextNode();
            copy.name = c.name;
            copy._fontName = c._fontName;
            copy.fontSize = c.fontSize;
            copy._characters = c._characters;
          } else {
            copy = new Node(c.type, c.name);
            copy._layoutMode = c._layoutMode;
          }
          copy.width = c.width; copy.height = c.height;
          dst.appendChild(copy);
          clone(c, copy);
        }
      };
      clone(this, inst);
      inst.setProperties = (props) => {
        const set = this.parent && this.parent.type === 'COMPONENT_SET' ? this.parent : null;
        if (!set) throw new Error('setProperties: component is not part of a variant set');
        for (const key of Object.keys(props)) {
          const defs = set.componentPropertyDefinitions;
          if (!defs[key]) {
            throw new Error(`setProperties: unknown property "${key}" on ${set.name}. Known: ${Object.keys(defs).join(', ')}`);
          }
          if (!defs[key].variantOptions.includes(props[key])) {
            throw new Error(`setProperties: "${props[key]}" is not a value of "${key}" on ${set.name}. Values: ${defs[key].variantOptions.join(', ')}`);
          }
        }
        inst._properties = Object.assign({}, inst._properties, props);
      };
      return inst;
    }
  }

  class ComponentSetNode extends Node {
    constructor() { super('COMPONENT_SET', 'Component Set'); }
    get defaultVariant() { return this.children[0]; }
    get componentPropertyDefinitions() {
      const defs = {};
      for (const child of this.children) {
        for (const pair of child.name.split(',')) {
          const [k, v] = pair.split('=').map((s) => s.trim());
          if (!k || v === undefined) continue;
          defs[k] = defs[k] || { type: 'VARIANT', variantOptions: [], defaultValue: v };
          if (!defs[k].variantOptions.includes(v)) defs[k].variantOptions.push(v);
        }
      }
      return defs;
    }
  }

  // ------------------------------------------------------------ variables --
  const collections = [];
  const variables = [];
  const styleRegistry = new Map();
  const textStyles = [];

  const variablesApi = {
    createVariableCollection(name) {
      const c = {
        id: nextId('VariableCollection'),
        name,
        modes: [{ modeId: nextId('mode'), name: 'Mode 1' }],
        variableIds: [],
        renameMode(modeId, newName) {
          const m = this.modes.find((x) => x.modeId === modeId);
          if (!m) throw new Error('renameMode: unknown mode');
          m.name = newName;
        },
        addMode(newName) {
          const m = { modeId: nextId('mode'), name: newName };
          this.modes.push(m);
          return m.modeId;
        },
      };
      collections.push(c);
      return c;
    },
    createVariable(name, collection, type) {
      if (!collection || !collection.id) throw new Error('createVariable: collection required');
      if (!['COLOR', 'FLOAT', 'STRING', 'BOOLEAN'].includes(type)) throw new Error(`createVariable: bad type ${type}`);
      if (variables.some((v) => v.name === name && v.variableCollectionId === collection.id)) {
        note(`duplicate variable created: ${name}`);
      }
      const v = {
        id: nextId('VariableID'),
        name,
        resolvedType: type,
        variableCollectionId: collection.id,
        valuesByMode: {},
        scopes: ['ALL_SCOPES'],
        description: '',
        codeSyntax: {},
        setValueForMode(modeId, value) {
          if (!collection.modes.some((m) => m.modeId === modeId)) {
            throw new Error(`setValueForMode: mode ${modeId} is not in ${collection.name}`);
          }
          if (value && value.type === 'VARIABLE_ALIAS') {
            if (!variables.some((x) => x.id === value.id)) throw new Error('setValueForMode: alias points at an unknown variable');
          } else if (type === 'COLOR') {
            if (!value || typeof value.r !== 'number') throw new Error('setValueForMode: COLOR needs {r,g,b}');
            for (const ch of ['r', 'g', 'b']) {
              if (value[ch] < 0 || value[ch] > 1) throw new Error(`Property value out of range: ${ch}=${value[ch]} (colours are 0–1)`);
            }
            if ('a' in value) throw new Error('setValueForMode: colour objects take {r,g,b} only — no alpha');
          } else if (type === 'FLOAT' && typeof value !== 'number') {
            throw new Error('setValueForMode: FLOAT needs a number');
          }
          this.valuesByMode[modeId] = value;
        },
        setVariableCodeSyntax(platform, value) {
          if (!['WEB', 'ANDROID', 'iOS'].includes(platform)) throw new Error(`bad code syntax platform: ${platform}`);
          if (platform === 'WEB' && !/^var\(--/.test(value)) note(`WEB code syntax should be wrapped in var(): ${value}`);
          this.codeSyntax[platform] = value;
        },
      };
      collection.variableIds.push(v.id);
      variables.push(v);
      return v;
    },
    setBoundVariableForPaint(paint, field, variable) {
      if (field !== 'color') throw new Error('setBoundVariableForPaint: only "color" is supported');
      if (!variable || !variable.id) throw new Error('setBoundVariableForPaint: variable required');
      if (variable.resolvedType !== 'COLOR') throw new Error(`setBoundVariableForPaint: ${variable.name} is not a COLOR variable`);
      return Object.assign({}, paint, { boundVariables: { color: { type: 'VARIABLE_ALIAS', id: variable.id } } });
    },
    async getLocalVariableCollectionsAsync() { return collections.slice(); },
    async getLocalVariablesAsync() { return variables.slice(); },
  };

  // ----------------------------------------------------------------- pages --
  const pages = [];
  const makePage = (name) => {
    const p = new Node('PAGE', name);
    p.loadAsync = async () => {};
    pages.push(p);
    return p;
  };
  makePage('Page 1');

  let currentPage = pages[0];
  let closed = null;

  const figma = {
    root: { get children() { return pages; } },
    get currentPage() { return currentPage; },
    set currentPage(_) { throw new Error('Setting figma.currentPage is not supported'); },
    async setCurrentPageAsync(p) {
      if (!p || p.type !== 'PAGE') throw new Error('setCurrentPageAsync needs a page');
      currentPage = p;
    },
    createPage() {
      if (pages.length >= 3) {
        throw new Error('in createPage: The Starter plan only comes with 3 pages.');
      }
      return makePage('Page ' + (pages.length + 1));
    },
    createFrame() { const f = new Node('FRAME', 'Frame'); currentPage.appendChild(f); return f; },
    createText() { const t = new TextNode(); currentPage.appendChild(t); return t; },
    createComponent() { const c = new ComponentNode(); currentPage.appendChild(c); return c; },
    createEllipse() { const e = new Node('ELLIPSE', 'Ellipse'); currentPage.appendChild(e); return e; },
    createRectangle() { const r = new Node('RECTANGLE', 'Rectangle'); currentPage.appendChild(r); return r; },
    combineAsVariants(components, parent) {
      if (!Array.isArray(components) || !components.length) throw new Error('combineAsVariants needs components');
      const names = components.map((c) => c.name);
      const keysOf = (n) => n.split(',').map((s) => s.split('=')[0].trim()).sort().join('|');
      const firstKeys = keysOf(names[0]);
      for (const n of names) {
        if (keysOf(n) !== firstKeys) throw new Error(`combineAsVariants: inconsistent variant properties — "${n}" vs "${names[0]}"`);
      }
      const set = new ComponentSetNode();
      (parent || currentPage).appendChild(set);
      for (const c of components) set.appendChild(c);
      return set;
    },
    async loadFontAsync(f) {
      const styles = FONT_CATALOGUE[f.family];
      if (!styles) throw new Error(`Cannot load font "${f.family}"`);
      if (!styles.includes(f.style)) {
        throw new Error(`Cannot load font "${f.family} ${f.style}" — available: ${styles.join(', ')}`);
      }
      loadedFonts.add(fontKey(f));
    },
    async listAvailableFontsAsync() {
      const out = [];
      for (const family of Object.keys(FONT_CATALOGUE)) {
        for (const style of FONT_CATALOGUE[family]) out.push({ fontName: { family, style } });
      }
      return out;
    },
    createTextStyle() {
      const s = {
        id: nextId('Style'),
        name: 'Style',
        set fontName(f) {
          const styles = FONT_CATALOGUE[f.family];
          if (!styles || !styles.includes(f.style)) throw new Error(`text style: bad font ${f.family} ${f.style}`);
          if (!loadedFonts.has(fontKey(f))) throw new Error(`text style: font not loaded "${f.family} ${f.style}"`);
          this._fontName = f;
        },
        get fontName() { return this._fontName; },
      };
      styleRegistry.set(s.id, s);
      textStyles.push(s);
      return s;
    },
    async getLocalTextStylesAsync() { return textStyles.slice(); },
    variables: variablesApi,
    viewport: { scrollAndZoomIntoView() {} },
    notify() { throw new Error('figma.notify is not implemented'); },
    closePlugin(msg) { closed = msg === undefined ? '' : msg; },
    mixed: Symbol('mixed'),
  };

  return {
    figma,
    report() {
      return {
        issues,
        closed,
        pages: pages.map((p) => ({ name: p.name, children: p.children.length })),
        collections: collections.map((c) => ({ name: c.name, modes: c.modes.map((m) => m.name), vars: c.variableIds.length })),
        variables,
        textStyles: textStyles.length,
        allNodes: pages.flatMap((p) => p.findAll(null)),
      };
    },
  };
}
