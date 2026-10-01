'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { UserProgress, TenseId, StageId, TenseProgress, PartOfSpeechId, PartOfSpeechProgress } from '@/types';

const STORAGE_KEY = 'grammarly_ielts_progress';

const defaultStages = (): TenseProgress['stages'] => ({
  learn: { completed: false },
  practice: { completed: false },
  advanced: { completed: false },
  errors: { completed: false },
  ielts: { completed: false },
  vocabulary: { completed: false },
  speaking: { completed: false },
  writing: { completed: false },
  test: { completed: false },
});

const defaultTenseProgress = (tenseId: TenseId): TenseProgress => ({
  tenseId,
  currentStage: 'learn',
  stages: defaultStages(),
  overallProgress: 0,
  totalAccuracy: 0,
  vocabMastered: [],
  speakingAttempts: 0,
  writingSubmissions: 0,
  startedAt: new Date().toISOString(),
  lastActiveAt: new Date().toISOString(),
});

const defaultPartOfSpeechProgress = (posId: PartOfSpeechId): PartOfSpeechProgress => ({
  id: posId,
  currentStage: 'learn',
  stages: defaultStages(),
  overallProgress: 0,
  totalAccuracy: 0,
  vocabMastered: [],
  speakingAttempts: 0,
  writingSubmissions: 0,
  startedAt: new Date().toISOString(),
  lastActiveAt: new Date().toISOString(),
  weakAreas: [],
});

const defaultIeltsProgress = (): import('@/types').IELTSMasteryProgress => ({
  beginner: { completed: false, questionsCompleted: 0, correctAnswers: 0, incorrectAnswers: 0, hintsUsed: 0, challengesCompleted: 0, score: 0 },
  intermediate: { completed: false, questionsCompleted: 0, correctAnswers: 0, incorrectAnswers: 0, hintsUsed: 0, challengesCompleted: 0, score: 0 },
  advanced: { completed: false, questionsCompleted: 0, correctAnswers: 0, incorrectAnswers: 0, hintsUsed: 0, challengesCompleted: 0, score: 0 },
  errors: []
});

const defaultProgress = (): UserProgress => ({
  tenses: {
    // Present tenses
    simple: defaultTenseProgress('simple'),
    continuous: defaultTenseProgress('continuous'),
    perfect: defaultTenseProgress('perfect'),
    'perfect-continuous': defaultTenseProgress('perfect-continuous'),
    // Past tenses
    'past-simple': defaultTenseProgress('past-simple'),
    'past-continuous': defaultTenseProgress('past-continuous'),
    'past-perfect': defaultTenseProgress('past-perfect'),
    'past-perfect-continuous': defaultTenseProgress('past-perfect-continuous'),
    // Future tenses
    'future-simple': defaultTenseProgress('future-simple'),
    'future-continuous': defaultTenseProgress('future-continuous'),
    'future-perfect': defaultTenseProgress('future-perfect'),
    'future-perfect-continuous': defaultTenseProgress('future-perfect-continuous'),
    // Mixed Tenses
    'mixed': defaultTenseProgress('mixed'),
  } as Record<TenseId, TenseProgress>,
  partsOfSpeech: {
    noun: defaultPartOfSpeechProgress('noun'),
    pronoun: defaultPartOfSpeechProgress('pronoun'),
    verb: defaultPartOfSpeechProgress('verb'),
    adjective: defaultPartOfSpeechProgress('adjective'),
    adverb: defaultPartOfSpeechProgress('adverb'),
  },
  streak: 0,
  lastLoginDate: new Date().toISOString().split('T')[0],
  totalXP: 0,
  theme: 'dark',
  language: 'en',
  ieltsMastery: defaultIeltsProgress(),
});

interface ProgressContextType {
  updateIELTSLevel: (level: 'beginner' | 'intermediate' | 'advanced', data: Partial<import('@/types').IELTSLevelProgress>) => void;
  logIELTSError: (questionId: string, userAnswer: string) => void;
  addXP: (amount: number) => void;
  progress: UserProgress;
  completeStage: (tenseId: TenseId, stageId: StageId, score?: number, accuracy?: number) => void;
  updateProgress: (tenseId: TenseId, overallProgress: number, accuracy?: number) => void;
  addVocabMastered: (tenseId: TenseId, word: string) => void;
  incrementSpeaking: (tenseId: TenseId) => void;
  incrementWriting: (tenseId: TenseId) => void;
  setTheme: (theme: 'light' | 'dark') => void;
  getTenseProgress: (tenseId: TenseId) => TenseProgress;
  isStageUnlocked: (tenseId: TenseId, stageId: StageId) => boolean;
  resetTense: (tenseId: TenseId) => void;
  // Parts of Speech methods
  getPartOfSpeechProgress: (posId: PartOfSpeechId) => PartOfSpeechProgress;
  completePartOfSpeechStage: (posId: PartOfSpeechId, stageId: StageId, score?: number, accuracy?: number) => void;
  isPartOfSpeechStageUnlocked: (posId: PartOfSpeechId, stageId: StageId) => boolean;
  addPartOfSpeechVocabMastered: (posId: PartOfSpeechId, word: string) => void;
  incrementPartOfSpeechSpeaking: (posId: PartOfSpeechId) => void;
  incrementPartOfSpeechWriting: (posId: PartOfSpeechId) => void;
  recordPartOfSpeechWeakArea: (posId: PartOfSpeechId, weakArea: string) => void;
  resetPartOfSpeech: (posId: PartOfSpeechId) => void;
}

