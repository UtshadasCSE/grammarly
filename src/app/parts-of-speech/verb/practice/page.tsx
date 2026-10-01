'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Lightbulb, CheckCircle, XCircle, Keyboard, Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar, LinearProgress } from '@/components/ProgressIndicators';
import { useProgress } from '@/contexts/ProgressContext';
import { verbFillBlankQuestions } from '@/data/parts-of-speech/verb';

type AnswerState = 'unanswered' | 'correct' | 'incorrect';

interface QuestionResult {
  questionId: string;
  correct: boolean;
  selectedAnswer: string;
  hintsUsed: number;
}

export default function VerbPracticePage() {
  const { getPartOfSpeechProgress, completePartOfSpeechStage, recordPartOfSpeechWeakArea } = useProgress();
  const questions = verbFillBlankQuestions;
  const verbProgress = getPartOfSpeechProgress('verb');

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
      recordPartOfSpeechWeakArea('verb', question.weakAreaTag);
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

  const handleNext = useCallback(() => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelectedAnswer('');
      setTypedAnswer('');
      setAnswerState('unanswered');
      setHintsShown(0);
      setShowIELTSTip(false);
    } else {
      setIsFinished(true);
      const correctCount = results.filter((r) => r.correct).length + (answerState === 'correct' ? 1 : 0);
      const accuracy = Math.round((correctCount / questions.length) * 100);
      completePartOfSpeechStage('verb', 'practice', correctCount, accuracy);
    }
  }, [currentIdx, questions.length, results, answerState, completePartOfSpeechStage]);

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
              Verb — Fill in the Blank ({questions.length} Questions)
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
                  setTypedAnswer('');
                  setAnswerState('unanswered');
                  setHintsShown(0);
                  setResults([]);
                  setIsFinished(false);
                }}
                className="px-6 py-3 rounded-2xl border border-border hover:bg-muted font-medium text-sm transition-colors"
              >
                ↻ Practice Again
              </button>
              <Link
                href="/parts-of-speech/verb/advanced"
                className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
              >
                Continue to Advanced MCQ →
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
          <span className="text-foreground font-medium">Fill in the Blank</span>
        </div>

        {/* Stage progress */}
        <div className="mb-6">
          <StageProgressBar
            currentStage="practice"
            completedStages={verbProgress?.stages ?? {}}
          />
        </div>

        {/* Question Counter & Mode Selector */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              Question {currentIdx + 1} of {questions.length}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground">
              Level: {question.level}
            </span>
          </div>

          <div className="flex items-center gap-1 bg-muted p-1 rounded-xl">
            <button
              onClick={() => setMode('guided')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                mode === 'guided' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
              }`}
            >
              Guided Mode
            </button>
            <button
              onClick={() => setMode('challenge')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                mode === 'challenge' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground'
              }`}
            >
              <Keyboard size={12} className="inline mr-1" />
              Challenge
            </button>
          </div>
        </div>

        {/* Question Card */}
        <div className="glass-card rounded-3xl p-8 mb-6 border border-border">
          <div className="mb-6">
            <div className="flex items-center gap-2 text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wider">
              <span>Topic: {question.topic}</span>
              <span>•</span>
              <span>Skill: {question.targetSkill}</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-foreground leading-relaxed">
              {question.question}
            </p>
          </div>

          {/* Guided Mode Options */}
          {mode === 'guided' && question.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {question.options.map((opt, idx) => {
                const isSelected = selectedAnswer === opt;
                let btnClass = 'border-border hover:border-primary/40 bg-card';

                if (answerState !== 'unanswered') {
                  if (opt.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim()) {
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
                    id={`opt-btn-${idx}`}
                    onClick={() => answerState === 'unanswered' && setSelectedAnswer(opt)}
                    disabled={answerState !== 'unanswered'}
                    className={`p-4 rounded-2xl border text-left font-medium text-sm transition-all duration-200 flex items-center justify-between ${btnClass}`}
                  >
                    <span>
                      <span className="font-bold mr-2 text-muted-foreground">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      {opt}
                    </span>
                    {answerState !== 'unanswered' && opt.toLowerCase().trim() === question.correctAnswer.toLowerCase().trim() && (
                      <CheckCircle size={18} className="text-secondary shrink-0 ml-2" />
                    )}
                    {answerState !== 'unanswered' && isSelected && opt.toLowerCase().trim() !== question.correctAnswer.toLowerCase().trim() && (
                      <XCircle size={18} className="text-destructive shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {/* Challenge Mode Text Input */}
          {mode === 'challenge' && (
            <div className="mb-6">
              <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                Type the correct verb:
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={typedAnswer}
                  onChange={(e) => setTypedAnswer(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && answerState === 'unanswered') {
                      handleSubmit();
                    }
                  }}
                  disabled={answerState !== 'unanswered'}
                  placeholder="Type your answer here..."
                  className={`w-full p-4 rounded-2xl border bg-card text-foreground font-medium outline-none transition-colors ${
                    answerState === 'correct'
                      ? 'border-secondary bg-secondary/10'
                      : answerState === 'incorrect'
                      ? 'border-destructive bg-destructive/10'
                      : 'border-border focus:border-primary'
                  }`}
                />
              </div>
            </div>
          )}

          {/* Action Buttons: Submit / Next / Hints */}
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              {hints.length > 0 && answerState === 'unanswered' && (
                <button
                  id="show-hint-btn"
                  onClick={showHint}
                  disabled={hintsShown >= hints.length}
                  className="px-4 py-2 rounded-xl border border-border hover:bg-muted text-xs font-semibold text-muted-foreground flex items-center gap-1.5 transition-colors disabled:opacity-40"
                >
                  <Lightbulb size={14} className="text-amber-500" />
                  Hint ({hintsShown}/{hints.length})
                </button>
              )}
            </div>

            {answerState === 'unanswered' ? (
              <button
                id="submit-answer-btn"
                onClick={handleSubmit}
                disabled={mode === 'guided' ? !selectedAnswer : !typedAnswer.trim()}
                className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-2xl text-sm hover:opacity-90 transition-opacity disabled:opacity-40 shadow-lg shadow-primary/20"
              >
                Check Answer
              </button>
            ) : (
              <button
                id="next-question-btn"
                onClick={handleNext}
                className="px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-2xl text-sm hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-secondary/20 animate-scale-in"
              >
                {currentIdx < questions.length - 1 ? 'Next Challenge →' : 'View Results 🎉'}
              </button>
            )}
          </div>

          {/* Progressive Hints Display */}
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

          {/* Answer Feedback & Explanations */}
          {answerState !== 'unanswered' && (
            <div className="mt-6 space-y-4 pt-6 border-t border-border animate-fade-in">
              <div
                className={`p-4 rounded-2xl border ${
                  answerState === 'correct'
                    ? 'bg-secondary/10 border-secondary/20'
                    : 'bg-destructive/10 border-destructive/20'
                }`}
              >
                <div className="flex items-center gap-2 mb-2 font-bold text-sm">
                  {answerState === 'correct' ? (
                    <>
                      <CheckCircle size={18} className="text-secondary" />
                      <span className="text-secondary">Excellent! Correct answer: "{question.correctAnswer}"</span>
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
            href="/parts-of-speech/verb/learn"
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            ← Back to Learn
          </Link>
          <Link
            href="/parts-of-speech/verb/advanced"
            className="text-primary hover:text-primary/80 font-medium flex items-center gap-1"
          >
            Stage 3: Advanced MCQ →
          </Link>
        </div>
      </div>
    </main>
  );
}
