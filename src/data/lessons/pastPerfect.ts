import type { TenseLesson } from '@/types';

export const pastPerfectLesson: TenseLesson = {
  id: 'past-perfect',
  name: 'Past Perfect',
  banglaName: 'পূর্ণ অতীত কাল',
  formula: {
    positive: 'Subject + had + V3 (past participle)',
    negative: 'Subject + had not (hadn\'t) + V3',
    question: 'Had + Subject + V3?',
    whQuestion: 'WH word + had + Subject + V3?',
  },
  introduction: 'Past Perfect describes an action that was completed BEFORE another action in the past. It shows the earlier of two past events, establishing sequence and cause-effect relationships.',
  introductionBangla: 'অতীতের দুটি ঘটনার মধ্যে যেটি আগে ঘটেছে তা বোঝাতে Past Perfect ব্যবহার হয়। এটি দুটি অতীত ঘটনার ক্রম এবং কারণ-ফলাফল সম্পর্ক প্রকাশ করে।',
  positiveExamples: [
    'The train had left before we reached the station.',
    'She had already submitted the report when the manager arrived.',
    'By 2010, scientists had developed several effective treatments.',
    'After he had finished his research, he wrote the conclusion.',
  ],
  negativeExamples: [
    'He was hungry because he had not eaten breakfast.',
    'She couldn\'t enter because she had not brought her ID.',
    'They hadn\'t received the information before the meeting.',
    'The project failed because the team had not planned adequately.',
  ],
  questionExamples: [
    'Had the meeting started before you arrived?',
    'Had she visited this country before?',
    'Had the results been published by the time you left?',
    'Had you ever tried sushi before visiting Japan?',
  ],
  whQuestionExamples: [
    'How long had he worked there before retiring?',
    'What had happened before the investigation began?',
    'Why had she decided to leave so suddenly?',
    'By the time you arrived, what had changed?',
  ],
  uses: [
    {
      title: 'Earlier of Two Past Actions',
      explanation: 'When two things happened in the past, the earlier one uses Past Perfect.',
      example: 'When I arrived, the party had already started.',
    },
    {
      title: 'Cause and Effect in the Past',
      explanation: 'Past Perfect for the cause that explains a past result.',
      example: 'She was exhausted because she had worked all night.',
    },
    {
      title: '"By" + Past Time',
      explanation: '"By" + a past reference point → Past Perfect for what was completed before then.',
      example: 'By the end of the century, technology had transformed every industry.',
    },
    {
      title: '"Before / After / Once / Until" Clauses',
      explanation: 'Time connectors that show sequence of past events.',
      example: 'After the researchers had collected the data, they began the analysis.',
    },
    {
      title: 'Past Experience (Before a Past Point)',
      explanation: 'An experience or non-experience relative to a past moment.',
      example: 'It was the first time she had visited Africa.',
    },
    {
      title: 'Third Conditional',
      explanation: 'Unreal past conditions: "If I had known, I would have helped."',
      example: 'If he had studied harder, he would have passed the exam.',
    },
  ],
  signalWords: ['already', 'just', 'never', 'before', 'after', 'by the time', 'until', 'by 2020', 'once', 'when', 'as soon as', 'no sooner...than', 'hardly...when'],
  signalWordsNote: 'Past Perfect is used relative to another past point. If there is only one past event mentioned, Past Simple is usually sufficient.',
  interactiveSentence: [
    { text: 'By the time', role: 'Time Connector', explanation: '"By the time" introduces the reference point. Everything before that point uses Past Perfect.', color: '#f59e0b' },
    { text: 'the research team arrived,', role: 'Reference Point (Past Simple)', explanation: 'This is the later past event — the reference point.', color: '#6366f1' },
    { text: 'the participants', role: 'Subject', explanation: 'The subject of the earlier action.', color: '#10b981' },
    { text: 'had already completed', role: 'had + already + V3', explanation: '"Had completed" = Past Perfect. The completion happened BEFORE the team arrived.', color: '#8b5cf6' },
    { text: 'the initial assessment.', role: 'Object', explanation: 'What was completed before the reference point.', color: '#ec4899' },
  ],
  difficulty: 'Advanced',
  color: '#8b5cf6',
  icon: '⬅️',
};
