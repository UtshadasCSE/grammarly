'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Lightbulb, CheckCircle, XCircle, Send, AlertTriangle } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar, LinearProgress } from '@/components/ProgressIndicators';
import { useProgress } from '@/contexts/ProgressContext';
import { nounErrorCorrectionQuestions } from '@/data/parts-of-speech/noun';

export default function NounErrorsPage() {
  const { getPartOfSpeechProgress, completePartOfSpeechStage, recordPartOfSpeechWeakArea } = useProgress();
  const questions = nounErrorCorrectionQuestions;
  const nounProgress = getPartOfSpeechProgress('noun');

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
    const exactMatch = cleanUser === cleanCorrect || cleanUser.includes(question.correctForm?.toLowerCase() || '');

    setIsCorrect(exactMatch);
    setAnswered(true);

    if (!exactMatch && question.weakAreaTag) {
      recordPartOfSpeechWeakArea('noun', question.weakAreaTag);
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
      completePartOfSpeechStage('noun', 'errors', correctCount, accuracy);
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
            <div className="text-6xl mb-4">🔍</div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Error Correction Complete!</h1>
            <p className="text-muted-foreground mb-8">Noun — Found and Fixed Real Learner Errors ({questions.length} Questions)</p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-muted rounded-2xl p-4">
                <p className="text-2xl font-bold">{correctCount}/{results.length}</p>
                <p className="text-xs text-muted-foreground">Corrected</p>
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
                id="continue-to-noun-ielts-btn"
                href="/parts-of-speech/noun/ielts"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-200"
              >
                Continue to IELTS Context <ChevronRight size={16} />
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

  const progressPercent = Math.round((currentIdx / questions.length) * 100);

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
          <span className="text-foreground font-medium">Error Correction</span>
        </div>

        {/* Stage progress */}
        <div className="mb-6">
          <StageProgressBar currentStage="errors" completedStages={nounProgress?.stages ?? {}} />
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <LinearProgress value={progressPercent} label={`Challenge ${currentIdx + 1} of ${questions.length}`} />
        </div>

        {/* Instructions banner */}
        <div className="glass-card rounded-2xl p-4 border border-primary/20 bg-primary/5 mb-5">
          <p className="text-sm text-primary">
            🔍 <strong>Task:</strong> The sentence below contains a common noun error. Type the full corrected sentence.
          </p>
        </div>

        {/* Error Question Card */}
        <div className="glass-card rounded-3xl p-7 border border-border mb-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold text-primary uppercase tracking-wider bg-primary/10 px-2.5 py-1 rounded-full flex items-center gap-1">
              <AlertTriangle size={12} /> Find & Fix Error
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-muted-foreground border border-border capitalize">
              {question.topic}
            </span>
          </div>

          {/* Incorrect Sentence Display */}
          <div className="mb-5 p-4 bg-primary/5 border border-primary/20 rounded-xl">
            <p className="text-xs font-bold uppercase tracking-wider text-primary mb-1">❌ Sentence with Error</p>
            <p className="text-base text-foreground font-medium">{question.question}</p>
          </div>

          {/* Input field */}
          <div className="mb-4">
            <label className="text-sm font-semibold text-muted-foreground block mb-2">
              ✅ Type the corrected sentence:
            </label>
            <textarea
              id="noun-error-correction-input"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={answered}
              placeholder="Type the full grammatically corrected sentence here..."
              rows={3}
              className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
            />
          </div>

          {/* Hints */}
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

          <div className="flex flex-wrap gap-3">
            {!answered && (
              <>
                <button
                  id="submit-noun-correction-btn"
                  onClick={handleSubmit}
                  disabled={!userAnswer.trim()}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <Send size={15} /> Submit Correction
                </button>
                {hintsShown < hints.length && (
                  <button
                    id="noun-error-hint-btn"
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
                id="next-noun-error-btn"
                onClick={handleNext}
                className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {currentIdx < questions.length - 1 ? 'Next Error Challenge' : 'See Results'} <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Detailed 5-Layer Error Explanation Feedback */}
        {answered && (
          <div className="glass-card rounded-3xl p-6 border border-secondary/30 bg-secondary/5 mb-4 animate-scale-in">
            <div className="flex items-start gap-3 mb-4">
              {isCorrect ? (
                <CheckCircle size={22} className="text-secondary shrink-0 mt-0.5" />
              ) : (
                <XCircle size={22} className="text-primary shrink-0 mt-0.5" />
              )}
              <div>
                <h3 className={`font-bold ${isCorrect ? 'text-secondary dark:text-secondary' : 'text-primary dark:text-primary'}`}>
                  {isCorrect ? '✅ Well Done! Error Corrected' : '📝 Here is the Correct Form & Analysis'}
                </h3>
              </div>
            </div>

            <div className="space-y-3">
              {/* Correct Sentence */}
              <div className="p-3.5 bg-secondary/10 border border-secondary/20 rounded-xl">
                <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">✅ Correct Sentence</p>
                <p className="text-sm text-foreground font-semibold">{question.correctAnswer}</p>
              </div>

              {/* Learner error & Why it happens */}
              {question.learnerError && (
                <div className="p-3 bg-card border border-border rounded-xl">
                  <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">⚠️ The Mistake Identified</p>
                  <p className="text-sm text-foreground">{question.learnerError}</p>
                  {question.whyMistakeHappens && (
                    <p className="text-xs text-muted-foreground mt-1">
                      <em>Why it happens: {question.whyMistakeHappens}</em>
                    </p>
                  )}
                </div>
              )}

              {/* Noun Grammar Rule */}
              {question.nounRule && (
                <div className="p-3 bg-muted rounded-xl">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">📘 Noun Grammar Rule</p>
                  <code className="text-xs text-foreground font-mono">{question.nounRule}</code>
                </div>
              )}

              {/* IELTS Relevance */}
              {question.ieltsRelevance && (
                <div className="p-3 bg-secondary/5 border border-secondary/15 rounded-xl">
                  <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1">🎓 IELTS Relevance</p>
                  <p className="text-xs text-foreground leading-relaxed">{question.ieltsRelevance}</p>
                </div>
              )}

              {/* Bangla Explanation */}
              {question.banglaExplanation && (
                <div className="p-3 bg-card rounded-xl border border-border">
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">🇧🇩 বাংলা নোট</p>
                  <p className="text-xs text-foreground leading-relaxed">{question.banglaExplanation}</p>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
          <Link
            href="/parts-of-speech/noun/advanced"
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> Back to Advanced MCQ
          </Link>
        </div>
      </div>
    </main>
  );
}
