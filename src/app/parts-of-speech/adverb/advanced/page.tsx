'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Lightbulb, CheckCircle, XCircle } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar, LinearProgress } from '@/components/ProgressIndicators';
import { useProgress } from '@/contexts/ProgressContext';
import { adverbAdvancedMCQQuestions } from '@/data/parts-of-speech/adverb';

export default function AdverbAdvancedPage() {
  const { getPartOfSpeechProgress, completePartOfSpeechStage, recordPartOfSpeechWeakArea } = useProgress();
  const questions = adverbAdvancedMCQQuestions;
  const adverbProgress = getPartOfSpeechProgress('adverb');

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answered, setAnswered] = useState(false);
  const [hintsShown, setHintsShown] = useState(0);
  const [results, setResults] = useState<{ correct: boolean }[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const question = questions[currentIdx];
  const hints = question ? [question.hint1, question.hint2, question.hint3].filter(Boolean) : [];

  const handleSubmit = useCallback(() => {
    if (answered || !selectedAnswer) return;
    const isCorrect = selectedAnswer === question.correctAnswer;
    setAnswered(true);

    if (!isCorrect && question.weakAreaTag) {
      recordPartOfSpeechWeakArea('adverb', question.weakAreaTag);
    }

    setResults((prev) => [...prev, { correct: isCorrect }]);
  }, [answered, selectedAnswer, question, recordPartOfSpeechWeakArea]);

  const handleNext = useCallback(() => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelectedAnswer('');
      setAnswered(false);
      setHintsShown(0);
    } else {
      setIsFinished(true);
      const correctCount = results.filter((r) => r.correct).length + (answered && selectedAnswer === question?.correctAnswer ? 1 : 0);
      const accuracy = Math.round((correctCount / questions.length) * 100);
      completePartOfSpeechStage('adverb', 'advanced', correctCount, accuracy);
    }
  }, [currentIdx, questions.length, results, answered, selectedAnswer, question, completePartOfSpeechStage]);

  if (isFinished) {
    const correctCount = results.filter((r) => r.correct).length;
    const accuracy = Math.round((correctCount / results.length) * 100);

    return (
      <main className="min-h-screen hero-gradient flex items-center justify-center px-4 py-16">
        <ThemeToggle />
        <div className="w-full max-w-xl animate-scale-in">
          <div className="glass-card rounded-3xl p-10 border border-border text-center">
            <div className="text-6xl mb-4">{accuracy >= 80 ? '🎯' : accuracy >= 60 ? '👍' : '📚'}</div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Advanced MCQ Complete!</h1>
            <p className="text-muted-foreground mb-8">
              Adverb — IELTS-Level Multiple Choice ({questions.length} Questions)
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
                id="retake-adv-advanced-btn"
                onClick={() => {
                  setCurrentIdx(0);
                  setSelectedAnswer('');
                  setAnswered(false);
                  setHintsShown(0);
                  setResults([]);
                  setIsFinished(false);
                }}
                className="px-6 py-3 rounded-2xl border border-border hover:bg-muted font-medium text-sm transition-colors"
              >
                ↻ Retake Test
              </button>
              <Link
                id="continue-to-adv-errors-btn"
                href="/parts-of-speech/adverb/errors"
                className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
              >
                Continue to Error Correction →
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
          <Link href="/parts-of-speech/adverb" className="hover:text-foreground transition-colors">Adverb</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">Advanced MCQ</span>
        </div>

        {/* Stage progress */}
        <div className="mb-6">
          <StageProgressBar
            currentStage="advanced"
            completedStages={adverbProgress?.stages ?? {}}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              Question {currentIdx + 1} of {questions.length}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground capitalize">
              Level: {question.level}
            </span>
          </div>
          {question.topic && (
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 capitalize">
              Topic: {question.topic}
            </span>
          )}
        </div>

        {/* Question card */}
        <div className="glass-card rounded-3xl p-8 border border-border space-y-6 mb-6">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              {question.grammarRule}
            </p>
            <h2 className="text-lg font-semibold text-foreground leading-relaxed">
              {question.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {question.options?.map((opt, idx) => {
              const isSelected = selectedAnswer === opt;
              const isCorrect = opt === question.correctAnswer;

              let btnStyle = 'border-border hover:border-primary/40 text-foreground bg-card';
              if (answered) {
                if (isCorrect) {
                  btnStyle = 'border-secondary bg-secondary/10 text-secondary font-semibold';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'border-destructive bg-destructive/10 text-destructive font-semibold';
                } else {
                  btnStyle = 'border-border opacity-40 text-muted-foreground';
                }
              } else if (isSelected) {
                btnStyle = 'border-primary bg-primary/10 text-primary font-semibold';
              }

              return (
                <button
                  key={idx}
                  id={`adv-mcq-option-${idx}`}
                  disabled={answered}
                  onClick={() => setSelectedAnswer(opt)}
                  className={`w-full p-4 rounded-2xl border text-left text-sm transition-all flex items-center justify-between gap-3 ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center text-xs font-mono font-bold text-muted-foreground shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </div>
                  {answered && isCorrect && <CheckCircle size={18} className="text-secondary shrink-0" />}
                  {answered && isSelected && !isCorrect && <XCircle size={18} className="text-destructive shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Progressive Hints */}
          {hints.length > 0 && !answered && (
            <div className="space-y-2 pt-2 border-t border-border/40">
              <div className="flex items-center justify-between">
                <button
                  id="adv-mcq-hint-btn"
                  onClick={() => setHintsShown((h) => Math.min(h + 1, hints.length))}
                  disabled={hintsShown >= hints.length}
                  className="text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors disabled:opacity-40"
                >
                  <Lightbulb size={13} />
                  {hintsShown === 0 ? '💡 Show Hint 1' : hintsShown < hints.length ? `💡 Show Next Hint (${hintsShown + 1}/${hints.length})` : '✓ All Hints Shown'}
                </button>
                {hintsShown > 0 && (
                  <span className="text-[11px] text-muted-foreground">
                    Hint level: {hintsShown}/{hints.length}
                  </span>
                )}
              </div>

              {hints.slice(0, hintsShown).map((hint, hIdx) => (
                <div
                  key={hIdx}
                  className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-900 dark:text-amber-200 animate-scale-in"
                >
                  <span className="font-bold mr-1">Hint {hIdx + 1}:</span> {hint}
                </div>
              ))}
            </div>
          )}

          {/* Explanations when answered */}
          {answered && (
            <div className="space-y-4 pt-4 border-t border-border/50 animate-fade-in-up">
              <div
                className={`p-4 rounded-2xl border ${
                  selectedAnswer === question.correctAnswer
                    ? 'bg-secondary/10 border-secondary/30 text-secondary'
                    : 'bg-destructive/10 border-destructive/30 text-destructive'
                }`}
              >
                <div className="flex items-center gap-2 font-semibold text-sm mb-1">
                  {selectedAnswer === question.correctAnswer ? (
                    <>
                      <CheckCircle size={16} /> Correct!
                    </>
                  ) : (
                    <>
                      <XCircle size={16} /> Incorrect
                    </>
                  )}
                </div>
                <p className="text-xs leading-relaxed text-foreground">
                  {question.explanation}
                </p>
              </div>

              {/* Dual Explanations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {question.simpleExplanation && (
                  <div className="p-3.5 rounded-xl bg-muted/40 border border-border">
                    <p className="font-semibold text-foreground mb-1">💡 Quick Rule:</p>
                    <p className="text-muted-foreground leading-relaxed">{question.simpleExplanation}</p>
                  </div>
                )}
                {question.ieltsExplanation && (
                  <div className="p-3.5 rounded-xl bg-primary/5 border border-primary/20">
                    <p className="font-semibold text-primary mb-1">🎯 IELTS Band 8+ Insight:</p>
                    <p className="text-muted-foreground leading-relaxed">{question.ieltsExplanation}</p>
                  </div>
                )}
              </div>

              {question.banglaExplanation && (
                <div className="p-3.5 rounded-xl bg-muted/40 border border-border text-xs">
                  <p className="font-semibold text-primary mb-1">🇧🇩 বাংলা ব্যাখ্যা:</p>
                  <p className="text-muted-foreground leading-relaxed">{question.banglaExplanation}</p>
                </div>
              )}
            </div>
          )}

          {/* Action button */}
          <div className="pt-2">
            {!answered ? (
              <button
                id="submit-adv-mcq-btn"
                disabled={!selectedAnswer}
                onClick={handleSubmit}
                className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-40 shadow-lg shadow-primary/20"
              >
                Check Answer
              </button>
            ) : (
              <button
                id="next-adv-mcq-btn"
                onClick={handleNext}
                className="w-full py-3.5 rounded-2xl bg-secondary text-secondary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-secondary/20"
              >
                {currentIdx < questions.length - 1 ? 'Next Question →' : 'View Final Results 🏆'}
              </button>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between text-sm">
          <Link
            href="/parts-of-speech/adverb/practice"
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <ChevronLeft size={16} /> Stage 2: Fill in the Blank
          </Link>
          <Link
            href="/parts-of-speech/adverb"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Adverb Hub
          </Link>
        </div>
      </div>
    </main>
  );
}
