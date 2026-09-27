import type { TenseLesson } from '@/types';

export const presentPerfectContinuousLesson: TenseLesson = {
  id: 'perfect-continuous',
  name: 'Present Perfect Continuous',
  banglaName: 'চলমান পুর্ণ বর্তমান কাল',
  difficulty: 'Advanced',
  color: 'rose',
  icon: '🔴',
  formula: {
    positive: 'Subject + have/has + been + V-ing',
    negative: 'Subject + have/has + not + been + V-ing',
    question: 'Have/Has + Subject + been + V-ing?',
    whQuestion: 'WH-word + have/has + Subject + been + V-ing?',
  },
  introduction: `The Present Perfect Continuous tense emphasizes the duration and ongoing nature of an action that started in the past and continues into the present. It focuses on the process and activity itself, not just the result.`,
  introductionBangla: `চলমান পুর্ণ বর্তমান কাল ব্যবহার হয় এমন কাজ বোঝাতে যা অতীতে শুরু হয়েছে এবং এখনও চলছে বা সবে শেষ হয়েছে। এটি কাজের স্থায়িত্ব এবং প্রক্রিয়াকে গুরুত্ব দেয়।`,
  positiveExamples: [
    'She has been studying English for three years.',
    'Researchers have been investigating the long-term effects of social media on adolescents.',
    'The city council has been planning the new transport infrastructure since 2021.',
    'Scientists have been monitoring rising sea levels for decades.',
    'He has been working on his doctoral thesis since September.',
  ],
  negativeExamples: [
    'She has not been attending lectures regularly this semester.',
    'Governments have not been doing enough to reduce carbon emissions.',
    'Students have not been taking digital literacy seriously until recently.',
  ],
  questionExamples: [
    'Has she been studying at this university for long?',
    'Have researchers been making progress on the vaccine?',
    'How long has he been living in this city?',
  ],
  whQuestionExamples: [
    'How long have scientists been studying climate change?',
    'What have researchers been discovering about artificial intelligence?',
    'Why has the government been investing in renewable energy?',
  ],
  uses: [
    {
      title: 'Duration of an Ongoing Action',
      explanation: 'Emphasizes HOW LONG an action has been continuing. Always used with "for" or "since."',
      example: 'Researchers have been studying the effects of remote work for several years.',
    },
    {
      title: 'Recently Stopped Activity (Visible Effects)',
      explanation: 'An action that just stopped, with evidence visible now.',
      example: 'He has been running — he is still out of breath.',
    },
    {
      title: 'Repeated Ongoing Actions',
      explanation: 'An action happening repeatedly over a period of time.',
      example: 'She has been attending international conferences throughout her career.',
    },
    {
      title: 'Temporary Situations',
      explanation: 'A temporary arrangement or situation that has been going on for some time.',
      example: 'The university has been offering online courses since the pandemic.',
    },
    {
      title: 'Explaining Current States',
      explanation: 'The reason why something looks or feels a certain way right now.',
      example: 'I am exhausted because I have been working without a break since morning.',
    },
  ],
  signalWords: ['for', 'since', 'how long', 'all day', 'all morning', 'recently', 'lately', 'over the past few years', 'for the last decade', 'since 2020'],
  signalWordsNote: 'The most important clue is duration: "for" + period of time, or "since" + a point in time. But always ask: Is the action still continuing? Is the process itself the focus? If yes, Present Perfect Continuous fits.',
  interactiveSentence: [
    {
      text: 'She',
      role: 'Subject',
      explanation: '"She" is the third-person singular subject. With "she," we use "has" (not "have") to form the Present Perfect Continuous.',
      color: '#6366f1',
    },
    {
      text: 'has',
      role: 'Auxiliary Verb (have/has)',
      explanation: '"Has" is the Present Perfect auxiliary for third-person singular. It combines with "been" + V-ing to show duration.',
      color: '#8b5cf6',
    },
    {
      text: 'been',
      role: 'Past Participle of "be"',
      explanation: '"Been" is the past participle of "be." In Present Perfect Continuous, "have/has + been" always comes before the -ing form. This is what makes it different from Present Perfect.',
      color: '#10b981',
    },
    {
      text: 'studying',
      role: 'Main Verb (-ing form)',
      explanation: '"Studying" is the present participle. The -ing form shows the action is ongoing — it has been in progress from a past point to now.',
      color: '#f59e0b',
    },
    {
      text: 'English',
      role: 'Object',
      explanation: 'The thing being studied. "English" is the direct object of "studying."',
      color: '#ef4444',
    },
    {
      text: 'for three years',
      role: 'Duration (Time Expression)',
      explanation: '"For three years" shows HOW LONG the action has been happening. "For" + period of time is the most common time expression with Present Perfect Continuous.',
      color: '#06b6d4',
    },
  ],
};
