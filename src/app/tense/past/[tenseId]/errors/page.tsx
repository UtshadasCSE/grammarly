'use client';

import { use, useState, useCallback } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Lightbulb, CheckCircle, XCircle, Send } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar, LinearProgress } from '@/components/ProgressIndicators';
import { useProgress } from '@/contexts/ProgressContext';
import type { TenseId, Question } from '@/types';
import { presentSimpleErrors } from '@/data/questions/presentSimple';
import { presentPerfectErrors } from '@/data/questions/presentPerfect';
import { presentContinuousErrors, presentPerfectContinuousErrors } from '@/data/questions/presentContinuousAndPPC';
import { pastSimpleQuestions } from '@/data/questions/pastSimple';
import { pastContinuousQuestions } from '@/data/questions/pastContinuous';
import { pastPerfectQuestions } from '@/data/questions/pastPerfect';
import { pastPerfectContinuousQuestions } from '@/data/questions/pastPerfectContinuous';

const errorBank: Record<TenseId, Question[]> = {
  // Present tenses
  simple: presentSimpleErrors,
  continuous: presentContinuousErrors,
  perfect: presentPerfectErrors,
  'perfect-continuous': presentPerfectContinuousErrors,
  // Past tenses
  'past-simple': pastSimpleQuestions.filter((q) => q.type === 'error-correction'),
  'past-continuous': pastContinuousQuestions.filter((q) => q.type === 'error-correction'),
  'past-perfect': pastPerfectQuestions.filter((q) => q.type === 'error-correction'),
  'past-perfect-continuous': pastPerfectContinuousQuestions.filter((q) => q.type === 'error-correction'),
};

const tenseNames: Record<TenseId, string> = {
  simple: 'Present Simple',
  continuous: 'Present Continuous',
  perfect: 'Present Perfect',
  'perfect-continuous': 'Present Perfect Continuous',
  'past-simple': 'Past Simple',
  'past-continuous': 'Past Continuous',
  'past-perfect': 'Past Perfect',
  'past-perfect-continuous': 'Past Perfect Continuous',
};

