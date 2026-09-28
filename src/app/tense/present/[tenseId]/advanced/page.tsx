'use client';

import { use, useState, useCallback } from 'react';
import Link from 'next/link';
import { ChevronRight, Lightbulb, CheckCircle, XCircle } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar, LinearProgress } from '@/components/ProgressIndicators';
import { useProgress } from '@/contexts/ProgressContext';
import type { TenseId, Question } from '@/types';
import { presentSimpleMCQ } from '@/data/questions/presentSimple';
import { pastSimpleQuestions } from '@/data/questions/pastSimple';
import { pastContinuousQuestions } from '@/data/questions/pastContinuous';
import { pastPerfectQuestions } from '@/data/questions/pastPerfect';
import { pastPerfectContinuousQuestions } from '@/data/questions/pastPerfectContinuous';

// Advanced MCQ questions per tense
const mcqBank: Partial<Record<TenseId, Question[]>> = {
  // Present tenses
  simple: presentSimpleMCQ,
  continuous: presentSimpleMCQ.map((q) => ({ ...q, tense: 'continuous' as TenseId })), // reuse structure
  perfect: presentSimpleMCQ.map((q) => ({ ...q, tense: 'perfect' as TenseId })),
  'perfect-continuous': presentSimpleMCQ.map((q) => ({ ...q, tense: 'perfect-continuous' as TenseId })),
  // Past tenses — use real MCQ/multiple-choice questions
  'past-simple': pastSimpleQuestions.filter((q) => q.type === 'multiple-choice' || q.type === 'error-correction'),
  'past-continuous': pastContinuousQuestions.filter((q) => q.type === 'multiple-choice' || q.type === 'error-correction'),
  'past-perfect': pastPerfectQuestions.filter((q) => q.type === 'multiple-choice' || q.type === 'error-correction'),
  'past-perfect-continuous': pastPerfectContinuousQuestions.filter((q) => q.type === 'multiple-choice' || q.type === 'error-correction'),
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

export default function AdvancedPage({ params }: { params: Promise<{ tenseId: string }> }) {
  const { tenseId } = use(params);
  const { progress, completeStage } = useProgress();
  const tId = tenseId as TenseId;
  const questions = mcqBank[tId] ?? [];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answered, setAnswered] = useState(false);
  const [hintsShown, setHintsShown] = useState(0);
  const [results, setResults] = useState<{ correct: boolean }[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [showIELTSTip, setShowIELTSTip] = useState(false);

  const tenseProgress = progress.tenses[tId];
  const question = questions[currentIdx];
  const hints = question ? [question.hint1, question.hint2, question.hint3].filter(Boolean) : [];

  const handleSubmit = useCallback(() => {
    if (answered || !selectedAnswer) return;
    const isCorrect = selectedAnswer === question.correctAnswer;
    setAnswered(true);
    setResults((prev) => [...prev, { correct: isCorrect }]);
  }, [answered, selectedAnswer, question]);

  const handleNext = useCallback(() => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelectedAnswer('');
      setAnswered(false);
      setHintsShown(0);
      setShowIELTSTip(false);
    } else {
      setIsFinished(true);
      const correctCount = results.filter((r) => r.correct).length + (answered && selectedAnswer === question?.correctAnswer ? 1 : 0);
      const accuracy = Math.round((correctCount / questions.length) * 100);
      completeStage(tId, 'advanced', correctCount, accuracy);
    }
  }, [currentIdx, questions.length, results, answered, selectedAnswer, question, completeStage, tId]);

  if (isFinished) {
    const correctCount = results.filter((r) => r.correct).length;
    const accuracy = Math.round((correctCount / results.length) * 100);
    return (
      <main className="min-h-screen hero-gradient flex items-center justify-center px-4 py-16">
        <ThemeToggle />
        <div className="w-full max-w-xl animate-scale-in">
          <div className="glass-card rounded-3xl p-10 border border-border text-center">
            <div className="text-6xl mb-4">{accuracy >= 80 ? '🏆' : accuracy >= 60 ? '👍' : '📚'}</div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Advanced MCQ Complete!</h1>
            <p className="text-muted-foreground mb-8">{tenseNames[tId]}</p>
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
            <Link
              id="continue-to-errors-btn"
              href={`/tense/present/${tId}/errors`}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Continue to Error Correction <ChevronRight size={16} />
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
          <Link href="/tense/present" className="hover:text-foreground transition-colors">Present</Link>
          <ChevronRight size={14} />
          <Link href={`/tense/present/${tId}`} className="hover:text-foreground transition-colors">{tenseNames[tId]}</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">Advanced MCQ</span>
        </div>

        <div className="mb-6">
          <StageProgressBar currentStage="advanced" completedStages={tenseProgress?.stages ?? {}} />
        </div>

        <div className="mb-6">
          <LinearProgress value={progressPercent} label={`Question ${currentIdx + 1} of ${questions.length}`} />
        </div>

        <div className="glass-card rounded-3xl p-7 border border-border mb-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider bg-primary/10 px-2.5 py-1 rounded-full">
              Advanced Multiple Choice
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary dark:text-primary border border-primary/20 capitalize font-semibold">
              {question.difficulty} / 10
            </span>
          </div>

          <p className="text-xs text-primary font-medium mb-3 capitalize">🏷️ {question.topic}</p>
          <p className="text-base font-semibold text-foreground leading-relaxed mb-6">{question.question}</p>

          <div className="space-y-3 mb-4">
            {question.options?.map((opt, i) => {
              const label = ['A', 'B', 'C', 'D'][i];
              const isSelected = selectedAnswer === opt;
              const isCorrectOpt = opt === question.correctAnswer;
              let cls = 'border-border bg-card text-foreground hover:border-primary/40 hover:bg-primary/5';
              if (answered) {
                if (isCorrectOpt) cls = 'border-secondary bg-secondary/10 text-secondary dark:text-secondary';
                else if (isSelected && !isCorrectOpt) cls = 'border-primary bg-primary/10 text-primary dark:text-primary';
                else cls = 'border-border bg-muted text-muted-foreground';
              } else if (isSelected) {
                cls = 'border-primary bg-primary/10 text-primary';
              }
              return (
                <button
                  id={`mcq-option-${i}`}
                  key={opt}
                  onClick={() => { if (!answered) setSelectedAnswer(opt); }}
                  disabled={answered}
                  className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 ${cls} ${!answered ? 'cursor-pointer hover:scale-[1.01] active:scale-[0.99]' : 'cursor-default'}`}
                >
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-lg shrink-0 mt-0.5 ${
                    answered && isCorrectOpt ? 'bg-secondary text-white' :
                    answered && isSelected && !isCorrectOpt ? 'bg-primary text-white' :
                    isSelected ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {label}
                  </span>
                  <span className="text-sm">{opt}</span>
                </button>
              );
            })}
          </div>

          {hintsShown > 0 && (
            <div className="space-y-2 mb-4 animate-fade-in">
              {hints.slice(0, hintsShown).map((hint, i) => (
                <div key={i} className="flex items-start gap-2.5 p-3 bg-secondary/5 border border-secondary/15 rounded-xl">
                  <Lightbulb size={14} className="text-secondary shrink-0 mt-0.5" />
                  <p className="text-sm text-secondary dark:text-secondary"><strong>Hint {i + 1}:</strong> {hint}</p>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            {!answered && (
              <>
                <button
                  id="submit-mcq-btn"
                  onClick={handleSubmit}
                  disabled={!selectedAnswer}
                  className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Check Answer
                </button>
                {hintsShown < hints.length && (
                  <button
                    id="mcq-hint-btn"
                    onClick={() => setHintsShown((h) => h + 1)}
                    className="flex items-center gap-1.5 px-4 py-3 bg-secondary/10 text-secondary dark:text-secondary border border-secondary/20 rounded-xl text-sm font-medium hover:bg-secondary/20 transition-all"
                  >
                    <Lightbulb size={14} /> Hint
                  </button>
                )}
              </>
            )}
            {answered && (
              <button
                id="next-mcq-btn"
                onClick={handleNext}
                className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {currentIdx < questions.length - 1 ? 'Next Question' : 'See Results'} <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>

        {answered && (
          <div className={`glass-card rounded-3xl p-6 border animate-scale-in ${
            selectedAnswer === question.correctAnswer
              ? 'border-secondary/30 bg-secondary/5'
              : 'border-primary/30 bg-primary/5'
          }`}>
            <div className="flex items-start gap-3 mb-4">
              {selectedAnswer === question.correctAnswer ? (
                <CheckCircle size={20} className="text-secondary shrink-0 mt-0.5" />
              ) : (
                <XCircle size={20} className="text-primary shrink-0 mt-0.5" />
              )}
              <div>
                <h3 className={`font-bold ${selectedAnswer === question.correctAnswer ? 'text-secondary dark:text-secondary' : 'text-primary dark:text-primary'}`}>
                  {selectedAnswer === question.correctAnswer ? '✅ Excellent!' : '❌ Not quite'}
                </h3>
                {selectedAnswer !== question.correctAnswer && (
                  <p className="text-sm text-foreground mt-1">
                    <strong>Correct:</strong> <span className="text-secondary dark:text-secondary font-semibold">{question.correctAnswer}</span>
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-3">
              <div className="p-3 bg-primary/5 border border-primary/10 rounded-xl">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Explanation</p>
                <p className="text-sm text-foreground leading-relaxed">{question.explanation}</p>
              </div>
              {question.ieltsTip && (
                <button
                  id="mcq-ielts-tip-btn"
                  onClick={() => setShowIELTSTip(!showIELTSTip)}
                  className="w-full text-left p-3 bg-secondary/5 border border-secondary/15 rounded-xl"
                >
                  <p className="text-xs font-semibold text-secondary dark:text-secondary uppercase tracking-wider">
                    🎓 IELTS Tip {showIELTSTip ? '▲' : '▼'}
                  </p>
                  {showIELTSTip && (
                    <p className="text-sm text-secondary dark:text-secondary leading-relaxed mt-1">{question.ieltsTip}</p>
                  )}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
