import type { TenseLesson } from '@/types';

export const pastPerfectContinuousLesson: TenseLesson = {
  id: 'past-perfect-continuous',
  name: 'Past Perfect Continuous',
  banglaName: 'চলমান পূর্ণ অতীত কাল',
  formula: {
    positive: 'Subject + had been + V-ing',
    negative: 'Subject + had not been + V-ing',
    question: 'Had + Subject + been + V-ing?',
    whQuestion: 'How long + had + Subject + been + V-ing?',
  },
  introduction: 'Past Perfect Continuous describes an ongoing action that started before a past moment and was still in progress (or had just stopped) at that moment. It emphasises DURATION before a past reference point.',
  introductionBangla: 'অতীতের একটি নির্দিষ্ট মুহূর্তের আগে থেকে চলে আসা এবং সেই মুহূর্ত পর্যন্ত চলমান কাজ বোঝাতে Past Perfect Continuous ব্যবহার হয়। এটি একটি অতীত ঘটনার আগে কতক্ষণ ধরে কাজ চলছিল তা জোর দিয়ে বলে।',
  positiveExamples: [
    'I had been studying for three hours before I took a break.',
    'She was tired because she had been working all day.',
    'They had been waiting for two hours when the train finally arrived.',
    'By the time he graduated, he had been learning English for ten years.',
  ],
  negativeExamples: [
    'He hadn\'t been sleeping well for weeks before the exam.',
    'The company had not been performing well before the restructuring.',
    'She hadn\'t been feeling well, which explained her absence.',
    'The system had not been functioning properly for months.',
  ],
  questionExamples: [
    'Had you been waiting long before I arrived?',
    'Had she been studying abroad before she returned?',
    'Had the researchers been monitoring the situation for long?',
    'Had the policy been working well before it was revised?',
  ],
  whQuestionExamples: [
    'How long had you been learning English before this course?',
    'For how long had the company been losing money?',
    'What had he been doing for the past few years?',
    'Since when had the community been struggling with this problem?',
  ],
  uses: [
    {
      title: 'Duration Before a Past Reference Point',
      explanation: 'An activity was happening for a period of time before another past event.',
      example: 'I had been waiting for an hour when she finally arrived.',
    },
    {
      title: 'Cause of a Past Result',
      explanation: 'A prolonged activity explains a visible result or condition in the past.',
      example: 'His hands were dirty because he had been gardening.',
    },
    {
      title: 'Ongoing Activity Before Another Past Event',
      explanation: 'An activity in progress before a past turning point.',
      example: 'She had been studying law for three years before switching to medicine.',
    },
    {
      title: 'Repeated Activity Over a Period (Before a Past Point)',
      explanation: 'Multiple occurrences over a period before something changed.',
      example: 'The team had been submitting weekly reports before the procedure changed.',
    },
    {
      title: 'Past Perfect Continuous vs Past Perfect',
      explanation: 'PPC emphasises DURATION and ongoing nature; PP emphasises completion.',
      example: '"She had read the report." (done) vs "She had been reading the report." (ongoing process)',
    },
  ],
  signalWords: ['for', 'since', 'for three years', 'all day', 'all night', 'for months', 'for decades', 'before', 'until', 'by the time', 'when'],
  signalWordsNote: '"For" and "since" are the strongest signals for Past Perfect Continuous. "For" + duration, "since" + starting point.',
  interactiveSentence: [
    { text: 'The researchers', role: 'Subject', explanation: 'The people performing the ongoing action.', color: '#6366f1' },
    { text: 'had been monitoring', role: 'had been + V-ing', explanation: 'Past Perfect Continuous = ongoing activity over a period before the reference point.', color: '#ec4899' },
    { text: 'the participants', role: 'Object', explanation: 'Who they were monitoring.', color: '#10b981' },
    { text: 'for several months', role: 'Duration (FOR + time)', explanation: '"For several months" = the length of the ongoing activity. This is a key signal for PPC.', color: '#f59e0b' },
    { text: 'before they identified', role: 'Reference Point', explanation: '"Before they identified" = the past reference point. The monitoring was ongoing BEFORE this moment.', color: '#8b5cf6' },
    { text: 'the unexpected pattern.', role: 'Discovery', explanation: 'The discovery (Past Simple) that ended or changed the ongoing monitoring.', color: '#14b8a6' },
  ],
  difficulty: 'Advanced',
  color: '#ec4899',
  icon: '🔄',
};
