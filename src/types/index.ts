// ============================================================
// Core Types for Grammarly IELTS Application
// ============================================================

// Present tense IDs (used in /tense/present/[tenseId])
export type PresentTenseId = 'simple' | 'continuous' | 'perfect' | 'perfect-continuous';

// Past tense IDs (used in /tense/past/[tenseId])
export type PastTenseId = 'past-simple' | 'past-continuous' | 'past-perfect' | 'past-perfect-continuous';

// Future tense IDs
export type FutureTenseId = 'future-simple' | 'future-continuous' | 'future-perfect' | 'future-perfect-continuous';

// Union of all tense IDs for shared types (Question, VocabularyItem, SpeakingPrompt etc.)
export type TenseId = PresentTenseId | PastTenseId | FutureTenseId | 'mixed';

export type QuestionType =
  | 'fill-blank'
  | 'guided-fill'
  | 'challenge-fill'
  | 'multiple-choice'
  | 'mcq'
  | 'error-correction'
  | 'ielts-context'
  | 'sentence-transformation';

export type DifficultyLevel =
  | 'zero'
  | 'beginner'
  | 'basic'
  | 'easy'
  | 'elementary'
  | 'medium'
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
  color?: string;
  partOfSpeech?: string;
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
  partsOfSpeech?: Partial<Record<PartOfSpeechId, PartOfSpeechProgress>>;
  streak: number;
  lastLoginDate: string;
  totalXP: number;
  theme: 'light' | 'dark';
  language: 'en' | 'bn';
  ieltsMastery?: IELTSMasteryProgress;
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

// IELTS Mastery Types
export type IELTSLevel = 'beginner' | 'intermediate' | 'advanced';

export interface IELTSQuestion {
  id: string;
  level: IELTSLevel;
  type: 'multiple-choice' | 'fill-blank' | 'error-correction' | 'sentence-transformation' | 'writing' | 'speaking';
  question: string;
  options?: string[];
  correctAnswer: string;
  tense: TenseId;
  explanation: string;
  hint1?: string;
  hint2?: string;
  hint3?: string;
}

export interface IELTSChallenge {
  id: string;
  prompt: string;
  hint: string;
  expectedTense: TenseId | TenseId[];
  modelAnswer: string;
  explanation: string;
}

export interface IELTSLevelProgress {
  completed: boolean;
  questionsCompleted: number;
  correctAnswers: number;
  incorrectAnswers: number;
  hintsUsed: number;
  challengesCompleted: number;
  score: number;
}

export interface IELTSErrorLog {
  questionId: string;
  userAnswer: string;
  timestamp: string;
}

export interface IELTSMasteryProgress {
  beginner: IELTSLevelProgress;
  intermediate: IELTSLevelProgress;
  advanced: IELTSLevelProgress;
  errors: IELTSErrorLog[];
}

// ============================================================
// Parts of Speech Types (Noun, Pronoun & Verb)
// ============================================================
export type PartOfSpeechId = 'noun' | 'pronoun' | 'verb' | 'adjective' | 'adverb' | 'preposition' | 'conjunction' | 'interjection' | 'determiner' | 'article';

export interface NounQuestion {
  id: string;
  category: 'parts-of-speech';
  partOfSpeech: 'noun' | 'pronoun' | 'verb' | 'adjective' | 'adverb' | string;
  level: DifficultyLevel;
  type: QuestionType;
  question: string;
  sentence?: string;
  wrongSentence?: string;
  options?: string[];
  correctAnswer: string;
  acceptedAnswers?: string[];
  explanation: string;
  simpleExplanation?: string;
  ieltsExplanation?: string;
  banglaExplanation?: string;
  hint1?: string;
  hint2?: string;
  hint3?: string;
  hint4?: string;
  banglaHint?: string;
  grammarRule: string;
  nounRule?: string;
  pronounRule?: string;
  verbRule?: string;
  adjectiveRule?: string;
  adverbRule?: string;
  topic?: string;
  difficulty?: number; // 1-10
  vocabulary?: string[];
  targetSkill?: string;
  ieltsTip?: string;
  weakAreaTag?: string;
  weaknessTag?: string;
  error?: string;
  correction?: string;
  learnerError?: string;
  correctForm?: string;
  whyMistakeOccurs?: string;
  whyMistakeHappens?: string;
  ieltsRelevance?: string;
  contextSnippet?: string;
}

export type PronounQuestion = NounQuestion;
export type VerbQuestion = NounQuestion;
export type AdjectiveQuestion = NounQuestion;
export type AdverbQuestion = NounQuestion;

