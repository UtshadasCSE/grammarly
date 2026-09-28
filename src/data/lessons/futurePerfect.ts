import type { TenseLesson } from '@/types';

export const futurePerfectLesson: TenseLesson = {
  id: 'future-perfect',
  name: 'Future Perfect',
  banglaName: 'পুরাঘটিত ভবিষ্যৎ কাল',
  formula: {
    positive: 'Subject + will have + V3 (Past Participle)',
    negative: 'Subject + will not (won\'t) have + V3',
    question: 'Will + Subject + have + V3?',
    whQuestion: 'Wh-word + will + Subject + have + V3?',
  },
  introduction: 'The Future Perfect tense is used to describe an action that will be completely finished before another time or action in the future. It looks back from a point in the future.',
  introductionBangla: 'ভবিষ্যতে কোন নির্দিষ্ট সময়ের পূর্বে কোন কাজ সম্পন্ন হয়ে থাকবে বোঝালে Future Perfect Tense বা পুরাঘটিত ভবিষ্যৎ কাল ব্যবহৃত হয়।',
  positiveExamples: [
    'I will have finished my homework by 9 PM.',
    'She will have graduated by next year.',
    'They will have arrived before you leave.'
  ],
  negativeExamples: [
    'I won\'t have finished my homework by 9 PM.',
    'She won\'t have graduated by next year.',
    'They won\'t have arrived before you leave.'
  ],
  questionExamples: [
    'Will you have finished by 9 PM?',
    'Will she have graduated by next year?',
    'Will they have arrived before you leave?'
  ],
  whQuestionExamples: [
    'What will you have finished by 9 PM?',
    'When will she have graduated?',
    'How many will they have prepared?'
  ],
  uses: [
    {
      title: 'Completed Action Before a Future Time',
      explanation: 'To show that an action will finish before a specific deadline or event in the future.',
      example: 'By the time you wake up, I will have cooked breakfast.'
    },
    {
      title: 'Assumptions about the Past',
      explanation: 'Sometimes used to guess what has happened, assuming it is already complete.',
      example: 'They will have reached the hotel by now.'
    }
  ],
  signalWords: ['by', 'by the time', 'before', 'by tomorrow', 'by next week'],
  signalWordsNote: 'The word "by" meaning "not later than" is the most common signal for Future Perfect.',
  interactiveSentence: [
    { text: 'By 2030,', role: 'time', explanation: 'The future deadline', color: 'amber' },
    { text: 'scientists', role: 'subject', explanation: 'The doer', color: 'indigo' },
    { text: 'will have', role: 'auxiliary', explanation: 'Future perfect helper verbs', color: 'rose' },
    { text: 'discovered', role: 'verb', explanation: 'Past participle (V3)', color: 'emerald' },
    { text: 'a cure.', role: 'object', explanation: 'The completed result', color: 'amber' }
  ],
  icon: 'sparkles',
  difficulty: 'Advanced',
  color: 'violet'
};
