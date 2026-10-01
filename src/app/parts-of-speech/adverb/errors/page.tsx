'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Lightbulb, CheckCircle, XCircle, Send, AlertTriangle } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar, LinearProgress } from '@/components/ProgressIndicators';
import { useProgress } from '@/contexts/ProgressContext';
import { adverbErrorCorrectionQuestions } from '@/data/parts-of-speech/adverb';

export default function AdverbErrorsPage() {
  const { getPartOfSpeechProgress, completePartOfSpeechStage, recordPartOfSpeechWeakArea } = useProgress();
  const questions = adverbErrorCorrectionQuestions;
  const adverbProgress = getPartOfSpeechProgress('adverb');

  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [answered, setAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hintsShown, setHintsShown] = useState(0);
  const [results, setResults] = useState<{ correct: boolean }[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const question = questions[currentIdx];
  const hints = question ? [question.hint1, question.hint2, question.hint3].filter(Boolean) : [];

  const handleSubmit = useCallback(() => {
    if (answered) return;
    const cleanUser = userAnswer.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
    const cleanCorrect = question.correctAnswer.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '');
    const exactMatch = cleanUser === cleanCorrect || (question.correctForm ? cleanUser.includes(question.correctForm.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')) : false);

    setIsCorrect(exactMatch);
    setAnswered(true);

    if (!exactMatch && question.weakAreaTag) {
      recordPartOfSpeechWeakArea('adverb', question.weakAreaTag);
    }

    setResults((prev) => [...prev, { correct: exactMatch }]);
  }, [answered, userAnswer, question, recordPartOfSpeechWeakArea]);

  const handleNext = useCallback(() => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1);
      setUserAnswer('');
      setAnswered(false);
      setIsCorrect(false);
      setHintsShown(0);
    } else {
      setIsFinished(true);
      const correctCount = results.filter((r) => r.correct).length + (isCorrect ? 1 : 0);
      const accuracy = Math.round((correctCount / questions.length) * 100);
      completePartOfSpeechStage('adverb', 'errors', correctCount, accuracy);
    }
  }, [currentIdx, questions.length, results, isCorrect, completePartOfSpeechStage]);

  if (isFinished) {
    const correctCount = results.filter((r) => r.correct).length;
    const accuracy = Math.round((correctCount / results.length) * 100);

    return (
      <main className="min-h-screen hero-gradient flex items-center justify-center px-4 py-16">
        <ThemeToggle />
        <div className="w-full max-w-xl animate-scale-in">
          <div className="glass-card rounded-3xl p-10 border border-border text-center">
            <div className="text-6xl mb-4">{accuracy >= 80 ? '🎯' : accuracy >= 60 ? '👍' : '📚'}</div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Error Correction Complete!</h1>
            <p className="text-muted-foreground mb-8">
              Adverb — Diagnostic Grammar Error Analysis ({questions.length} Challenges)
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
                id="retake-adv-errors-btn"
                onClick={() => {
                  setCurrentIdx(0);
                  setUserAnswer('');
                  setAnswered(false);
                  setIsCorrect(false);
                  setHintsShown(0);
                  setResults([]);
                  setIsFinished(false);
                }}
                className="px-6 py-3 rounded-2xl border border-border hover:bg-muted font-medium text-sm transition-colors"
              >
                ↻ Retake Challenges
              </button>
              <Link
                id="continue-to-adv-ielts-btn"
                href="/parts-of-speech/adverb/ielts"
                className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
              >
                Continue to IELTS Context →
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
          <span className="text-foreground font-medium">Error Correction</span>
        </div>

        {/* Stage progress */}
        <div className="mb-6">
          <StageProgressBar
            currentStage="errors"
            completedStages={adverbProgress?.stages ?? {}}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              Challenge {currentIdx + 1} of {questions.length}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground capitalize">
              Level: {question.level}
            </span>
          </div>
          {question.topic && (
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 capitalize">
              Topic: {question.topic}
            </span>
          )}
        </div>

        {/* Diagnostic Error card */}
        <div className="glass-card rounded-3xl p-8 border border-border space-y-6 mb-6">
          {/* Incorrect sentence display */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-destructive">
              <AlertTriangle size={14} />
              <span>Sentence Containing Adverb / Grammar Error:</span>
            </div>
            <div className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-foreground font-medium text-base">
              ❌ &ldquo;{question.wrongSentence || question.question}&rdquo;
            </div>
          </div>

          {/* User Input for corrected sentence or form */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-muted-foreground block">
              Type the fully corrected sentence (or the corrected adverb form):
            </label>
            <div className="flex gap-2">
              <input
                id="adv-error-input"
                type="text"
                disabled={answered}
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !answered && userAnswer.trim() && handleSubmit()}
                placeholder="e.g. She drives very carefully on the highway."
                className="flex-1 p-4 rounded-2xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors"
              />
              {!answered && (
                <button
                  id="adv-submit-error-btn"
                  disabled={!userAnswer.trim()}
                  onClick={handleSubmit}
                  className="px-5 rounded-2xl bg-primary text-primary-foreground font-semibold hover:opacity-90 transition-opacity disabled:opacity-40 shrink-0"
                >
                  <Send size={18} />
                </button>
              )}
            </div>
          </div>

          {/* Progressive Hints */}
          {hints.length > 0 && !answered && (
            <div className="space-y-2 pt-2 border-t border-border/40">
              <div className="flex items-center justify-between">
                <button
                  id="adv-error-hint-btn"
                  onClick={() => setHintsShown((h) => Math.min(h + 1, hints.length))}
                  disabled={hintsShown >= hints.length}
                  className="text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors disabled:opacity-40"
                >
                  <Lightbulb size={13} />
                  {hintsShown === 0 ? '💡 Show Hint 1' : hintsShown < hints.length ? `💡 Show Next Hint (${hintsShown + 1}/${hints.length})` : '✓ All Hints Shown'}
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
          )}

          {/* Detailed 5-Part Diagnostic Breakdown when answered */}
          {answered && (
            <div className="space-y-4 pt-4 border-t border-border/50 animate-fade-in-up">
              <div
                className={`p-4 rounded-2xl border ${
                  isCorrect
                    ? 'bg-secondary/10 border-secondary/30 text-secondary'
                    : 'bg-destructive/10 border-destructive/30 text-destructive'
                }`}
              >
                <div className="flex items-center gap-2 font-semibold text-sm mb-1">
                  {isCorrect ? (
                    <>
                      <CheckCircle size={16} /> Spot On! Correct Fix
                    </>
                  ) : (
                    <>
                      <XCircle size={16} /> Needs Revision
                    </>
                  )}
                </div>
                <p className="text-xs text-foreground mt-1">
                  Correct version: <strong className="text-secondary">✅ &ldquo;{question.correctAnswer}&rdquo;</strong>
                </p>
              </div>

              {/* 5-Layer Deep Diagnostic Panel */}
              <div className="space-y-2.5">
                {question.error && (
                  <div className="p-3.5 rounded-2xl bg-destructive/5 border border-destructive/20 text-xs">
                    <span className="font-bold text-destructive block mb-0.5">1. Specific Error Identified:</span>
                    <span className="text-foreground">{question.error}</span>
                  </div>
                )}
                {question.correction && (
                  <div className="p-3.5 rounded-2xl bg-secondary/5 border border-secondary/20 text-xs">
                    <span className="font-bold text-secondary block mb-0.5">2. Standard Correction:</span>
                    <span className="text-foreground">{question.correction}</span>
                  </div>
                )}
                {question.grammarRule && (
                  <div className="p-3.5 rounded-2xl bg-muted/40 border border-border text-xs">
                    <span className="font-bold text-primary block mb-0.5">3. Governing Grammar Rule:</span>
                    <span className="text-foreground">{question.grammarRule}</span>
                  </div>
                )}
                {question.whyMistakeOccurs && (
                  <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs">
                    <span className="font-bold text-amber-600 dark:text-amber-400 block mb-0.5">4. Why Learners Make This Mistake:</span>
                    <span className="text-foreground">{question.whyMistakeOccurs}</span>
                  </div>
                )}
                {question.ieltsRelevance && (
                  <div className="p-3.5 rounded-2xl bg-primary/10 border border-primary/20 text-xs">
                    <span className="font-bold text-primary block mb-0.5">5. IELTS Academic Band 8-9 Relevance:</span>
                    <span className="text-foreground">{question.ieltsRelevance}</span>
                  </div>
                )}
              </div>

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
                id="check-adv-error-btn"
                disabled={!userAnswer.trim()}
                onClick={handleSubmit}
                className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-40 shadow-lg shadow-primary/20"
              >
                Submit Correction
              </button>
            ) : (
              <button
                id="next-adv-error-btn"
                onClick={handleNext}
                className="w-full py-3.5 rounded-2xl bg-secondary text-secondary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-secondary/20"
              >
                {currentIdx < questions.length - 1 ? 'Next Error Challenge →' : 'View Final Results 🏆'}
              </button>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between text-sm">
          <Link
            href="/parts-of-speech/adverb/advanced"
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <ChevronLeft size={16} /> Stage 3: Advanced MCQ
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
