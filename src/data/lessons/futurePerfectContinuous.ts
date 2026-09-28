import type { TenseLesson } from '@/types';

export const futurePerfectContinuousLesson: TenseLesson = {
  id: 'future-perfect-continuous',
  name: 'Future Perfect Continuous',
  banglaName: 'পুরাঘটিত চলমান ভবিষ্যৎ কাল',
  formula: {
    positive: 'Subject + will have been + V-ing',
    negative: 'Subject + won\'t have been + V-ing',
    question: 'Will + Subject + have been + V-ing?',
    whQuestion: 'Wh-word + will + Subject + have been + V-ing?',
  },
  introduction: 'The Future Perfect Continuous focuses on the duration of an action up to a certain point in the future. It is used to emphasize how long something will have been happening.',
  introductionBangla: 'ভবিষ্যতে কোন কাজ নির্দিষ্ট সময় ধরে চলতে থাকবে বোঝালে Future Perfect Continuous Tense ব্যবহৃত হয়।',
  positiveExamples: [
    'By next month, I will have been living here for five years.',
    'At 5 PM, she will have been working for ten hours.',
    'They will have been traveling all day by the time they arrive.'
  ],
  negativeExamples: [
    'I won\'t have been living here for five years by next month.',
    'She won\'t have been working for ten hours.',
    'They won\'t have been traveling all day.'
  ],
  questionExamples: [
    'Will you have been living here for five years?',
    'Will she have been working for ten hours?',
    'Will they have been traveling all day?'
  ],
  whQuestionExamples: [
    'How long will you have been living here?',
    'How long will she have been working?',
    'Where will they have been traveling?'
  ],
  uses: [
    {
      title: 'Duration Before a Future Action',
      explanation: 'To express how long a continuous action has lasted up to a point in the future.',
      example: 'By the time the train arrives, we will have been waiting for two hours.'
    },
    {
      title: 'Cause of a Future Effect',
      explanation: 'To show the result of a continuous action in the future.',
      example: 'He will be very tired because he will have been running.'
    }
  ],
  signalWords: ['for', 'by the time', 'by next year', 'all day'],
  signalWordsNote: 'You usually need both a time reference ("by the time") and a duration ("for two hours").',
  interactiveSentence: [
    { text: 'Next year,', role: 'time', explanation: 'The future reference point', color: 'amber' },
    { text: 'I', role: 'subject', explanation: 'The doer', color: 'indigo' },
    { text: 'will have been', role: 'auxiliary', explanation: 'Future perfect continuous helpers', color: 'rose' },
    { text: 'teaching', role: 'verb', explanation: 'Present participle (V-ing)', color: 'emerald' },
    { text: 'for a decade.', role: 'duration', explanation: 'The length of time', color: 'amber' }
  ],
  icon: 'sparkles',
  difficulty: 'Advanced',
  color: 'rose'
};
