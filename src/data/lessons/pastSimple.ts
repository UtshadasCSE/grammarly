import type { TenseLesson } from '@/types';

export const pastSimpleLesson: TenseLesson = {
  id: 'past-simple',
  name: 'Past Simple',
  banglaName: 'সাধারণ অতীত কাল',
  formula: {
    positive: 'Subject + V2 (past form)',
    negative: 'Subject + did not (didn\'t) + V1 (base form)',
    question: 'Did + Subject + V1 (base form)?',
    whQuestion: 'WH word + did + Subject + V1?',
  },
  introduction: 'Past Simple describes completed actions, events, or states in the past. It is used for specific past times, historical facts, past habits, and narratives.',
  introductionBangla: 'অতীতে সম্পন্ন কাজ, ঘটনা বা অবস্থা বোঝাতে Past Simple ব্যবহার করা হয়। নির্দিষ্ট অতীত সময়, ঐতিহাসিক তথ্য, অতীতের অভ্যাস এবং বর্ণনায় এটি ব্যবহার হয়।',
  positiveExamples: [
    'She visited Paris last summer.',
    'The scientists discovered a new element in 2019.',
    'He worked at that company for ten years.',
    'The ancient Romans built magnificent structures.',
  ],
  negativeExamples: [
    'She did not visit Paris last year.',
    'The team did not win the championship.',
    'He didn\'t understand the instructions at first.',
    'The policy did not achieve its intended goals.',
  ],
  questionExamples: [
    'Did you finish your homework?',
    'Did the conference take place as planned?',
    'Did she accept the offer?',
    'Did the researchers publish their findings?',
  ],
  whQuestionExamples: [
    'Where did you go last weekend?',
    'What did the survey reveal?',
    'When did the company launch its first product?',
    'Why did she decide to change careers?',
  ],
  uses: [
    {
      title: 'Completed Past Actions',
      explanation: 'Actions that started and finished at a specific time in the past.',
      example: 'She wrote the report yesterday and submitted it this morning.',
    },
    {
      title: 'Past Habits & Repeated Actions',
      explanation: 'Regular activities that happened repeatedly in the past (no longer happening).',
      example: 'When he was young, he played football every Sunday.',
    },
    {
      title: 'Specific Past Times',
      explanation: 'Actions at defined past times: yesterday, last year, in 2010, two days ago.',
      example: 'The government introduced the policy in 2015.',
    },
    {
      title: 'Historical Events',
      explanation: 'Facts about history, science, and the world.',
      example: 'Neil Armstrong landed on the moon in 1969.',
    },
    {
      title: 'Sequence of Past Events',
      explanation: 'A series of completed events in order.',
      example: 'She arrived, greeted everyone, and began her presentation.',
    },
    {
      title: 'Past States',
      explanation: 'Situations or states that existed at a specific past time.',
      example: 'The city was much smaller fifty years ago.',
    },
  ],
  signalWords: ['yesterday', 'last year', 'last month', 'ago', 'in 2010', 'in the 1990s', 'then', 'when', 'after', 'before', 'at that time', 'once', 'finally'],
  signalWordsNote: 'Past Simple always uses specific time references. If the time is NOT specified, Present Perfect may be more appropriate.',
  interactiveSentence: [
    { text: 'The researchers', role: 'Subject', explanation: 'The people who performed the action.', color: '#6366f1' },
    { text: 'conducted', role: 'V2 (Past Form)', explanation: '"Conduct" is a regular verb. Past form: conducted (add -ed). This is the Past Simple form.', color: '#f59e0b' },
    { text: 'a comprehensive survey', role: 'Object', explanation: 'What they conducted.', color: '#10b981' },
    { text: 'in 2022', role: 'Time Reference', explanation: 'A specific past year — this confirms Past Simple is correct.', color: '#8b5cf6' },
  ],
  difficulty: 'Beginner',
  color: '#f59e0b',
  icon: '📅',
};
