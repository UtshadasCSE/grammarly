'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Globe, CheckCircle, XCircle } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar } from '@/components/ProgressIndicators';
import { useProgress } from '@/contexts/ProgressContext';
import { verbIELTSContextQuestions } from '@/data/parts-of-speech/verb';

export default function VerbIELTSPage() {
  const { getPartOfSpeechProgress, completePartOfSpeechStage, recordPartOfSpeechWeakArea } = useProgress();
  const questions = verbIELTSContextQuestions;
  const verbProgress = getPartOfSpeechProgress('verb');

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
      recordPartOfSpeechWeakArea('verb', question.weakAreaTag);
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
      completePartOfSpeechStage('verb', 'ielts', correctCount, accuracy);
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
            <p className="text-muted-foreground mb-8">Verb — IELTS Academic Context ({questions.length} Questions)</p>
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
                  setResults([]);
                  setIsFinished(false);
                }}
                className="px-6 py-3 rounded-2xl border border-border hover:bg-muted font-medium text-sm transition-colors"
              >
                ↻ Practice Again
              </button>
              <Link
                href="/parts-of-speech/verb/vocabulary"
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
          <Link href="/parts-of-speech/verb" className="hover:text-foreground transition-colors">Verb</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">IELTS Context</span>
        </div>

        {/* Stage progress */}
        <div className="mb-6">
          <StageProgressBar
            currentStage="ielts"
            completedStages={verbProgress?.stages ?? {}}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              Exercise {currentIdx + 1} of {questions.length}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground">
              {question.topic}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-primary font-semibold bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            <Globe size={13} />
            <span>IELTS Academic Task 2 Context</span>
          </div>
        </div>

        {/* Question Card */}
        <div className="glass-card rounded-3xl p-8 mb-6 border border-border">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Academic Passage Excerpt:
            </p>
            <div className="p-5 bg-card border border-border rounded-2xl mb-4">
              <p className="text-lg sm:text-xl font-bold text-foreground leading-relaxed">
                {question.question}
              </p>
            </div>
            {question.contextSnippet && (
              <p className="text-xs text-muted-foreground italic">
                Context: {question.contextSnippet}
              </p>
            )}
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
                  id={`ielts-opt-${idx}`}
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

          {/* Submit / Next */}
          <div className="flex justify-end">
            {!answered ? (
              <button
                id="ielts-submit-btn"
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-2xl text-sm hover:opacity-90 transition-opacity disabled:opacity-40 shadow-lg shadow-primary/20"
              >
                Submit Response
              </button>
            ) : (
              <button
                id="ielts-next-btn"
                onClick={handleNext}
                className="px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-2xl text-sm hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-secondary/20 animate-scale-in"
              >
                {currentIdx < questions.length - 1 ? 'Next Academic Challenge →' : 'Complete Stage 🎉'}
              </button>
            )}
          </div>

          {/* Explanations */}
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
                      <span className="text-secondary">Band 8.5+ Precision! Correct: "{question.correctAnswer}"</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={18} className="text-destructive" />
                      <span className="text-destructive">Correct Answer: "{question.correctAnswer}"</span>
                    </>
                  )}
                </div>
                <p className="text-xs text-foreground leading-relaxed">{question.explanation}</p>
              </div>

              {question.ieltsExplanation && (
                <div className="p-3.5 bg-card rounded-xl border border-border text-xs">
                  <p className="font-bold text-primary uppercase tracking-wider mb-1">
                    🎯 Academic Lexico-Grammar Note
                  </p>
                  <p className="text-foreground">{question.ieltsExplanation}</p>
                </div>
              )}

              {question.banglaExplanation && (
                <div className="p-3 bg-primary/5 rounded-xl border border-primary/10 text-xs">
                  <p className="text-foreground font-medium">
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
            href="/parts-of-speech/verb/errors"
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            ← Stage 4: Error Correction
          </Link>
          <Link
            href="/parts-of-speech/verb/vocabulary"
            className="text-primary hover:text-primary/80 font-medium flex items-center gap-1"
          >
            Stage 6: Vocabulary →
          </Link>
        </div>
      </div>
    </main>
  );
}
