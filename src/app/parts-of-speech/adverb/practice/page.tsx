'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Lightbulb, CheckCircle, XCircle, Keyboard, Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar, LinearProgress } from '@/components/ProgressIndicators';
import { useProgress } from '@/contexts/ProgressContext';
import { adverbFillBlankQuestions } from '@/data/parts-of-speech/adverb';

type AnswerState = 'unanswered' | 'correct' | 'incorrect';

interface QuestionResult {
  questionId: string;
  correct: boolean;
  selectedAnswer: string;
  hintsUsed: number;
}

export default function AdverbPracticePage() {
  const { getPartOfSpeechProgress, completePartOfSpeechStage, recordPartOfSpeechWeakArea } = useProgress();
  const questions = adverbFillBlankQuestions;
  const adverbProgress = getPartOfSpeechProgress('adverb');

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
      recordPartOfSpeechWeakArea('adverb', question.weakAreaTag);
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
      completePartOfSpeechStage('adverb', 'practice', accuracy, 100);
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
                You tested all 20 adverb questions across guided and challenge levels.
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
                id="retry-adverb-practice-btn"
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
                id="continue-to-adverb-advanced-btn"
                href="/parts-of-speech/adverb/advanced"
                className="px-6 py-2.5 rounded-xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity text-sm font-semibold shadow-lg shadow-primary/20 flex items-center justify-center gap-1.5"
              >
                Stage 3: Advanced MCQ →
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
          <span className="text-foreground font-medium">Fill in the Blank</span>
        </div>

        {/* Stage Progress */}
        <div className="mb-8">
          <StageProgressBar
            currentStage="practice"
            completedStages={adverbProgress?.stages ?? {}}
          />
        </div>

        {/* Question Counter & Mode Selector */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20">
              Question {currentIdx + 1} of {questions.length}
            </span>
            <span className="text-xs text-muted-foreground">
              {currentAccuracy}% accuracy
            </span>
          </div>

          {/* Mode Switcher */}
          <div className="flex items-center gap-1 bg-muted/60 p-1 rounded-xl border border-border">
            <button
              id="adverb-mode-guided-btn"
              onClick={() => setMode('guided')}
              className={`text-xs px-3 py-1 rounded-lg font-medium transition-all ${
                mode === 'guided'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Guided MCQ
            </button>
            <button
              id="adverb-mode-challenge-btn"
              onClick={() => setMode('challenge')}
              className={`text-xs px-3 py-1 rounded-lg font-medium transition-all flex items-center gap-1 ${
                mode === 'challenge'
                  ? 'bg-background text-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Keyboard size={12} />
              Challenge Typing
            </button>
          </div>
        </div>

        {/* Question Card */}
        <div className="glass-card rounded-3xl p-8 border border-border space-y-6 mb-6">
          {/* Tags */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 capitalize">
              {question.level}
            </span>
            <span className="text-xs text-muted-foreground font-mono">
              {question.grammarRule}
            </span>
          </div>

          {/* Sentence / Question */}
          <div className="p-5 rounded-2xl bg-muted/40 border border-border/60">
            <p className="text-lg font-medium text-foreground leading-relaxed">
              {question.sentence ? (
                question.sentence.split('______').map((part, pIdx, arr) => (
                  <span key={pIdx}>
                    {part}
                    {pIdx < arr.length - 1 && (
                      <span className="inline-block mx-1 px-3 py-0.5 rounded-lg border-b-2 border-primary bg-primary/10 font-bold text-primary">
                        {answerState !== 'unanswered'
                          ? (mode === 'guided' ? selectedAnswer : typedAnswer) || '____'
                          : '______'}
                      </span>
                    )}
                  </span>
                ))
              ) : (
                question.question
              )}
            </p>
          </div>

          {/* Input Interface */}
          {mode === 'guided' ? (
            /* MCQ Options */
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {question.options?.map((opt, oIdx) => {
                const isSelected = selectedAnswer === opt;
                const isCorrect = opt.toLowerCase() === question.correctAnswer.toLowerCase();

                let style = 'bg-card border-border hover:border-primary/40 text-foreground';
                if (isSelected && answerState === 'unanswered') {
                  style = 'bg-primary/10 border-primary text-primary font-semibold';
                } else if (answerState !== 'unanswered') {
                  if (isCorrect) {
                    style = 'bg-secondary/15 border-secondary text-secondary font-bold';
                  } else if (isSelected && !isCorrect) {
                    style = 'bg-destructive/15 border-destructive text-destructive';
                  } else {
                    style = 'bg-card/40 border-border opacity-40';
                  }
                }

                return (
                  <button
                    key={oIdx}
                    id={`adverb-option-${oIdx}`}
                    disabled={answerState !== 'unanswered'}
                    onClick={() => setSelectedAnswer(opt)}
                    className={`p-4 rounded-2xl border text-sm text-left transition-all ${style}`}
                  >
                    <span className="font-mono text-xs text-muted-foreground mr-2">
                      {String.fromCharCode(65 + oIdx)}.
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          ) : (
            /* Typing input for challenge mode */
            <div className="space-y-3">
              <input
                id="adverb-typed-answer-input"
                type="text"
                disabled={answerState !== 'unanswered'}
                value={typedAnswer}
                onChange={(e) => setTypedAnswer(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && answerState === 'unanswered' && typedAnswer.trim()) {
                    handleSubmit();
                  }
                }}
                placeholder="Type the exact adverb or adverbial phrase..."
                className="w-full p-4 rounded-2xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              />
              <p className="text-xs text-muted-foreground">
                Press Enter or click Submit below when finished typing.
              </p>
            </div>
          )}

          {/* Progressive Hints */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between">
              <button
                id="show-adverb-hint-btn"
                disabled={hintsShown >= hints.length}
                onClick={handleShowNextHint}
                className="text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors disabled:opacity-40"
              >
                <Lightbulb size={13} />
                {hintsShown === 0
                  ? '💡 Need a hint? (Show Progressive Hint 1)'
                  : hintsShown < hints.length
                  ? `💡 Show Next Hint (${hintsShown + 1}/${hints.length})`
                  : '✓ All Hints Shown'}
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

          {/* Feedback section when answered */}
          {answerState !== 'unanswered' && (
            <div
              className={`p-5 rounded-2xl border space-y-3 animate-scale-in ${
                answerState === 'correct'
                  ? 'bg-secondary/10 border-secondary/30'
                  : 'bg-destructive/10 border-destructive/30'
              }`}
            >
              <div className="flex items-center gap-2">
                {answerState === 'correct' ? (
                  <CheckCircle size={18} className="text-secondary" />
                ) : (
                  <XCircle size={18} className="text-destructive" />
                )}
                <span
                  className={`text-sm font-bold ${
                    answerState === 'correct' ? 'text-secondary' : 'text-destructive'
                  }`}
                >
                  {answerState === 'correct' ? 'Excellent! Correct' : 'Not quite right'}
                </span>
                {answerState === 'incorrect' && (
                  <span className="text-xs text-muted-foreground ml-auto">
                    Correct: <strong className="text-foreground">{question.correctAnswer}</strong>
                  </span>
                )}
              </div>

              <p className="text-xs text-foreground leading-relaxed">{question.explanation}</p>

              {/* Dual Explanation System */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                {question.simpleExplanation && (
                  <div className="p-2.5 rounded-xl bg-card/60 border border-border">
                    <span className="font-semibold text-muted-foreground block mb-0.5">Quick Rule</span>
                    <span>{question.simpleExplanation}</span>
                  </div>
                )}
                {question.ieltsExplanation && (
                  <div className="p-2.5 rounded-xl bg-primary/10 border border-primary/20">
                    <span className="font-semibold text-primary block mb-0.5">IELTS Academic Insight</span>
                    <span>{question.ieltsExplanation}</span>
                  </div>
                )}
              </div>

              {question.banglaExplanation && (
                <div className="p-2.5 rounded-xl bg-secondary/10 border border-secondary/20 text-xs">
                  <span className="font-semibold text-secondary block mb-0.5">🇧🇩 বাংলা ব্যাখ্যা</span>
                  <span>{question.banglaExplanation}</span>
                </div>
              )}
            </div>
          )}

          {/* Submit / Next Buttons */}
          <div className="pt-2">
            {answerState === 'unanswered' ? (
              <button
                id="submit-adverb-practice-btn"
                disabled={mode === 'guided' ? !selectedAnswer : !typedAnswer.trim()}
                onClick={handleSubmit}
                className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-40 shadow-lg shadow-primary/20"
              >
                Submit Answer
              </button>
            ) : (
              <button
                id="next-adverb-practice-btn"
                onClick={handleNext}
                className="w-full py-3.5 rounded-2xl bg-secondary text-secondary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-secondary/20 flex items-center justify-center gap-1.5"
              >
                {currentIdx + 1 < questions.length ? (
                  <>Next Challenge ({currentIdx + 2}/{questions.length}) →</>
                ) : (
                  'Complete Stage 2 & View Results 🏆'
                )}
              </button>
            )}
          </div>
        </div>

        {/* Bottom Nav */}
        <div className="flex items-center justify-between text-sm">
          <Link
            href="/parts-of-speech/adverb/learn"
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <ChevronLeft size={16} /> Stage 1: Learn
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