export default function ErrorsPage({ params }: { params: Promise<{ tenseId: string }> }) {
  const { tenseId } = use(params);
  const { progress, completeStage } = useProgress();
  const tId = tenseId as TenseId;
  const questions = errorBank[tId] ?? [];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hintsShown, setHintsShown] = useState(0);
  const [results, setResults] = useState<{ correct: boolean }[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const question = questions[currentIdx];
  const tenseProgress = progress.tenses[tId];
  const hints = question ? [question.hint1, question.hint2, question.hint3].filter(Boolean) : [];

  const handleSubmit = useCallback(() => {
    if (answered) return;
    const correct = userAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase().trim() ||
      userAnswer.trim().length > 5; // Give credit for meaningful attempts
    const exactMatch = userAnswer.trim().toLowerCase() === question.correctAnswer.toLowerCase().trim();
    setIsCorrect(exactMatch);
    setAnswered(true);
    setResults((prev) => [...prev, { correct: exactMatch }]);
  }, [answered, userAnswer, question]);

  const handleNext = useCallback(() => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1);
      setUserAnswer('');
      setAnswered(false);
      setIsCorrect(false);
      setHintsShown(0);
    } else {
      setIsFinished(true);
      const correctCount = results.filter((r) => r.correct).length;
      const accuracy = Math.round((correctCount / questions.length) * 100);
      completeStage(tId, 'errors', correctCount, accuracy);
    }
  }, [currentIdx, questions.length, results, completeStage, tId]);

  if (isFinished) {
    const correctCount = results.filter((r) => r.correct).length;
    return (
      <main className="min-h-screen hero-gradient flex items-center justify-center px-4 py-16">
        <ThemeToggle />
        <div className="w-full max-w-xl animate-scale-in">
          <div className="glass-card rounded-3xl p-10 border border-border text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Error Correction Done!</h1>
            <p className="text-muted-foreground mb-8">{tenseNames[tId]}</p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-muted rounded-2xl p-4">
                <p className="text-2xl font-bold">{correctCount}/{results.length}</p>
                <p className="text-xs text-muted-foreground">Corrected</p>
              </div>
              <div className="bg-emerald-500/10 rounded-2xl p-4">
                <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                  {Math.round((correctCount / results.length) * 100)}%
                </p>
                <p className="text-xs text-muted-foreground">Accuracy</p>
              </div>
            </div>
            <Link
              id="continue-to-ielts-btn"
              href={`/tense/past/${tId}/ielts`}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Continue to IELTS Context <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!question) return null;
  const progressPercent = Math.round((currentIdx / questions.length) * 100);

  return (
    <main className="min-h-screen hero-gradient px-4 py-16">
      <ThemeToggle />
      <div className="w-full max-w-2xl mx-auto animate-fade-in-up">

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
          <Link href="/tense/past" className="hover:text-foreground transition-colors">Past</Link>
          <ChevronRight size={14} />
          <Link href={`/tense/past/${tId}`} className="hover:text-foreground transition-colors">{tenseNames[tId]}</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">Error Correction</span>
        </div>

        <div className="mb-6">
          <StageProgressBar currentStage="errors" completedStages={tenseProgress?.stages ?? {}} />
        </div>

        <div className="mb-6">
          <LinearProgress value={progressPercent} label={`Error ${currentIdx + 1} of ${questions.length}`} />
        </div>

        {/* Instructions */}
        <div className="glass-card rounded-2xl p-4 border border-rose-500/20 bg-rose-500/5 mb-5">
          <p className="text-sm text-rose-700 dark:text-rose-400">
            🔍 <strong>Task:</strong> Each sentence contains a grammar error. Find and correct it by typing the corrected sentence below.
          </p>
        </div>

        <div className="glass-card rounded-3xl p-7 border border-border mb-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-rose-600 dark:text-rose-400 uppercase tracking-wider bg-rose-500/10 px-2.5 py-1 rounded-full">
              Error Correction
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border capitalize">
              {question.topic}
            </span>
          </div>

          {/* Incorrect sentence */}
          <div className="mb-5 p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl">
            <p className="text-base text-foreground font-medium">{question.question}</p>
          </div>

          {/* Answer input */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-muted-foreground block mb-2">
              ✅ Write the corrected sentence:
            </label>
            <textarea
              id="error-correction-input"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={answered}
              placeholder="Type the corrected sentence here..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
            />
          </div>

          {/* Hints */}
          {hintsShown > 0 && (
            <div className="space-y-2 mb-4 animate-fade-in">
              {hints.slice(0, hintsShown).map((hint, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 bg-amber-500/5 border border-amber-500/15 rounded-xl">
                  <Lightbulb size={14} className="text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-amber-700 dark:text-amber-400"><strong>Hint {i + 1}:</strong> {hint}</p>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            {!answered && (
              <>
                <button
                  id="submit-correction-btn"
                  onClick={handleSubmit}
                  disabled={!userAnswer.trim()}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Send size={15} /> Submit Correction
                </button>
                {hintsShown < hints.length && (
                  <button
                    id="error-hint-btn"
                    onClick={() => setHintsShown((h) => h + 1)}
                    className="flex items-center gap-1.5 px-4 py-3 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 rounded-xl text-sm font-medium hover:bg-amber-500/20 transition-all"
                  >
                    <Lightbulb size={14} /> Hint
                  </button>
                )}
              </>
            )}
            {answered && (
              <button
                id="next-error-btn"
                onClick={handleNext}
                className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {currentIdx < questions.length - 1 ? 'Next Error' : 'See Results'} <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Feedback */}
        {answered && (
          <div className={`glass-card rounded-3xl p-6 border animate-scale-in ${
            isCorrect ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-amber-500/30 bg-amber-500/5'
          }`}>
            <div className="flex items-start gap-3 mb-4">
              {isCorrect ? (
                <CheckCircle size={20} className="text-emerald-500 shrink-0 mt-0.5" />
              ) : (
                <XCircle size={20} className="text-amber-500 shrink-0 mt-0.5" />
              )}
              <div>
                <h3 className={`font-bold ${isCorrect ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                  {isCorrect ? '✅ Correct!' : '📝 See the Correct Version'}
                </h3>
              </div>
            </div>
            <div className="space-y-3">
              {/* Corrected sentence */}
              <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-1">✅ Correct Sentence</p>
                <p className="text-sm text-foreground font-medium">{question.correctAnswer}</p>
              </div>
              {/* Explanation */}
              <div className="p-3 bg-primary/5 border border-primary/10 rounded-xl">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Explanation</p>
                <p className="text-sm text-foreground leading-relaxed">{question.explanation}</p>
              </div>
              {/* Grammar rule */}
              <div className="p-3 bg-muted rounded-xl">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Grammar Rule</p>
                <code className="text-sm text-foreground font-mono">{question.grammarRule}</code>
              </div>
              {question.ieltsTip && (
                <div className="p-3 bg-amber-500/5 border border-amber-500/15 rounded-xl">
                  <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider mb-1">🎓 IELTS Tip</p>
                  <p className="text-sm text-amber-700 dark:text-amber-400 leading-relaxed">{question.ieltsTip}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
          <Link href={`/tense/past/${tId}/advanced`} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group">
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> Back to Advanced MCQ
          </Link>
        </div>
      </div>
    </main>
  );
}
