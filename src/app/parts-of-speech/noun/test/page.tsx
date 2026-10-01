'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useProgress } from '@/contexts/ProgressContext';
import { nounFinalTestQuestions } from '@/data/parts-of-speech/noun';
import { NounQuestion } from '@/types';

export default function NounFinalTestPage() {
  const { completePartOfSpeechStage, recordPartOfSpeechWeakArea, getPartOfSpeechProgress } = useProgress();
  const nounProgress = getPartOfSpeechProgress('noun');

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
    correct: boolean;
    userAnswer: string;
    correctAnswer: string;
  }[]>([]);

  const currentQ: NounQuestion = nounFinalTestQuestions[currentIndex];

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
      // Record weak area
      if (currentQ.grammarRule) {
        recordPartOfSpeechWeakArea('noun', currentQ.grammarRule);
      }
    }

    setTestAnswers((prev) => [
      ...prev,
      {
        questionId: currentQ.id,
        targetSkill: currentQ.targetSkill,
        grammarRule: currentQ.grammarRule,
        correct,
        userAnswer: answerGiven,
        correctAnswer: currentQ.correctAnswer,
      },
    ]);
  };

  const handleNext = () => {
    if (currentIndex + 1 < nounFinalTestQuestions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setTypedAnswer('');
      setIsAnswerChecked(false);
    } else {
      const finalScore = score + (isCorrect ? 0 : 0); // score is already updated
      const accuracy = Math.round(((score + (isCorrect ? 0 : 0)) / nounFinalTestQuestions.length) * 100);
      completePartOfSpeechStage('noun', 'test', score, accuracy);
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

  // Performance calculations
  const totalQuestions = nounFinalTestQuestions.length;
  const accuracy = Math.round((score / totalQuestions) * 100);

  const grammarQuestions = testAnswers.filter((a) => a.targetSkill === 'grammar' || a.targetSkill === 'error-correction');
  const grammarCorrect = grammarQuestions.filter((a) => a.correct).length;
  const grammarAccuracy = grammarQuestions.length > 0 ? Math.round((grammarCorrect / grammarQuestions.length) * 100) : accuracy;

  const vocabQuestions = testAnswers.filter((a) => a.targetSkill === 'vocabulary' || a.targetSkill === 'context');
  const vocabCorrect = vocabQuestions.filter((a) => a.correct).length;
  const vocabAccuracy = vocabQuestions.length > 0 ? Math.round((vocabCorrect / vocabQuestions.length) * 100) : accuracy;

  const incorrectAnswers = testAnswers.filter((a) => !a.correct);
  const detectedWeakRules = Array.from(new Set(incorrectAnswers.map((a) => a.grammarRule).filter(Boolean))) as string[];

  if (isCompleted) {
    return (
      <main className="min-h-screen pb-24 pt-4">
        <div className="max-w-3xl mx-auto px-4 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <Link
              href="/parts-of-speech/noun"
              className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              ← Back to Noun Hub
            </Link>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
              Assessment Completed
            </span>
          </div>

          {/* Mastered Celebration Banner */}
          <div className="glass-card p-6 md:p-8 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400/50 text-4xl shadow-lg shadow-emerald-500/20 animate-bounce">
              🎓
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-white">
                Noun Mastered!
              </h1>
              <p className="text-slate-300 text-sm md:text-base mt-2 max-w-lg mx-auto">
                Congratulations! You have completed all 9 learning stages of the Noun Module, from Zero Basics to Advanced IELTS Masterclass.
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
              <span>📊</span> Skill Performance Breakdown
            </h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>Grammar, Plurals &amp; Rules</span>
                  <span className="font-semibold text-emerald-400">{grammarAccuracy}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${grammarAccuracy}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span>IELTS Vocabulary &amp; Nominalization</span>
                  <span className="font-semibold text-cyan-400">{vocabAccuracy}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div className="h-full bg-cyan-500 rounded-full transition-all duration-500" style={{ width: `${vocabAccuracy}%` }} />
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
                🌟 Flawless performance! No recurring noun weaknesses were detected during your assessment.
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">
                  Based on your test responses, here are specific areas to review for IELTS writing and speaking accuracy:
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
                            Recommendation: Review lesson notes and retry error correction practice.
                          </p>
                        </div>
                      </div>
                      <Link
                        href="/parts-of-speech/noun/errors"
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
              <span>✅</span> Noun Learning Path Status
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

          {/* Next Part of Speech: Coming Soon */}
          <div className="glass-card p-6 rounded-2xl border border-dashed border-indigo-500/40 bg-indigo-950/20 text-center space-y-2">
            <span className="text-xs px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 font-semibold border border-indigo-500/30 inline-block">
              Next Up
            </span>
            <h3 className="text-lg font-bold text-white">Next Part of Speech: Pronoun &amp; Verb</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Future modules will introduce Pronouns, Verbs, Adjectives, Prepositions, and Determiners with the same rigorous IELTS progression.
            </p>
            <div className="pt-2">
              <span className="text-xs font-semibold px-3 py-1 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                Coming Soon
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-950/90 backdrop-blur-md border-t border-slate-800">
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors border border-slate-700"
            >
              🔄 Retake Test
            </button>
            <Link
              href="/parts-of-speech/noun"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-semibold shadow-lg shadow-emerald-500/20 transition-all"
            >
              Noun Hub →
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
            href="/parts-of-speech/noun"
            className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            ← Back to Noun Hub
          </Link>
          <div className="text-xs text-slate-400">
            Score: <span className="font-semibold text-emerald-400">{score}</span> / {totalQuestions}
          </div>
        </div>

        {/* Progress bar */}
        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1.5">
            <span className="font-semibold text-white">Stage 9: Final Assessment</span>
            <span>Question {currentIndex + 1} of {totalQuestions}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-medium capitalize border border-slate-700">
              {currentQ.level.replace('-', ' ')}
            </span>
            {currentQ.topic && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 capitalize">
                {currentQ.topic}
              </span>
            )}
            {currentQ.grammarRule && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                {currentQ.grammarRule}
              </span>
            )}
          </div>

          {/* Question Text */}
          <div className="space-y-2">
            <h2 className="text-base md:text-lg font-semibold text-white leading-relaxed">
              {currentQ.question}
            </h2>
            {currentQ.banglaHint && (
              <p className="text-xs text-slate-400 bg-slate-800/50 p-2.5 rounded-lg border border-slate-700/50">
                <span className="text-indigo-400 font-medium">বাংলা ইঙ্গিত:</span> {currentQ.banglaHint}
              </p>
            )}
          </div>

          {/* Multiple Choice Options */}
          {currentQ.type !== 'challenge-fill' && currentQ.options && (
            <div className="space-y-2.5">
              {currentQ.options.map((option, idx) => {
                let btnStyle = 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700';

                if (selectedOption === option) {
                  btnStyle = 'bg-indigo-600/30 text-indigo-200 border-indigo-500';
                }

                if (isAnswerChecked) {
                  if (option === currentQ.correctAnswer) {
                    btnStyle = 'bg-emerald-500/20 text-emerald-200 border-emerald-500 font-semibold';
                  } else if (selectedOption === option && !isCorrect) {
                    btnStyle = 'bg-rose-500/20 text-rose-200 border-rose-500';
                  } else {
                    btnStyle = 'bg-slate-800/40 text-slate-500 border-slate-800 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(option)}
                    disabled={isAnswerChecked}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all duration-200 flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-700/80 text-xs font-semibold shrink-0 text-slate-300">
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
                type="text"
                value={typedAnswer}
                onChange={(e) => setTypedAnswer(e.target.value)}
                disabled={isAnswerChecked}
                placeholder="Type the exact noun or noun form here..."
                className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !isAnswerChecked && typedAnswer.trim()) {
                    handleCheckAnswer();
                  }
                }}
              />
              {isAnswerChecked && (
                <div className="text-xs text-slate-300">
                  Correct answer: <span className="font-bold text-emerald-400">{currentQ.correctAnswer}</span>
                </div>
              )}
            </div>
          )}

          {/* Feedback & Dual Explanations */}
          {isAnswerChecked && (
            <div
              className={`p-4 rounded-xl border space-y-3 ${
                isCorrect
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                  : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2 font-semibold text-sm">
                <span>{isCorrect ? '✅ Correct!' : '❌ Incorrect'}</span>
              </div>

              {/* Simple Explanation */}
              <div className="text-xs space-y-1 text-slate-300">
                <span className="font-semibold text-white">Simple Explanation:</span>
                <p>{currentQ.simpleExplanation || currentQ.explanation}</p>
              </div>

              {/* IELTS Academic Explanation */}
              {currentQ.ieltsExplanation && (
                <div className="text-xs space-y-1 text-slate-300 pt-2 border-t border-slate-700/40">
                  <span className="font-semibold text-cyan-300">IELTS Academic Insight:</span>
                  <p>{currentQ.ieltsExplanation}</p>
                </div>
              )}

              {/* Bangla Explanation */}
              {currentQ.banglaExplanation && (
                <div className="text-xs space-y-1 text-slate-400 pt-2 border-t border-slate-700/40">
                  <span className="font-semibold text-indigo-300">বাংলা ব্যাখ্যা:</span>
                  <p>{currentQ.banglaExplanation}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Sticky Controls */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-950/90 backdrop-blur-md border-t border-slate-800">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/parts-of-speech/noun"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors border border-slate-700"
          >
            ← Exit Test
          </Link>

          {!isAnswerChecked ? (
            <button
              onClick={handleCheckAnswer}
              disabled={
                currentQ.type === 'challenge-fill' ? !typedAnswer.trim() : !selectedOption
              }
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 transition-all"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-semibold shadow-lg shadow-emerald-500/20 transition-all"
            >
              {currentIndex + 1 === totalQuestions ? 'View Final Results →' : 'Next Question →'}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
