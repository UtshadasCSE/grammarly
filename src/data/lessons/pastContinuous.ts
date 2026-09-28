import type { TenseLesson } from '@/types';

export const pastContinuousLesson: TenseLesson = {
  id: 'past-continuous',
  name: 'Past Continuous',
  banglaName: 'চলমান অতীত কাল',
  formula: {
    positive: 'Subject + was/were + V-ing',
    negative: 'Subject + was/were + not + V-ing',
    question: 'Was/Were + Subject + V-ing?',
    whQuestion: 'WH word + was/were + Subject + V-ing?',
  },
  introduction: 'Past Continuous describes an action that was in progress at a specific moment in the past. It is often used alongside Past Simple to show interrupted actions or simultaneous activities.',
  introductionBangla: 'অতীতের কোনো নির্দিষ্ট মুহূর্তে চলমান কাজ বোঝাতে Past Continuous ব্যবহার হয়। বাধাপ্রাপ্ত কাজ বা একই সময়ে সংঘটিত কাজ দেখাতে এটি Past Simple-এর সঙ্গে ব্যবহৃত হয়।',
  positiveExamples: [
    'I was studying at 9 pm last night.',
    'They were playing football when it started to rain.',
    'She was giving a presentation when the power went off.',
    'The researchers were analysing data at the time.',
  ],
  negativeExamples: [
    'I was not listening when the teacher explained the rule.',
    'The team was not performing well during that period.',
    'She was not sleeping — she was thinking.',
    'The factory was not operating at full capacity at the time.',
  ],
  questionExamples: [
    'Were you sleeping when I called?',
    'Was the meeting going well before the interruption?',
    'Were they still working on the project last Tuesday?',
    'Was she feeling better by the afternoon?',
  ],
  whQuestionExamples: [
    'What were you doing at 8 pm?',
    'Why were they arguing?',
    'Where was she living when she graduated?',
    'Who was managing the project at that time?',
  ],
  uses: [
    {
      title: 'Action in Progress at a Specific Past Moment',
      explanation: 'An action was happening at a particular time.',
      example: 'At 10 o\'clock last night, she was reading a novel.',
    },
    {
      title: 'Interrupted Action (Past Continuous + Past Simple)',
      explanation: 'An ongoing action was interrupted by a shorter completed action.',
      example: 'I was walking to work when I saw the accident.',
    },
    {
      title: 'Simultaneous Past Actions',
      explanation: 'Two or more actions happening at the same time.',
      example: 'While she was cooking, he was setting the table.',
    },
    {
      title: 'Background Action in a Narrative',
      explanation: 'Setting the scene for a story or report.',
      example: 'The sun was shining, birds were singing, and people were strolling in the park.',
    },
    {
      title: 'Temporary Past Situations',
      explanation: 'A temporary state during a period in the past.',
      example: 'She was living in London while she was completing her PhD.',
    },
  ],
  signalWords: ['while', 'when', 'as', 'at that moment', 'at 8 pm', 'all day', 'all night', 'during that time', 'at the time of'],
  signalWordsNote: '"While" often introduces Past Continuous. "When" can introduce either Past Continuous (ongoing) or Past Simple (sequential event).',
  interactiveSentence: [
    { text: 'When the researchers arrived,', role: 'Time Clause (Past Simple)', explanation: '"Arrived" = completed past action. This is the interrupting event.', color: '#f59e0b' },
    { text: 'the participants', role: 'Subject', explanation: 'The people performing the ongoing action.', color: '#6366f1' },
    { text: 'were completing', role: 'was/were + V-ing', explanation: 'Past Continuous = ongoing action in progress when the researchers arrived.', color: '#10b981' },
    { text: 'the questionnaire.', role: 'Object', explanation: 'What they were doing.', color: '#8b5cf6' },
  ],
  difficulty: 'Intermediate',
  color: '#10b981',
  icon: '⏳',
};
