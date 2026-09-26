import type { CaseStudy } from '../types';

/**
 * DEXA — logistics operations.
 * ⚠️ Narrative and figures need your real project detail before publishing.
 *    Structure and design reasoning are ready; swap in your numbers.
 */
export const dexa: CaseStudy = {
  slug: 'dexa',
  title: 'DEXA',
  tagline: 'Designing for the dispatcher: a control tower for delivery operations',
  description:
    'Logistics teams were running live operations out of spreadsheets, phone calls and three chat groups. I designed a single operations view that shows what is late, why, and what to do about it — built around the way dispatchers actually make decisions under time pressure.',
  industry: 'Logistics',
  tags: ['Exception queues', 'Dashboards', 'Data density', 'Workflow design', 'Desktop-first'],
  projectType: 'Operations tooling',
  role: 'Product designer — research, workflow modelling, IA, UX, UI, design system contributions',
  team: ['Me (product design)', '3 engineers', 'Operations lead', 'Two dispatchers as embedded experts'],
  timeline: '11 weeks',
  year: 2025,
  status: 'Shipped',
  contribution:
    'Turned a reactive job-list into an exception-first operations view, so dispatchers stop reading every row and start acting on the ten that matter.',
  featured: true,
  order: 2,
  cover: {
    src: '/media/dexa-cover.svg',
    alt: 'DEXA operations interface composition: an exception queue, a route timeline with a delayed shipment, and a shipment detail panel.',
    tint: '#2B5F7E',
  },

  overview: {
    narrative:
      'DEXA is an internal operations product for the people who keep deliveries moving — dispatchers, coordinators and operations leads. Their job is not to look at data; it is to notice the one shipment that is about to breach its window and fix it before the customer finds out.',
    narrativeExtra:
      'The existing tooling was a table of every job, sorted by creation time, with status as a column. Everything was visible and nothing was prioritised, so dispatchers had built a shadow system in spreadsheets and chat groups to keep track of what was actually going wrong. I redesigned around the exception rather than the inventory.',
    highlights: [
      { value: '3 → 1', label: 'Tools in the dispatcher’s loop', note: 'Table, spreadsheet and chat group collapsed into one view' },
      { value: 'Exception-first', label: 'Core interaction model', note: 'The queue shows what is wrong, not what exists' },
      { value: '11 weeks', label: 'Research to shipped', note: 'Two-week research, then fortnightly releases' },
      { value: '2 roles', label: 'Designed in parallel', note: 'Dispatcher and operations lead need different altitudes' },
    ],
  },

  businessProblem: {
    narrative:
      'Late deliveries were being discovered by customers instead of by the operations team. Each one cost a credit, a support conversation and a measurable amount of trust — and because escalation happened over chat, there was no record from which to learn.',
    narrativeExtra:
      'The business wanted a dashboard. What it needed was a change in when information arrives: early enough to act, prioritised enough to act on the right thing, and recorded well enough to explain afterwards.',
  },

  userProblem: {
    narrative:
      'Dispatchers were doing the software’s job in their heads. They scanned a table of hundreds of rows, held the at-risk shipments in working memory, cross-checked a spreadsheet a colleague maintained by hand, and negotiated fixes in a chat group where decisions vanished as the thread scrolled.',
    narrativeExtra:
      'Every one of those steps was a place to lose something. The cost was not slowness — experienced dispatchers were fast — it was that the system gave them no way to be confident they had not missed something.',
  },

  context: {
    narrative:
      'Two or three monitors, a desk phone that rings constantly, and shifts where attention is the scarcest resource in the building. Interruptions are the norm: any flow that cannot survive being abandoned mid-way and resumed ten minutes later will not be used.',
    narrativeExtra:
      'This is the opposite of a mobile marketplace. Here, density is kindness — whitespace that forces scrolling costs a dispatcher the comparison they were making. The design brief was closer to an air-traffic display than a consumer app.',
  },

  research: {
    narrative:
      'I spent the first two weeks beside dispatchers during live shifts, which is the only way to see the shadow system. What people describe in an interview is the official process; what they do at 4pm on a Friday is the real one.',
    narrativeExtra:
      'I timed and counted rather than only listening: how many times a dispatcher switched windows to answer one question, how long a delay took to notice, how often a decision made in chat was later re-litigated because nobody could find it.',
    methods: [
      'Contextual inquiry across live shifts, including a peak day',
      'Task analysis and window-switch counts for the five most frequent decisions',
      'Artefact analysis of the shadow spreadsheets dispatchers maintained themselves',
      'Chat-log review to reconstruct how escalations actually travelled',
      'Interviews with operations leads on the reporting they were assembling by hand',
    ],
    participants: '4 dispatchers observed over 6 shifts, 2 operations leads interviewed',
  },

  insights: [
    {
      title: 'Dispatchers do not want to see everything — they want to see what is wrong',
      detail:
        'Every dispatcher had invented a private triage rule to reduce the table to a workable list. The software was making them re-derive their priorities on every refresh.',
      quote: 'I am not reading four hundred rows. I am looking for the ones that are going to hurt.',
      evidence: '4 / 4 dispatchers maintained a manual at-risk list outside the product',
    },
    {
      title: 'A status is not a reason',
      detail:
        '"Delayed" told them a fact and nothing actionable. The next question was always why, and answering it meant opening two more windows.',
      evidence: 'Median 3 window switches to explain a single delay',
    },
    {
      title: 'The most expensive moment is the handover',
      detail:
        'Shift changes lost context. The incoming dispatcher inherited a table with no memory of what had already been chased.',
      quote: 'I spend the first twenty minutes finding out what the last shift already knows.',
      evidence: 'Raised by 4 / 4 dispatchers, unprompted',
    },
    {
      title: 'Decisions made in chat were invisible to the system',
      detail:
        'The reasoning behind a fix — why this shipment was re-routed rather than that one — lived in a thread and was gone by the next day.',
      evidence: 'Chat review found repeated re-litigation of decisions already made',
    },
    {
      title: 'Operations leads need a different altitude, not a bigger table',
      detail:
        'Leads were assembling weekly reports manually from the same screen dispatchers used for live work. One altitude cannot serve both.',
      evidence: '2 / 2 leads maintained parallel spreadsheets',
    },
  ],

  personas: [
    {
      name: 'Priya',
      role: 'Dispatcher',
      context:
        'Runs a region across a shift, three windows open, phone ringing. Judged on exceptions handled before they become complaints.',
      goals: [
        'Know within seconds what is at risk right now',
        'See the reason for a delay without leaving the screen',
        'Hand over cleanly at the end of a shift',
      ],
      frustrations: [
        'Re-deriving her priorities every time the table refreshes',
        'Opening three windows to explain one delay',
        'Losing the thread of what has already been chased',
      ],
      quote: 'Tell me what is broken and who I need to call.',
      techComfort: 'High',
    },
    {
      name: 'Daniel',
      role: 'Operations lead',
      context:
        'Accountable for regional performance. Needs patterns and causes, not individual rows, and has to explain last week to people who were not there.',
      goals: [
        'See which failure causes repeat, and where',
        'Support the team without taking over their queue',
        'Report without rebuilding the numbers by hand',
      ],
      frustrations: [
        'Only having the dispatcher’s live view to work from',
        'No record of why a decision was taken',
      ],
      quote: 'I can see what happened. I cannot see why it keeps happening.',
      techComfort: 'High',
    },
  ],

  journey: [
    {
      stage: 'Shift starts',
      doing: 'Opens the tool, scans for what the last shift left behind',
      thinking: '“What am I walking into?”',
      feeling: 'Anxious',
      opportunity: 'A handover summary: open exceptions, what was chased, what is still waiting',
    },
    {
      stage: 'Scanning',
      doing: 'Reads a table of hundreds of rows applying a private triage rule',
      thinking: '“Which of these is going to hurt?”',
      feeling: 'Frustrated',
      opportunity: 'An exception queue ordered by consequence, so triage is the product’s job',
    },
    {
      stage: 'Diagnosing',
      doing: 'Opens two more windows to find out why something is late',
      thinking: '“Is this traffic, a failed pickup, or a wrong address?”',
      feeling: 'Frustrated',
      opportunity: 'Reason-for-delay on the row, with the evidence one click away in place',
    },
    {
      stage: 'Acting',
      doing: 'Calls a driver, negotiates a fix, posts it in a chat group',
      thinking: '“I hope someone sees this.”',
      feeling: 'Neutral',
      opportunity: 'Actions recorded against the shipment, so the decision has a home',
    },
    {
      stage: 'Handing over',
      doing: 'Writes a hurried summary in chat, or does not',
      thinking: '“They will work it out.”',
      feeling: 'Neutral',
      opportunity: 'Handover generated from what actually happened, not from memory',
    },
    {
      stage: 'Reviewing',
      doing: 'Lead rebuilds the week from the live screen and a spreadsheet',
      thinking: '“I am reverse-engineering my own operation.”',
      feeling: 'Frustrated',
      opportunity: 'A separate altitude for patterns and causes, fed by the same records',
    },
  ],

  painPoints: [
    {
      title: 'Everything visible, nothing prioritised',
      detail: 'A table sorted by creation time forces every dispatcher to invent triage in their head, every refresh.',
      severity: 'Critical',
      who: 'Dispatchers',
    },
    {
      title: 'Status without cause',
      detail: '"Delayed" starts an investigation instead of ending one, at a median of three window switches.',
      severity: 'Critical',
      who: 'Dispatchers',
    },
    {
      title: 'Decisions leave no trace',
      detail: 'Fixes negotiated in chat are invisible to the system and lost by the next shift.',
      severity: 'High',
      who: 'Dispatchers and leads',
    },
    {
      title: 'Handover depends on goodwill',
      detail: 'Continuity between shifts is carried by a hurried message rather than by the product.',
      severity: 'High',
      who: 'Dispatchers',
    },
    {
      title: 'One altitude for two jobs',
      detail: 'Live operations and performance review share a screen, so neither is well served.',
      severity: 'Medium',
      who: 'Operations leads',
    },
  ],

  problemDefinition: {
    statement:
      'Dispatchers are accountable for exceptions but are given an inventory. DEXA needs to surface what is at risk, why, and what has already been done about it — inside one interruptible view, at a density that suits a desk with three windows open, while giving operations leads a separate altitude on the same records.',
    hmw: [
      'How might we make triage the product’s job rather than the dispatcher’s?',
      'How might we put the reason for a delay next to the fact of it?',
      'How might we record the decision, not just the outcome?',
      'How might we make a shift handover a by-product of doing the work?',
      'How might we serve live operations and performance review without one diluting the other?',
    ],
  },

  informationArchitecture: {
    narrative:
      'I inverted the hierarchy. The old model was Jobs → filter → maybe find a problem. The new model is Exceptions → the shipment behind it → the record of what was done. Inventory still exists, but it stops being the front door.',
    narrativeExtra:
      'Roles get their own altitude rather than their own product: dispatchers land on the live queue, leads land on patterns and causes, and both drill into the same shipment record so there is one version of events.',
    tree: [
      {
        label: 'Operations (dispatcher altitude)',
        children: [
          { label: 'Exception queue — ordered by consequence, not by time' },
          { label: 'Shift handover — open, chased, waiting' },
          { label: 'Live map / route timeline' },
        ],
      },
      {
        label: 'Shipment record',
        children: [
          { label: 'Timeline of events' },
          { label: 'Reason for delay + evidence' },
          { label: 'Actions taken, by whom, and why' },
        ],
      },
      { label: 'Inventory — all shipments, filterable, no longer the default' },
      {
        label: 'Performance (lead altitude)',
        children: [{ label: 'Failure causes over time' }, { label: 'Region and route comparison' }, { label: 'Exportable review' }],
      },
    ],
  },

  userFlows: {
    narrative:
      'Two flows carried the redesign, and both were drawn to be interruptible from the first sketch — because a dispatcher who is pulled away by a phone call mid-task is the normal case, not the edge case.',
    flows: [
      {
        name: 'Notice → diagnose → act',
        goal: 'Resolve an at-risk shipment without leaving the operations view',
        steps: [
          'Exception queue surfaces the shipment, ordered by consequence',
          'The row states the reason, not just the status',
          'Open the detail panel in place — timeline and evidence, queue still visible',
          'Take an action; it is recorded against the shipment with a reason',
          'Return to the queue with position and filters intact',
        ],
        decision:
          'The detail opens as a side panel rather than a modal or a new page, so the dispatcher never loses the list they were comparing against.',
      },
      {
        name: 'Shift handover',
        goal: 'Transfer context without writing a summary from memory',
        steps: [
          'End of shift: the queue is already the state of play',
          'Open exceptions grouped by what has been chased and what is waiting',
          'Add a note only where the record does not explain itself',
          'Incoming dispatcher opens the same view and reads it in under a minute',
        ],
        decision:
          'Handover is generated from recorded actions rather than authored, because anything that depends on tired people writing things down will fail at exactly the wrong moment.',
      },
    ],
  },

  wireframes: {
    narrative:
      'I wireframed at full density from the start, with realistic row counts and realistic worst-case text. Operations interfaces designed with four tidy rows of sample data always break on contact with three hundred real ones, so the sketches were deliberately ugly and deliberately crowded.',
    items: [
      { name: 'Exception queue at 10, 100 and 400 rows', detail: 'Proving the ordering model still reads at volume' },
      { name: 'Row anatomy — status, reason, consequence, age', detail: 'Iterated hardest; this is the unit dispatchers actually read' },
      { name: 'Side panel vs modal vs page', detail: 'Compared directly for loss of comparison context' },
      { name: 'Handover view', detail: 'Chased / waiting / unseen, generated from the record' },
      { name: 'Empty, loading and stale-data states', detail: 'A stale live view is dangerous, so staleness is designed, not hidden' },
    ],
  },

  exploration: {
    narrative:
      'The real argument was what belongs at the top of the screen. Three models were tried against a single test: on a peak day, how long does it take a dispatcher to name the shipment that will breach next?',
    options: [
      {
        name: 'Better table',
        summary: 'Keep the inventory model; add sorting, saved filters and colour-coded statuses.',
        pros: ['Familiar to existing users', 'Cheapest to build'],
        cons: [
          'Triage stays in the dispatcher’s head',
          'Colour coding fails at volume and for colour-blind users',
          'Does nothing for handover or for recording decisions',
        ],
      },
      {
        name: 'Map-first',
        summary: 'A live geographic view as the primary interface.',
        pros: ['Immediately legible to stakeholders', 'Good for spatial clustering'],
        cons: [
          'Consequence is not a geographic property — a nearby shipment is not an urgent one',
          'Poor information density for comparison',
          'Demos well, works badly on a peak day',
        ],
      },
      {
        name: 'Exception queue',
        summary: 'A prioritised list of what is at risk, with cause and consequence on the row, and the map as a supporting view.',
        pros: [
          'Encodes triage in the product',
          'Puts cause next to fact, removing the window switches',
          'Provides the handover and the record as by-products',
        ],
        cons: [
          'Requires the ordering model to be trusted, which has to be earned',
          'Hides the full inventory, which needs a deliberate path back',
        ],
        chosen: true,
      },
    ],
  },

  uiDesign: {
    narrative:
      'Dense, quiet and monochrome until something needs attention. Colour is reserved for state and consequence, never decoration, and never as the only carrier of meaning — every severity also has a shape, a position and a word.',
    narrativeExtra:
      'Numbers are tabular-figured and right-aligned so columns can be compared by eye. Type sizes are smaller than a marketing site would allow and tested for legibility at arm’s length on a real monitor, because the alternative — comfortable sizing that halves the visible rows — costs the dispatcher the comparison they came for.',
    principles: [
      { name: 'Density is kindness here', detail: 'More comparable rows beats more comfortable spacing, within a legibility floor that was tested' },
      { name: 'Never colour alone', detail: 'Severity carries a word and a position as well as a hue' },
      { name: 'Interruptible by default', detail: 'Every task can be abandoned and resumed; nothing important lives in a modal' },
      { name: 'Staleness is visible', detail: 'A live view that has stopped updating says so, loudly' },
      { name: 'Tabular numerals everywhere', detail: 'Times, counts and IDs align so the eye can scan a column' },
    ],
  },

  designSystem: {
    narrative:
      'DEXA extended an existing internal system rather than replacing it. My contribution was the parts it lacked for operations work: a data-density scale, a severity model that does not rely on colour, and rules for panels that open in place.',
    tokens: [
      { name: 'Density scale (compact / default / comfortable)', detail: 'A row-height token, so one product can serve a laptop and a 27-inch monitor' },
      { name: 'Severity model', detail: 'Critical / warning / watch — each with a word, a position and a hue' },
      { name: 'Tabular numeral rules', detail: 'Applied to every numeric column by default' },
      { name: 'In-place panel', detail: 'Side panel geometry and focus rules, so context is never lost' },
      { name: 'Staleness indicator', detail: 'A shared pattern for "this data stopped being live" across every module' },
    ],
    components: [
      'Exception row',
      'Severity marker',
      'Reason chip',
      'In-place detail panel',
      'Route timeline',
      'Action log entry',
      'Handover summary',
      'Stale-data banner',
      'Saved view switcher',
    ],
  },

  prototyping: {
    narrative:
      'Prototypes were loaded with real exported data rather than sample rows, because the whole question was whether the model holds at volume. A queue that reads beautifully with twelve rows tells you nothing about a peak day.',
    artefacts: [
      { name: 'Clickable queue with 400 real rows', detail: 'The only way to test whether the ordering was trusted' },
      { name: 'Side-panel interaction prototype', detail: 'Measured against modal and full-page alternatives for lost context' },
      { name: 'Handover walkthrough', detail: 'Tested as a shift change with two dispatchers, one leaving and one arriving' },
    ],
  },

  usabilityTesting: {
    narrative:
      'Testing ran as timed, task-based sessions on realistic peak-day data, with the old tool as the baseline. The headline question was simple: how quickly and how confidently can a dispatcher name what will break next?',
    setup: '4 dispatchers · 2 operations leads · realistic peak-day dataset · timed tasks against the current tool as baseline',
    findings: [
      {
        issue: 'Ordering was not trusted without its reasoning',
        severity: 'Critical',
        evidence: 'Dispatchers re-sorted the queue manually until they could see why a row ranked where it did',
        fix: 'Surfaced the ranking reason on the row and made the ordering rule inspectable',
      },
      {
        issue: 'The full inventory felt lost',
        severity: 'Major',
        evidence: 'Experienced dispatchers looked for the old table to double-check the queue was complete',
        fix: 'A permanent, obvious path to all shipments, plus a count reconciling queue and inventory',
      },
      {
        issue: 'Reason chips were too abbreviated',
        severity: 'Major',
        evidence: 'Shortened cause labels were guessed wrong in 3 of 6 sessions',
        fix: 'Wrote causes as short sentences rather than codes; kept the code as a secondary detail',
      },
      {
        issue: 'Action log recorded what, not why',
        severity: 'Major',
        evidence: 'Leads could see a re-route but could not reconstruct the reasoning, which was the original problem',
        fix: 'Made a short reason a first-class part of recording an action, with quick-pick common causes',
      },
      {
        issue: 'Severity colour alone was ambiguous at density',
        severity: 'Minor',
        evidence: 'Two participants misread watch as warning when scanning quickly',
        fix: 'Added a word and a fixed position to every severity marker',
      },
    ],
  },

  iterations: [
    {
      version: 'v1 — exception queue',
      changed: 'Replaced the inventory front door with a prioritised exception queue',
      because: 'Every dispatcher was already doing this by hand, outside the product',
      result: 'Triage moved from the dispatcher’s head into the system',
    },
    {
      version: 'v2 — show the reasoning',
      changed: 'Exposed why a row ranks where it does, and made the rule inspectable',
      because: 'An unexplained ranking was manually re-sorted, defeating the point',
      result: 'The ordering became something dispatchers would act on rather than check',
    },
    {
      version: 'v3 — cause next to fact',
      changed: 'Reason-for-delay written as a sentence on the row, evidence one click away in place',
      because: 'Explaining a delay was costing a median of three window switches',
      result: 'Diagnosis happens in the same view as noticing',
    },
    {
      version: 'v4 — decisions get a home',
      changed: 'Actions recorded against the shipment with a required short reason',
      because: 'Fixes negotiated in chat were invisible and re-litigated',
      result: 'The handover and the lead’s review both became by-products of normal work',
    },
    {
      version: 'v5 — two altitudes',
      changed: 'Split the live queue from a performance view over the same records',
      because: 'One screen was serving two jobs and doing neither well',
      result: 'Leads stopped maintaining parallel spreadsheets',
    },
  ],

  finalSolution: {
    narrative:
      'DEXA leads with what is wrong. The exception queue orders shipments by consequence and states the cause in plain language; the detail opens in place so the list is never lost; every action is recorded with a reason, which makes handover and performance review fall out of doing the work rather than being extra work.',
    features: [
      {
        name: 'Exception queue ordered by consequence',
        detail: 'The front door is what is at risk, with the ranking reason visible and the rule inspectable.',
        answers: 'Dispatchers want to see what is wrong, not everything',
      },
      {
        name: 'Cause on the row',
        detail: 'Reason for delay written as a short sentence, with the supporting evidence one click away in place.',
        answers: 'A status is not a reason',
      },
      {
        name: 'In-place detail panel',
        detail: 'The shipment opens beside the queue, never over it, so comparison context survives.',
        answers: 'Interruption is the normal case',
      },
      {
        name: 'Actions with reasons',
        detail: 'Recording a fix requires a short why, with quick-picks for common causes.',
        answers: 'Decisions made in chat left no trace',
      },
      {
        name: 'Generated handover',
        detail: 'Open, chased and waiting, assembled from the record rather than written from memory.',
        answers: 'The most expensive moment is the handover',
      },
      {
        name: 'A second altitude for leads',
        detail: 'Failure causes over time and by region, over the same records the dispatcher acts on.',
        answers: 'Leads need patterns, not a bigger table',
      },
      {
        name: 'Visible staleness',
        detail: 'A live view that has stopped updating announces it, because silent staleness is dangerous.',
        answers: 'Operations trust is built on knowing what you are looking at',
      },
    ],
  },

  impact: {
    narrative:
      'The change that mattered most is not on a chart: dispatchers stopped maintaining a shadow system. When the people who invented a workaround abandon it, the product has absorbed the job it was avoiding.',
    narrativeExtra:
      'The figures below are the ones this project was set up to move. Where a number is a design target rather than a measured result, it says so — I would rather present an honest gap than a decorative percentage.',
    metrics: [
      { value: '3 → 1', label: 'Tools in the dispatcher’s loop', note: 'Verifiable: the shadow spreadsheet and chat triage were retired' },
      { value: '3 → 0', label: 'Window switches to explain a delay', note: 'Verifiable from the design: cause and evidence live in the queue' },
      { value: 'Generated', label: 'Shift handover', note: 'Verifiable: assembled from recorded actions rather than authored' },
      { value: 'Design target', label: 'Time to first correct triage', note: 'Timed in testing against the old tool; needs production measurement' },
      { value: 'Design target', label: 'Exceptions resolved before customer contact', note: 'The commercial metric this work exists to move' },
    ],
  },

  learnings: [
    'Look for the shadow system first. The spreadsheet a user maintains next to your product is a finished specification for the thing your product refuses to do.',
    'A ranking has to explain itself or it will be overridden. Automating judgement is not enough — the automation must be inspectable, or expert users will go back to doing it themselves and trust nothing else you build.',
    'Density is contextual, not a style. The same designer should be widening touch targets on a field-work app and tightening row heights on an operations console, and both decisions should be defended with the same rigour.',
    'Design the record, not just the screen. The decisions that were vanishing into chat turned out to be the raw material for handover and for performance review — one structural fix paid for three features.',
    'Realistic data belongs in the first prototype. Almost every layout that failed in testing had passed review with tidy sample rows.',
  ],

  nextSteps: [
    'Publish measured baselines for triage time and pre-emptive resolution',
    'Extend the severity model to predicted risk rather than observed lateness',
    'Full keyboard-only pass — dispatchers are power users and the mouse is slowing them down',
    'Take the reason taxonomy back to the source systems, so causes arrive structured',
  ],
};
