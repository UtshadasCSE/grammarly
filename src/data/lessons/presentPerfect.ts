import type { TenseLesson } from '@/types';

export const presentPerfectLesson: TenseLesson = {
  id: 'perfect',
  name: 'Present Perfect',
  banglaName: 'পুর্ণ বর্তমান কাল',
  difficulty: 'Intermediate',
  color: 'violet',
  icon: '🟣',
  formula: {
    positive: 'Subject + have/has + Past Participle (V3)',
    negative: 'Subject + have/has + not + Past Participle',
    question: 'Have/Has + Subject + Past Participle?',
    whQuestion: 'WH-word + have/has + Subject + Past Participle?',
  },
  introduction: `The Present Perfect connects the past to the present. It describes experiences, achievements, or situations that started in the past but have relevance, results, or continuation in the present. It does NOT specify when exactly the action happened.`,
  introductionBangla: `পুর্ণ বর্তমান কাল অতীতের কাজকে বর্তমানের সাথে যুক্ত করে। এটি ব্যবহার হয় জীবনের অভিজ্ঞতা, সাম্প্রতিক ঘটনা, এবং এমন পরিস্থিতি বোঝাতে যার ফলাফল এখনও বিদ্যমান।`,
  positiveExamples: [
    'Scientists have discovered a new approach to treating antibiotic resistance.',
    'Governments have invested heavily in renewable energy infrastructure.',
    'She has worked in education for over a decade.',
    'Technology has transformed the way students access information.',
    'Research has shown that active learning improves academic performance.',
  ],
  negativeExamples: [
    'Researchers have not yet identified a permanent solution.',
    'Many countries have not implemented effective climate policies.',
    'She has not completed her doctoral thesis yet.',
  ],
  questionExamples: [
    'Have scientists made any breakthroughs in cancer research?',
    'Has the government responded to the housing crisis?',
    'Have you ever studied abroad?',
  ],
  whQuestionExamples: [
    'What have researchers discovered about AI and education?',
    'How much has technology changed communication in recent years?',
    'Why have so many students chosen online learning platforms?',
  ],
  uses: [
    {
      title: 'Life Experiences',
      explanation: 'Something you have or have not experienced at some point in your life. No specific time given.',
      example: 'She has visited twelve countries and worked in three different industries.',
    },
    {
      title: 'Recent Actions with Present Results',
      explanation: 'An action completed recently, with a visible result now.',
      example: 'The university has just announced a new scholarship programme.',
    },
    {
      title: 'Unfinished Time Periods',
      explanation: 'The time period has not ended yet (today, this week, this year).',
      example: 'Researchers have published over 50 papers this year.',
    },
    {
      title: 'Past-to-Present Situations',
      explanation: 'A situation that started in the past and continues until now (with "since" or "for").',
      example: 'He has worked at the institute since 2018.',
    },
    {
      title: 'News and Announcements',
      explanation: 'Introducing a piece of news. Often followed by past simple for details.',
      example: 'Scientists have identified a new strain of the virus. It was first detected in Southeast Asia.',
    },
  ],
  signalWords: ['already', 'yet', 'just', 'ever', 'never', 'since', 'for', 'recently', 'so far', 'up to now', 'lately', 'in recent years', 'this year', 'today'],
  signalWordsNote: 'Signal words are clues, not rules. The key question is: Does the action connect to the present in some way — through its result, its ongoing relevance, or an unfinished time frame? If yes, use Present Perfect.',
  interactiveSentence: [
    {
      text: 'Technology',
      role: 'Subject',
      explanation: 'The subject performing the action. "Technology" is a singular noun, so we use "has."',
      color: '#6366f1',
    },
    {
      text: 'has',
      role: 'Auxiliary Verb (have/has)',
      explanation: '"Has" is used with third-person singular subjects (he, she, it, and singular nouns). It forms the Present Perfect with the past participle.',
      color: '#8b5cf6',
    },
    {
      text: 'transformed',
      role: 'Past Participle (V3)',
      explanation: '"Transformed" is the past participle of "transform." In Present Perfect, we always use the past participle — not the simple past form.',
      color: '#10b981',
    },
    {
      text: 'the way',
      role: 'Noun Phrase (Object)',
      explanation: '"The way" functions as the object. It is modified by the relative clause that follows.',
      color: '#f59e0b',
    },
    {
      text: 'students access information',
      role: 'Relative Clause',
      explanation: 'This clause modifies "the way" — explaining which way has been transformed. Present Simple is used here because it describes a current habit or general truth.',
      color: '#ef4444',
    },
  ],
};
