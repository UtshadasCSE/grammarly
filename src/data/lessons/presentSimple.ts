import type { TenseLesson } from '@/types';

export const presentSimpleLesson: TenseLesson = {
  id: 'simple',
  name: 'Present Simple',
  banglaName: 'সাধারণ বর্তমান কাল',
  difficulty: 'Beginner',
  color: 'indigo',
  icon: '🔵',
  formula: {
    positive: 'Subject + V1 (s/es for he/she/it)',
    negative: 'Subject + do/does + not + V1',
    question: 'Do/Does + Subject + V1?',
    whQuestion: 'WH-word + do/does + Subject + V1?',
  },
  introduction: `The Present Simple tense describes actions that happen regularly, facts that are always true, and permanent states. Think of it as the "default" tense for everyday habits and universal truths.`,
  introductionBangla: `সাধারণ বর্তমান কাল ব্যবহার করা হয় এমন কাজ বা অবস্থা বোঝাতে যা নিয়মিত ঘটে, সবসময় সত্য, বা স্থায়ী। যেমন: অভ্যাস, সত্য তথ্য, মতামত।`,
  positiveExamples: [
    'She reads the newspaper every morning.',
    'Researchers study the effects of climate change.',
    'Water boils at 100 degrees Celsius.',
    'He works at a technology company in London.',
    'Students often rely on digital resources for research.',
  ],
  negativeExamples: [
    'She does not read the newspaper on Sundays.',
    'He does not work on weekends.',
    'Many students do not understand grammar rules immediately.',
    'The government does not always act quickly on environmental issues.',
  ],
  questionExamples: [
    'Does she read the newspaper every day?',
    'Do you work in the technology sector?',
    'Does the university provide sufficient digital resources?',
  ],
  whQuestionExamples: [
    'What does she read every morning?',
    'Where do researchers conduct their studies?',
    'How often do students use digital tools?',
  ],
  uses: [
    {
      title: 'Habits and Routines',
      explanation: 'Actions that happen repeatedly or regularly.',
      example: 'She commutes to work by train every day.',
    },
    {
      title: 'General Truths and Facts',
      explanation: 'Things that are always true, scientific facts.',
      example: 'Artificial intelligence transforms industries rapidly.',
    },
    {
      title: 'Permanent States',
      explanation: 'Situations that do not change or change very slowly.',
      example: 'He lives in Dhaka and works at a research institute.',
    },
    {
      title: 'Opinions and Feelings',
      explanation: 'What someone thinks or feels (stative verbs).',
      example: 'Many educators believe technology improves learning outcomes.',
    },
    {
      title: 'Scheduled Future Events',
      explanation: 'Fixed timetables and official schedules.',
      example: 'The conference begins at 9 AM next Monday.',
    },
    {
      title: 'Academic Writing',
      explanation: 'Describing research findings and established knowledge.',
      example: 'Studies show that students learn better with active practice.',
    },
  ],
  signalWords: ['always', 'usually', 'often', 'sometimes', 'rarely', 'never', 'every day', 'every week', 'once a week', 'generally', 'normally'],
  signalWordsNote: 'Signal words can guide you, but focus on meaning. Ask: Is this a habit? A fact? A permanent state? If yes, Present Simple is likely correct.',
  interactiveSentence: [
    {
      text: 'Researchers',
      role: 'Subject',
      explanation: 'The people performing the action. With "researchers" (plural), we do NOT add -s to the verb.',
      color: '#6366f1',
    },
    {
      text: 'study',
      role: 'Main Verb (V1)',
      explanation: 'The base form of the verb. No -s added because the subject is plural (researchers).',
      color: '#8b5cf6',
    },
    {
      text: 'the effects',
      role: 'Object',
      explanation: 'What the researchers study. This is the direct object of the verb.',
      color: '#10b981',
    },
    {
      text: 'of artificial intelligence',
      role: 'Prepositional Phrase',
      explanation: 'A phrase beginning with "of" that modifies "effects" — specifying which effects.',
      color: '#f59e0b',
    },
    {
      text: 'on education',
      role: 'Prepositional Phrase',
      explanation: 'Another "on" phrase showing the area affected by artificial intelligence.',
      color: '#ef4444',
    },
  ],
};
