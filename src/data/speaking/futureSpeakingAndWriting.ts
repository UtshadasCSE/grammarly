import type { SpeakingPrompt, WritingTask } from '@/types';

export const futureSpeakingPrompts: SpeakingPrompt[] = [
  {
    id: 'f-speak-01',
    tense: 'future-simple',
    stage: 1,
    type: 'read-aloud',
    prompt: 'Read this prediction aloud: "I think artificial intelligence will change the way we work in the future."',
    targetTenseUsage: 'Focus on pronouncing "will change" clearly.',
    duration: 15,
    sampleAnswer: 'I think artificial intelligence will change the way we work in the future.'
  },
  {
    id: 'f-speak-02',
    tense: 'future-continuous',
    stage: 2,
    type: 'short-answer',
    prompt: 'What will you be doing at 8 PM tonight?',
    targetTenseUsage: 'Use "will be + V-ing".',
    duration: 30,
    sampleAnswer: 'At 8 PM tonight, I will be having dinner with my family and watching a movie.'
  },
  {
    id: 'f-speak-03',
    tense: 'future-perfect',
    stage: 3,
    type: 'speak-30',
    prompt: 'Talk about something you hope you will have achieved by the year 2030.',
    targetTenseUsage: 'Use "will have + past participle (V3)".',
    duration: 30,
    sampleAnswer: 'By the year 2030, I hope I will have graduated from university and started my career. I also hope I will have traveled to at least three new countries.'
  },
  {
    id: 'f-speak-04',
    tense: 'future-perfect-continuous',
    stage: 4,
    type: 'ielts-part2',
    prompt: 'Describe a project or task you will have been working on for a long time by the end of next year. You should say what it is, why you are doing it, and how long you will have been doing it.',
    targetTenseUsage: 'Use "will have been + V-ing" to express ongoing duration in the future.',
    duration: 120,
    sampleAnswer: 'By the end of next year, I will have been learning English for five years. I started this journey because... [expand with details].'
  }
];

export const futureWritingTasks: WritingTask[] = [
  {
    id: 'f-write-01',
    tense: 'future-simple',
    type: 'sentence',
    prompt: 'Write three predictions about life 50 years from now.',
    instructions: 'Use the future simple (will + base verb) in each sentence.',
    targetTenseUsage: 'will + V1',
    wordLimit: 50,
    timeLimit: 300,
    sampleAnswer: 'People will drive flying cars. We will live on Mars. Robots will do all our housework.',
    assessmentCriteria: ['Correct use of future simple', 'Clear predictions', 'Vocabulary']
  },
  {
    id: 'f-write-02',
    tense: 'future-perfect',
    type: 'paragraph',
    prompt: 'Describe what humanity will have accomplished by the end of this century.',
    instructions: 'Use the future perfect tense at least twice to describe completed actions before the end of the century.',
    targetTenseUsage: 'will have + V3',
    wordLimit: 100,
    timeLimit: 600,
    sampleAnswer: 'By the end of this century, scientists will have cured many major diseases. Furthermore, humanity will have established a permanent colony on the Moon. These advancements will have completely changed our way of life.',
    assessmentCriteria: ['Accurate future perfect structure', 'Cohesion', 'Relevance']
  }
];