export interface NounLessonSection {
  id: string;
  title: string;
  banglaTitle?: string;
  level: 'Zero / Beginner' | 'Beginner' | 'Easy' | 'Easy / Medium' | 'Medium' | 'Medium / Core' | 'Medium / Advanced' | 'Advanced' | 'Advanced / IELTS Advanced' | 'IELTS Advanced' | string;
  description: string;
  banglaExplanation?: string;
  rules: string[];
  examples: { text: string; breakdown: string; note?: string }[];
  commonMistakes?: { wrong: string; correct: string; reason: string }[];
  ieltsTips?: string[];
  miniCheck?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    simpleExplanation?: string;
  };
}

export type PronounLessonSection = NounLessonSection;
export type VerbLessonSection = NounLessonSection;
export type AdjectiveLessonSection = NounLessonSection;
export type AdverbLessonSection = NounLessonSection;

export interface NounLesson {
  id: 'noun' | 'pronoun' | 'verb' | 'adjective' | 'adverb' | string;
  name: string;
  banglaName: string;
  subtitle: string;
  introduction: string;
  introductionBangla: string;
  interactiveSentence: SentencePart[];
  sections: NounLessonSection[];
}

export type PronounLesson = NounLesson;
export type VerbLesson = NounLesson;
export type AdjectiveLesson = NounLesson;
export type AdverbLesson = NounLesson;

export interface NounVocabItem {
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
  advancedExample?: string;
  ieltsExample: string;
  targetPronoun?: string;
  targetVerbPattern?: string;
  targetAdjectiveType?: string;
  targetAdverbType?: string;
  wordFamily?: {
    noun?: string;
    verb?: string;
    adjective?: string;
    adverb?: string;
  };
  nounFormation?: {
    rootWord: string;
    rootType: 'verb' | 'adjective' | string;
    suffix?: string;
    explanation: string;
  };
  adjectiveFormation?: {
    rootWord: string;
    rootType: 'noun' | 'verb' | string;
    suffix?: string;
    explanation: string;
  };
  adverbFormation?: {
    rootWord: string;
    rootType: 'adjective' | 'noun' | string;
    suffix?: string;
    explanation: string;
  };
}

export type PronounVocabItem = NounVocabItem;
export type VerbVocabItem = NounVocabItem;
export type AdjectiveVocabItem = NounVocabItem;
export type AdverbVocabItem = NounVocabItem;

export interface NounSpeakingPrompt {
  id: string;
  stage?: number;
  level: DifficultyLevel;
  type: 'beginner-naming' | 'describe-scene' | 'describe-place' | 'ielts-part2' | 'ielts-part3' | string;
  topic?: string;
  prompt: string;
  targetGrammar: string;
  targetNouns?: string[];
  targetPronouns?: string[];
  targetVerbs?: string[];
  targetAdjectives?: string[];
  targetAdverbs?: string[];
  targetCollocations?: string[];
  collocations?: string[];
  hintStarter: string;
  sentenceStarter?: string;
  duration?: number;
  sampleAnswer?: string;
  modelResponse?: string;
  ieltsTips?: string[];
}

export type PronounSpeakingPrompt = NounSpeakingPrompt;
export type VerbSpeakingPrompt = NounSpeakingPrompt;
export type AdjectiveSpeakingPrompt = NounSpeakingPrompt;
export type AdverbSpeakingPrompt = NounSpeakingPrompt;

export interface NounWritingTask {
  id: string;
  stage?: number;
  level: DifficultyLevel;
  type: 'sentence-construction' | 'sentence-expansion' | 'short-paragraph' | 'academic-paragraph' | 'ielts-task1' | 'ielts-task2' | string;
  topic?: string;
  task?: string;
  prompt: string;
  instructions: string;
  targetGrammar: string;
  targetAdverbs?: string[];
  targetAdjectives?: string[];
  targetVerbs?: string[];
  grammarFocus?: string;
  wordLimit?: number;
  minWords?: number;
  sampleAnswer?: string;
  assessmentCriteria: string[];
  caseStudy?: {
    original: string;
    problem: string;
    correction: string;
    explanation: string;
    improvedVersion: string;
  };
  sampleAnalysis?: {
    original: string;
    problem: string;
    correction: string;
    explanation: string;
    improvedVersion: string;
  };
}

export type PronounWritingTask = NounWritingTask;
export type VerbWritingTask = NounWritingTask;
export type AdjectiveWritingTask = NounWritingTask;
export type AdverbWritingTask = NounWritingTask;

export interface PartOfSpeechProgress {
  id: PartOfSpeechId;
  currentStage: StageId;
  stages: Record<StageId, StageProgress>;
  overallProgress: number; // 0-100
  totalAccuracy: number;
  vocabMastered: string[];
  speakingAttempts: number;
  writingSubmissions: number;
  startedAt: string;
  lastActiveAt: string;
  weakAreas: string[];
}

