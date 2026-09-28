'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, Trophy, Star, RotateCcw } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar, LinearProgress } from '@/components/ProgressIndicators';
import { useProgress } from '@/contexts/ProgressContext';
import type { TenseId, Question } from '@/types';
import { presentSimpleQuestions } from '@/data/questions/presentSimple';
import { presentPerfectQuestions } from '@/data/questions/presentPerfect';
import { presentContinuousQuestions, presentPerfectContinuousQuestions } from '@/data/questions/presentContinuousAndPPC';
import { futureSimpleQuestions } from '@/data/questions/futureSimple';
import { futureContinuousQuestions } from '@/data/questions/futureContinuous';
import { futurePerfectQuestions } from '@/data/questions/futurePerfect';
import { futurePerfectContinuousQuestions } from '@/data/questions/futurePerfectContinuous';

const tenseNames: Partial<Record<TenseId, string>> = {
  simple: 'Present Simple',
  continuous: 'Present Continuous',
  perfect: 'Present Perfect',
  'perfect-continuous': 'Present Perfect Continuous',
  'future-simple': 'Future Simple',
  'future-continuous': 'Future Continuous',
  'future-perfect': 'Future Perfect',
  'future-perfect-continuous': 'Future Perfect Continuous',
};

const nextTense: Partial<Record<TenseId, TenseId | null>> = {
  simple: 'continuous',
  continuous: 'perfect',
  perfect: 'perfect-continuous',
  'perfect-continuous': null,
  'future-simple': 'future-continuous',
  'future-continuous': 'future-perfect',
  'future-perfect': 'future-perfect-continuous',
  'future-perfect-continuous': null,
};

const nextTenseNames: Partial<Record<TenseId, string>> = {
  simple: 'Present Continuous',
  continuous: 'Present Perfect',
  perfect: 'Present Perfect Continuous',
  'perfect-continuous': '',
  'future-simple': 'Future Continuous',
  'future-continuous': 'Future Perfect',
  'future-perfect': 'Future Perfect Continuous',
  'future-perfect-continuous': '',
};

type TestQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  type: string;
};

function getTestQuestions(tId: TenseId): TestQuestion[] {
  const allQuestions = {
    simple: presentSimpleQuestions,
    continuous: presentContinuousQuestions,
    perfect: presentPerfectQuestions,
    'perfect-continuous': presentPerfectContinuousQuestions,
    'future-simple': futureSimpleQuestions,
    'future-continuous': futureContinuousQuestions,
    'future-perfect': futurePerfectQuestions,
    'future-perfect-continuous': futurePerfectContinuousQuestions,
  };

  const qs: Question[] = (allQuestions as Record<string, Question[]>)[tId] ?? [];
  // Take first 10 fill-blank + mix of others
  const fillBlanks = qs.filter((q) => q.type === 'fill-blank').slice(0, 5);

  // Combine and take 10 total
  return [...fillBlanks].slice(0, 10).map((q) => ({
    id: q.id,
    question: q.question,
    options: q.options ?? [],
    correctAnswer: q.correctAnswer,
    explanation: q.explanation,
    type: q.type,
  }));
}

