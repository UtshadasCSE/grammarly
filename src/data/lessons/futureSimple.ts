import type { TenseLesson } from '@/types';

export const futureSimpleLesson: TenseLesson = {
  id: 'future-simple',
  name: 'Future Simple',
  banglaName: 'সাধারণ ভবিষ্যৎ কাল',
  formula: {
    positive: 'Subject + will + V1 (Base Form)',
    negative: 'Subject + will + not + V1',
    question: 'Will + Subject + V1?',
    whQuestion: 'Wh-word + will + Subject + V1?',
  },
  introduction: 'The Future Simple tense is used to talk about actions or events that haven\'t happened yet. We often use it for predictions, promises, offers, or decisions made at the exact moment of speaking.',
  introductionBangla: 'ভবিষ্যতে কোন কাজ ঘটবে বা হবে বোঝালে Future Simple Tense বা সাধারণ ভবিষ্যৎ কাল ব্যবহৃত হয়।',
  positiveExamples: [
    'I will call you tomorrow.',
    'They will arrive at 8 PM.',
    'It will rain later.'
  ],
  negativeExamples: [
    'I will not (won\'t) call you tomorrow.',
    'They will not (won\'t) arrive at 8 PM.',
    'It will not (won\'t) rain later.'
  ],
  questionExamples: [
    'Will you call me tomorrow?',
    'Will they arrive at 8 PM?',
    'Will it rain later?'
  ],
  whQuestionExamples: [
    'When will you call me?',
    'What time will they arrive?',
    'Why will it rain?'
  ],
  uses: [
    {
      title: 'Predictions',
      explanation: 'To say what we think or guess will happen (often with words like think, hope, believe).',
      example: 'I think she will win the competition.'
    },
    {
      title: 'Instant Decisions',
      explanation: 'When we decide to do something at the exact moment of speaking.',
      example: 'It\'s cold. I will close the window.'
    },
    {
      title: 'Promises & Offers',
      explanation: 'When committing to an action or offering help.',
      example: 'Don\'t worry, I will help you with your homework.'
    }
  ],
  signalWords: ['tomorrow', 'next week', 'soon', 'later', 'in the future', 'probably'],
  signalWordsNote: 'These adverbs of time typically point to a point in the future.',
  interactiveSentence: [
    { text: 'They', role: 'subject', explanation: 'The people performing the action', color: 'indigo' },
    { text: 'will', role: 'auxiliary', explanation: 'Indicates the future tense', color: 'rose' },
    { text: 'build', role: 'verb', explanation: 'Base form of the main verb (V1)', color: 'emerald' },
    { text: 'a new hospital.', role: 'object', explanation: 'The thing being built', color: 'amber' }
  ],
  icon: 'sparkles',
  difficulty: 'Beginner',
  color: 'indigo'
};
