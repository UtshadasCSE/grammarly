'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Globe, CheckCircle, XCircle } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar } from '@/components/ProgressIndicators';
import { useProgress } from '@/contexts/ProgressContext';
import { adverbIELTSContextQuestions } from '@/data/parts-of-speech/adverb';

export default function AdverbIELTSPage() {
  const { getPartOfSpeechProgress, completePartOfSpeechStage, recordPartOfSpeechWeakArea } = useProgress();
  const questions = adverbIELTSContextQuestions;
  const adverbProgress = getPartOfSpeechProgress('adverb');

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
      recordPartOfSpeechWeakArea('adverb', question.weakAreaTag);
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
      completePartOfSpeechStage('adverb', 'ielts', correctCount, accuracy);
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
            <p className="text-muted-foreground mb-8">Adverb — IELTS Academic Context ({questions.length} Questions)</p>
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
                id="retake-adv-ielts-btn"
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
                id="continue-to-adv-vocab-btn"
                href="/parts-of-speech/adverb/vocabulary"
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
          <Link href="/parts-of-speech/adverb" className="hover:text-foreground transition-colors">Adverb</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">IELTS Context</span>
        </div>

        {/* Stage progress */}
        <div className="mb-6">
          <StageProgressBar
            currentStage="ielts"
            completedStages={adverbProgress?.stages ?? {}}
          />
        </div>

        {/* Topic Banner */}
        <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              Task {currentIdx + 1} of {questions.length}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground capitalize">
              Level: {question.level}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-primary font-medium">
            <Globe size={13} />
            <span className="capitalize">{question.topic}</span>
          </div>
        </div>

        {/* IELTS Question Card */}
        <div className="glass-card rounded-3xl p-8 border border-border space-y-6 mb-6">
          <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
            <p className="text-xs font-bold uppercase tracking-wider text-primary mb-2">
              Academic Passage / Task Prompt:
            </p>
            <p className="text-base font-medium text-foreground leading-relaxed">
              {question.sentence || question.question}
            </p>
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
                  id={`adv-ielts-opt-${idx}`}
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

          {/* IELTS Explanation Panel */}
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
                      <CheckCircle size={16} /> Accurate IELTS Selection!
                    </>
                  ) : (
                    <>
                      <XCircle size={16} /> Needs Refinement
                    </>
                  )}
                </div>
                <p className="text-xs leading-relaxed text-foreground">
                  {question.explanation}
                </p>
              </div>

              {question.ieltsExplanation && (
                <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 text-xs">
                  <p className="font-semibold text-primary mb-1">🎯 Academic Band 8-9 Writing / Speaking Application:</p>
                  <p className="text-muted-foreground leading-relaxed">{question.ieltsExplanation}</p>
                </div>
              )}

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
                id="submit-adv-ielts-btn"
                disabled={!selectedAnswer}
                onClick={handleSubmit}
                className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-40 shadow-lg shadow-primary/20"
              >
                Check Answer
              </button>
            ) : (
              <button
                id="next-adv-ielts-btn"
                onClick={handleNext}
                className="w-full py-3.5 rounded-2xl bg-secondary text-secondary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-secondary/20"
              >
                {currentIdx < questions.length - 1 ? 'Next Academic Exercise →' : 'Complete IELTS Stage 🏆'}
              </button>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between text-sm">
          <Link
            href="/parts-of-speech/adverb/errors"
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <ChevronLeft size={16} /> Stage 4: Error Correction
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
