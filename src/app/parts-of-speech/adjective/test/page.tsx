'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProgress } from '@/contexts/ProgressContext';
import { adjectiveFinalTestQuestions } from '@/data/parts-of-speech/adjective';
import type { AdjectiveQuestion } from '@/types';

export default function AdjectiveFinalTestPage() {
  const { completePartOfSpeechStage, recordPartOfSpeechWeakArea, getPartOfSpeechProgress } = useProgress();
  const adjectiveProgress = getPartOfSpeechProgress('adjective');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [typedAnswer, setTypedAnswer] = useState('');
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [testAnswers, setTestAnswers] = useState<{
    questionId: string;
    targetSkill?: string;
    grammarRule?: string;
    weakAreaTag?: string;
    correct: boolean;
    userAnswer: string;
    correctAnswer: string;
  }[]>([]);

  const currentQ: AdjectiveQuestion = adjectiveFinalTestQuestions[currentIndex];

  const handleSelectOption = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
  };

  const handleCheckAnswer = () => {
    if (isAnswerChecked) return;

    let correct = false;
    let answerGiven = '';

    if (currentQ.type === 'challenge-fill') {
      answerGiven = typedAnswer.trim();
      const normalize = (s: string) => s.toLowerCase().trim();
      const correctAns = normalize(currentQ.correctAnswer);
      const isAlt = currentQ.acceptedAnswers?.some((a) => normalize(a) === normalize(answerGiven));
      correct = normalize(answerGiven) === correctAns || Boolean(isAlt);
    } else {
      answerGiven = selectedOption || '';
      correct = selectedOption === currentQ.correctAnswer;
    }

    setIsCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      setScore((prev) => prev + 1);
    } else {
      if (currentQ.weakAreaTag) {
        recordPartOfSpeechWeakArea('adjective', currentQ.weakAreaTag);
      } else if (currentQ.grammarRule) {
        recordPartOfSpeechWeakArea('adjective', currentQ.grammarRule);
      }
    }

    setTestAnswers((prev) => [
      ...prev,
      {
        questionId: currentQ.id,
        targetSkill: currentQ.targetSkill,
        grammarRule: currentQ.grammarRule,
        weakAreaTag: currentQ.weakAreaTag,
        correct,
        userAnswer: answerGiven,
        correctAnswer: currentQ.correctAnswer,
      },
    ]);
  };

  const handleNext = () => {
    if (currentIndex + 1 < adjectiveFinalTestQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setTypedAnswer('');
      setIsAnswerChecked(false);
    } else {
      const finalScore = score + (isCorrect ? 0 : 0);
      const accuracy = Math.round((finalScore / adjectiveFinalTestQuestions.length) * 100);
      completePartOfSpeechStage('adjective', 'test', score, accuracy);
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setTypedAnswer('');
    setIsAnswerChecked(false);
    setIsCorrect(false);
    setScore(0);
    setIsCompleted(false);
    setTestAnswers([]);
  };

  // Performance metrics
  const totalQuestions = adjectiveFinalTestQuestions.length;
  const accuracy = Math.round((score / totalQuestions) * 100);

  const grammarQuestions = testAnswers.filter((a) => a.targetSkill === 'adjective-identification' || a.targetSkill === 'comparative-formation' || a.targetSkill === 'superlative-formation' || a.targetSkill === 'adjective-order');
  const grammarCorrect = grammarQuestions.filter((a) => a.correct).length;
  const grammarAccuracy = grammarQuestions.length > 0 ? Math.round((grammarCorrect / grammarQuestions.length) * 100) : accuracy;

  const academicQuestions = testAnswers.filter((a) => a.targetSkill === 'academic-adjectives' || a.targetSkill === 'predicative-adjectives' || a.targetSkill === 'participial-adjectives' || a.targetSkill === 'adjective-preposition');
  const academicCorrect = academicQuestions.filter((a) => a.correct).length;
  const academicAccuracy = academicQuestions.length > 0 ? Math.round((academicCorrect / academicQuestions.length) * 100) : accuracy;

  const incorrectAnswers = testAnswers.filter((a) => !a.correct);
  const detectedWeakRules = Array.from(new Set(incorrectAnswers.map((a) => a.grammarRule || a.weakAreaTag).filter(Boolean))) as string[];

  if (isCompleted) {
    return (
      <main className="min-h-screen pb-24 pt-4">
        <div className="max-w-3xl mx-auto px-4 space-y-6 animate-scale-in">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Link
              href="/parts-of-speech/adjective"
              className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              ← Back to Adjective Hub
            </Link>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
              Assessment Completed
            </span>
          </div>

          {/* Mastered Celebration Banner */}
          <div className="glass-card p-6 md:p-8 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400/50 text-4xl shadow-lg shadow-emerald-500/20 animate-bounce">
              🎨
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                🎉 Adjective Mastered!
              </h1>
              <p className="text-slate-300 text-sm md:text-base mt-2 max-w-lg mx-auto">
                Outstanding accomplishment! You have successfully mastered all 9 learning stages of the Adjective module, from zero-level descriptive recognition to IELTS Band 9.0 academic structures.
              </p>
            </div>

            {/* Score Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-4">
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-2xl md:text-3xl font-bold text-emerald-400">{accuracy}%</div>
                <div className="text-xs text-slate-400 mt-1">Final Accuracy</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-2xl md:text-3xl font-bold text-cyan-400">{score}/{totalQuestions}</div>
                <div className="text-xs text-slate-400 mt-1">Challenges Won</div>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-2xl md:text-3xl font-bold text-amber-400">9/9</div>
                <div className="text-xs text-slate-400 mt-1">Stages Complete</div>
              </div>
            </div>
          </div>

          {/* Skill Breakdown */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <span>📊</span> Adjective Skill Performance Breakdown
            </h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Adjective Types, Comparison &amp; Order</span>
                  <span className="font-semibold text-emerald-400">{grammarAccuracy}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${grammarAccuracy}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Academic Collocations &amp; Complex Structures</span>
                  <span className="font-semibold text-cyan-400">{academicAccuracy}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full transition-all duration-500" style={{ width: `${academicAccuracy}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Weak Areas & Targeted Recommendations */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-4">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <span>🎯</span> Weak Areas &amp; Targeted Practice
            </h2>
            {detectedWeakRules.length === 0 ? (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm">
                🌟 Flawless accuracy! No recurring adjective weaknesses were detected in your assessment.
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">
                  Based on your assessment answers, here are targeted grammatical areas for further practice:
                </p>
                <div className="space-y-2">
                  {detectedWeakRules.map((rule, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start justify-between gap-3"
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="text-amber-400 text-base mt-0.5">⚠️</span>
                        <div>
                          <p className="text-sm font-semibold text-white">{rule}</p>
                          <p className="text-xs text-slate-300 mt-0.5">
                            Recommendation: Review the lesson module and practice targeted error correction.
                          </p>
                        </div>
                      </div>
                      <Link
                        href="/parts-of-speech/adjective/errors"
                        className="shrink-0 text-xs px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-medium transition-colors border border-amber-500/30"
                      >
                        Practice →
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* All Stages Status Checklist */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800 space-y-3">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <span>✅</span> Adjective Learning Path Complete Status
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-lg bg-slate-800/60 flex items-center justify-between text-slate-300 border border-slate-700/50">
                <span>1. Learn</span>
                <span className="text-emerald-400 font-semibold">✓ Done</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/60 flex items-center justify-between text-slate-300 border border-slate-700/50">
                <span>2. Fill in the Blank</span>
                <span className="text-emerald-400 font-semibold">✓ Done</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/60 flex items-center justify-between text-slate-300 border border-slate-700/50">
                <span>3. Advanced MCQ</span>
                <span className="text-emerald-400 font-semibold">✓ Done</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/60 flex items-center justify-between text-slate-300 border border-slate-700/50">
                <span>4. Error Correction</span>
                <span className="text-emerald-400 font-semibold">✓ Done</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/60 flex items-center justify-between text-slate-300 border border-slate-700/50">
                <span>5. IELTS Context</span>
                <span className="text-emerald-400 font-semibold">✓ Done</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/60 flex items-center justify-between text-slate-300 border border-slate-700/50">
                <span>6. Vocabulary</span>
                <span className="text-emerald-400 font-semibold">✓ Done</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/60 flex items-center justify-between text-slate-300 border border-slate-700/50">
                <span>7. Speaking</span>
                <span className="text-emerald-400 font-semibold">✓ Done</span>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-800/60 flex items-center justify-between text-slate-300 border border-slate-700/50">
                <span>8. Writing</span>
                <span className="text-emerald-400 font-semibold">✓ Done</span>
              </div>
              <div className="p-2.5 rounded-lg bg-emerald-950/40 col-span-1 sm:col-span-2 flex items-center justify-between text-emerald-300 border border-emerald-500/40">
                <span>9. Final Assessment</span>
                <span className="text-emerald-400 font-bold">✓ Mastered ({accuracy}%)</span>
              </div>
            </div>
          </div>

          {/* Next Part of Speech: Adverb */}
          <div className="glass-card p-6 rounded-2xl border border-dashed border-primary/40 bg-primary/5 text-center space-y-3">
            <span className="text-xs px-3 py-1 rounded-full bg-primary/20 text-primary font-semibold border border-primary/30 inline-block">
              Next Part of Speech
            </span>
            <h3 className="text-lg font-bold text-foreground">Adverb</h3>
            <p className="text-xs text-muted-foreground max-w-md mx-auto">
              Master adverbs of manner, frequency, time, degree, stance, and complex sentence modifiers in academic IELTS discourse.
            </p>
            <div className="pt-2">
              <Link
                href="/parts-of-speech/adverb"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:opacity-90 text-primary-foreground text-xs font-semibold shadow-md shadow-primary/20 transition-all"
              >
                Start Adverb Module →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Sticky Controls */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/90 backdrop-blur-md border-t border-border">
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
            <button
              id="retake-adj-test-btn"
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-xl border border-border hover:bg-muted text-foreground text-sm font-semibold transition-colors"
            >
              🔄 Retake Test
            </button>
            <Link
              id="return-to-adj-hub-btn"
              href="/parts-of-speech/adjective"
              className="px-6 py-2.5 rounded-xl bg-primary hover:opacity-90 text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/20 transition-all"
            >
              Adjective Hub →
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-28 pt-4">
      <div className="max-w-3xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/parts-of-speech/adjective"
            className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to Adjective Hub
          </Link>
          <div className="text-xs text-muted-foreground">
            Score: <span className="font-semibold text-secondary">{score}</span> / {totalQuestions}
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1.5">
            <span className="font-semibold text-foreground">Stage 9: Final Assessment</span>
            <span>Question {currentIndex + 1} of {totalQuestions}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="glass-card p-6 md:p-8 rounded-2xl border border-border space-y-6">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-muted text-foreground font-medium capitalize border border-border">
              {currentQ.level.replace('-', ' ')}
            </span>
            {currentQ.topic && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 capitalize">
                {currentQ.topic}
              </span>
            )}
            {currentQ.grammarRule && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                {currentQ.grammarRule}
              </span>
            )}
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h2 className="text-base md:text-lg font-semibold text-foreground leading-relaxed">
              {currentQ.question}
            </h2>
            {currentQ.banglaHint && (
              <p className="text-xs text-muted-foreground bg-muted/50 p-2.5 rounded-lg border border-border">
                <span className="text-primary font-medium">বাংলা ইঙ্গিত:</span> {currentQ.banglaHint}
              </p>
            )}
          </div>

          {/* Multiple Choice Options */}
          {currentQ.type !== 'challenge-fill' && currentQ.options && (
            <div className="space-y-2.5">
              {currentQ.options.map((option, idx) => {
                let btnStyle = 'bg-card hover:bg-muted text-foreground border-border';

                if (selectedOption === option) {
                  btnStyle = 'bg-primary/10 text-primary border-primary';
                }

                if (isAnswerChecked) {
                  if (option === currentQ.correctAnswer) {
                    btnStyle = 'bg-secondary/15 text-secondary border-secondary font-semibold';
                  } else if (selectedOption === option && !isCorrect) {
                    btnStyle = 'bg-destructive/15 text-destructive border-destructive';
                  } else {
                    btnStyle = 'bg-muted/40 text-muted-foreground border-border opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    id={`adj-test-opt-${idx}`}
                    onClick={() => handleSelectOption(option)}
                    disabled={isAnswerChecked}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all duration-200 flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-muted text-xs font-semibold shrink-0 text-muted-foreground">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="pt-0.5">{option}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Typing Challenge Input */}
          {currentQ.type === 'challenge-fill' && (
            <div className="space-y-3">
              <input
                id="adj-test-typed-input"
                type="text"
                value={typedAnswer}
                onChange={(e) => setTypedAnswer(e.target.value)}
                disabled={isAnswerChecked}
                placeholder="Type the exact adjective or adjective phrase here..."
                className="w-full p-4 rounded-xl bg-card border border-border text-foreground placeholder-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isAnswerChecked && typedAnswer.trim()) {
                    handleCheckAnswer();
                  }
                }}
              />
              {isAnswerChecked && (
                <div className="text-xs text-muted-foreground">
                  Correct answer: <span className="font-bold text-secondary">{currentQ.correctAnswer}</span>
                </div>
              )}
            </div>
          )}

          {/* Feedback & Dual Explanations */}
          {isAnswerChecked && (
            <div
              className={`p-4 rounded-xl border space-y-3 ${
                isCorrect
                  ? 'bg-secondary/10 border-secondary/20 text-foreground'
                  : 'bg-destructive/10 border-destructive/20 text-foreground'
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="text-base">{isCorrect ? '🎉' : '❌'}</span>
                <span className="font-bold text-sm">
                  {isCorrect ? 'Correct!' : 'Incorrect'}
                </span>
                {!isCorrect && (
                  <span className="text-xs text-muted-foreground">
                    — Correct answer: <strong className="text-foreground">{currentQ.correctAnswer}</strong>
                  </span>
                )}
              </div>

              <p className="text-xs leading-relaxed">{currentQ.explanation}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs">
                {currentQ.simpleExplanation && (
                  <div className="p-2.5 rounded-lg bg-card/60 border border-border">
                    <span className="font-semibold text-muted-foreground block mb-0.5">Quick Summary</span>
                    <span>{currentQ.simpleExplanation}</span>
                  </div>
                )}
                {currentQ.ieltsExplanation && (
                  <div className="p-2.5 rounded-lg bg-primary/10 border border-primary/20">
                    <span className="font-semibold text-primary block mb-0.5">IELTS Academic Insight</span>
                    <span>{currentQ.ieltsExplanation}</span>
                  </div>
                )}
              </div>

              {currentQ.banglaExplanation && (
                <div className="p-2.5 rounded-lg bg-secondary/10 border border-secondary/20 text-xs">
                  <span className="font-semibold text-secondary block mb-0.5">🇧🇩 ব্যাকরণ ব্যাখ্যা</span>
                  <span>{currentQ.banglaExplanation}</span>
                </div>
              )}
            </div>
          )}

          {/* Bottom Action inside card */}
          <div className="pt-2">
            {!isAnswerChecked ? (
              <button
                id="check-adj-test-btn"
                onClick={handleCheckAnswer}
                disabled={currentQ.type === 'challenge-fill' ? !typedAnswer.trim() : !selectedOption}
                className="w-full py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-40 shadow-lg shadow-primary/20"
              >
                Submit &amp; Check Answer
              </button>
            ) : (
              <button
                id="next-adj-test-btn"
                onClick={handleNext}
                className="w-full py-3.5 rounded-xl bg-secondary text-secondary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-secondary/20"
              >
                {currentIndex + 1 < totalQuestions ? 'Next Challenge →' : 'Complete Assessment 🏆'}
              </button>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
