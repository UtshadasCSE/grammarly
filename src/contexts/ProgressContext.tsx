'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import type { UserProgress, TenseId, StageId, TenseProgress } from '@/types';

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
  } as Record<TenseId, TenseProgress>,
  streak: 0,
  lastLoginDate: new Date().toISOString().split('T')[0],
  totalXP: 0,
  theme: 'dark',
  language: 'en',
});

interface ProgressContextType {
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
}

const ProgressContext = createContext<ProgressContextType | null>(null);

const STAGE_ORDER: StageId[] = ['learn', 'practice', 'advanced', 'errors', 'ielts', 'vocabulary', 'speaking', 'writing', 'test'];

function calculateOverallProgress(stages: TenseProgress['stages']): number {
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
        // Merge with defaults to ensure new tense IDs are always initialized
        const merged: UserProgress = {
          ...defaultProgress(),
          ...parsed,
          tenses: {
            ...defaultProgress().tenses,
            ...parsed.tenses,
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
        const tense = { ...prev.tenses[tenseId] };
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
          totalXP: prev.totalXP + 10,
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
        const tense = { ...prev.tenses[tenseId], overallProgress, lastActiveAt: new Date().toISOString() };
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
      const tense = { ...prev.tenses[tenseId] };
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
      const tense = { ...prev.tenses[tenseId], speakingAttempts: prev.tenses[tenseId].speakingAttempts + 1 };
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
      const tense = { ...prev.tenses[tenseId], writingSubmissions: prev.tenses[tenseId].writingSubmissions + 1 };
      const updated = { ...prev, tenses: { ...prev.tenses, [tenseId]: tense } };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {
        // ignore
      }
      return updated;
    });
  }, []);

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
    (tenseId: TenseId) => progress.tenses[tenseId],
    [progress]
  );

  const isStageUnlocked = useCallback(
    (tenseId: TenseId, stageId: StageId): boolean => {
      if (stageId === 'learn') return true;
      const tense = progress.tenses[tenseId];
      const stageIdx = STAGE_ORDER.indexOf(stageId);
      if (stageIdx <= 0) return true;
      const prevStage = STAGE_ORDER[stageIdx - 1];
      return tense.stages[prevStage]?.completed === true;
    },
    [progress]
  );

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