export default function TestPage({ params }: { params: Promise<{ tenseId: string }> }) {
  const { tenseId } = use(params);
  const { progress, completeStage, resetTense } = useProgress();
  const tId = tenseId as TenseId;
  const tenseProgress = progress.tenses[tId];

  const [testStarted, setTestStarted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState<{ correct: boolean; question: string; correct_answer: string }[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const testQuestions = getTestQuestions(tId);
  const question = testQuestions[currentIdx];

  const handleSubmit = () => {
    if (answered || !selectedAnswer) return;
    const isCorrect = selectedAnswer === question.correctAnswer;
    setAnswered(true);
    setResults((prev) => [...prev, {
      correct: isCorrect,
      question: question.question,
      correct_answer: question.correctAnswer,
    }]);
  };

  const handleNext = () => {
    if (currentIdx < testQuestions.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelectedAnswer('');
      setAnswered(false);
    } else {
      setIsFinished(true);
      const correctCount = results.filter((r) => r.correct).length;
      const accuracy = Math.round((correctCount / results.length) * 100);
      completeStage(tId, 'test', correctCount, accuracy);
    }
  };

  // Calculate overall stats
  const overallProgress = tenseProgress?.overallProgress ?? 0;
  const allStagesCompleted = Object.values(tenseProgress?.stages ?? {}).filter((s) => s.completed).length;

  if (isFinished) {
    const correctCount = results.filter((r) => r.correct).length;
    const accuracy = Math.round((correctCount / results.length) * 100);
    const next = nextTense[tId];

    return (
      <main className="min-h-screen hero-gradient flex items-center justify-center px-4 py-16">
        <ThemeToggle />
        <div className="w-full max-w-xl animate-scale-in">
          <div className="glass-card rounded-3xl p-10 border border-border text-center">
            {/* Trophy animation */}
            <div className="text-7xl mb-4 animate-bounce">🏆</div>
            <div className="flex items-center justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={20}
                  className={i < Math.ceil(accuracy / 20) ? 'fill-amber-400 text-secondary' : 'text-muted-foreground'}
                />
              ))}
            </div>

            <h1 className="text-3xl font-bold text-foreground mb-1">{tenseNames[tId]} Mastered!</h1>
            <p className="text-muted-foreground mb-8">Final Challenge Complete</p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-muted rounded-2xl p-4">
                <p className="text-2xl font-bold text-foreground">{correctCount}</p>
                <p className="text-xs text-muted-foreground">Correct</p>
              </div>
              <div className={`rounded-2xl p-4 ${accuracy >= 80 ? 'bg-secondary/10' : 'bg-secondary/10'}`}>
                <p className={`text-2xl font-bold ${accuracy >= 80 ? 'text-secondary dark:text-secondary' : 'text-secondary dark:text-secondary'}`}>
                  {accuracy}%
                </p>
                <p className="text-xs text-muted-foreground">Accuracy</p>
              </div>
              <div className="bg-primary/10 rounded-2xl p-4">
                <p className="text-2xl font-bold text-primary">{allStagesCompleted}</p>
                <p className="text-xs text-muted-foreground">Stages Done</p>
              </div>
            </div>

            {/* Progress overview */}
            <div className="mb-8 p-4 bg-muted rounded-2xl text-left">
              <LinearProgress value={100} label="Course Complete" />
              <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-secondary">✓</span>
                  <span className="text-foreground">Grammar Lesson</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-secondary">✓</span>
                  <span className="text-foreground">Fill-in-Blank</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-secondary">✓</span>
                  <span className="text-foreground">Advanced MCQ</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-secondary">✓</span>
                  <span className="text-foreground">Error Correction</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-secondary">✓</span>
                  <span className="text-foreground">IELTS Context</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-secondary">✓</span>
                  <span className="text-foreground">Vocabulary</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-secondary">✓</span>
                  <span className="text-foreground">Speaking</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-secondary">✓</span>
                  <span className="text-foreground">Writing</span>
                </div>
              </div>
            </div>

            {/* Next actions */}
            <div className="space-y-3">
              {next && (
                <Link
                  id="continue-next-tense-btn"
                  href={`/tense/future/${next}`}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground rounded-xl font-bold hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg"
                >
                  Continue to {nextTenseNames[tId]}
                  <ChevronRight size={16} />
                </Link>
              )}
              {!next && (
                <Link
                  id="go-to-challenge-btn"
                  href="/tense/future/challenge"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-secondary text-white rounded-xl font-bold hover:bg-secondary hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg"
                >
                  🏆 Mixed Present Tense Challenge
                  <ChevronRight size={16} />
                </Link>
              )}
              <div className="flex gap-3">
                <button
                  id="reset-tense-btn"
                  onClick={() => resetTense(tId)}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-xl hover:bg-muted"
                >
                  <RotateCcw size={14} /> Retake
                </button>
                <Link
                  href="/tense/future"
                  className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors border border-border rounded-xl hover:bg-muted"
                >
                  All Tenses
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!testStarted) {
    return (
      <main className="min-h-screen hero-gradient flex items-center justify-center px-4 py-16">
        <ThemeToggle />
        <div className="w-full max-w-xl animate-scale-in">
          <div className="glass-card rounded-3xl p-10 border border-border text-center">
            <Trophy size={48} className="text-secondary mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-foreground mb-2">Final Test</h1>
            <p className="text-lg text-muted-foreground mb-2">{tenseNames[tId]}</p>
            <p className="text-sm text-muted-foreground mb-8">
              {testQuestions.length} questions covering everything you&apos;ve learned.
            </p>
            <div className="mb-8 p-4 bg-muted rounded-2xl text-left">
              <h3 className="font-semibold text-foreground mb-3">What to expect:</h3>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2"><span className="text-primary">→</span> Fill-in-the-Blank questions</div>
                <div className="flex items-center gap-2"><span className="text-primary">→</span> Mixed difficulty levels</div>
                <div className="flex items-center gap-2"><span className="text-primary">→</span> Immediate feedback on each answer</div>
                <div className="flex items-center gap-2"><span className="text-primary">→</span> Completion certificate on finish</div>
              </div>
            </div>
            <button
              id="start-final-test-btn"
              onClick={() => setTestStarted(true)}
              className="w-full py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg"
            >
              Start Final Test
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (!question) return null;

  const progressPercent = Math.round((currentIdx / testQuestions.length) * 100);

  return (
    <main className="min-h-screen hero-gradient px-4 py-16">
      <ThemeToggle />
      <div className="w-full max-w-2xl mx-auto animate-fade-in-up">

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
          <Link href="/tense/future" className="hover:text-foreground transition-colors">Future</Link>
          <ChevronRight size={14} />
          <Link href={`/tense/future/${tId}`} className="hover:text-foreground transition-colors">{tenseNames[tId]}</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">Final Test</span>
        </div>

        <div className="mb-6">
          <StageProgressBar currentStage="test" completedStages={tenseProgress?.stages ?? {}} />
        </div>

        <div className="mb-6">
          <LinearProgress
            value={progressPercent}
            label={`Question ${currentIdx + 1} of ${testQuestions.length}`}
          />
        </div>

        <div className="glass-card rounded-3xl p-7 border border-border mb-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-secondary dark:text-secondary bg-secondary/10 border border-secondary/20 px-3 py-1 rounded-full flex items-center gap-1">
              <Trophy size={12} /> Final Test
            </span>
            <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full border border-border capitalize">
              {question.type.replace('-', ' ')}
            </span>
          </div>

          <p className="text-lg font-semibold text-foreground leading-relaxed mb-6">{question.question}</p>

          {question.options.length > 0 && (
            <div className="grid grid-cols-2 gap-3 mb-4">
              {question.options.map((opt, i) => {
                const isSelected = selectedAnswer === opt;
                const isCorrectOpt = opt === question.correctAnswer;
                let cls = 'border-border bg-card text-foreground hover:border-secondary/40';
                if (answered) {
                  if (isCorrectOpt) cls = 'border-secondary bg-secondary/10 text-secondary dark:text-secondary';
                  else if (isSelected) cls = 'border-primary bg-primary/10 text-primary dark:text-primary';
                  else cls = 'border-border bg-muted text-muted-foreground';
                } else if (isSelected) {
                  cls = 'border-secondary bg-secondary/10 text-secondary dark:text-secondary';
                }
                return (
                  <button
                    id={`test-option-${i}`}
                    key={opt}
                    onClick={() => { if (!answered) setSelectedAnswer(opt); }}
                    disabled={answered}
                    className={`p-3.5 rounded-xl border-2 text-sm font-medium text-left transition-all duration-200 ${cls} ${!answered ? 'hover:scale-[1.02] cursor-pointer active:scale-[0.98]' : 'cursor-default'}`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          )}

          <div className="flex gap-3">
            {!answered ? (
              <button
                id="submit-test-btn"
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className="flex-1 py-3 bg-secondary text-white rounded-xl font-semibold disabled:opacity-50 hover:bg-secondary transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Submit Answer
              </button>
            ) : (
              <button
                id="next-test-btn"
                onClick={handleNext}
                className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {currentIdx < testQuestions.length - 1 ? 'Next' : 'See Final Results'} <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>

        {answered && (
          <div className={`glass-card rounded-3xl p-5 border animate-scale-in ${
            selectedAnswer === question.correctAnswer ? 'border-secondary/30 bg-secondary/5' : 'border-primary/30 bg-primary/5'
          }`}>
            <h3 className={`font-bold mb-2 ${selectedAnswer === question.correctAnswer ? 'text-secondary dark:text-secondary' : 'text-primary dark:text-primary'}`}>
              {selectedAnswer === question.correctAnswer ? '✅ Correct!' : `❌ Correct: ${question.correctAnswer}`}
            </h3>
            <p className="text-sm text-foreground leading-relaxed">{question.explanation}</p>
          </div>
        )}
      </div>
    </main>
  );
}
