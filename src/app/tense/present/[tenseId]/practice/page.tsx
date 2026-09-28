'use client';

import { use, useState, useCallback } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Lightbulb, CheckCircle, XCircle, RotateCcw, Keyboard } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar, LinearProgress } from '@/components/ProgressIndicators';
import { useProgress } from '@/contexts/ProgressContext';
import type { TenseId, Question } from '@/types';
import { presentSimpleQuestions } from '@/data/questions/presentSimple';
import { presentPerfectQuestions } from '@/data/questions/presentPerfect';
import {
  presentContinuousQuestions,
  presentPerfectContinuousQuestions,
} from '@/data/questions/presentContinuousAndPPC';
import { pastSimpleQuestions } from '@/data/questions/pastSimple';
import { pastContinuousQuestions } from '@/data/questions/pastContinuous';
import { pastPerfectQuestions } from '@/data/questions/pastPerfect';
import { pastPerfectContinuousQuestions } from '@/data/questions/pastPerfectContinuous';

const questionBank: Partial<Record<TenseId, Question[]>> = {
  // Present tenses
  simple: presentSimpleQuestions.filter((q) => q.type === 'fill-blank'),
  continuous: presentContinuousQuestions.filter((q) => q.type === 'fill-blank'),
  perfect: presentPerfectQuestions.filter((q) => q.type === 'fill-blank'),
  'perfect-continuous': presentPerfectContinuousQuestions.filter((q) => q.type === 'fill-blank'),
  // Past tenses
  'past-simple': pastSimpleQuestions.filter((q) => q.type === 'fill-blank'),
  'past-continuous': pastContinuousQuestions.filter((q) => q.type === 'fill-blank'),
  'past-perfect': pastPerfectQuestions.filter((q) => q.type === 'fill-blank'),
  'past-perfect-continuous': pastPerfectContinuousQuestions.filter((q) => q.type === 'fill-blank'),
};

const tenseNames: Partial<Record<TenseId, string>> = {
  simple: 'Present Simple',
  continuous: 'Present Continuous',
  perfect: 'Present Perfect',
  'perfect-continuous': 'Present Perfect Continuous',
  'past-simple': 'Past Simple',
  'past-continuous': 'Past Continuous',
  'past-perfect': 'Past Perfect',
  'past-perfect-continuous': 'Past Perfect Continuous',
};

type AnswerState = 'unanswered' | 'correct' | 'incorrect';

interface QuestionResult {
  questionId: string;
  correct: boolean;
  selectedAnswer: string;
  hintsUsed: number;
}

