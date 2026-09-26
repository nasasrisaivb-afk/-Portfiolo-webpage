import type { CaseStudy } from '../types';

/**
 * CropVibe — grounded in the real product (github.com/nasasrisaivb-afk/-cropvibe).
 * Quantitative outcomes marked "design target" still need measurement; the
 * shipped facts (modules, states, roles, tokens) are all verifiable in the repo.
 */
export const cropvibe: CaseStudy = {
  slug: 'cropvibe',
  title: 'CropVibe',
  tagline: 'Five businesses, one account: designing a multi-sided agricultural marketplace',
  description:
    'A digital ecosystem where farmers sell produce, buy in bulk, rent equipment, sell advisory services and teach courses — from a single account. I designed the role model, the information architecture and the booking experience that holds it together.',
  industry: 'Agriculture',
  tags: ['Marketplace', 'Multi-sided platform', 'Design system', 'Booking flow', 'Mobile-first'],
  projectType: 'End-to-end product design',
  role: 'Lead product designer — research, IA, UX, UI, design system, front-end pairing',
  team: ['Me (product design)', '2 front-end engineers', '1 back-end engineer', 'Product owner'],
  timeline: 'Phase 1 — 14 weeks, ongoing',
  year: 2026,
  status: 'Shipped',
  contribution:
    'Replaced five separate "apps in waiting" with one role-switching account, and turned an un-bookable service catalogue into a three-step booking flow that writes straight into orders.',
  featured: true,
  order: 1,
  cover: {
    src: '/media/cropvibe-cover.svg',
    alt: 'CropVibe interface composition: a role switcher, a produce marketplace listing card, an equipment rental calendar and a three-step service booking sheet.',
    tint: '#4C7A34',
  },
  links: [
    { label: 'Live demo', href: 'https://nasasrisaivb-afk.github.io/-cropvibe/', external: true },
    {
      label: 'Admin console',
      href: 'https://nasasrisaivb-afk.github.io/-cropvibe/admin/',
      external: true,
    },
    { label: 'Source code', href: 'https://github.com/nasasrisaivb-afk/-cropvibe', external: true },
  ],

  overview: {
    narrative:
      'CropVibe is an agricultural marketplace for a market where one person is rarely one kind of user. A farmer who sells 40 quintals of paddy in March rents out her tractor in May, hires a soil consultant in June and runs a workshop for neighbours in August. Most agri platforms model those as four different products — four logins, four apps, four empty inboxes.',
    narrativeExtra:
      'I designed CropVibe around a single account that carries five roles — Seller, Buyer, Rental Provider, Service Provider and Educator — with the interface reshaping itself around whichever role you are currently wearing. Phase 1 shipped the web dashboard, the consultancy booking module and an admin console, on a token-based design system built for one-handed use on a mid-range Android phone in patchy signal.',
    highlights: [
      { value: '5', label: 'Roles on one account', note: 'Seller · Buyer · Rental · Service · Educator' },
      { value: '7', label: 'Product modules designed', note: 'Marketplace, rentals, consultancy, courses, orders, intel, admin' },
      { value: '3 steps', label: 'Service booking flow', note: 'Down from a catalogue with no booking action at all' },
      { value: 'WCAG 2.1 AA', label: 'Accessibility target', note: 'Contrast, 44px targets and keyboard paths in the token layer' },
    ],
  },

  businessProblem: {
    narrative:
      'The business had a supply problem disguised as a demand problem. Every new revenue line — equipment rental, paid advisory, courses — was being scoped as its own product, which meant every line needed its own acquisition, its own onboarding and its own trust-building from zero. Growth cost five times what it should.',
    narrativeExtra:
      'The commercial question I was given was blunt: can one account carry five businesses without the interface collapsing into a menu of menus? If it could, every user acquired for produce became a candidate supplier for rentals and services at no extra acquisition cost.',
  },

  userProblem: {
    narrative:
      'For the people using it, the problem was smaller and sharper: the platform could show them things but could not let them act. The consultancy catalogue is the clearest example — an audit of the existing flow found service cards with no booking action on them at all, and tab labels that gave no clue whether you were looking at services you could buy or services you were selling.',
    narrativeExtra:
      'Underneath that sat a literacy and confidence problem. Many users are first-generation smartphone owners transacting amounts that matter — a rental booking can be a week of income. Ambiguity is not an inconvenience for them; it is a reason to stop and call someone instead.',
  },

  context: {
    narrative:
      'Rural and semi-urban India, mid-range Android, data that is cheap but unreliable, screens used outdoors in sunlight and often one-handed while doing something else. English is the interface language but frequently the second or third language of the person reading it.',
    narrativeExtra:
      'That context set hard constraints before a single screen was drawn: high contrast rather than low-contrast elegance, generous touch targets, no interaction that depends on hover, no flow that loses state if the connection drops mid-step, and copy written at a reading level that survives translation.',
  },

  research: {
    narrative:
      'With no budget for a formal lab study, I ran research that was cheap, fast and honest about its limits: a heuristic and flow audit of the existing product, structured interviews with people on both sides of a transaction, and a competitive teardown of the apps our users already had installed.',
    narrativeExtra:
      'The audit turned out to be the highest-yield activity. Walking every route in the product and writing down the exact moment I stopped knowing what to do next produced a defect list that was immediately actionable — including the missing booking CTA and the ambiguous catalogue tabs, both of which shipped as fixes in the first build week.',
    methods: [
      'Heuristic + flow audit of every existing route, state by state',
      'Semi-structured interviews — sellers, buyers, equipment owners, advisors',
      'Competitive teardown of the marketplace and payment apps users already trust',
      'Component inventory of the existing front-end to find the real design debt',
      'Proxy-user testing with first-generation smartphone owners',
    ],
    participants:
      '11 conversations across the five roles, plus 6 moderated walkthroughs on the participants’ own phones',
  },

  insights: [
    {
      title: 'People do not identify with one role — they switch between them by season',
      detail:
        'Every participant who sold produce also did at least one other thing on the platform. Asking them to pick an identity at sign-up was asking them to describe their March self in August.',
      quote: 'In this season I am selling. After harvest I rent the tractor out. It is the same me.',
      evidence: '9 / 11 participants held two or more roles',
    },
    {
      title: 'Ambiguity reads as risk, and risk ends the session',
      detail:
        'When users could not tell whether a screen was showing what they could buy or what they were selling, they did not experiment to find out. They stopped and phoned someone.',
      evidence: '5 / 6 walkthroughs abandoned the consultancy tab within 20 seconds',
    },
    {
      title: 'Trust is built by specifics, not by star ratings',
      detail:
        'An advisor listing was judged on named credentials, years of experience and reviews attached to a real booking. A bare 4.6-star average was dismissed as something anyone could buy.',
      quote: 'Anyone can put five stars. Show me who he actually helped.',
      evidence: '6 / 6 walkthroughs asked for the advisor’s qualification before price',
    },
    {
      title: 'A price without a date is not an offer',
      detail:
        'Users would not commit to a service or a rental until they could see which days it was actually available. Price-first cards produced enquiries; date-first cards produced bookings.',
      evidence: 'Raised unprompted in 8 / 11 interviews',
    },
    {
      title: 'The last screen of a transaction is the one that gets screenshotted',
      detail:
        'Confirmation is the artefact people keep. A confirmation code that can be read out on a phone call mattered more than any in-app notification we could design.',
      quote: 'I will show this number to him when he comes.',
      evidence: '4 participants photographed the confirmation screen during testing',
    },
  ],

  personas: [
    {
      name: 'Suresh',
      role: 'Smallholder farmer — Buyer & Seller',
      context:
        'Four acres, mixed paddy and vegetables. Sells at harvest, buys inputs in bulk, hires a soil advisor once a season. Uses one Android phone that the whole household shares.',
      goals: [
        'Sell produce without going through three middlemen',
        'Know what a service will cost before committing',
        'Keep proof of every transaction he can show someone',
      ],
      frustrations: [
        'Cannot tell which screens are for buying and which for selling',
        'Forms that lose everything he typed when the signal drops',
        'Prices quoted without availability, so nothing can be planned',
      ],
      quote: 'I do not want to learn an app. I want to finish the work.',
      techComfort: 'Low',
    },
    {
      name: 'Rakesh',
      role: 'Agronomist — Service Provider',
      context:
        'Independent soil-health consultant covering roughly 40 villages. Runs his practice from a phone between field visits; his calendar is WhatsApp messages and memory.',
      goals: [
        'Fill empty days in his week without cold-calling',
        'Show credentials that distinguish him from unqualified advisors',
        'See tomorrow’s bookings in one glance before he leaves home',
      ],
      frustrations: [
        'Double-booking himself across WhatsApp threads',
        'Being compared on price alone against people with no qualification',
        'Repeating his availability to every new enquiry',
      ],
      quote: 'My reputation is the product. Let me show it properly.',
      techComfort: 'Medium',
    },
    {
      name: 'Meena',
      role: 'Equipment owner — Rental Provider',
      context:
        'Owns a tractor and two implements. Rents them out in the gaps between her own fieldwork, currently by word of mouth within about 15km.',
      goals: [
        'Rent out equipment only on days she does not need it',
        'Avoid disputes about condition and return time',
        'Be paid without chasing anyone',
      ],
      frustrations: [
        'No way to block out the days she needs the tractor herself',
        'Verbal agreements that both sides remember differently',
      ],
      quote: 'The machine is idle four days a week. That is money sitting in a shed.',
      techComfort: 'Medium',
    },
    {
      name: 'Anand',
      role: 'Platform operations — Admin',
      context:
        'Reviews new listings, verifies provider credentials and resolves disputes. Works on a laptop, needs volume and speed rather than delight.',
      goals: [
        'Verify a provider in under a minute',
        'Spot the listings that will cause disputes before they do',
        'Act on a queue without losing his place in it',
      ],
      frustrations: [
        'Context-switching between records to answer one question',
        'No way to tell a verified credential from a claimed one',
      ],
      techComfort: 'High',
    },
  ],

  journey: [
    {
      stage: 'Need appears',
      doing: 'Notices yellowing leaves and decides he needs a soil test',
      thinking: '“Who do I call, and what will this cost me?”',
      feeling: 'Anxious',
      opportunity: 'Meet the need with a browsable catalogue rather than a search box on an empty page',
    },
    {
      stage: 'Looks for help',
      doing: 'Opens the consultancy section and scans the cards',
      thinking: '“Are these people I can hire, or is this for someone selling services?”',
      feeling: 'Frustrated',
      opportunity: 'Role-aware page copy and a booking CTA on every card — the two defects the audit found',
    },
    {
      stage: 'Judges the provider',
      doing: 'Opens a listing and looks for qualifications before price',
      thinking: '“Is he actually an agronomist, or just confident?”',
      feeling: 'Neutral',
      opportunity: 'Credentials and verification badges above the fold; reviews tied to a real booking',
    },
    {
      stage: 'Checks it is possible',
      doing: 'Looks for days the advisor can actually come',
      thinking: '“Thursday would work. Can he do Thursday?”',
      feeling: 'Hopeful',
      opportunity: '30-day availability calendar inside the listing, not after a form',
    },
    {
      stage: 'Books',
      doing: 'Completes the booking on a shared phone, outdoors, on weak signal',
      thinking: '“Please do not lose this.”',
      feeling: 'Anxious',
      opportunity: 'Three short steps, state preserved between them, sticky CTA within thumb reach',
    },
    {
      stage: 'Holds the proof',
      doing: 'Screenshots the confirmation and shows it to the advisor on arrival',
      thinking: '“This is my receipt.”',
      feeling: 'Confident',
      opportunity: 'A readable confirmation code, and the same booking visible later under Orders',
    },
  ],

  painPoints: [
    {
      title: 'Service cards had no way to book',
      detail:
        'The catalogue rendered price, provider and rating but carried no booking action, so the highest-intent moment in the product was a dead end.',
      severity: 'Critical',
      who: 'Buyers',
    },
    {
      title: 'Tab labels did not say whose side you were on',
      detail:
        'The same catalogue served buyers and providers with identical copy, so neither group could tell whether a screen was for hiring or for being hired.',
      severity: 'Critical',
      who: 'Buyers and Service Providers',
    },
    {
      title: 'Availability was invisible until after an enquiry',
      detail:
        'Users had to commit to contacting a provider before finding out whether the provider could come at all.',
      severity: 'High',
      who: 'Buyers',
    },
    {
      title: 'Credentials were unverifiable claims',
      detail:
        'Nothing distinguished a qualified agronomist from an enthusiastic one, which pushed the whole category towards competing on price.',
      severity: 'High',
      who: 'Buyers and Service Providers',
    },
    {
      title: 'Bookings did not survive into the rest of the product',
      detail:
        'A completed booking existed only as a confirmation screen; it never appeared under Orders, so there was nothing to return to.',
      severity: 'High',
      who: 'Everyone',
    },
    {
      title: 'One identity per account forced duplicate sign-ups',
      detail:
        'Users who both bought and sold had to choose at registration, and several had made two accounts to work around it.',
      severity: 'Medium',
      who: 'Multi-role users',
    },
  ],

  problemDefinition: {
    statement:
      'People in agriculture hold several commercial roles at once and switch between them by season. CropVibe needs to let one account act as a buyer, a seller, a renter, an advisor and an educator — while keeping every individual screen unambiguous about which of those you are doing right now, and every transaction completable in three steps on a shared mid-range phone with unreliable signal.',
    hmw: [
      'How might we let a person carry five commercial roles without turning the interface into a menu of menus?',
      'How might we make it obvious, on every screen, which side of a transaction you are currently on?',
      'How might we show availability early enough that price becomes a decision rather than an enquiry?',
      'How might we let providers prove credentials in a way buyers actually believe?',
      'How might we make a transaction survive a dropped connection halfway through?',
      'How might we give every completed booking an artefact the user can show to another human being?',
    ],
  },

  informationArchitecture: {
    narrative:
      'The architectural decision that made everything else possible was to stop modelling roles as separate products and model them as a lens over one shared structure. The account holds capabilities; the header holds a role switcher; the modules underneath stay in the same place and re-point at the same person’s data from the other side.',
    narrativeExtra:
      'Practically that means Orders is one destination that shows purchases when you are a Buyer and bookings-to-fulfil when you are a Service Provider, rather than two separate sections competing for the same word. Dynamic breadcrumbs carry the role context down into detail pages so a deep link never arrives without it.',
    tree: [
      {
        label: 'Account (one identity, five roles)',
        children: [
          { label: 'Role switcher — Seller · Buyer · Rental · Service · Educator' },
          { label: 'Profile, credentials & verification' },
        ],
      },
      {
        label: 'Marketplace',
        children: [
          { label: 'Produce listings — browse, filter, compare' },
          { label: 'Listing detail — price, quantity, seller' },
          { label: 'Create listing (Seller lens)' },
        ],
      },
      {
        label: 'Rentals',
        children: [
          { label: 'Equipment' },
          { label: 'Operators' },
          { label: 'Maintenance' },
          { label: 'Availability calendar' },
        ],
      },
      {
        label: 'Consultancy',
        children: [
          { label: 'Service catalogue — search, filters, chips' },
          { label: 'Service detail — provider, credentials, reviews, 30-day availability' },
          { label: 'Booking — 3 steps + confirmation' },
        ],
      },
      { label: 'Learning — courses, workshops (Educator lens)' },
      {
        label: 'Orders',
        children: [
          { label: 'Purchases (Buyer lens)' },
          { label: 'Bookings to fulfil (Provider lens)' },
        ],
      },
      { label: 'Intel — prices, demand signals' },
      {
        label: 'Admin console',
        children: [{ label: 'Verification queue' }, { label: 'Listing moderation' }, { label: 'Disputes' }],
      },
    ],
  },

  userFlows: {
    narrative:
      'I mapped four flows in detail, chosen because each one is a point where the platform either earns money or loses a user. Every flow was drawn with its failure states first — what happens on a dropped connection, an unavailable date, an unverified provider — because those are the states that decide whether the happy path is ever reached twice.',
    flows: [
      {
        name: 'Book a service',
        goal: 'Go from a need to a confirmed appointment in three steps',
        steps: [
          'Catalogue — search with suggestions, filter by status, location, price, sort',
          'Service detail — credentials, verified reviews, 30-day availability calendar',
          'Step 1 — choose a date from days the provider is actually free',
          'Step 2 — describe the problem, confirm location',
          'Step 3 — review and confirm',
          'Confirmation — readable code, and the booking appears under Orders',
        ],
        decision:
          'The booking sheet is lazy-loaded and code-split: the catalogue stays light for the many people who browse, and the heavier flow only loads for the few who commit.',
      },
      {
        name: 'Switch role',
        goal: 'Change which side of the platform you are acting on, without losing your place',
        steps: [
          'Open the role switcher in the header',
          'Pick a role — each shows its own one-line description',
          'Navigation, page copy and CTAs re-point to that role',
          'Return to the equivalent screen, not to the home page',
        ],
        decision:
          'Switching role never resets your location. Landing back on a dashboard after every switch is what teaches people not to switch.',
      },
      {
        name: 'List produce for sale',
        goal: 'Publish a sellable listing from a phone, in a field',
        steps: [
          'Seller lens → Add product',
          'Crop, grade, quantity, price — one decision per screenful',
          'Photos from the camera, compressed client-side',
          'Review and publish, with a draft preserved if the connection drops',
        ],
        decision:
          'Long forms were split into short steps with progress preserved, because the audit showed abandonment clustering at the point where the keyboard covered the submit button.',
      },
      {
        name: 'Verify a provider (admin)',
        goal: 'Clear the verification queue without losing your place in it',
        steps: [
          'Open the queue, sorted by age',
          'Review credentials side by side with the claim',
          'Approve, reject with a reason, or request more information',
          'Return to the queue with position and filters intact',
        ],
        decision:
          'The admin console optimises for volume, not delight: dense rows, keyboard-first, and no modal that hides the queue behind it.',
      },
    ],
  },

  wireframes: {
    narrative:
      'I wireframed at low fidelity in greyscale and deliberately over-long — every state drawn, not just the populated one. The rule I hold myself to is that a screen is not designed until its loading, empty, error and not-found versions exist, because those are the versions a first-time user on a weak connection actually meets.',
    items: [
      { name: 'Catalogue — populated, loading, empty, no-results', detail: 'Four boards, one per state, so the engineer never has to invent one' },
      { name: 'Service detail — verified, unverified, unavailable', detail: 'Credential block moved above price after the first walkthroughs' },
      { name: 'Booking sheet — 3 steps + confirmation + failure', detail: 'Each step fits above the keyboard on a 360×640 viewport' },
      { name: 'Role switcher — closed, open, mid-switch', detail: 'Tested as a sheet on mobile and a menu on desktop' },
      { name: 'Orders — buyer view and provider view', detail: 'One destination, two lenses, proving the IA decision held' },
    ],
  },

  exploration: {
    narrative:
      'The central design argument was how to express five roles. I built and pressure-tested three models against the same two questions: can a low-confidence user tell which side they are on, and does it still work when a sixth role is added?',
    options: [
      {
        name: 'Separate apps per role',
        summary: 'Each role becomes its own product with its own login and navigation.',
        pros: ['Zero ambiguity inside a single app', 'Teams can ship independently'],
        cons: [
          'Multi-role users need several accounts — which some had already resorted to',
          'Acquisition cost multiplies per role',
          'Reputation and credentials cannot travel between roles',
        ],
      },
      {
        name: 'One merged interface showing everything at once',
        summary: 'A single dashboard surfacing every capability the account holds.',
        pros: ['Nothing is hidden', 'No mode to learn'],
        cons: [
          'Navigation grows with every role until it is unreadable',
          'Buy and sell actions sit side by side — exactly the ambiguity testing punished',
          'Worst option on a 360px viewport',
        ],
      },
      {
        name: 'One account, explicit role lens',
        summary:
          'A persistent role switcher in the header; navigation, copy and CTAs re-point to the active role while the underlying structure stays put.',
        pros: [
          'Each screen answers "which side am I on" before the user has to ask',
          'A sixth role is a new lens, not a new information architecture',
          'Credentials, reviews and order history accumulate on one identity',
        ],
        cons: [
          'Introduces a mode, which must be visible at all times to be safe',
          'Every module has to be designed twice — once per relevant lens',
        ],
        chosen: true,
      },
    ],
  },

  uiDesign: {
    narrative:
      'The interface is high-contrast and unapologetically plain. Sunlight, cracked screens and shared devices make low-contrast subtlety a usability defect, so the visual system spends its energy on hierarchy and legibility rather than atmosphere.',
    narrativeExtra:
      'A 60/30/10 split keeps it disciplined: a calm canvas holding most of the screen, white surfaces carrying content, and a single signature colour reserved almost entirely for the primary action. When the accent appears, it means "this is the thing to press".',
    principles: [
      { name: 'One decision per screenful', detail: 'On a 360px viewport, anything that competes with the primary action is moved or removed' },
      { name: 'State before style', detail: 'Loading, empty, error and not-found are designed alongside the populated view, never after' },
      { name: 'Contrast is a requirement, not a mood', detail: 'Every text and control pairing is checked against WCAG 2.1 AA before it enters the system' },
      { name: 'Thumb-reachable commitment', detail: 'The action that costs money sits within thumb reach and stays there — the detail page uses a sticky mobile CTA' },
      { name: 'No hover-only meaning', detail: 'Anything communicated on hover is also communicated on focus and on a touch device' },
    ],
  },

  designSystem: {
    narrative:
      'The system is a token layer rather than a sticker sheet, which is what let a small team ship seven modules that still look like one product. Colour, surface, border, spacing, radius and touch-target rules live as CSS custom properties consumed directly by the components, so a change to a token is a change everywhere at once.',
    narrativeExtra:
      'Accessibility lives in the same layer. Because the minimum touch target and the contrast-checked pairings are tokens rather than review comments, a component cannot be built out of compliance without deliberately reaching around the system.',
    tokens: [
      { name: '60 / 30 / 10 colour split', detail: 'Canvas · surfaces and structure · a single accent held back for primary actions' },
      { name: 'Semantic colour roles', detail: 'Background, surface, border, text, muted, accent, success, warning, danger — never raw hex in a component' },
      { name: '8px spacing grid', detail: 'Every gap, pad and offset is a multiple, so vertical rhythm survives contributions from four people' },
      { name: 'Radius scale (12–24px on panels)', detail: 'Panel radius is a token, which is why rentals and reports look related' },
      { name: '44px minimum touch target', detail: 'Encoded as a utility so compliance is the default, not a review finding' },
    ],
    components: [
      'Button (4 emphases × 3 sizes)',
      'Card / panel',
      'Badge & verification mark',
      'Tag & filter chip',
      'Sheet (mobile) / modal (desktop)',
      'Toast',
      'PageHeader with dynamic breadcrumbs',
      'Availability calendar',
      'Skeleton loaders',
      'Empty & not-found states',
      'Search with suggestions',
      'Filter bar with active chips + clear all',
      'Role switcher',
    ],
  },

  prototyping: {
    narrative:
      'Prototyping happened in two registers. Figma for the arguments — what goes where, in what order, with what emphasis — and the real front-end for anything where the answer depended on feel: the booking sheet, the calendar, the role switch.',
    narrativeExtra:
      'Pairing directly in code shortened the loop from days to minutes on the decisions that mattered most, and it meant the states I had drawn were the states that actually shipped rather than the ones that survived translation.',
    artefacts: [
      { name: 'Clickable Figma flow — booking end to end', detail: 'Used for the walkthroughs, including the failure states' },
      { name: 'Coded availability calendar', detail: 'Built in the real front-end because 30 dates in a thumb-sized grid cannot be judged from a static frame' },
      { name: 'Role-switch prototype', detail: 'Tested as a bottom sheet on mobile against a dropdown on desktop' },
      { name: 'Live demo build', detail: 'Deployed and shared, so feedback arrived from real phones rather than screenshots' },
    ],
  },

  usabilityTesting: {
    narrative:
      'Six moderated walkthroughs, on the participants’ own phones, with one task: hire someone to look at your soil. I stayed silent unless a participant asked a direct question, and recorded the exact word or element where they hesitated.',
    narrativeExtra:
      'The most useful thing testing produced was not a list of fixes but an ordering. Confidence problems — "am I allowed to press this" — outranked efficiency problems everywhere, so the roadmap led with clarity and only then with speed.',
    setup:
      '6 participants · own devices · 2 buyers, 2 providers, 2 multi-role · single task with think-aloud · roughly 25 minutes each',
    findings: [
      {
        issue: 'Catalogue offered no way to act on a service',
        severity: 'Critical',
        evidence: '5 / 6 participants scrolled the catalogue twice, then stopped and asked what to do',
        fix: 'Added an explicit Book now action to every card, plus View details as the secondary path',
      },
      {
        issue: 'Tabs did not distinguish buying from selling',
        severity: 'Critical',
        evidence: 'Both providers believed the catalogue was where they would list their own service',
        fix: 'Role-aware page copy and tab labels that name the side you are on',
      },
      {
        issue: 'Price was read before credentials, then regretted',
        severity: 'Major',
        evidence: '4 / 6 chose the cheapest provider, then reversed once they found the qualifications lower down',
        fix: 'Moved credentials and verification above price on the detail page',
      },
      {
        issue: 'Submit button hidden behind the keyboard',
        severity: 'Major',
        evidence: '3 / 6 typed their problem description and then could not find the way forward',
        fix: 'Sticky step footer and shorter steps that fit above the keyboard at 360×640',
      },
      {
        issue: 'Confirmation felt like an ending, not a record',
        severity: 'Major',
        evidence: '4 participants screenshotted the screen because they did not trust it to persist',
        fix: 'Readable confirmation code, plus the booking written into Orders where it can be found again',
      },
      {
        issue: 'Filters could be stacked but not understood',
        severity: 'Minor',
        evidence: '2 / 6 ended up with an empty result set and could not tell why',
        fix: 'Active filter chips with individual removal and a clear-all, plus a no-results state that names the filters in play',
      },
    ],
  },

  iterations: [
    {
      version: 'v1 — audit fixes',
      changed: 'Book now on every card; role-aware copy and unambiguous tabs',
      because: 'The catalogue was unusable for its primary purpose and unreadable for its secondary audience',
      result: 'The highest-intent screen in the product became actionable in the first build week',
    },
    {
      version: 'v2 — trust before price',
      changed: 'Credentials and verification badges above price; reviews tied to a completed booking',
      because: 'Participants chose on price and reversed on qualification — the information was in the wrong order',
      result: 'Provider choice became a considered decision rather than a sort by cheapest',
    },
    {
      version: 'v3 — availability first',
      changed: 'A 30-day availability calendar inside the listing, ahead of the booking flow',
      because: 'A price without a date was treated as an enquiry, not an offer',
      result: 'Date feasibility is settled before anyone invests effort in a form',
    },
    {
      version: 'v4 — survivable booking',
      changed: 'Three short steps, state preserved between them, sticky footer, lazy-loaded sheet',
      because: 'Steps were being abandoned at the keyboard, and the catalogue was carrying the weight of a flow most visitors never opened',
      result: 'Commitment fits above the keyboard, and browsing no longer pays for booking',
    },
    {
      version: 'v5 — the booking has an afterlife',
      changed: 'Bookings persist into Orders with a readable confirmation code; provider sees a manage view of the same record',
      because: 'People screenshotted confirmations because they did not believe the record existed',
      result: 'One record, two lenses — the clearest proof that the role model was the right architecture',
    },
  ],

  finalSolution: {
    narrative:
      'CropVibe ships as one account that can act as five businesses. The role switcher sits in the header; the modules stay where they are and change whose side they are on. The consultancy module went from a catalogue you could only look at to a bookable service with credentials, availability, a three-step flow and a record that persists.',
    features: [
      {
        name: 'One account, five roles, explicit lens',
        detail:
          'A persistent role switcher reshapes navigation, copy and CTAs. Reputation and history accumulate on one identity instead of fragmenting across sign-ups.',
        answers: 'People hold several commercial roles and switch between them by season',
      },
      {
        name: 'Three-step booking with a survivable flow',
        detail:
          'Date → details → review, each step sized to fit above the keyboard, state preserved between steps, and the sheet lazy-loaded so browsing stays fast.',
        answers: 'Abandonment at the keyboard, and a catalogue paying for a flow most users never open',
      },
      {
        name: 'Availability before commitment',
        detail: 'A 30-day calendar inside the listing shows the days a provider can actually come, before any form is opened.',
        answers: 'A price without a date is not an offer',
      },
      {
        name: 'Credentials and verified reviews',
        detail:
          'Named qualifications and verification badges sit above price; reviews carry a verified-booking mark so they cannot be manufactured.',
        answers: 'Trust is built by specifics, not by star ratings',
      },
      {
        name: 'Every state designed',
        detail:
          'Skeleton loaders, empty states, no-results that name the active filters, and not-found pages for shared links — designed, not improvised.',
        answers: 'First-time users on weak connections meet these screens first',
      },
      {
        name: 'A record with an afterlife',
        detail:
          'Bookings persist into Orders with a readable confirmation code — as a purchase for the buyer and a job to fulfil for the provider.',
        answers: 'The last screen of a transaction is the one that gets screenshotted',
      },
      {
        name: 'Admin console built for volume',
        detail: 'A dense, keyboard-first verification and moderation queue that keeps your place when you act on a row.',
        answers: 'Operations needs throughput, not delight',
      },
    ],
  },

  impact: {
    narrative:
      'Phase 1 is shipped and publicly demonstrable: the web dashboard, the consultancy module end to end, and the admin console, all on the shared token system. The outcomes below separate what is verifiable in the product today from what still needs measuring in production — a distinction I would rather make explicitly than paper over.',
    narrativeExtra:
      'The architectural result is the one I am most confident about. Adding a sixth role is now a lens over an existing structure rather than a new product, and that is a design decision with a direct commercial consequence.',
    metrics: [
      { value: '5 → 1', label: 'Accounts a multi-role user needs', note: 'Verifiable: one identity carries all five roles' },
      { value: '0 → 3 steps', label: 'Service booking', note: 'Verifiable: the catalogue previously had no booking action at all' },
      { value: '7', label: 'Modules on one design system', note: 'Verifiable: marketplace, rentals, consultancy, courses, orders, intel, admin' },
      { value: '4 states', label: 'Designed per screen', note: 'Verifiable: loading, empty, error and not-found ship as components' },
      { value: 'Code-split', label: 'Booking sheet loading', note: 'Verifiable: lazy-loaded, so the catalogue does not carry the flow' },
      { value: 'To measure', label: 'Booking completion rate', note: 'Needs production analytics — no baseline existed, since booking was impossible' },
    ],
  },

  learnings: [
    'The audit was worth more than the interviews. Walking every route and writing down the exact moment I stopped knowing what to do next produced defects I could fix in week one — a missing CTA and an ambiguous label were doing more damage than anything I would have found in a workshop.',
    'Modelling identity is an architecture decision, not a settings screen. Choosing "one account, explicit lens" over "one app per role" is what made a sixth revenue line cheap, and it was decided with sketches and arguments long before any interface existed.',
    'Ordering information is a design act. Nothing was added to make credentials beat price — the two blocks simply swapped places, and the decision people made changed.',
    'Designing the unhappy states first improves the happy path. Once loading, empty and error views had to exist, the populated view got simpler, because I stopped hiding complexity in the assumption that everything would load.',
    'Building in the real front-end changed which arguments I could win. For the calendar and the booking sheet, a coded prototype settled in minutes what static frames had been debating for days.',
    'I should have set up measurement in parallel with design. Because booking was previously impossible, there is no before-figure for the most important number in the project — a gap I now design around by agreeing the metric before the first sprint.',
  ],

  nextSteps: [
    'Instrument the booking funnel and publish a real completion-rate baseline',
    'Payments, and the trust work that has to surround them',
    'Regional language support — the copy was written to be translated, and that now needs proving',
    'Full keyboard and screen-reader audit against WCAG 2.1 AA, with findings fed back into the token layer',
    'Extend the role lens to a sixth role to test the architecture claim in practice',
  ],
};
