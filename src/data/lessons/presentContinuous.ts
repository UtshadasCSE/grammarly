import type { TenseLesson } from '@/types';

export const presentContinuousLesson: TenseLesson = {
  id: 'continuous',
  name: 'Present Continuous',
  banglaName: 'চলমান বর্তমান কাল',
  difficulty: 'Beginner',
  color: 'emerald',
  icon: '🟢',
  formula: {
    positive: 'Subject + am/is/are + V-ing',
    negative: 'Subject + am/is/are + not + V-ing',
    question: 'Am/Is/Are + Subject + V-ing?',
    whQuestion: 'WH-word + am/is/are + Subject + V-ing?',
  },
  introduction: `The Present Continuous tense describes actions happening right now, temporary situations, and trends that are changing. It captures a sense of movement and activity at this moment.`,
  introductionBangla: `চলমান বর্তমান কাল ব্যবহার করা হয় এমন কাজ বোঝাতে যা এই মুহূর্তে চলছে, সাময়িক পরিস্থিতি বা পরিবর্তনশীল প্রবণতা।`,
  positiveExamples: [
    'She is studying for her IELTS exam right now.',
    'Researchers are investigating the impact of AI on employment.',
    'Cities are becoming increasingly dependent on digital infrastructure.',
    'Students are relying more on online learning platforms this semester.',
    'The university is currently reviewing its admissions policy.',
  ],
  negativeExamples: [
    'He is not attending the conference this week.',
    'The government is not investing enough in renewable energy currently.',
    'Students are not finding traditional methods effective anymore.',
  ],
  questionExamples: [
    'Is she studying for the IELTS exam?',
    'Are researchers publishing their findings yet?',
    'Is the situation improving in urban areas?',
  ],
  whQuestionExamples: [
    'What is she studying at the moment?',
    'Why are so many students choosing online courses?',
    'How are companies adapting to technological change?',
  ],
  uses: [
    {
      title: 'Actions Happening Right Now',
      explanation: 'Something is in progress at this exact moment.',
      example: 'She is reading an article about artificial intelligence.',
    },
    {
      title: 'Temporary Situations',
      explanation: 'A situation that will not last permanently.',
      example: 'He is working from home while the office is being renovated.',
    },
    {
      title: 'Current Trends and Changes',
      explanation: 'Gradual changes happening over a period around now.',
      example: 'The global temperature is rising due to carbon emissions.',
    },
    {
      title: 'Future Arrangements',
      explanation: 'Personal plans already arranged for the near future.',
      example: 'We are meeting the research team next Thursday.',
    },
    {
      title: 'Annoying Habits (with always)',
      explanation: 'A repeated action that annoys the speaker.',
      example: 'He is always interrupting others during meetings.',
    },
  ],
  signalWords: ['now', 'right now', 'at the moment', 'currently', 'at present', 'these days', 'this week', 'still', 'today'],
  signalWordsNote: 'Signal words help, but the key is asking: Is the action in progress right now, or temporarily around now? These days and currently often indicate trends.',
  interactiveSentence: [
    {
      text: 'Cities',
      role: 'Subject (Plural)',
      explanation: 'The subject performing the action. "Cities" is plural, so we use "are."',
      color: '#6366f1',
    },
    {
      text: 'are',
      role: 'Auxiliary Verb (be)',
      explanation: '"Are" is the present tense of "be" used with plural subjects and "you." It forms the continuous structure with the -ing verb.',
      color: '#8b5cf6',
    },
    {
      text: 'becoming',
      role: 'Main Verb (-ing form)',
      explanation: '"Becoming" is the present participle. It shows the action is in progress — cities are in the process of becoming more digital.',
      color: '#10b981',
    },
    {
      text: 'increasingly',
      role: 'Adverb (Intensifier)',
      explanation: '"Increasingly" shows the degree is growing over time — a typical word used when describing current trends.',
      color: '#f59e0b',
    },
    {
      text: 'dependent on digital infrastructure',
      role: 'Adjective Complement',
      explanation: 'Describes the state cities are transitioning into. "Dependent on" is a common academic collocation.',
      color: '#ef4444',
    },
  ],
};
