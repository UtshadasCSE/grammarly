'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Globe, CheckCircle, XCircle } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar } from '@/components/ProgressIndicators';
import { useProgress } from '@/contexts/ProgressContext';
import { adjectiveIELTSContextQuestions } from '@/data/parts-of-speech/adjective';

export default function AdjectiveIELTSPage() {
  const { getPartOfSpeechProgress, completePartOfSpeechStage, recordPartOfSpeechWeakArea } = useProgress();
  const questions = adjectiveIELTSContextQuestions;
  const adjectiveProgress = getPartOfSpeechProgress('adjective');

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState<{ correct: boolean }[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const question = questions[currentIdx];

  const handleSubmit = () => {
    if (answered || !selectedAnswer) return;
    const isCorrect = selectedAnswer === question.correctAnswer;
    setAnswered(true);

    if (!isCorrect && question.weakAreaTag) {
      recordPartOfSpeechWeakArea('adjective', question.weakAreaTag);
    }

    setResults((prev) => [...prev, { correct: isCorrect }]);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelectedAnswer('');
      setAnswered(false);
    } else {
      setIsFinished(true);
      const correctCount = results.filter((r) => r.correct).length + (selectedAnswer === question?.correctAnswer ? 1 : 0);
      const accuracy = Math.round((correctCount / questions.length) * 100);
      completePartOfSpeechStage('adjective', 'ielts', correctCount, accuracy);
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
            <div className="text-6xl mb-4">🎓</div>
            <h1 className="text-3xl font-bold text-foreground mb-2">IELTS Context Complete!</h1>
            <p className="text-muted-foreground mb-8">Adjective — IELTS Academic Context ({questions.length} Questions)</p>
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
                id="retake-adj-ielts-btn"
                onClick={() => {
                  setCurrentIdx(0);
                  setSelectedAnswer('');
                  setAnswered(false);
                  setResults([]);
                  setIsFinished(false);
                }}
                className="px-6 py-3 rounded-2xl border border-border hover:bg-muted font-medium text-sm transition-colors"
              >
                ↻ Retake Context Test
              </button>
              <Link
                id="continue-to-adj-vocab-btn"
                href="/parts-of-speech/adjective/vocabulary"
                className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
              >
                Continue to Vocabulary →
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
          <span className="text-foreground font-medium">IELTS Context</span>
        </div>

        {/* Stage progress */}
        <div className="mb-6">
          <StageProgressBar
            currentStage="ielts"
            completedStages={adjectiveProgress?.stages ?? {}}
          />
        </div>

        {/* Topic Banner */}
        <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Task {currentIdx + 1} of {questions.length}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground">
              Level: {question.level}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
            <Globe size={13} />
            <span>{question.topic}</span>
          </div>
        </div>

        {/* Question Card */}
        <div className="glass-card rounded-3xl p-7 border border-border space-y-6 mb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              IELTS Academic Context & Adjective Collocation
            </span>
            <div className="p-4 rounded-2xl bg-muted/40 border border-border/50 mt-3 text-sm leading-relaxed text-foreground font-serif">
              "{question.question}"
            </div>
          </div>

          {/* Options */}
          <div className="space-y-3">
            {question.options?.map((option, idx) => {
              const isSelected = selectedAnswer === option;
              const isCorrect = option === question.correctAnswer;
              let optionClass = 'border-border hover:border-primary/50 bg-card text-foreground';

              if (answered) {
                if (isCorrect) {
                  optionClass = 'border-secondary bg-secondary/15 text-secondary font-semibold';
                } else if (isSelected && !isCorrect) {
                  optionClass = 'border-destructive bg-destructive/15 text-destructive';
                } else {
                  optionClass = 'border-border opacity-40 text-muted-foreground';
                }
              } else if (isSelected) {
                optionClass = 'border-primary bg-primary/10 text-primary font-semibold ring-2 ring-primary/20';
              }

              return (
                <button
                  key={idx}
                  id={`adj-ielts-opt-${idx}`}
                  disabled={answered}
                  onClick={() => setSelectedAnswer(option)}
                  className={`w-full p-4 rounded-2xl border text-left text-sm transition-all duration-200 flex items-center justify-between gap-3 ${optionClass}`}
                >
                  <span>{option}</span>
                  {answered && isCorrect && <CheckCircle size={18} className="text-secondary shrink-0" />}
                  {answered && isSelected && !isCorrect && <XCircle size={18} className="text-destructive shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Action */}
          <div>
            {!answered ? (
              <button
                id="submit-adj-ielts-btn"
                disabled={!selectedAnswer}
                onClick={handleSubmit}
                className="w-full py-3.5 bg-primary text-primary-foreground font-semibold rounded-2xl hover:opacity-90 transition-opacity disabled:opacity-40 shadow-lg shadow-primary/20 text-sm"
              >
                Check Answer
              </button>
            ) : (
              <button
                id="next-adj-ielts-btn"
                onClick={handleNext}
                className="w-full py-3.5 bg-secondary text-secondary-foreground font-semibold rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-secondary/20 text-sm flex items-center justify-center gap-2"
              >
                <span>{currentIdx < questions.length - 1 ? 'Next IELTS Task' : 'View Results'}</span>
                <ChevronRight size={16} />
              </button>
            )}
          </div>

          {/* Explanations */}
          {answered && (
            <div className="p-5 rounded-2xl bg-card border border-border space-y-3 animate-fade-in-up">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                  selectedAnswer === question.correctAnswer
                    ? 'bg-secondary/15 text-secondary'
                    : 'bg-destructive/15 text-destructive'
                }`}>
                  {selectedAnswer === question.correctAnswer ? '✓ Correct' : '✗ Incorrect'}
                </span>
                <span className="text-xs font-semibold text-muted-foreground">
                  Rule: {question.grammarRule}
                </span>
              </div>

              <p className="text-xs text-foreground leading-relaxed">
                {question.explanation}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {question.simpleExplanation && (
                  <div className="p-3 bg-muted/50 rounded-xl border border-border/50 text-xs space-y-0.5">
                    <p className="font-bold text-muted-foreground uppercase text-[10px]">Quick Summary</p>
                    <p className="text-foreground">{question.simpleExplanation}</p>
                  </div>
                )}
                {question.ieltsExplanation && (
                  <div className="p-3 bg-primary/5 rounded-xl border border-primary/10 text-xs space-y-0.5">
                    <p className="font-bold text-primary uppercase text-[10px]">Band 8-9 Academic Context</p>
                    <p className="text-foreground">{question.ieltsExplanation}</p>
                  </div>
                )}
              </div>

              {question.banglaExplanation && (
                <div className="p-3 bg-secondary/5 rounded-xl border border-secondary/15 text-xs text-muted-foreground">
                  <span className="font-semibold text-secondary">🇧🇩 বাংলায়: </span>
                  {question.banglaExplanation}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between text-sm">
          <Link
            href="/parts-of-speech/adjective/errors"
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            ← Back to Error Correction
          </Link>
          <Link
            href="/parts-of-speech/adjective/vocabulary"
            className="text-primary hover:text-primary/80 font-medium flex items-center gap-1"
          >
            Stage 6: Vocabulary →
          </Link>
        </div>
      </div>
    </main>
  );
}
