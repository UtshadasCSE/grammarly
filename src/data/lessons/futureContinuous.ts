import type { TenseLesson } from '@/types';

export const futureContinuousLesson: TenseLesson = {
  id: 'future-continuous',
  name: 'Future Continuous',
  banglaName: 'ঘটমান ভবিষ্যৎ কাল',
  formula: {
    positive: 'Subject + will be + V-ing',
    negative: 'Subject + will not (won\'t) be + V-ing',
    question: 'Will + Subject + be + V-ing?',
    whQuestion: 'Wh-word + will + Subject + be + V-ing?',
  },
  introduction: 'The Future Continuous tense is used to describe an action that will be in progress at a specific time in the future. It emphasizes the duration or continuity of a future action.',
  introductionBangla: 'ভবিষ্যতে কোন কাজ চলতে থাকবে বা ঘটতে থাকবে বোঝালে Future Continuous Tense বা ঘটমান ভবিষ্যৎ কাল ব্যবহৃত হয়।',
  positiveExamples: [
    'I will be studying at 8 PM tonight.',
    'They will be traveling to London tomorrow.',
    'She will be waiting for you.'
  ],
  negativeExamples: [
    'I won\'t be studying at 8 PM tonight.',
    'They won\'t be traveling tomorrow.',
    'She won\'t be waiting for you.'
  ],
  questionExamples: [
    'Will you be studying at 8 PM?',
    'Will they be traveling tomorrow?',
    'Will she be waiting?'
  ],
  whQuestionExamples: [
    'What will you be doing at 8 PM?',
    'Where will they be traveling?',
    'Who will she be waiting for?'
  ],
  uses: [
    {
      title: 'Action in Progress',
      explanation: 'To describe an action that will be happening at an exact moment in the future.',
      example: 'At 10 AM tomorrow, I will be attending a meeting.'
    },
    {
      title: 'Future Plans',
      explanation: 'To ask politely about someone\'s plans for the near future.',
      example: 'Will you be using the car later?'
    }
  ],
  signalWords: ['at [time] tomorrow', 'this time next week', 'in the afternoon', 'meanwhile'],
  signalWordsNote: 'Notice how these phrases usually pinpoint a specific ongoing moment in the future.',
  interactiveSentence: [
    { text: 'We', role: 'subject', explanation: 'The people performing the action', color: 'indigo' },
    { text: 'will be', role: 'auxiliary', explanation: 'Future continuous helping verbs', color: 'rose' },
    { text: 'watching', role: 'verb', explanation: 'Present participle (V-ing)', color: 'emerald' },
    { text: 'the match tonight.', role: 'object', explanation: 'The context of the action', color: 'amber' }
  ],
  icon: 'sparkles',
  difficulty: 'Intermediate',
  color: 'emerald'
};