export default function PracticePage({ params }: { params: Promise<{ tenseId: string }> }) {
  const { tenseId } = use(params);
  const { progress, completeStage } = useProgress();
  const tId = tenseId as TenseId;
  const questions = questionBank[tId] ?? [];

  const [mode, setMode] = useState<'guided' | 'challenge'>('guided');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [typedAnswer, setTypedAnswer] = useState('');
  const [answerState, setAnswerState] = useState<AnswerState>('unanswered');
  const [hintsShown, setHintsShown] = useState(0);
  const [results, setResults] = useState<QuestionResult[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [showIELTSTip, setShowIELTSTip] = useState(false);

  const tenseProgress = progress.tenses[tId];
  const question = questions[currentIdx];

  const hints = question
    ? [question.hint1, question.hint2, question.hint3, question.hint4].filter(Boolean)
    : [];

  const handleSubmit = useCallback(() => {
    if (answerState !== 'unanswered') return;
    const answer = mode === 'guided' ? selectedAnswer : typedAnswer.trim();
    if (!answer) return;

    const isCorrect =
      answer.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim();
    setAnswerState(isCorrect ? 'correct' : 'incorrect');
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
  }, [answerState, mode, selectedAnswer, typedAnswer, question, hintsShown]);

  const handleNext = useCallback(() => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelectedAnswer('');
      setTypedAnswer('');
      setAnswerState('unanswered');
      setHintsShown(0);
      setShowIELTSTip(false);
    } else {
      // Finished
      setIsFinished(true);
      const correctCount = results.filter((r) => r.correct).length + (answerState === 'correct' ? 1 : 0);
      const accuracy = Math.round((correctCount / questions.length) * 100);
      completeStage(tId, 'practice', correctCount, accuracy);
    }
  }, [currentIdx, questions.length, results, answerState, completeStage, tId]);

  const showHint = () => {
    if (hintsShown < hints.length) {
      setHintsShown((h) => h + 1);
    }
  };

  if (isFinished) {
    const correctCount = results.filter((r) => r.correct).length;
    const accuracy = Math.round((correctCount / results.length) * 100);
    return (
      <main className="min-h-screen hero-gradient flex items-center justify-center px-4 py-16">
        <ThemeToggle />
        <div className="w-full max-w-xl animate-scale-in">
          <div className="glass-card rounded-3xl p-10 border border-border text-center">
            <div className="text-6xl mb-4">{accuracy >= 80 ? '🎉' : accuracy >= 60 ? '👍' : '📚'}</div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Practice Complete!</h1>
            <p className="text-muted-foreground mb-8">
              {tenseNames[tId]} — Fill in the Blank
            </p>
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-muted rounded-2xl p-4">
                <p className="text-2xl font-bold text-foreground">{correctCount}</p>
                <p className="text-xs text-muted-foreground">Correct</p>
              </div>
              <div className="bg-muted rounded-2xl p-4">
                <p className="text-2xl font-bold text-foreground">{results.length - correctCount}</p>
                <p className="text-xs text-muted-foreground">Incorrect</p>
              </div>
              <div className={`rounded-2xl p-4 ${accuracy >= 80 ? 'bg-secondary/10' : 'bg-secondary/10'}`}>
                <p className={`text-2xl font-bold ${accuracy >= 80 ? 'text-secondary dark:text-secondary' : 'text-secondary dark:text-secondary'}`}>
                  {accuracy}%
                </p>
                <p className="text-xs text-muted-foreground">Accuracy</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                id="continue-to-advanced-btn"
                href={`/tense/present/${tId}/advanced`}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Continue to Advanced MCQ <ChevronRight size={16} />
              </Link>
              <Link
                href={`/tense/present/${tId}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
              >
                Back to tense overview
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!question) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">No questions available.</p>
      </main>
    );
  }

  const progressPercent = Math.round((currentIdx / questions.length) * 100);

  return (
    <main className="min-h-screen hero-gradient px-4 py-16">
      <ThemeToggle />
      <div className="w-full max-w-2xl mx-auto animate-fade-in-up">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
          <Link href="/tense/present" className="hover:text-foreground transition-colors">Present</Link>
          <ChevronRight size={14} />
          <Link href={`/tense/present/${tId}`} className="hover:text-foreground transition-colors">{tenseNames[tId]}</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">Practice</span>
        </div>

        {/* Stage progress */}
        <div className="mb-6">
          <StageProgressBar
            currentStage="practice"
            completedStages={tenseProgress?.stages ?? {}}
          />
        </div>

        {/* Mode toggle */}
        <div className="flex items-center gap-2 p-1 bg-muted rounded-xl mb-6 w-fit">
          {(['guided', 'challenge'] as const).map((m) => (
            <button
              key={m}
              id={`mode-${m}-btn`}
              onClick={() => {
                setMode(m);
                setSelectedAnswer('');
                setTypedAnswer('');
                setAnswerState('unanswered');
                setHintsShown(0);
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                mode === m
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {m === 'challenge' && <Keyboard size={14} />}
              {m === 'guided' ? '📋 Guided' : '⌨️ Challenge'}
            </button>
          ))}
        </div>

        {/* Question progress */}
        <div className="mb-6">
          <LinearProgress
            value={progressPercent}
            label={`Question ${currentIdx + 1} of ${questions.length}`}
          />
        </div>

        {/* Question card */}
        <div className="glass-card rounded-3xl p-7 border border-border mb-4 animate-scale-in">
          {/* Difficulty badge */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Fill in the Blank
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border capitalize">
              {question.level.replace('-', ' ')}
            </span>
          </div>

          {/* Topic */}
          <p className="text-xs text-primary font-medium mb-3 capitalize">
            🏷️ Topic: {question.topic}
          </p>

          {/* Question */}
          <p className="text-lg font-semibold text-foreground leading-relaxed mb-6">
            {question.question}
          </p>

          {/* Answer input */}
          {mode === 'guided' ? (
            <div className="grid grid-cols-2 gap-3 mb-4">
              {question.options?.map((opt) => {
                const isSelected = selectedAnswer === opt;
                const isCorrectOpt = opt === question.correctAnswer;
                let cls = 'border-border bg-card text-foreground hover:border-primary/40';
                if (answerState !== 'unanswered') {
                  if (isCorrectOpt) cls = 'border-secondary bg-secondary/10 text-secondary dark:text-secondary';
                  else if (isSelected && !isCorrectOpt) cls = 'border-primary bg-primary/10 text-primary dark:text-primary';
                  else cls = 'border-border bg-muted text-muted-foreground';
                } else if (isSelected) {
                  cls = 'border-primary bg-primary/10 text-primary';
                }

                return (
                  <button
                    id={`option-${opt}`}
                    key={opt}
                    onClick={() => {
                      if (answerState === 'unanswered') setSelectedAnswer(opt);
                    }}
                    disabled={answerState !== 'unanswered'}
                    className={`p-3.5 rounded-xl border-2 text-sm font-medium text-left transition-all duration-200 ${cls} ${
                      answerState === 'unanswered' ? 'hover:scale-[1.02] active:scale-[0.98] cursor-pointer' : 'cursor-default'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="mb-4">
              <input
                id="challenge-answer-input"
                type="text"
                value={typedAnswer}
                onChange={(e) => setTypedAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && answerState === 'unanswered') handleSubmit();
                }}
                disabled={answerState !== 'unanswered'}
                placeholder="Type your answer here..."
                className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 font-medium"
              />
            </div>
          )}

          {/* Hints */}
          {hintsShown > 0 && (
            <div className="space-y-2 mb-4 animate-fade-in">
              {hints.slice(0, hintsShown).map((hint, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 bg-secondary/5 border border-secondary/15 rounded-xl">
                  <Lightbulb size={15} className="text-secondary shrink-0 mt-0.5" />
                  <p className="text-sm text-secondary dark:text-secondary">
                    <strong>Hint {i + 1}:</strong> {hint}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {answerState === 'unanswered' && (
              <>
                <button
                  id="submit-answer-btn"
                  onClick={handleSubmit}
                  disabled={!selectedAnswer && !typedAnswer}
                  className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Check Answer
                </button>
                {hintsShown < hints.length && (
                  <button
                    id="hint-btn"
                    onClick={showHint}
                    className="flex items-center gap-1.5 px-4 py-3 bg-secondary/10 text-secondary dark:text-secondary border border-secondary/20 rounded-xl text-sm font-medium hover:bg-secondary/20 transition-all duration-200"
                  >
                    <Lightbulb size={14} />
                    Hint {hintsShown + 1}/{hints.length}
                  </button>
                )}
              </>
            )}
            {answerState !== 'unanswered' && (
              <button
                id="next-question-btn"
                onClick={handleNext}
                className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {currentIdx < questions.length - 1 ? 'Next Question' : 'See Results'}
                <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Feedback card */}
        {answerState !== 'unanswered' && (
          <div
            className={`glass-card rounded-3xl p-6 border mb-4 animate-scale-in ${
              answerState === 'correct'
                ? 'border-secondary/30 bg-secondary/5'
                : 'border-primary/30 bg-primary/5'
            }`}
          >
            <div className="flex items-start gap-3 mb-4">
              {answerState === 'correct' ? (
                <CheckCircle size={22} className="text-secondary shrink-0 mt-0.5" />
              ) : (
                <XCircle size={22} className="text-primary shrink-0 mt-0.5" />
              )}
              <div>
                <h3 className={`font-bold text-base ${answerState === 'correct' ? 'text-secondary dark:text-secondary' : 'text-primary dark:text-primary'}`}>
                  {answerState === 'correct' ? '✅ Correct!' : '❌ Incorrect'}
                </h3>
                {answerState === 'incorrect' && (
                  <p className="text-sm text-foreground mt-1">
                    <strong>Correct answer:</strong>{' '}
                    <span className="text-secondary dark:text-secondary font-semibold">{question.correctAnswer}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-primary/5 border border-primary/10 rounded-xl">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Explanation</p>
                <p className="text-sm text-foreground leading-relaxed">{question.explanation}</p>
              </div>
              <div className="p-3 bg-muted rounded-xl">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Grammar Rule</p>
                <code className="text-sm text-foreground font-mono">{question.grammarRule}</code>
              </div>
              {question.ieltsTip && (
                <button
                  id="ielts-tip-btn"
                  onClick={() => setShowIELTSTip(!showIELTSTip)}
                  className="w-full text-left p-3 bg-secondary/5 border border-secondary/15 rounded-xl"
                >
                  <p className="text-xs font-semibold text-secondary dark:text-secondary uppercase tracking-wider mb-1">
                    🎓 IELTS Tip {showIELTSTip ? '▲' : '▼'}
                  </p>
                  {showIELTSTip && (
                    <p className="text-sm text-secondary dark:text-secondary leading-relaxed">{question.ieltsTip}</p>
                  )}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
          <Link
            id="back-to-learn-btn"
            href={`/tense/present/${tId}/learn`}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" />
            Back to Lesson
          </Link>
          {answerState !== 'unanswered' && (
            <button
              id="skip-to-advanced-btn"
              onClick={() => {
                const correctCount = results.filter((r) => r.correct).length;
                const accuracy = Math.round((correctCount / questions.length) * 100);
                completeStage(tId, 'practice', correctCount, accuracy);
              }}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Link href={`/tense/present/${tId}/advanced`}>Skip to Advanced →</Link>
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
