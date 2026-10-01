'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Lightbulb, CheckCircle, XCircle, Keyboard, Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar, LinearProgress } from '@/components/ProgressIndicators';
import { useProgress } from '@/contexts/ProgressContext';
import { adjectiveFillBlankQuestions } from '@/data/parts-of-speech/adjective';

type AnswerState = 'unanswered' | 'correct' | 'incorrect';

interface QuestionResult {
  questionId: string;
  correct: boolean;
  selectedAnswer: string;
  hintsUsed: number;
}

export default function AdjectivePracticePage() {
  const { getPartOfSpeechProgress, completePartOfSpeechStage, recordPartOfSpeechWeakArea } = useProgress();
  const questions = adjectiveFillBlankQuestions;
  const adjectiveProgress = getPartOfSpeechProgress('adjective');

  const [mode, setMode] = useState<'guided' | 'challenge'>('guided');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [typedAnswer, setTypedAnswer] = useState('');
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
  const [hintsShown, setHintsShown] = useState(0);
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [showIELTSTip, setShowIELTSTip] = useState(false);

  const question = questions[currentIdx];
  const hints = question ? [question.hint1, question.hint2, question.hint3, question.hint4].filter(Boolean) : [];

  const handleSubmit = useCallback(() => {
    if (answerState !== 'unanswered') return;
    const answer = mode === 'guided' ? selectedAnswer : typedAnswer.trim();
    if (!answer) return;

    const isCorrect = answer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
    setAnswerState(isCorrect ? 'correct' : 'incorrect');

    if (!isCorrect && question.weakAreaTag) {
      recordPartOfSpeechWeakArea('adjective', question.weakAreaTag);
    }

    setResults((prev) => [
      ...prev,
      {
        questionId: question.id,
        correct: isCorrect,
        selectedAnswer: answer,
        hintsUsed: hintsShown,
      },
    ]);
    setShowIELTSTip(false);
  }, [answerState, mode, selectedAnswer, typedAnswer, question, hintsShown, recordPartOfSpeechWeakArea]);

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedAnswer('');
      setTypedAnswer('');
      setAnswerState('unanswered');
      setHintsShown(0);
      setShowIELTSTip(false);
    } else {
      setIsFinished(true);
      const correctCount = results.filter((r) => r.correct).length + (answerState === 'correct' ? 1 : 0);
      const totalCount = questions.length;
      const accuracy = Math.round((correctCount / totalCount) * 100);
      completePartOfSpeechStage('adjective', 'practice', accuracy, 100);
    }
  };

  const handleShowNextHint = () => {
    if (hintsShown < hints.length) {
      setHintsShown((prev) => prev + 1);
    }
  };

  const correctCount = results.filter((r) => r.correct).length;
  const currentAccuracy = results.length > 0 ? Math.round((correctCount / results.length) * 100) : 100;

  if (isFinished) {
    const accuracy = Math.round((correctCount / questions.length) * 100);
    return (
      <main className="min-h-screen hero-gradient px-4 py-16">
        <ThemeToggle />
        <div className="w-full max-w-2xl mx-auto animate-fade-in-up">
          <div className="glass-card rounded-3xl p-8 border border-border text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-secondary/15 text-secondary flex items-center justify-center mx-auto text-3xl">
              🎯
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Stage 2: Fill in the Blank Complete!
              </h1>
              <p className="text-muted-foreground text-sm mt-1">
                You tested all 20 adjective questions across guided and challenge levels.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-muted/50 border border-border">
                <p className="text-xs text-muted-foreground uppercase font-semibold">Total</p>
                <p className="text-2xl font-bold text-foreground mt-1">{questions.length}</p>
              </div>
              <div className="p-4 rounded-2xl bg-secondary/10 border border-secondary/20">
                <p className="text-xs text-secondary uppercase font-semibold">Correct</p>
                <p className="text-2xl font-bold text-secondary mt-1">{correctCount}</p>
              </div>
              <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
                <p className="text-xs text-primary uppercase font-semibold">Accuracy</p>
                <p className="text-2xl font-bold text-primary mt-1">{accuracy}%</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                id="retry-adjective-practice-btn"
                onClick={() => {
                  setCurrentIdx(0);
                  setSelectedAnswer('');
                  setTypedAnswer('');
                  setAnswerState('unanswered');
                  setHintsShown(0);
                  setResults([]);
                  setIsFinished(false);
                }}
                className="px-5 py-2.5 rounded-xl border border-border text-foreground hover:bg-muted/60 transition-colors text-sm font-medium"
              >
                ↻ Practice Again
              </button>
              <Link
                id="continue-to-adjective-advanced-btn"
                href="/parts-of-speech/adjective/advanced"
                className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
              >
                Continue to Stage 3: Advanced MCQ →
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
          <span className="text-foreground font-medium">Fill in the Blank</span>
        </div>

        {/* Stage Progress */}
        <div className="mb-6">
          <StageProgressBar
            currentStage="practice"
            completedStages={adjectiveProgress?.stages ?? {}}
          />
        </div>

        {/* Question Card Container */}
        <div className="glass-card rounded-3xl p-7 border border-border space-y-6 mb-6">
          {/* Header Controls */}
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                Question {currentIdx + 1} of {questions.length}
              </span>
              <span className="text-xs text-muted-foreground">
                Level: <strong>{question.level}</strong>
              </span>
            </div>

            {/* Mode Switcher */}
            <div className="flex items-center bg-muted/60 p-1 rounded-xl border border-border text-xs">
              <button
                id="mode-guided-btn"
                onClick={() => setMode('guided')}
                className={`px-3 py-1 rounded-lg font-medium transition-all ${
                  mode === 'guided'
                    ? 'bg-background shadow text-foreground font-bold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Guided (MCQ)
              </button>
              <button
                id="mode-challenge-btn"
                onClick={() => setMode('challenge')}
                className={`px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
                  mode === 'challenge'
                    ? 'bg-background shadow text-foreground font-bold'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Keyboard size={12} /> Challenge (Type)
              </button>
            </div>
          </div>

          <LinearProgress
            value={Math.round(((currentIdx + 1) / questions.length) * 100)}
            label={`Challenge ${currentIdx + 1} of ${questions.length}`}
            colorClass="bg-primary"
          />

          {/* Topic Badge */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
              {question.topic}
            </span>
            <span className="text-xs text-muted-foreground">
              Skill: {question.targetSkill}
            </span>
          </div>

          {/* Question Text */}
          <div className="p-5 rounded-2xl bg-muted/30 border border-border/60">
            <p className="text-base sm:text-lg font-medium text-foreground leading-relaxed">
              {question.question}
            </p>
          </div>

          {/* Answer Inputs */}
          {mode === 'guided' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {question.options?.map((opt, oIdx) => {
                let btnClass = 'bg-card border-border hover:border-primary/50 text-foreground';
                if (answerState !== 'unanswered') {
                  if (opt.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()) {
                    btnClass = 'bg-secondary/15 border-secondary text-secondary font-bold';
                  } else if (selectedAnswer === opt) {
                    btnClass = 'bg-destructive/15 border-destructive text-destructive';
                  } else {
                    btnClass = 'opacity-40 border-border text-muted-foreground';
                  }
                } else if (selectedAnswer === opt) {
                  btnClass = 'border-primary bg-primary/10 text-primary font-semibold ring-2 ring-primary/20';
                }

                return (
                  <button
                    key={oIdx}
                    id={`adj-opt-${oIdx}`}
                    disabled={answerState !== 'unanswered'}
                    onClick={() => setSelectedAnswer(opt)}
                    className={`p-4 rounded-2xl border text-sm text-left transition-all flex items-center justify-between ${btnClass}`}
                  >
                    <span>{opt}</span>
                    {answerState !== 'unanswered' && opt.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim() && (
                      <CheckCircle size={16} className="text-secondary shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-3">
              <input
                id="adj-typed-input"
                type="text"
                disabled={answerState !== 'unanswered'}
                value={typedAnswer}
                onChange={(e) => setTypedAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSubmit();
                }}
                placeholder="Type the exact adjective form here..."
                className="w-full px-4 py-3.5 rounded-2xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
              />
              <p className="text-xs text-muted-foreground">
                Press <strong>Enter</strong> or click Submit Answer to check your spelling and inflection.
              </p>
            </div>
          )}

          {/* Progressive Hints Section */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <button
                id="show-adj-hint-btn"
                disabled={hintsShown >= hints.length || answerState !== 'unanswered'}
                onClick={handleShowNextHint}
                className="inline-flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 font-semibold disabled:opacity-40 transition-opacity"
              >
                <Lightbulb size={14} />
                <span>
                  {hintsShown === 0
                    ? 'Need a Hint?'
                    : hintsShown < hints.length
                    ? `Show Hint ${hintsShown + 1} of ${hints.length}`
                    : 'All Hints Revealed'}
                </span>
              </button>
              {hintsShown > 0 && (
                <span className="text-[11px] text-muted-foreground font-mono">
                  {hintsShown}/{hints.length} hints viewed
                </span>
              )}
            </div>

            {hintsShown > 0 && (
              <div className="space-y-1.5 animate-scale-in">
                {hints.slice(0, hintsShown).map((hint, hIdx) => (
                  <div
                    key={hIdx}
                    className="p-3 bg-primary/5 rounded-xl border border-primary/10 text-xs text-foreground flex items-start gap-2"
                  >
                    <span className="font-bold text-primary shrink-0">H{hIdx + 1}:</span>
                    <span>{hint}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Action Button: Submit or Next */}
          <div className="pt-2">
            {answerState === 'unanswered' ? (
              <button
                id="submit-adj-answer-btn"
                onClick={handleSubmit}
                disabled={mode === 'guided' ? !selectedAnswer : !typedAnswer.trim()}
                className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-40 shadow-lg shadow-primary/20"
              >
                Submit Answer
              </button>
            ) : (
              <button
                id="next-adj-question-btn"
                onClick={handleNext}
                className="w-full py-3.5 rounded-2xl bg-secondary text-secondary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-secondary/20 flex items-center justify-center gap-2"
              >
                <span>{currentIdx + 1 < questions.length ? 'Next Question' : 'Complete Stage 2'}</span>
                <ChevronRight size={16} />
              </button>
            )}
          </div>

          {/* Feedback & Explanations Panel */}
          {answerState !== 'unanswered' && (
            <div className="space-y-4 pt-4 border-t border-border animate-fade-in-up">
              <div
                className={`p-4 rounded-2xl border ${
                  answerState === 'correct'
                    ? 'bg-secondary/10 border-secondary/30'
                    : 'bg-destructive/10 border-destructive/30'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-sm mb-1">
                  {answerState === 'correct' ? (
                    <>
                      <CheckCircle size={18} className="text-secondary" />
                      <span className="text-secondary">Excellent! That is correct.</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={18} className="text-destructive" />
                      <span className="text-destructive">
                        Not quite. The correct answer is "{question.correctAnswer}".
                      </span>
                    </>
                  )}
                </div>
                <p className="text-xs text-foreground leading-relaxed">{question.explanation}</p>
              </div>

              {/* Simple & IELTS Explanations */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {question.simpleExplanation && (
                  <div className="p-3.5 bg-card rounded-xl border border-border">
                    <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">
                      💡 Simple Explanation
                    </p>
                    <p className="text-xs text-foreground">{question.simpleExplanation}</p>
                  </div>
                )}
                {question.ieltsExplanation && (
                  <div className="p-3.5 bg-card rounded-xl border border-border">
                    <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                      🎯 IELTS Academic Grammar
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
            href="/parts-of-speech/adjective/learn"
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            ← Back to Learn
          </Link>
          <Link
            href="/parts-of-speech/adjective/advanced"
            className="text-primary hover:text-primary/80 font-medium flex items-center gap-1"
          >
            Stage 3: Advanced MCQ →
          </Link>
        </div>
      </div>
    </main>
  );
}
