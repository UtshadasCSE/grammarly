'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Lightbulb, CheckCircle, XCircle } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar, LinearProgress } from '@/components/ProgressIndicators';
import { useProgress } from '@/contexts/ProgressContext';
import { verbAdvancedMCQQuestions } from '@/data/parts-of-speech/verb';

export default function VerbAdvancedPage() {
  const { getPartOfSpeechProgress, completePartOfSpeechStage, recordPartOfSpeechWeakArea } = useProgress();
  const questions = verbAdvancedMCQQuestions;
  const verbProgress = getPartOfSpeechProgress('verb');

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
      recordPartOfSpeechWeakArea('verb', question.weakAreaTag);
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
      completePartOfSpeechStage('verb', 'advanced', correctCount, accuracy);
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
              Verb — IELTS-Level Multiple Choice ({questions.length} Questions)
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
                href="/parts-of-speech/verb/errors"
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
          <Link href="/parts-of-speech/verb" className="hover:text-foreground transition-colors">Verb</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">Advanced MCQ</span>
        </div>

        {/* Stage progress */}
        <div className="mb-6">
          <StageProgressBar
            currentStage="advanced"
            completedStages={verbProgress?.stages ?? {}}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              Question {currentIdx + 1} of {questions.length}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground">
              Level: {question.level}
            </span>
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            🎯 IELTS Band 7.5–9.0 Grammar
          </span>
        </div>

        {/* Question Card */}
        <div className="glass-card rounded-3xl p-8 mb-6 border border-border">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
              <span>Topic: {question.topic}</span>
              <span>•</span>
              <span>Skill: {question.targetSkill}</span>
            </div>
            <p className="text-lg sm:text-xl font-bold text-foreground leading-relaxed">
              {question.question}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-6">
            {question.options?.map((opt, idx) => {
              const isSelected = selectedAnswer === opt;
              const isCorrect = opt === question.correctAnswer;

              let btnClass = 'border-border hover:border-primary/40 bg-card';
              if (answered) {
                if (isCorrect) {
                  btnClass = 'border-secondary bg-secondary/15 text-secondary font-bold';
                } else if (isSelected) {
                  btnClass = 'border-destructive bg-destructive/15 text-destructive';
                }
              } else if (isSelected) {
                btnClass = 'border-primary bg-primary/10 shadow-sm';
              }

              return (
                <button
                  key={idx}
                  id={`mcq-opt-${idx}`}
                  onClick={() => !answered && setSelectedAnswer(opt)}
                  disabled={answered}
                  className={`w-full p-4 rounded-2xl border text-left font-medium text-sm transition-all duration-200 flex items-center justify-between ${btnClass}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="font-bold text-muted-foreground shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}.
                    </span>
                    <span className="leading-relaxed">{opt}</span>
                  </div>
                  {answered && isCorrect && (
                    <CheckCircle size={18} className="text-secondary shrink-0 ml-2" />
                  )}
                  {answered && isSelected && !isCorrect && (
                    <XCircle size={18} className="text-destructive shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              {hints.length > 0 && !answered && (
                <button
                  id="mcq-hint-btn"
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
                id="mcq-submit-btn"
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-2xl text-sm hover:opacity-90 transition-opacity disabled:opacity-40 shadow-lg shadow-primary/20"
              >
                Submit Choice
              </button>
            ) : (
              <button
                id="mcq-next-btn"
                onClick={handleNext}
                className="px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-2xl text-sm hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-secondary/20 animate-scale-in"
              >
                {currentIdx < questions.length - 1 ? 'Next MCQ →' : 'Complete Stage 🎉'}
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

          {/* Detailed Explanations */}
          {answered && (
            <div className="mt-6 space-y-4 pt-6 border-t border-border animate-fade-in">
              <div
                className={`p-4 rounded-2xl border ${
                  selectedAnswer === question.correctAnswer
                    ? 'bg-secondary/10 border-secondary/20'
                    : 'bg-destructive/10 border-destructive/20'
                }`}
              >
                <div className="flex items-center gap-2 mb-2 font-bold text-sm">
                  {selectedAnswer === question.correctAnswer ? (
                    <>
                      <CheckCircle size={18} className="text-secondary" />
                      <span className="text-secondary">Correct!</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={18} className="text-destructive" />
                      <span className="text-destructive">Incorrect choice.</span>
                    </>
                  )}
                </div>
                <p className="text-xs text-foreground leading-relaxed">{question.explanation}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {question.simpleExplanation && (
                  <div className="p-3.5 bg-card rounded-xl border border-border">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                      💡 Simple Rule
                    </p>
                    <p className="text-xs text-foreground">{question.simpleExplanation}</p>
                  </div>
                )}
                {question.ieltsExplanation && (
                  <div className="p-3.5 bg-card rounded-xl border border-border">
                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                      🎯 IELTS Examiner Insight
                    </p>
                    <p className="text-xs text-foreground">{question.ieltsExplanation}</p>
                  </div>
                )}
              </div>

              {question.banglaExplanation && (
                <div className="p-3 bg-primary/5 rounded-xl border border-primary/10">
                  <p className="text-xs text-foreground font-medium">
                    🇧🇩 <strong>বাংলা:</strong> {question.banglaExplanation}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between text-sm">
          <Link
            href="/parts-of-speech/verb/practice"
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            ← Stage 2: Fill in the Blank
          </Link>
          <Link
            href="/parts-of-speech/verb/errors"
            className="text-primary hover:text-primary/80 font-medium flex items-center gap-1"
          >
            Stage 4: Error Correction →
          </Link>
        </div>
      </div>
    </main>
  );
}