const ProgressContext = createContext<ProgressContextType | null>(null);

const STAGE_ORDER: StageId[] = ['learn', 'practice', 'advanced', 'errors', 'ielts', 'vocabulary', 'speaking', 'writing', 'test'];

function calculateOverallProgress(stages: Record<StageId, { completed: boolean }>): number {
  const completed = STAGE_ORDER.filter((s) => stages[s]?.completed).length;
  return Math.round((completed / STAGE_ORDER.length) * 100);
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as UserProgress;
        // Merge with defaults to ensure new IDs are always initialized
        const merged: UserProgress = {
          ...defaultProgress(),
          ...parsed,
          tenses: {
            ...defaultProgress().tenses,
            ...(parsed.tenses || {}),
          },
          partsOfSpeech: {
            ...defaultProgress().partsOfSpeech,
            ...(parsed.partsOfSpeech || {}),
          },
        };
        setProgress(merged);
        // Apply saved theme
        if (merged.theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } else {
        // Default dark theme
        document.documentElement.classList.add('dark');
      }
    } catch {
      // Use default on parse error
      document.documentElement.classList.add('dark');
    }
  }, []);

  const save = useCallback((updated: UserProgress) => {
    setProgress(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Storage unavailable - gracefully ignore
    }
  }, []);

  const completeStage = useCallback(
    (tenseId: TenseId, stageId: StageId, score?: number, accuracy?: number) => {
      setProgress((prev) => {
        const tense = { ...(prev.tenses[tenseId] || defaultTenseProgress(tenseId)) };
        tense.stages = {
          ...tense.stages,
          [stageId]: {
            completed: true,
            score,
            accuracy,
            completedAt: new Date().toISOString(),
          },
        };
        tense.overallProgress = calculateOverallProgress(tense.stages);
        tense.lastActiveAt = new Date().toISOString();
        if (accuracy !== undefined) {
          tense.totalAccuracy = accuracy;
        }
        // Advance currentStage
        const currentIdx = STAGE_ORDER.indexOf(stageId);
        if (currentIdx < STAGE_ORDER.length - 1) {
          tense.currentStage = STAGE_ORDER[currentIdx + 1];
        }
        const updated: UserProgress = {
          ...prev,
          tenses: { ...prev.tenses, [tenseId]: tense },
          totalXP: (prev.totalXP || 0) + 10,
        };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });
    },
    []
  );

  const updateProgress = useCallback(
    (tenseId: TenseId, overallProgress: number, accuracy?: number) => {
      setProgress((prev) => {
        const tense = { ...(prev.tenses[tenseId] || defaultTenseProgress(tenseId)), overallProgress, lastActiveAt: new Date().toISOString() };
        if (accuracy !== undefined) tense.totalAccuracy = accuracy;
        const updated = { ...prev, tenses: { ...prev.tenses, [tenseId]: tense } };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });
    },
    []
  );

  const addVocabMastered = useCallback((tenseId: TenseId, word: string) => {
    setProgress((prev) => {
      const tense = { ...(prev.tenses[tenseId] || defaultTenseProgress(tenseId)) };
      if (!tense.vocabMastered.includes(word)) {
        tense.vocabMastered = [...tense.vocabMastered, word];
      }
      const updated = { ...prev, tenses: { ...prev.tenses, [tenseId]: tense } };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }, []);

  const incrementSpeaking = useCallback((tenseId: TenseId) => {
    setProgress((prev) => {
      const tense = { ...(prev.tenses[tenseId] || defaultTenseProgress(tenseId)) };
      tense.speakingAttempts = (tense.speakingAttempts || 0) + 1;
      const updated = { ...prev, tenses: { ...prev.tenses, [tenseId]: tense } };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }, []);

  const incrementWriting = useCallback((tenseId: TenseId) => {
    setProgress((prev) => {
      const tense = { ...(prev.tenses[tenseId] || defaultTenseProgress(tenseId)) };
      tense.writingSubmissions = (tense.writingSubmissions || 0) + 1;
      const updated = { ...prev, tenses: { ...prev.tenses, [tenseId]: tense } };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }, []);

  // Parts of Speech Handlers
  const getPartOfSpeechProgress = useCallback(
    (posId: PartOfSpeechId): PartOfSpeechProgress => {
      return progress.partsOfSpeech?.[posId] || defaultPartOfSpeechProgress(posId);
    },
    [progress]
  );

  const completePartOfSpeechStage = useCallback(
    (posId: PartOfSpeechId, stageId: StageId, score?: number, accuracy?: number) => {
      setProgress((prev) => {
        const currentPos = prev.partsOfSpeech?.[posId] || defaultPartOfSpeechProgress(posId);
        const updatedPos: PartOfSpeechProgress = {
          ...currentPos,
          stages: {
            ...currentPos.stages,
            [stageId]: {
              completed: true,
              score,
              accuracy,
              completedAt: new Date().toISOString(),
            },
          },
          lastActiveAt: new Date().toISOString(),
        };
        updatedPos.overallProgress = calculateOverallProgress(updatedPos.stages);
        if (accuracy !== undefined) {
          updatedPos.totalAccuracy = accuracy;
        }
        const currentIdx = STAGE_ORDER.indexOf(stageId);
        if (currentIdx < STAGE_ORDER.length - 1) {
          updatedPos.currentStage = STAGE_ORDER[currentIdx + 1];
        }

        const updated: UserProgress = {
          ...prev,
          partsOfSpeech: {
            ...(prev.partsOfSpeech || { noun: defaultPartOfSpeechProgress('noun') }),
            [posId]: updatedPos,
          },
          totalXP: (prev.totalXP || 0) + 15,
        };

        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      });
    },
    []
  );

  const isPartOfSpeechStageUnlocked = useCallback(
    (posId: PartOfSpeechId, stageId: StageId): boolean => {
      if (stageId === 'learn') return true;
      const pos = progress.partsOfSpeech?.[posId] || defaultPartOfSpeechProgress(posId);
      const stageIdx = STAGE_ORDER.indexOf(stageId);
      if (stageIdx <= 0) return true;
      const prevStage = STAGE_ORDER[stageIdx - 1];
      return pos.stages[prevStage]?.completed === true;
    },
    [progress]
  );

  const addPartOfSpeechVocabMastered = useCallback((posId: PartOfSpeechId, word: string) => {
    setProgress((prev) => {
      const currentPos = prev.partsOfSpeech?.[posId] || defaultPartOfSpeechProgress(posId);
      if (!currentPos.vocabMastered.includes(word)) {
        const updatedPos = {
          ...currentPos,
          vocabMastered: [...currentPos.vocabMastered, word],
        };
        const updated = {
          ...prev,
          partsOfSpeech: {
            ...(prev.partsOfSpeech || { noun: defaultPartOfSpeechProgress('noun') }),
            [posId]: updatedPos,
          },
        };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      }
      return prev;
    });
  }, []);

  const incrementPartOfSpeechSpeaking = useCallback((posId: PartOfSpeechId) => {
    setProgress((prev) => {
      const currentPos = prev.partsOfSpeech?.[posId] || defaultPartOfSpeechProgress(posId);
      const updatedPos = {
        ...currentPos,
        speakingAttempts: (currentPos.speakingAttempts || 0) + 1,
      };
      const updated = {
        ...prev,
        partsOfSpeech: {
          ...(prev.partsOfSpeech || { noun: defaultPartOfSpeechProgress('noun') }),
          [posId]: updatedPos,
        },
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }, []);

  const incrementPartOfSpeechWriting = useCallback((posId: PartOfSpeechId) => {
    setProgress((prev) => {
      const currentPos = prev.partsOfSpeech?.[posId] || defaultPartOfSpeechProgress(posId);
      const updatedPos = {
        ...currentPos,
        writingSubmissions: (currentPos.writingSubmissions || 0) + 1,
      };
      const updated = {
        ...prev,
        partsOfSpeech: {
          ...(prev.partsOfSpeech || { noun: defaultPartOfSpeechProgress('noun') }),
          [posId]: updatedPos,
        },
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }, []);

  const recordPartOfSpeechWeakArea = useCallback((posId: PartOfSpeechId, weakArea: string) => {
    setProgress((prev) => {
      const currentPos = prev.partsOfSpeech?.[posId] || defaultPartOfSpeechProgress(posId);
      if (!currentPos.weakAreas.includes(weakArea)) {
        const updatedPos = {
          ...currentPos,
          weakAreas: [...currentPos.weakAreas, weakArea],
        };
        const updated = {
          ...prev,
          partsOfSpeech: {
            ...(prev.partsOfSpeech || { noun: defaultPartOfSpeechProgress('noun') }),
            [posId]: updatedPos,
          },
        };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        } catch {
          // ignore
        }
        return updated;
      }
      return prev;
    });
  }, []);

  const resetPartOfSpeech = useCallback(
    (posId: PartOfSpeechId) => {
      save({
        ...progress,
        partsOfSpeech: {
          ...(progress.partsOfSpeech || {}),
          [posId]: defaultPartOfSpeechProgress(posId),
        },
      });
    },
    [progress, save]
  );

  const setTheme = useCallback(
    (theme: 'light' | 'dark') => {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      save({ ...progress, theme });
    },
    [progress, save]
  );

  const getTenseProgress = useCallback(
    (tenseId: TenseId) => progress.tenses[tenseId] || defaultTenseProgress(tenseId),
    [progress]
  );

  const isStageUnlocked = useCallback(
    (tenseId: TenseId, stageId: StageId): boolean => {
      if (stageId === 'learn') return true;
      const tense = progress.tenses[tenseId];
      if (!tense) return true;
      const stageIdx = STAGE_ORDER.indexOf(stageId);
      if (stageIdx <= 0) return true;
      const prevStage = STAGE_ORDER[stageIdx - 1];
      return tense.stages[prevStage]?.completed === true;
    },
    [progress]
  );

  const updateIELTSLevel = useCallback((level: 'beginner' | 'intermediate' | 'advanced', data: Partial<import('@/types').IELTSLevelProgress>) => {
    setProgress((prev) => {
      const updated = { ...prev };
      if (!updated.ieltsMastery) {
         updated.ieltsMastery = {
            beginner: { completed: false, questionsCompleted: 0, correctAnswers: 0, incorrectAnswers: 0, hintsUsed: 0, challengesCompleted: 0, score: 0 },
            intermediate: { completed: false, questionsCompleted: 0, correctAnswers: 0, incorrectAnswers: 0, hintsUsed: 0, challengesCompleted: 0, score: 0 },
            advanced: { completed: false, questionsCompleted: 0, correctAnswers: 0, incorrectAnswers: 0, hintsUsed: 0, challengesCompleted: 0, score: 0 },
            errors: []
         };
      }
      updated.ieltsMastery[level] = { ...updated.ieltsMastery[level], ...data };
      return updated;
    });
  }, []);

  const logIELTSError = useCallback((questionId: string, userAnswer: string) => {
    setProgress((prev) => {
      const updated = { ...prev };
      if (!updated.ieltsMastery) {
         updated.ieltsMastery = {
            beginner: { completed: false, questionsCompleted: 0, correctAnswers: 0, incorrectAnswers: 0, hintsUsed: 0, challengesCompleted: 0, score: 0 },
            intermediate: { completed: false, questionsCompleted: 0, correctAnswers: 0, incorrectAnswers: 0, hintsUsed: 0, challengesCompleted: 0, score: 0 },
            advanced: { completed: false, questionsCompleted: 0, correctAnswers: 0, incorrectAnswers: 0, hintsUsed: 0, challengesCompleted: 0, score: 0 },
            errors: []
         };
      }
      updated.ieltsMastery.errors = [...updated.ieltsMastery.errors, { questionId, userAnswer, timestamp: new Date().toISOString() }];
      return updated;
    });
  }, []);

  const addXP = useCallback((amount: number) => {
    setProgress((prev) => {
      const updated = { ...prev, totalXP: (prev.totalXP || 0) + amount };
      return updated;
    });
  }, []);

  const resetTense = useCallback(
    (tenseId: TenseId) => {
      save({
        ...progress,
        tenses: { ...progress.tenses, [tenseId]: defaultTenseProgress(tenseId) },
      });
    },
    [progress, save]
  );

  return (
    <ProgressContext.Provider
      value={{
        progress,
        completeStage,
        updateProgress,
        addVocabMastered,
        incrementSpeaking,
        incrementWriting,
        setTheme,
        getTenseProgress,
        isStageUnlocked,
        resetTense,
        updateIELTSLevel,
        logIELTSError,
        addXP,
        getPartOfSpeechProgress,
        completePartOfSpeechStage,
        isPartOfSpeechStageUnlocked,
        addPartOfSpeechVocabMastered,
        incrementPartOfSpeechSpeaking,
        incrementPartOfSpeechWriting,
        recordPartOfSpeechWeakArea,
        resetPartOfSpeech,
      }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used inside ProgressProvider');
  return ctx;
}

