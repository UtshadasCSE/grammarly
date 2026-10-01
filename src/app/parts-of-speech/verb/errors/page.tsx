'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Lightbulb, CheckCircle, XCircle, Send, AlertTriangle } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar, LinearProgress } from '@/components/ProgressIndicators';
import { useProgress } from '@/contexts/ProgressContext';
import { verbErrorCorrectionQuestions } from '@/data/parts-of-speech/verb';

export default function VerbErrorsPage() {
  const { getPartOfSpeechProgress, completePartOfSpeechStage, recordPartOfSpeechWeakArea } = useProgress();
  const questions = verbErrorCorrectionQuestions;
  const verbProgress = getPartOfSpeechProgress('verb');

  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hintsShown, setHintsShown] = useState(0);
  const [results, setResults] = useState<{ correct: boolean }[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const question = questions[currentIdx];
  const hints = question ? [question.hint1, question.hint2, question.hint3].filter(Boolean) : [];

  const handleSubmit = useCallback(() => {
    if (answered) return;
    const cleanUser = userAnswer.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
    const cleanCorrect = question.correctAnswer.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
    const exactMatch = cleanUser === cleanCorrect || (question.correctForm ? cleanUser.includes(question.correctForm.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')) : false);

    setIsCorrect(exactMatch);
    setAnswered(true);

    if (!exactMatch && question.weakAreaTag) {
      recordPartOfSpeechWeakArea('verb', question.weakAreaTag);
    }

    setResults((prev) => [...prev, { correct: exactMatch }]);
  }, [answered, userAnswer, question, recordPartOfSpeechWeakArea]);

  const handleNext = useCallback(() => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1);
      setUserAnswer('');
      setAnswered(false);
      setIsCorrect(false);
      setHintsShown(0);
    } else {
      setIsFinished(true);
      const correctCount = results.filter((r) => r.correct).length + (isCorrect ? 1 : 0);
      const accuracy = Math.round((correctCount / questions.length) * 100);
      completePartOfSpeechStage('verb', 'errors', correctCount, accuracy);
    }
  }, [currentIdx, questions.length, results, isCorrect, completePartOfSpeechStage]);

  if (isFinished) {
    const correctCount = results.filter((r) => r.correct).length;
    const accuracy = Math.round((correctCount / results.length) * 100);

    return (
      <main className="min-h-screen hero-gradient flex items-center justify-center px-4 py-16">
        <ThemeToggle />
        <div className="w-full max-w-xl animate-scale-in">
          <div className="glass-card rounded-3xl p-10 border border-border text-center">
            <div className="text-6xl mb-4">{accuracy >= 80 ? '🎯' : accuracy >= 60 ? '👍' : '📚'}</div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Error Correction Complete!</h1>
            <p className="text-muted-foreground mb-8">
              Verb — Diagnostic Error Analysis ({questions.length} Questions)
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-muted rounded-2xl p-4">
                <p className="text-2xl font-bold text-foreground">{correctCount}</p>
                <p className="text-xs text-muted-foreground mt-1">Correct</p>
              </div>
              <div className="bg-muted rounded-2xl p-4">
                <p className="text-2xl font-bold text-foreground">{results.length - correctCount}</p>
                <p className="text-xs text-muted-foreground mt-1">Incorrect</p>
              </div>
              <div className="bg-muted rounded-2xl p-4">
                <p className="text-2xl font-bold text-primary">{accuracy}%</p>
                <p className="text-xs text-muted-foreground mt-1">Accuracy</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => {
                  setCurrentIdx(0);
                  setUserAnswer('');
                  setAnswered(false);
                  setIsCorrect(false);
                  setHintsShown(0);
                  setResults([]);
                  setIsFinished(false);
                }}
                className="px-6 py-3 rounded-2xl border border-border hover:bg-muted font-medium text-sm transition-colors"
              >
                ↻ Practice Again
              </button>
              <Link
                href="/parts-of-speech/verb/ielts"
                className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
              >
                Continue to IELTS Context →
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen hero-gradient px-4 py-16">
      <ThemeToggle />

      <div className="w-full max-w-2xl mx-auto animate-fade-in-up">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
          <Link href="/parts-of-speech" className="hover:text-foreground transition-colors">Parts of Speech</Link>
          <ChevronRight size={14} />
          <Link href="/parts-of-speech/verb" className="hover:text-foreground transition-colors">Verb</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">Error Correction</span>
        </div>

        {/* Stage progress */}
        <div className="mb-6">
          <StageProgressBar
            currentStage="errors"
            completedStages={verbProgress?.stages ?? {}}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              Challenge {currentIdx + 1} of {questions.length}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground">
              Level: {question.level}
            </span>
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            🔍 Find & Fix the Verb Error
          </span>
        </div>

        {/* Question Card */}
        <div className="glass-card rounded-3xl p-8 mb-6 border border-border">
          {/* Erroneous Sentence Display */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-primary mb-3">
              <AlertTriangle size={15} />
              <span>Sentence with Grammar Error:</span>
            </div>
            <div className="p-5 bg-destructive/10 border border-destructive/20 rounded-2xl">
              <p className="text-base sm:text-lg font-medium text-foreground leading-relaxed">
                "{question.question}"
              </p>
            </div>
          </div>

          {/* User Input Form */}
          <div className="mb-6">
            <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
              Type the completely corrected sentence:
            </label>
            <textarea
              rows={3}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={answered}
              placeholder="Type the full corrected sentence here..."
              className={`w-full p-4 rounded-2xl border bg-card text-foreground font-medium outline-none transition-colors resize-none ${
                answered
                  ? isCorrect
                    ? 'border-secondary bg-secondary/10'
                    : 'border-destructive bg-destructive/10'
                  : 'border-border focus:border-primary'
              }`}
            />
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              {hints.length > 0 && !answered && (
                <button
                  id="err-hint-btn"
                  onClick={() => setHintsShown((h) => Math.min(h + 1, hints.length))}
                  disabled={hintsShown >= hints.length}
                  className="px-4 py-2 rounded-xl border border-border hover:bg-muted text-xs font-semibold text-muted-foreground flex items-center gap-1.5 transition-colors disabled:opacity-40"
                >
                  <Lightbulb size={14} className="text-amber-500" />
                  Hint ({hintsShown}/{hints.length})
                </button>
              )}
            </div>

            {!answered ? (
              <button
                id="err-submit-btn"
                onClick={handleSubmit}
                disabled={!userAnswer.trim()}
                className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-2xl text-sm hover:opacity-90 transition-opacity disabled:opacity-40 flex items-center gap-2 shadow-lg shadow-primary/20"
              >
                <Send size={15} />
                Submit Correction
              </button>
            ) : (
              <button
                id="err-next-btn"
                onClick={handleNext}
                className="px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-2xl text-sm hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-secondary/20 animate-scale-in"
              >
                {currentIdx < questions.length - 1 ? 'Next Error Challenge →' : 'Complete Stage 🎉'}
              </button>
            )}
          </div>

          {/* Progressive Hints */}
          {hintsShown > 0 && (
            <div className="mt-4 space-y-2 animate-fade-in">
              {hints.slice(0, hintsShown).map((h, hIdx) => (
                <div key={hIdx} className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-xs flex items-start gap-2">
                  <span className="font-bold text-amber-600 dark:text-amber-400 shrink-0">
                    Hint {hIdx + 1}:
                  </span>
                  <span className="text-foreground">{h}</span>
                </div>
              ))}
            </div>
          )}

          {/* 5-Layer Error Analysis */}
          {answered && (
            <div className="mt-6 space-y-4 pt-6 border-t border-border animate-fade-in">
              {/* Correct Version Banner */}
              <div
                className={`p-4 rounded-2xl border ${
                  isCorrect
                    ? 'bg-secondary/10 border-secondary/20'
                    : 'bg-destructive/10 border-destructive/20'
                }`}
              >
                <div className="flex items-center gap-2 mb-2 font-bold text-sm">
                  {isCorrect ? (
                    <>
                      <CheckCircle size={18} className="text-secondary" />
                      <span className="text-secondary">Excellent! Accurate Correction:</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={18} className="text-destructive" />
                      <span className="text-destructive">Correction Needed. Model Answer:</span>
                    </>
                  )}
                </div>
                <p className="text-sm font-semibold text-foreground bg-card p-3 rounded-xl border border-border">
                  "{question.correctAnswer}"
                </p>
              </div>

              {/* Diagnostic Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {question.learnerError && (
                  <div className="p-3.5 bg-card rounded-xl border border-border">
                    <p className="font-bold text-destructive uppercase tracking-wider mb-1">
                      ❌ The Mistake
                    </p>
                    <p className="text-foreground">{question.learnerError}</p>
                  </div>
                )}
                {question.verbRule && (
                  <div className="p-3.5 bg-card rounded-xl border border-border">
                    <p className="font-bold text-primary uppercase tracking-wider mb-1">
                      📘 Grammar Rule
                    </p>
                    <p className="text-foreground">{question.verbRule}</p>
                  </div>
                )}
                {question.whyMistakeHappens && (
                  <div className="p-3.5 bg-card rounded-xl border border-border">
                    <p className="font-bold text-amber-500 uppercase tracking-wider mb-1">
                      🤔 Why Learners Make This Mistake
                    </p>
                    <p className="text-foreground">{question.whyMistakeHappens}</p>
                  </div>
                )}
                {question.ieltsRelevance && (
                  <div className="p-3.5 bg-card rounded-xl border border-border">
                    <p className="font-bold text-secondary uppercase tracking-wider mb-1">
                      🎯 IELTS Band Impact
                    </p>
                    <p className="text-foreground">{question.ieltsRelevance}</p>
                  </div>
                )}
              </div>

              {question.banglaExplanation && (
                <div className="p-3 bg-primary/5 rounded-xl border border-primary/10">
                  <p className="text-xs text-foreground font-medium">
                    🇧🇩 <strong>বাংলা ব্যাখ্যা:</strong> {question.banglaExplanation}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between text-sm">
          <Link
            href="/parts-of-speech/verb/advanced"
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            ← Stage 3: Advanced MCQ
          </Link>
          <Link
            href="/parts-of-speech/verb/ielts"
            className="text-primary hover:text-primary/80 font-medium flex items-center gap-1"
          >
            Stage 5: IELTS Context →
          </Link>
        </div>
      </div>
    </main>
  );
}
