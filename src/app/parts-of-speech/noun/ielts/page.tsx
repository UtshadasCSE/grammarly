'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Globe, CheckCircle, XCircle } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar } from '@/components/ProgressIndicators';
import { useProgress } from '@/contexts/ProgressContext';
import { nounIELTSContextQuestions } from '@/data/parts-of-speech/noun';

export default function NounIELTSPage() {
  const { getPartOfSpeechProgress, completePartOfSpeechStage, recordPartOfSpeechWeakArea } = useProgress();
  const questions = nounIELTSContextQuestions;
  const nounProgress = getPartOfSpeechProgress('noun');

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
      recordPartOfSpeechWeakArea('noun', question.weakAreaTag);
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
      completePartOfSpeechStage('noun', 'ielts', correctCount, accuracy);
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
            <p className="text-muted-foreground mb-8">Noun — IELTS Academic Context ({questions.length} Questions)</p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-muted rounded-2xl p-4">
                <p className="text-2xl font-bold">{correctCount}/{results.length}</p>
                <p className="text-xs text-muted-foreground">Correct</p>
              </div>
              <div className="bg-secondary/10 rounded-2xl p-4">
                <p className="text-2xl font-bold text-secondary dark:text-secondary">
                  {accuracy}%
                </p>
                <p className="text-xs text-muted-foreground">Accuracy</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                id="continue-to-noun-vocab-btn"
                href="/parts-of-speech/noun/vocabulary"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Continue to Vocabulary <ChevronRight size={16} />
              </Link>
              <Link
                href="/parts-of-speech/noun"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors text-center"
              >
                Back to Noun Overview
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (!question) return null;

  return (
    <main className="min-h-screen hero-gradient px-4 py-16">
      <ThemeToggle />
      <div className="w-full max-w-2xl mx-auto animate-fade-in-up">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
          <Link href="/parts-of-speech" className="hover:text-foreground transition-colors">Parts of Speech</Link>
          <ChevronRight size={14} />
          <Link href="/parts-of-speech/noun" className="hover:text-foreground transition-colors">Noun</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">IELTS Context</span>
        </div>

        <div className="mb-6">
          <StageProgressBar currentStage="ielts" completedStages={nounProgress?.stages ?? {}} />
        </div>

        {/* IELTS badge */}
        <div className="flex items-center justify-between gap-2 mb-5">
          <span className="text-xs font-bold text-secondary dark:text-secondary bg-secondary/10 border border-secondary/20 px-3 py-1.5 rounded-full flex items-center gap-1.5">
            <Globe size={13} /> IELTS-Style Practice — Authentic Academic Topics
          </span>
          <span className="text-xs text-muted-foreground font-mono">{currentIdx + 1}/{questions.length}</span>
        </div>

        <div className="glass-card rounded-3xl p-7 border border-secondary/20 mb-4">
          {/* Context Snippet */}
          {question.contextSnippet && (
            <div className="mb-4 p-3.5 bg-secondary/5 border border-secondary/15 rounded-xl">
              <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">📄 Context</p>
              <p className="text-xs text-foreground font-medium">{question.contextSnippet}</p>
            </div>
          )}

          {/* Topic */}
          <p className="text-xs font-medium text-primary mb-3">🏷️ {question.topic}</p>

          {/* Question */}
          <p className="text-base font-semibold text-foreground leading-relaxed mb-6">{question.question}</p>

          {/* Options */}
          <div className="space-y-3 mb-4">
            {question.options?.map((opt, i) => {
              const label = ['A', 'B', 'C', 'D'][i];
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
                  id={`noun-ielts-opt-${i}`}
                  key={opt}
                  onClick={() => { if (!answered) setSelectedAnswer(opt); }}
                  disabled={answered}
                  className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 ${cls} ${!answered ? 'cursor-pointer hover:scale-[1.01]' : 'cursor-default'}`}
                >
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-lg shrink-0 mt-0.5 ${
                    answered && isCorrectOpt ? 'bg-secondary text-white' :
                    answered && isSelected ? 'bg-primary text-white' :
                    isSelected ? 'bg-secondary text-white' : 'bg-muted text-muted-foreground'
                  }`}>{label}</span>
                  <span className="text-sm font-medium">{opt}</span>
                </button>
              );
            })}
          </div>

          <div className="flex gap-3">
            {!answered ? (
              <button
                id="submit-noun-ielts-btn"
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className="flex-1 py-3 bg-secondary text-white rounded-xl font-semibold disabled:opacity-50 hover:bg-secondary/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Check Answer
              </button>
            ) : (
              <button
                id="next-noun-ielts-btn"
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
            selectedAnswer === question.correctAnswer ? 'border-secondary/30 bg-secondary/5' : 'border-primary/30 bg-primary/5'
          }`}>
            <div className="flex items-start gap-3 mb-3">
              {selectedAnswer === question.correctAnswer ? (
                <CheckCircle size={20} className="text-secondary shrink-0 mt-0.5" />
              ) : (
                <XCircle size={20} className="text-primary shrink-0 mt-0.5" />
              )}
              <h3 className={`font-bold ${selectedAnswer === question.correctAnswer ? 'text-secondary dark:text-secondary' : 'text-primary dark:text-primary'}`}>
                {selectedAnswer === question.correctAnswer ? '✅ Excellent!' : `❌ Correct Answer: ${question.correctAnswer}`}
              </h3>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-primary/5 border border-primary/10 rounded-xl">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Explanation</p>
                <p className="text-sm text-foreground leading-relaxed">{question.explanation}</p>
              </div>

              {question.ieltsTip && (
                <div className="p-3 bg-secondary/5 border border-secondary/15 rounded-xl">
                  <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1">🎓 IELTS Tip</p>
                  <p className="text-sm text-secondary leading-relaxed">{question.ieltsTip}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
          <Link href="/parts-of-speech/noun/errors" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group">
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> Back to Error Correction
          </Link>
        </div>
      </div>
    </main>
  );
}
