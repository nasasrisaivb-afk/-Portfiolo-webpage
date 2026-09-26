import type { CaseStudy } from '../types';

/**
 * CianaHealth — healthcare SaaS / care coordination.
 * ⚠️ Narrative and figures need your real project detail before publishing.
 * Shipped with fewer sections than CropVibe on purpose — the case-study
 * template renders what exists and skips the rest, so a study can grow.
 */
export const cianahealth: CaseStudy = {
  slug: 'cianahealth',
  title: 'CianaHealth',
  tagline: 'Care coordination without the clipboard: designing a shared view for clinical teams',
  description:
    'A care-coordination platform for teams looking after the same patients from different places. I designed the shared patient view and the handover model, so the current state of a patient is something the team reads rather than something one person remembers.',
  industry: 'Healthcare',
  tags: ['SaaS', 'Care coordination', 'Complex workflows', 'Role-based UX', 'Design system'],
  projectType: 'Web platform',
  role: 'Product designer — discovery, workflow modelling, IA, UX, UI, design system',
  team: ['Me (product design)', '5 engineers', 'Clinical lead', 'Product manager'],
  timeline: '12 weeks (discovery + core flows)',
  year: 2025,
  status: 'In progress',
  contribution:
    'Designed one shared patient view for four clinical roles, replacing a per-role fragment model that made the complete picture something nobody actually held.',
  featured: true,
  order: 4,
  cover: {
    src: '/media/cianahealth-cover.svg',
    alt: 'CianaHealth interface composition: a shared patient timeline, a role-aware task list and a handover summary panel.',
    tint: '#3E5A99',
  },

  overview: {
    narrative:
      'CianaHealth coordinates care across people who rarely meet: a clinician, a nurse, an allied-health professional and a coordinator, all responsible for parts of the same patient’s care, working from different places at different times.',
    narrativeExtra:
      'The platform they had modelled each role’s own slice, which meant the complete picture of a patient existed only in whichever team member happened to have spoken to the others most recently. I redesigned around a shared patient view that every role reads the same way, with role-specific action layered on top rather than substituted for it.',
    highlights: [
      { value: '4 roles', label: 'One shared view', note: 'Clinician, nurse, allied health, coordinator' },
      { value: 'Shared → layered', label: 'Role model', note: 'Everyone reads the same state; actions differ' },
      { value: '12 weeks', label: 'Discovery to core flows', note: 'Phase 1 of an ongoing engagement' },
    ],
  },

  businessProblem: {
    narrative:
      'Duplicated effort and dropped follow-ups were the two costs the business could see, and both came from the same source: no single authoritative answer to "what is the current state of this patient". Coordination happened in phone calls, and phone calls do not scale with caseload.',
  },

  userProblem: {
    narrative:
      'Each role could see its own contribution and had to reconstruct everyone else’s. The nurse could not tell whether the clinician had already changed a plan; the coordinator could not tell whether a referral had been acted on; nobody could tell what had changed since they last looked.',
    narrativeExtra:
      'The recurring request was not for more information. It was for a reliable answer to one question: what changed since I was last here?',
  },

  context: {
    narrative:
      'Clinical time is measured in minutes between patients, on shared desktops and personal phones, frequently interrupted. Documentation is a professional obligation as well as a product interaction, so anything that adds keystrokes without adding clinical value will be resented and worked around.',
  },

  research: {
    narrative:
      'Discovery was shadowing plus artefact archaeology. I sat with each role through real sessions and collected the workarounds — the paper lists, the personal spreadsheets, the WhatsApp threads — because each one marks a place where the product failed to hold something the team needed.',
    methods: [
      'Shadowing across all four roles during live clinical sessions',
      'Artefact collection of every workaround in active use',
      'Journey mapping a single patient across roles and time',
      'Service blueprinting to expose the handover gaps between roles',
      'Interviews with the clinical lead on documentation obligations and constraints',
    ],
    participants: '8 practitioners across 4 roles, observed and interviewed',
  },

  insights: [
    {
      title: 'Everyone needs the same picture; only the actions differ',
      detail:
        'The per-role view model was solving the wrong problem. Roles differ in what they do next, not in what they need to know.',
      evidence: '8 / 8 practitioners asked for information belonging to another role',
    },
    {
      title: '"What changed since I was last here" is the real question',
      detail:
        'Every session began with reconstruction. A diff since last viewed would have answered in seconds what people were spending minutes assembling.',
      quote: 'I scroll to work out what is new. Every single time.',
      evidence: 'Observed at the start of 7 / 8 shadowed sessions',
    },
    {
      title: 'Workarounds mark the gaps precisely',
      detail:
        'Every paper list and personal spreadsheet corresponded to something the product declined to hold. Collecting them produced the roadmap.',
      evidence: '6 distinct workarounds collected across 4 roles',
    },
    {
      title: 'Documentation burden decides adoption',
      detail:
        'Any feature that added keystrokes without adding clinical value was bypassed, however useful it looked in a demo.',
      evidence: 'Two existing features observed being actively avoided',
    },
  ],

  personas: [
    {
      name: 'Dr. Iyer',
      role: 'Clinician',
      context: 'Minutes between patients on a shared desktop. Needs the current state fast and the history on demand.',
      goals: ['See what changed since last review', 'Change a plan and know the team will see it', 'Document without duplication'],
      frustrations: ['Reconstructing the timeline every session', 'Unsure whether the team has seen a change'],
      quote: 'I need the last two weeks in ten seconds.',
      techComfort: 'Medium',
    },
    {
      name: 'Sana',
      role: 'Nurse',
      context: 'Direct patient contact across a caseload, moving between rooms with a phone.',
      goals: ['Know today’s tasks and their priority', 'Record observations at the point of care', 'Escalate with context attached'],
      frustrations: ['Finding out a plan changed after acting on the old one', 'Re-entering the same observation twice'],
      quote: 'If the plan changed, I need to know before I walk in.',
      techComfort: 'Medium',
    },
    {
      name: 'Marcus',
      role: 'Care coordinator',
      context: 'Manages referrals, appointments and follow-ups across the whole caseload. Lives in lists.',
      goals: ['See what is waiting and what is overdue', 'Close loops without chasing people', 'Hand over cleanly'],
      frustrations: ['No way to tell whether a referral was acted on', 'Follow-ups that fall through silently'],
      quote: 'My job is the things nobody has finished.',
      techComfort: 'High',
    },
  ],

  painPoints: [
    {
      title: 'No authoritative current state',
      detail: 'Each role held a fragment, so the complete picture existed only in conversation.',
      severity: 'Critical',
      who: 'All roles',
    },
    {
      title: 'No diff since last viewed',
      detail: 'Every session started with manual reconstruction of what had changed.',
      severity: 'Critical',
      who: 'All roles',
    },
    {
      title: 'Silent follow-up failures',
      detail: 'A referral or task could stall indefinitely with nothing surfacing it.',
      severity: 'High',
      who: 'Coordinators',
    },
    {
      title: 'Duplicate documentation',
      detail: 'The same observation entered in two places, which guaranteed divergence.',
      severity: 'High',
      who: 'Nurses, clinicians',
    },
  ],

  problemDefinition: {
    statement:
      'Four clinical roles are responsible for parts of one patient’s care but each sees only their own fragment, so the current state of a patient lives in conversation rather than in the product. CianaHealth needs one shared patient view that every role reads identically, a reliable answer to "what changed since I was last here", and role-specific action layered on top — without adding documentation burden.',
    hmw: [
      'How might we give every role the same picture while keeping their actions distinct?',
      'How might we answer "what changed since I was last here" in one glance?',
      'How might we make a stalled follow-up impossible to miss?',
      'How might we capture clinical information once and have it appear everywhere it is needed?',
    ],
  },

  informationArchitecture: {
    narrative:
      'The patient becomes the organising object, not the role. One patient record with a single timeline; role determines which actions are offered and which tasks are surfaced, never which facts are visible.',
    tree: [
      {
        label: 'Patient',
        children: [
          { label: 'Current state — plan, status, alerts' },
          { label: 'Since you last looked — the diff' },
          { label: 'Timeline — every event, every role' },
          { label: 'Tasks — filtered to your role, all visible' },
          { label: 'Team — who is involved and who did what' },
        ],
      },
      { label: 'My caseload — role-filtered, priority-ordered' },
      { label: 'Handover — outstanding, waiting, escalated' },
      { label: 'Referrals & follow-ups — with an explicit closed loop' },
    ],
  },

  userFlows: {
    narrative:
      'Two flows carried the redesign: arriving at a patient, and handing one over. Both were designed to be interruptible and both were designed to work from a phone in a corridor as well as a shared desktop.',
    flows: [
      {
        name: 'Arrive at a patient',
        goal: 'Understand the current state and what changed, in seconds',
        steps: [
          'Open the patient from a caseload or a task',
          'Current state reads first — plan, status, any alert',
          '"Since you last looked" summarises changes by role',
          'Timeline available for the full history',
          'Role-appropriate actions offered in place',
        ],
        decision:
          'The diff is computed per person, per patient. A shared "recent activity" feed would have been far easier to build and would not have answered anybody’s actual question.',
      },
      {
        name: 'Hand over',
        goal: 'Transfer responsibility without a phone call',
        steps: [
          'Open handover for the caseload',
          'Outstanding, waiting and escalated items grouped by patient',
          'Add a note only where the record does not explain itself',
          'Receiving practitioner reads the same structure',
        ],
        decision:
          'Handover is assembled from the record, not authored. Anything that depends on a tired clinician writing a summary will fail on the shift where it matters most.',
      },
    ],
  },

  designSystem: {
    narrative:
      'Healthcare interfaces fail slowly, through inconsistency. I built the system around a strict information hierarchy and a small number of status semantics, so a clinician moving between modules never has to relearn what a colour, a position or a word means.',
    tokens: [
      { name: 'Clinical status semantics', detail: 'A fixed, small vocabulary for status, used identically everywhere' },
      { name: 'Density scale', detail: 'Shared desktop and corridor phone from one set of components' },
      { name: 'Timeline event pattern', detail: 'One event shape, whatever the role that produced it' },
      { name: 'Diff pattern', detail: 'A reusable "what changed" treatment used across patient, caseload and handover' },
      { name: 'Accessible status model', detail: 'Word plus position plus hue, never hue alone' },
    ],
    components: [
      'Patient header with current state',
      'Since-you-last-looked panel',
      'Timeline event',
      'Task row (role-filtered)',
      'Team strip',
      'Handover summary',
      'Referral loop tracker',
      'Escalation sheet',
    ],
  },

  finalSolution: {
    narrative:
      'One patient, one timeline, one current state — read the same way by everyone. Role changes what you can do and what is surfaced to you, never what you are allowed to know. The diff since your last visit turns the start of every session from reconstruction into reading.',
    features: [
      {
        name: 'Shared patient view',
        detail: 'One record, one timeline, identical for all four roles.',
        answers: 'Everyone needs the same picture; only the actions differ',
      },
      {
        name: 'Since you last looked',
        detail: 'A per-person diff summarising what changed, by role, since that individual’s last visit.',
        answers: '"What changed since I was last here" is the real question',
      },
      {
        name: 'Role-layered actions',
        detail: 'Tasks and actions filtered to the role, layered over shared facts rather than replacing them.',
        answers: 'Fragmented per-role views hid the whole picture',
      },
      {
        name: 'Closed-loop follow-ups',
        detail: 'A referral cannot sit in an indeterminate state — it is open, actioned or explicitly closed.',
        answers: 'Silent follow-up failures',
      },
      {
        name: 'Generated handover',
        detail: 'Assembled from the record, grouped by patient, with notes only where needed.',
        answers: 'Coordination was happening in phone calls',
      },
    ],
  },

  impact: {
    narrative:
      'Phase 1 delivered discovery, the shared-view architecture and the core flows; build is in progress. The measurable claims are deliberately deferred until the platform is in clinical use, and the instrumentation for them was agreed during design rather than after.',
    metrics: [
      { value: '4 → 1', label: 'Views of a patient’s state', note: 'Verifiable from the architecture: one shared record' },
      { value: '6', label: 'Workarounds the design absorbs', note: 'Verifiable: each collected artefact maps to a designed feature' },
      { value: 'To measure', label: 'Time to orient on a patient', note: 'Baseline captured during shadowing; production comparison pending' },
      { value: 'To measure', label: 'Follow-ups closed within target', note: 'The clinical outcome the loop tracker exists to move' },
    ],
  },

  learnings: [
    'Collect the workarounds before designing anything. Six paper lists and spreadsheets were a more accurate specification than any stakeholder workshop would have produced.',
    'Role-based design is often over-applied. The valuable difference between these four roles was what they do next, not what they need to know — and splitting the facts by role had created the central problem.',
    'In clinical software, a feature that adds keystrokes without adding clinical value is not a trade-off, it is a non-starter. Documentation burden is the adoption constraint.',
    'Personalised state beats shared feeds. A per-person diff is harder to build than a recent-activity list and is the only version that answers the question people were asking.',
  ],

  nextSteps: [
    'Ship the shared view and instrument time-to-orient against the shadowing baseline',
    'Extend the diff model to the caseload level',
    'Full accessibility audit ahead of clinical rollout',
    'Test the handover model across a real shift change rather than in a session',
  ],
};
