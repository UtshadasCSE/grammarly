// ============================================================
// Core Types for Grammarly IELTS Application
// ============================================================

// Present tense IDs (used in /tense/present/[tenseId])
export type PresentTenseId = 'simple' | 'continuous' | 'perfect' | 'perfect-continuous';

// Past tense IDs (used in /tense/past/[tenseId])
export type PastTenseId = 'past-simple' | 'past-continuous' | 'past-perfect' | 'past-perfect-continuous';

// Union of all tense IDs for shared types (Question, VocabularyItem, SpeakingPrompt etc.)
export type TenseId = PresentTenseId | PastTenseId;

export type QuestionType =
  | 'fill-blank'
  | 'multiple-choice'
  | 'error-correction'
  | 'ielts-context'
  | 'sentence-transformation';

export type DifficultyLevel =
  | 'basic'
  | 'elementary'
  | 'intermediate'
  | 'upper-intermediate'
  | 'advanced'
  | 'ielts-advanced';

export type StageId =
  | 'learn'
  | 'practice'
  | 'advanced'
  | 'errors'
  | 'ielts'
  | 'vocabulary'
  | 'speaking'
  | 'writing'
  | 'test';

export interface Question {
  id: string;
  tense: TenseId;
  level: DifficultyLevel;
  type: QuestionType;
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  hint1: string;
  hint2: string;
  hint3: string;
  hint4?: string;
  grammarRule: string;
  topic: string;
  difficulty: number; // 1-10
  vocabulary?: string[];
  targetSkill: string;
  ieltsTip?: string;
  wrongExplanations?: Record<string, string>;
}

export interface VocabularyItem {
  id: string;
  word: string;
  banglaMeaning: string;
  definition: string;
  partOfSpeech: string;
  pronunciation: string;
  collocation: string;
  synonym: string;
  antonym?: string;
  beginnerExample: string;
  ieltsExample: string;
  tense: TenseId;
}

export interface SentencePart {
  text: string;
  role: string;
  explanation: string;
  color: string;
}

export interface TenseFormula {
  positive: string;
  negative: string;
  question: string;
  whQuestion: string;
}

export interface TenseLesson {
  id: TenseId;
  name: string;
  banglaName: string;
  formula: TenseFormula;
  introduction: string;
  introductionBangla: string;
  positiveExamples: string[];
  negativeExamples: string[];
  questionExamples: string[];
  whQuestionExamples: string[];
  uses: { title: string; explanation: string; example: string }[];
  signalWords: string[];
  signalWordsNote: string;
  interactiveSentence: SentencePart[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  color: string;
  icon: string;
}

export interface SpeakingPrompt {
  id: string;
  tense: TenseId;
  stage: number;
  prompt: string;
  targetTenseUsage: string;
  duration?: number; // seconds
  type: 'read-aloud' | 'complete' | 'short-answer' | 'speak-30' | 'speak-60' | 'ielts-part2' | 'ielts-part3';
  sampleAnswer?: string;
}

export interface WritingTask {
  id: string;
  tense: TenseId;
  type: 'sentence' | 'transformation' | 'paragraph' | 'task1' | 'task2';
  prompt: string;
  instructions: string;
  targetTenseUsage: string;
  wordLimit?: number;
  timeLimit?: number;
  sampleAnswer?: string;
  assessmentCriteria: string[];
}

// Progress Types
export interface StageProgress {
  completed: boolean;
  score?: number;
  accuracy?: number;
  completedAt?: string;
  hintsUsed?: number;
  attempts?: number;
}

export interface TenseProgress {
  tenseId: TenseId;
  currentStage: StageId;
  stages: Record<StageId, StageProgress>;
  overallProgress: number; // 0-100
  totalAccuracy: number;
  vocabMastered: string[];
  speakingAttempts: number;
  writingSubmissions: number;
  startedAt: string;
  lastActiveAt: string;
}

export interface UserProgress {
  tenses: Record<TenseId, TenseProgress>;
  streak: number;
  lastLoginDate: string;
  totalXP: number;
  theme: 'light' | 'dark';
  language: 'en' | 'bn';
}

export interface RecordingMetadata {
  id: string;
  tenseId: TenseId;
  promptId: string;
  duration: number;
  createdAt: string;
  blob?: Blob;
  url?: string;
  transcript?: string;
}
