import type { CaseStudy } from '../types';

/**
 * Mr. Yoda — healthcare / diagnostics.
 * ⚠️ Narrative and figures need your real project detail before publishing.
 */
export const mrYoda: CaseStudy = {
  slug: 'mr-yoda',
  title: 'Mr. Yoda',
  tagline: 'Diagnostics you can actually read: designing for the ten minutes after a result arrives',
  description:
    'A diagnostics platform where patients book tests, receive results and decide what to do next. The hard design problem was not booking — it was the moment a number lands on a phone with no one there to explain it.',
  industry: 'Healthcare',
  tags: ['Diagnostics', 'Health literacy', 'Accessibility', 'Trust & safety', 'Mobile-first'],
  projectType: 'End-to-end product design',
  role: 'Product designer — research, IA, UX, UI, content design, accessibility',
  team: ['Me (product design)', '4 engineers', 'Clinical advisor (pathologist)', 'Product manager'],
  timeline: '16 weeks',
  year: 2025,
  status: 'Shipped',
  contribution:
    'Redesigned the result experience from a PDF of numbers into a plain-language explanation with a clear, safe next step — reviewed by a clinician and written to avoid both false alarm and false reassurance.',
  featured: true,
  order: 3,
  cover: {
    src: '/media/mr-yoda-cover.svg',
    alt: 'Mr. Yoda interface composition: a test booking card, a plain-language result card showing a value within range, and a trend chart over three tests.',
    tint: '#3D6B5E',
  },

  overview: {
    narrative:
      'Mr. Yoda lets people book a diagnostic test, have a sample collected, and receive results on their phone. The booking half of that is a logistics problem. The other half is a health-literacy problem, and it is where the product either helps someone or frightens them.',
    narrativeExtra:
      'The original result experience was a PDF of the laboratory report: reference ranges, units, abbreviations, and a handful of values flagged in red. It was clinically correct and, for most of the people receiving it, unreadable. I redesigned around the ten minutes after a result arrives — what a person understands, what they feel, and what they do next.',
    highlights: [
      { value: 'Plain language', label: 'Result experience', note: 'Every value paired with a clinician-reviewed explanation' },
      { value: '3 tiers', label: 'Safety-tiered next steps', note: 'Routine · discuss at next visit · contact a doctor now' },
      { value: 'WCAG 2.1 AA', label: 'Conformance target', note: 'Audited, with a screen-reader pass on the result flow' },
      { value: '16 weeks', label: 'Research to shipped', note: 'Content design ran alongside interface design throughout' },
    ],
  },

  businessProblem: {
    narrative:
      'Support was absorbing the cost of an unreadable artefact. A significant share of contacts were people asking what their result meant, which is a question support staff are not permitted to answer — so the conversation ended in a referral, and the patient left the interaction more anxious than before it.',
    narrativeExtra:
      'Repeat booking was the commercial casualty. A diagnostics business depends on people returning for monitoring, and an experience that ends in confusion does not earn a second test.',
  },

  userProblem: {
    narrative:
      'People received a number without a meaning. "Ferritin 11 ng/mL" with a reference range beside it tells a clinician a great deal and tells most patients only that something might be wrong. In that gap, two failure modes appear, and both are harmful: searching the internet and panicking, or ignoring a result that genuinely needed attention.',
    narrativeExtra:
      'A red flag on a value was the sharpest problem. It signals urgency indiscriminately — the same visual weight for a marginal deviation that needs nothing and for a value that needs a call today.',
  },

  context: {
    narrative:
      'Results arrive unannounced, on a phone, wherever the person happens to be — at work, on a bus, at home alone. There is no clinician present and often no appointment booked. The reader may be anxious before they open it, may be reading in a second language, and may be viewing at a large text size or with a screen reader.',
    narrativeExtra:
      'That context makes this a safety-critical design problem rather than a comprehension exercise. Both over-reassuring and over-alarming are real harms, and the interface has to hold a line between them without pretending to practise medicine.',
  },

  research: {
    narrative:
      'I ran two strands in parallel: comprehension research with patients, and clinical review with a pathologist. The patient work established what people actually understood and what they did next; the clinical work established what the product was permitted to say.',
    narrativeExtra:
      'The most useful single exercise was asking participants to explain their own most recent result back to me in their own words, before showing them anything new. It surfaced misreadings I would never have predicted — including people reading the reference range as their target and their own value as a score against it.',
    methods: [
      'Comprehension interviews using participants’ own real, historical results',
      'Read-back exercise: explain this result to me as if I were a family member',
      'Support-ticket analysis to find the questions the artefact was generating',
      'Clinical review sessions with a pathologist on safe phrasing and escalation thresholds',
      'Accessibility audit with screen-reader walkthroughs and 200% text-size testing',
    ],
    participants:
      '9 comprehension interviews across a range of health literacy, 3 clinical review sessions, 2 screen-reader sessions',
  },

  insights: [
    {
      title: 'People read the reference range as a target',
      detail:
        'Several participants interpreted the normal range as a goal to hit and their own value as a score, which inverted the meaning of results at the low end entirely.',
      quote: 'So I got eleven out of a possible fifteen?',
      evidence: '4 / 9 participants misread the range on first encounter',
    },
    {
      title: 'A red flag is read as an emergency, whatever it means',
      detail:
        'Uniform flagging gave a marginal deviation the same urgency as a genuinely concerning value. Participants could not tell "worth mentioning" from "act today".',
      quote: 'It is in red. Should I be going to the hospital?',
      evidence: '7 / 9 assumed any flagged value required immediate action',
    },
    {
      title: 'The first question is never about the number',
      detail:
        'Nobody asked what the value was. They asked whether they were all right, and what to do — a sequence the laboratory report answered in exactly the wrong order.',
      evidence: '9 / 9 asked a what-do-I-do question before a what-is-it question',
    },
    {
      title: 'One result in isolation is unreadable; a trend is obvious',
      detail:
        'Participants who had taken the same test before reasoned confidently and correctly as soon as they could see the previous values beside the current one.',
      quote: 'Last time it was nine. So it is going up. That is good, isn’t it?',
      evidence: '5 / 5 repeat testers reasoned correctly from a trend',
    },
    {
      title: 'Silence is interpreted as bad news',
      detail:
        'The delay between sample collection and result was filled with worry. A visible, honest status was worth more than a shorter wait.',
      evidence: 'Support tickets spiked in the window before results were released',
    },
    {
      title: 'Trust depends on visible provenance',
      detail:
        'Who ran the test, when, and whether a clinician had reviewed it changed how much weight participants gave the explanation.',
      evidence: '6 / 9 asked whether a doctor had seen the result',
    },
  ],

  personas: [
    {
      name: 'Lakshmi',
      role: 'Patient — routine monitoring',
      context:
        'Mid-fifties, manages a long-term condition, tests every three months. Reads on a phone at a large text size. Has a doctor but not an appointment this week.',
      goals: [
        'Know whether she is all right, in the first sentence',
        'See whether this is better or worse than last time',
        'Know whether to wait for her next visit or act now',
      ],
      frustrations: [
        'Abbreviations and units she has to look up',
        'Red flags that make everything feel urgent',
        'No way to see her previous results beside this one',
      ],
      quote: 'Just tell me if I need to worry.',
      techComfort: 'Low',
    },
    {
      name: 'Arun',
      role: 'Patient — first test, anxious',
      context:
        'Late twenties, booked a panel after reading about symptoms online. Health-anxious, will search every term in the report within minutes of opening it.',
      goals: [
        'Understand what was measured and why',
        'Get a calm, accurate answer before the internet gives him a frightening one',
        'Know exactly what a reasonable next step is',
      ],
      frustrations: [
        'Ambiguity, which he fills with worst-case interpretations',
        'Being told to consult a doctor with no indication of urgency',
      ],
      quote: 'I will read all of it. I would rather it told me properly.',
      techComfort: 'High',
    },
    {
      name: 'Dr. Menon',
      role: 'Clinical reviewer',
      context:
        'Pathologist accountable for what the platform says. Reviews explanation content and escalation thresholds.',
      goals: [
        'Ensure nothing the product says could be read as a diagnosis',
        'Ensure genuinely urgent values are never softened',
        'Keep phrasing defensible and consistent',
      ],
      frustrations: [
        'Plain language that drifts into clinical advice',
        'Interfaces that flatten clinical nuance into a single alarm',
      ],
      quote: 'Be clear, be careful, and never imply a diagnosis.',
      techComfort: 'Medium',
    },
  ],

  journey: [
    {
      stage: 'Booking',
      doing: 'Chooses a test, often without fully knowing what it measures',
      thinking: '“Is this the right test for what I am worried about?”',
      feeling: 'Anxious',
      opportunity: 'Explain what each test measures in plain language at the point of choosing',
    },
    {
      stage: 'Collection',
      doing: 'Attends or receives a home visit',
      thinking: '“How long until I know?”',
      feeling: 'Neutral',
      opportunity: 'Set an explicit expectation for when the result will arrive',
    },
    {
      stage: 'Waiting',
      doing: 'Checks the app repeatedly for a result that has not been released',
      thinking: '“No news must mean bad news.”',
      feeling: 'Anxious',
      opportunity: 'Honest, visible processing status — silence is the worst state to design',
    },
    {
      stage: 'Result arrives',
      doing: 'Opens a notification, alone, wherever they are',
      thinking: '“Am I all right?”',
      feeling: 'Anxious',
      opportunity: 'Answer the question actually being asked, in the first line',
    },
    {
      stage: 'Making sense',
      doing: 'Reads values, searches unfamiliar terms, compares against the range',
      thinking: '“Is this number bad? How bad?”',
      feeling: 'Anxious',
      opportunity: 'Plain-language explanation, trend against previous tests, calibrated severity',
    },
    {
      stage: 'Deciding',
      doing: 'Chooses between ignoring it, searching more, or contacting someone',
      thinking: '“What am I supposed to do about this?”',
      feeling: 'Hopeful',
      opportunity: 'One clear, safety-tiered next step — with sharing that a clinician can use',
    },
  ],

  painPoints: [
    {
      title: 'The result was a clinical document, not a patient artefact',
      detail: 'A laboratory PDF answers a clinician’s questions in a clinician’s order, which is the wrong order for the person receiving it.',
      severity: 'Critical',
      who: 'All patients',
    },
    {
      title: 'Uniform red flags could not distinguish urgency',
      detail: 'A marginal deviation and a genuinely concerning value carried identical visual weight.',
      severity: 'Critical',
      who: 'All patients',
    },
    {
      title: 'Reference ranges were misread as targets',
      detail: 'The most common misinterpretation inverted the meaning of low-end results.',
      severity: 'Critical',
      who: 'Lower health literacy',
    },
    {
      title: 'No trend, so no reasoning',
      detail: 'Each result arrived in isolation, removing the single strongest aid to correct interpretation.',
      severity: 'High',
      who: 'Repeat testers',
    },
    {
      title: '"Consult a doctor" with no sense of urgency',
      detail: 'Generic advice was read as either alarming or dismissible, depending on the reader’s anxiety.',
      severity: 'High',
      who: 'All patients',
    },
    {
      title: 'Silence during processing',
      detail: 'The wait had no visible status, and the vacuum filled with worry and support tickets.',
      severity: 'Medium',
      who: 'All patients',
    },
  ],

  problemDefinition: {
    statement:
      'People receive diagnostic results alone, on a phone, in a document written for clinicians. Mr. Yoda needs to answer the question they are actually asking — am I all right, and what do I do — in plain, clinically reviewed language, with severity calibrated so urgency is neither invented nor hidden, while remaining fully usable at 200% text and with a screen reader.',
    hmw: [
      'How might we answer "am I all right" in the first line, without implying a diagnosis?',
      'How might we calibrate urgency so a marginal value never reads like an emergency?',
      'How might we make a single result interpretable by showing it as part of a trend?',
      'How might we replace "consult a doctor" with a next step that carries real information about timing?',
      'How might we make the wait honest instead of silent?',
      'How might we keep every one of these decisions safe under clinical review?',
    ],
  },

  informationArchitecture: {
    narrative:
      'I inverted the document. The laboratory report goes value → range → flag → interpretation. The patient experience goes summary → what it means → what to do → the detail, with the full clinical report always one tap away and never removed.',
    narrativeExtra:
      'Keeping the original report intact and accessible mattered for two reasons: some patients want all of it, and every patient may need to hand something to a clinician. Simplifying the top of the hierarchy is not the same as withholding the bottom of it.',
    tree: [
      {
        label: 'My results',
        children: [
          { label: 'Result summary — plain-language headline' },
          { label: 'What this means — clinician-reviewed explanation' },
          { label: 'What to do next — safety-tiered action' },
          { label: 'Trend — this value across previous tests' },
          { label: 'All values — full detail with ranges and units' },
          { label: 'Original laboratory report (PDF)' },
          { label: 'Share with a clinician' },
        ],
      },
      {
        label: 'Book a test',
        children: [
          { label: 'Tests explained in plain language' },
          { label: 'Panels — what is included and why' },
          { label: 'Collection — centre or home visit' },
          { label: 'Preparation instructions' },
        ],
      },
      { label: 'Status — collected, processing, expected by' },
      { label: 'History — every test, comparable over time' },
    ],
  },

  userFlows: {
    narrative:
      'The flow that received the most attention is the shortest one: opening a notification and arriving at an understanding. It is the flow with the highest emotional load and the least support, so it was designed first and tested hardest.',
    flows: [
      {
        name: 'Receive and understand a result',
        goal: 'Go from a notification to a correct understanding and a safe next step',
        steps: [
          'Notification states that a result is ready, and nothing clinical',
          'Result summary answers the overall question in one plain sentence',
          'Any value needing attention is named, with its severity tier',
          'What this means — clinician-reviewed explanation in plain language',
          'What to do next — tiered by urgency, with timing',
          'Trend against previous tests, where history exists',
          'All values, and the original report, available but not required',
        ],
        decision:
          'The notification deliberately carries no clinical content. A result should not be delivered on a lock screen, potentially in public, with no context around it.',
      },
      {
        name: 'Choose the right test',
        goal: 'Book with an accurate understanding of what will be measured',
        steps: [
          'Browse tests described by what they tell you, not by their clinical name alone',
          'Panel contents explained in plain language',
          'Preparation requirements stated before payment, not after',
          'Choose collection method and slot',
          'Confirmation with an explicit expected-result date',
        ],
        decision:
          'Preparation instructions moved ahead of payment. Discovering a fasting requirement after paying was producing wasted appointments and avoidable frustration.',
      },
      {
        name: 'Share with a clinician',
        goal: 'Hand a clinician something they can use in seconds',
        steps: [
          'Share from the result',
          'Generate a clinical-format summary plus the original report',
          'Send as a link or a file',
        ],
        decision:
          'Sharing produces the clinical view, not the patient view. The simplification exists for the patient; a clinician needs the document they are trained to read.',
      },
    ],
  },

  wireframes: {
    narrative:
      'Wireframes were written before they were drawn. For this product the copy is the interface — the layout is mostly a question of what comes first — so early rounds were text documents reviewed with the pathologist, and only then turned into screens.',
    items: [
      { name: 'Result summary — within range, minor deviation, needs attention', detail: 'Three severities as three complete designs, not one design with a colour swap' },
      { name: 'Explanation block', detail: 'Clinician-reviewed phrasing, iterated more than any visual element' },
      { name: 'Trend view — 1, 2 and 6 previous results', detail: 'Including the single-result state, where the aid is unavailable' },
      { name: 'Next-step tiers', detail: 'Routine, discuss at next visit, contact a doctor today — each with distinct copy and emphasis' },
      { name: 'Processing status', detail: 'Designing the wait rather than leaving it blank' },
      { name: 'Every state at 200% text', detail: 'Layouts checked at large text sizes before sign-off, not after' },
    ],
  },

  exploration: {
    narrative:
      'The decision that shaped the product was how much interpretation the platform should offer. Too little leaves the original problem untouched; too much starts practising medicine. Three positions were explored and reviewed clinically.',
    options: [
      {
        name: 'Show the report, better formatted',
        summary: 'Keep the clinical document; improve typography and hierarchy only.',
        pros: ['No clinical risk', 'Fast to build', 'Familiar to clinicians'],
        cons: [
          'Leaves the comprehension problem entirely unsolved',
          'Red flags still read as emergencies',
          'Support burden unchanged',
        ],
      },
      {
        name: 'Interpret and advise',
        summary: 'Tell the patient what is likely wrong and what to do about it.',
        pros: ['Directly answers the question being asked', 'Highest perceived value'],
        cons: [
          'Constitutes medical advice — outside what the platform may safely do',
          'Wrong in exactly the cases where being wrong is most harmful',
          'Rejected in clinical review',
        ],
      },
      {
        name: 'Explain, contextualise, and route',
        summary:
          'Explain what was measured and what the value indicates in plain language, show the trend, and route to a safety-tiered next step — without naming a diagnosis.',
        pros: [
          'Answers the real question without crossing into diagnosis',
          'Severity tiers replace undifferentiated alarm',
          'Trend gives the patient a way to reason for themselves',
        ],
        cons: [
          'Every explanation needs clinical review and version control',
          'Content becomes a maintained asset, not a one-off deliverable',
        ],
        chosen: true,
      },
    ],
  },

  uiDesign: {
    narrative:
      'The visual language is calm to the point of being plain. Health anxiety is amplified by visual urgency, so the interface avoids alarm styling everywhere except the one tier where alarm is the correct response — and in that tier it is unmistakable.',
    narrativeExtra:
      'Severity is never carried by colour alone: each tier has its own wording, its own icon and its own position in the layout, so it survives colour blindness, greyscale printing and a screen reader reading it aloud.',
    principles: [
      { name: 'Answer first, detail after', detail: 'The plain-language summary precedes every number on the page' },
      { name: 'Calm by default, urgent only when it is', detail: 'Alarm styling is reserved for the tier that genuinely needs action today' },
      { name: 'Never severity by colour alone', detail: 'Wording, icon and position all carry the tier' },
      { name: 'Designed at 200% text', detail: 'Large-text and screen-reader states are sign-off criteria, not retrofits' },
      { name: 'Nothing removed, only reordered', detail: 'The full clinical report is always one tap away' },
    ],
  },

  designSystem: {
    narrative:
      'The system’s most important components are not visual. A severity model with defined thresholds, a content pattern for explanations, and a next-step pattern with three tiers do more for consistency and safety here than any card or button.',
    narrativeExtra:
      'Explanations are treated as versioned content with a clinical reviewer attached, because an unreviewed change to a sentence in this product is a clinical change, not a copy tweak.',
    tokens: [
      { name: 'Severity tiers (3)', detail: 'Routine · discuss at next visit · contact a doctor today — thresholds set clinically' },
      { name: 'Explanation content pattern', detail: 'What it measures → what this value indicates → what it does not mean' },
      { name: 'Next-step pattern', detail: 'One primary action per tier, with explicit timing language' },
      { name: 'Calm palette with a single alarm state', detail: 'Alarm reserved for the top tier only' },
      { name: 'Accessible type scale', detail: 'Tested at 200% zoom with no loss of content or function' },
    ],
    components: [
      'Result summary card',
      'Value row with range visualisation',
      'Severity marker (word + icon + position)',
      'Explanation block',
      'Next-step panel (3 tiers)',
      'Trend chart with accessible table alternative',
      'Processing status',
      'Share-with-clinician sheet',
      'Preparation instructions block',
    ],
  },

  prototyping: {
    narrative:
      'Prototypes used real, anonymised result sets covering the full range from unremarkable to genuinely concerning. Testing comprehension on flattering data would only have proven that the easy cases were easy.',
    artefacts: [
      { name: 'Result prototype across three severity tiers', detail: 'The same participant journey run against all three, to test calibration' },
      { name: 'Trend prototype at 1, 2 and 6 data points', detail: 'Including the no-history case where the aid does not exist' },
      { name: 'Screen-reader walkthrough build', detail: 'Semantics, order and announcements tested with real assistive technology' },
      { name: 'Clinical review package', detail: 'Every explanation string in context for sign-off' },
    ],
  },

  usabilityTesting: {
    narrative:
      'Testing measured comprehension, not preference. Each participant was shown a result and asked three questions: what does this say, what would you do, and how worried are you. The second question is the one that matters — a result that is understood but acted on wrongly is still a design failure.',
    narrativeExtra:
      'Calibration was assessed in both directions. Under-worry on a concerning result and over-worry on an unremarkable one were treated as equally serious defects.',
    setup:
      '9 participants across health-literacy levels · real anonymised results at 3 severity tiers · comprehension and intended-action questions · 2 additional screen-reader sessions',
    findings: [
      {
        issue: 'Range visualisation still read as a score',
        severity: 'Critical',
        evidence: '3 / 9 described their value as a score out of the upper bound',
        fix: 'Removed the scale-like treatment; labelled the band as "typical range" and stated the position in words',
      },
      {
        issue: 'The middle severity tier under-communicated',
        severity: 'Major',
        evidence: '4 / 9 read "discuss at your next visit" as "this does not matter"',
        fix: 'Rewrote with explicit timing and an added reason for discussing it; clinically re-reviewed',
      },
      {
        issue: '"Within range" was not reassuring enough to land',
        severity: 'Major',
        evidence: '5 / 9 kept scanning for a problem after reading an unremarkable result',
        fix: 'Opened with an explicit plain sentence stating nothing needed attention, before any values',
      },
      {
        issue: 'Trend direction was ambiguous without framing',
        severity: 'Major',
        evidence: '3 / 5 repeat testers could see movement but not whether it was good',
        fix: 'Added a plain-language direction statement, clinically bounded to avoid implying a diagnosis',
      },
      {
        issue: 'Screen-reader order announced numbers before meaning',
        severity: 'Major',
        evidence: 'Assistive-technology walkthrough reached values before the summary',
        fix: 'Restructured DOM order and headings so the summary is announced first; added a table alternative to the trend chart',
      },
      {
        issue: 'Preparation instructions were missed pre-appointment',
        severity: 'Minor',
        evidence: '2 / 9 would have arrived without fasting',
        fix: 'Moved preparation ahead of payment and repeated it in the confirmation',
      },
    ],
  },

  iterations: [
    {
      version: 'v1 — answer first',
      changed: 'A plain-language summary above every number',
      because: 'Every participant asked a what-do-I-do question before a what-is-it question',
      result: 'The page began by answering the question that was actually being asked',
    },
    {
      version: 'v2 — calibrated severity',
      changed: 'Replaced uniform red flags with three clinically defined tiers',
      because: 'Undifferentiated alarm made every deviation feel like an emergency',
      result: 'Urgency became information instead of decoration',
    },
    {
      version: 'v3 — kill the score metaphor',
      changed: 'Removed the scale-like range visualisation; stated position in words',
      because: 'The visualisation was actively producing the most harmful misreading',
      result: 'The most common misinterpretation stopped appearing in sessions',
    },
    {
      version: 'v4 — trend as the reasoning aid',
      changed: 'Previous results beside the current one, with a plain-language direction statement',
      because: 'Repeat testers reasoned correctly and confidently the moment they could see history',
      result: 'Interpretation became something the patient could do, not just receive',
    },
    {
      version: 'v5 — accessible by construction',
      changed: 'Reordered DOM and headings, added a table alternative to the chart, verified at 200% text',
      because: 'The screen-reader path reached numbers before meaning — the same defect as the visual design, in a different medium',
      result: 'The safety argument holds for assistive technology users too',
    },
  ],

  finalSolution: {
    narrative:
      'A result now opens with a plain sentence that answers whether anything needs attention. Values that do are named with a clinically defined severity tier, explained in reviewed plain language, placed in the context of previous tests, and paired with one next step that states its own timing. The full laboratory report is always one tap away, and sharing produces the clinical view a doctor can read.',
    features: [
      {
        name: 'Plain-language summary first',
        detail: 'One sentence, before any number, stating whether anything needs attention.',
        answers: 'The first question is never about the number',
      },
      {
        name: 'Three clinically defined severity tiers',
        detail: 'Routine, discuss at next visit, contact a doctor today — each with distinct wording, icon and emphasis.',
        answers: 'A red flag is read as an emergency, whatever it means',
      },
      {
        name: 'Reviewed explanations',
        detail: 'What was measured, what this value indicates, and explicitly what it does not mean — versioned, with a clinical reviewer attached.',
        answers: 'People received a number without a meaning',
      },
      {
        name: 'Trend as the reasoning aid',
        detail: 'Previous results beside the current one, with a bounded plain-language direction statement.',
        answers: 'One result in isolation is unreadable; a trend is obvious',
      },
      {
        name: 'Next steps with timing',
        detail: 'Replaces generic "consult a doctor" with an action that states when, and why.',
        answers: 'Advice without urgency is either alarming or dismissible',
      },
      {
        name: 'An honest wait',
        detail: 'Visible processing status with an expected date, because silence is read as bad news.',
        answers: 'Support tickets spiked before results were even released',
      },
      {
        name: 'Accessible by construction',
        detail: 'Summary announced first, severity never carried by colour alone, trend chart paired with a data table, verified at 200% text.',
        answers: 'The result may be read at large text or entirely by ear',
      },
    ],
  },

  impact: {
    narrative:
      'The clearest outcome is qualitative and, in this domain, the one I care most about: in testing, participants stopped asking "should I be worried" and started saying what they were going to do. Comprehension turned into an intention.',
    narrativeExtra:
      'The commercial metrics this work targets are below. The ones marked as targets need production measurement — this project shipped with instrumentation agreed in advance, which is a lesson I carried over from earlier work.',
    metrics: [
      { value: 'Answer first', label: 'Result hierarchy', note: 'Verifiable: plain-language summary precedes all values' },
      { value: '1 → 3', label: 'Severity tiers', note: 'Verifiable: clinically defined thresholds replaced uniform flagging' },
      { value: '0 → 1 tap', label: 'Access to the clinical report', note: 'Verifiable: nothing was removed, only reordered' },
      { value: 'WCAG 2.1 AA', label: 'Audited on the result flow', note: 'Verifiable: screen-reader and 200%-text passes completed' },
      { value: 'Design target', label: '"What does this mean" support contacts', note: 'The support cost this redesign exists to reduce' },
      { value: 'Design target', label: 'Repeat testing rate', note: 'The commercial consequence of a comprehensible result' },
    ],
  },

  learnings: [
    'In healthcare, content design is interface design. The sentence a patient reads first did more for this product than any layout decision, and it had to be argued with a clinician rather than settled in Figma.',
    'Visual metaphors carry claims. A range drawn like a scale told people they had a score — the single most harmful misreading in the study, and it came from a decorative choice nobody had examined.',
    'Calibration is bidirectional. Designing against false alarm without equally designing against false reassurance would have made the product feel calmer and be more dangerous.',
    'Accessibility surfaced a design bug, not just a compliance gap. The screen reader reaching numbers before meaning was the same defect as the original visual hierarchy — fixing it improved the product for everyone.',
    'Simplifying is not withholding. Keeping the full clinical report one tap away is what made it safe to lead with a simple summary.',
    'Agreeing the metric before the first sprint is now non-negotiable for me. It is the one thing I would go back and change on every earlier project.',
  ],

  nextSteps: [
    'Publish measured comprehension and support-contact outcomes from production',
    'Regional language versions, with clinical review per language rather than machine translation',
    'Clinician-facing view for practices receiving shared results',
    'Extend the severity model to combinations of values, which currently require clinical judgement',
  ],
};
