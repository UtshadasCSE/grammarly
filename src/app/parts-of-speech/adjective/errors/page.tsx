'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Lightbulb, CheckCircle, XCircle, Send, AlertTriangle } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar, LinearProgress } from '@/components/ProgressIndicators';
import { useProgress } from '@/contexts/ProgressContext';
import { adjectiveErrorCorrectionQuestions } from '@/data/parts-of-speech/adjective';

export default function AdjectiveErrorsPage() {
  const { getPartOfSpeechProgress, completePartOfSpeechStage, recordPartOfSpeechWeakArea } = useProgress();
  const questions = adjectiveErrorCorrectionQuestions;
  const adjectiveProgress = getPartOfSpeechProgress('adjective');

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
      recordPartOfSpeechWeakArea('adjective', question.weakAreaTag);
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
      completePartOfSpeechStage('adjective', 'errors', correctCount, accuracy);
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
              Adjective — Diagnostic Grammar Error Analysis ({questions.length} Challenges)
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
                id="retake-adj-errors-btn"
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
                ↻ Retake Challenges
              </button>
              <Link
                id="continue-to-adj-ielts-btn"
                href="/parts-of-speech/adjective/ielts"
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
          <Link href="/parts-of-speech/adjective" className="hover:text-foreground transition-colors">Adjective</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">Error Correction</span>
        </div>

        {/* Stage progress */}
        <div className="mb-6">
          <StageProgressBar
            currentStage="errors"
            completedStages={adjectiveProgress?.stages ?? {}}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Error {currentIdx + 1} of {questions.length}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground">
              Level: {question.level}
            </span>
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            Topic: {question.topic}
          </span>
        </div>

        <div className="mb-6">
          <LinearProgress
            value={Math.round(((currentIdx + 1) / questions.length) * 100)}
            label={`Progress: ${currentIdx + 1}/${questions.length}`}
            colorClass="bg-primary"
          />
        </div>

        {/* Main Error Box */}
        <div className="glass-card rounded-3xl p-7 border border-border space-y-6 mb-6">
          <div>
            <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <AlertTriangle size={14} />
              <span>Find & Fix the Adjective Error</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {question.question}
            </p>
          </div>

          {/* Faulty sentence display */}
          <div className="p-4 rounded-2xl bg-destructive/5 border border-destructive/20 text-foreground text-base sm:text-lg font-medium">
            {question.learnerError ? (
              <p className="text-destructive font-semibold">❌ {question.learnerError}</p>
            ) : (
              <p className="text-foreground">{question.contextSnippet || question.question}</p>
            )}
          </div>

          {/* User Input or Option Selection */}
          {question.options && question.options.length > 0 ? (
            <div className="space-y-2">
              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                Select the Corrected Version:
              </p>
              <div className="space-y-2">
                {question.options.map((opt, oIdx) => {
                  const isSelected = userAnswer === opt;
                  const isOptCorrect = opt.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase();
                  let btnStyle = 'bg-card border-border hover:border-primary/50 text-foreground';

                  if (answered) {
                    if (isOptCorrect) {
                      btnStyle = 'bg-secondary/15 border-secondary text-secondary font-bold';
                    } else if (isSelected && !isOptCorrect) {
                      btnStyle = 'bg-destructive/15 border-destructive text-destructive';
                    } else {
                      btnStyle = 'opacity-40 border-border text-muted-foreground';
                    }
                  } else if (isSelected) {
                    btnStyle = 'border-primary bg-primary/10 text-primary font-semibold ring-2 ring-primary/20';
                  }

                  return (
                    <button
                      key={oIdx}
                      id={`adj-error-opt-${oIdx}`}
                      disabled={answered}
                      onClick={() => setUserAnswer(opt)}
                      className={`w-full p-3.5 rounded-2xl border text-left text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {answered && isOptCorrect && (
                        <CheckCircle size={16} className="text-secondary shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <label htmlFor="adj-error-input" className="text-xs font-bold text-muted-foreground uppercase tracking-wider block">
                Type the Corrected Adjective or Full Sentence:
              </label>
              <div className="relative">
                <input
                  id="adj-error-input"
                  type="text"
                  disabled={answered}
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSubmit();
                  }}
                  placeholder="e.g. Type the corrected sentence..."
                  className="w-full px-4 py-3.5 rounded-2xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 pr-12"
                />
              </div>
            </div>
          )}

          {/* Hints */}
          {!answered && hints.length > 0 && (
            <div className="space-y-2">
              <button
                id="show-adj-error-hint-btn"
                onClick={() => setHintsShown((prev) => Math.min(prev + 1, hints.length))}
                disabled={hintsShown >= hints.length}
                className="text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors disabled:opacity-40"
              >
                <Lightbulb size={13} />
                <span>
                  {hintsShown === 0
                    ? '💡 Need a hint?'
                    : hintsShown < hints.length
                    ? `💡 Next hint (${hintsShown + 1}/${hints.length})`
                    : '💡 All hints shown'}
                </span>
              </button>
              {hintsShown > 0 && (
                <div className="space-y-1.5 animate-scale-in">
                  {hints.slice(0, hintsShown).map((hint, hIdx) => (
                    <div key={hIdx} className="p-3 rounded-xl bg-primary/5 border border-primary/15 text-xs text-foreground">
                      <span className="font-semibold text-primary">Hint {hIdx + 1}: </span>
                      {hint}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Submit / Next Button */}
          <div>
            {!answered ? (
              <button
                id="submit-adj-error-btn"
                disabled={!userAnswer.trim()}
                onClick={handleSubmit}
                className="w-full py-3.5 bg-primary text-primary-foreground font-semibold rounded-2xl hover:opacity-90 transition-opacity disabled:opacity-40 shadow-lg shadow-primary/20 text-sm"
              >
                Verify Correction
              </button>
            ) : (
              <button
                id="next-adj-error-btn"
                onClick={handleNext}
                className="w-full py-3.5 bg-secondary text-secondary-foreground font-semibold rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-secondary/20 text-sm flex items-center justify-center gap-2"
              >
                <span>{currentIdx < questions.length - 1 ? 'Next Challenge' : 'View Results'}</span>
                <ChevronRight size={16} />
              </button>
            )}
          </div>

          {/* 5-Layer Detailed Diagnostic Feedback */}
          {answered && (
            <div className="p-5 rounded-2xl bg-card border border-border space-y-3 animate-fade-in-up">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  isCorrect
                    ? 'bg-secondary/15 text-secondary'
                    : 'bg-destructive/15 text-destructive'
                }`}>
                  {isCorrect ? '✓ Correct Fix' : '✗ Needs Attention'}
                </span>
                <span className="text-xs font-semibold text-muted-foreground">
                  Target: {question.grammarRule}
                </span>
              </div>

              {/* Correct Form Highlight */}
              <div className="p-3 rounded-xl bg-secondary/10 border border-secondary/20">
                <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-0.5">
                  ✅ Standard Grammar Correction
                </p>
                <p className="text-sm font-semibold text-foreground">
                  {question.correctAnswer}
                </p>
              </div>

              {/* Diagnostic Breakdown */}
              <div className="space-y-2 text-xs">
                {question.whyMistakeHappens && (
                  <div className="p-3 bg-muted/40 rounded-xl border border-border/40">
                    <p className="font-bold text-amber-600 dark:text-amber-400 mb-0.5">
                      ⚠️ Why Learners Make This Error:
                    </p>
                    <p className="text-muted-foreground">{question.whyMistakeHappens}</p>
                  </div>
                )}

                {question.ieltsRelevance && (
                  <div className="p-3 bg-primary/5 rounded-xl border border-primary/10">
                    <p className="font-bold text-primary mb-0.5">
                      🎯 IELTS Academic Writing & Speaking Relevance:
                    </p>
                    <p className="text-foreground">{question.ieltsRelevance}</p>
                  </div>
                )}

                {question.banglaExplanation && (
                  <div className="p-3 bg-secondary/5 rounded-xl border border-secondary/15">
                    <p className="font-bold text-secondary mb-0.5">
                      🇧🇩 বাংলায় ব্যাকরণ ব্যাখ্যা:
                    </p>
                    <p className="text-muted-foreground">{question.banglaExplanation}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between text-sm">
          <Link
            href="/parts-of-speech/adjective/advanced"
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            ← Back to Advanced MCQ
          </Link>
          <Link
            href="/parts-of-speech/adjective/ielts"
            className="text-primary hover:text-primary/80 font-medium flex items-center gap-1"
          >
            Stage 5: IELTS Context →
          </Link>
        </div>
      </div>
    </main>
  );
}
