'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProgress } from '@/contexts/ProgressContext';
import { pronounErrorCorrectionQuestions } from '@/data/parts-of-speech/pronoun';
import { PronounQuestion } from '@/types';

export default function PronounErrorCorrectionPage() {
  const { completePartOfSpeechStage, recordPartOfSpeechWeakArea } = useProgress();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQ: PronounQuestion = pronounErrorCorrectionQuestions[currentIndex];
  const totalQuestions = pronounErrorCorrectionQuestions.length;

  const handleSelectOption = (option: string) => {
    if (isAnswerChecked) return;
    setSelectedOption(option);
  };

  const handleCheckAnswer = () => {
    if (isAnswerChecked || !selectedOption) return;

    const correct = selectedOption === currentQ.correctAnswer;
    setIsCorrect(correct);
    setIsAnswerChecked(true);

    if (correct) {
      setScore((prev) => prev + 1);
    } else {
      if (currentQ.grammarRule) {
        recordPartOfSpeechWeakArea('pronoun', currentQ.grammarRule);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < totalQuestions) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswerChecked(false);
    } else {
      const finalScore = score + (isCorrect ? 0 : 0);
      const accuracy = Math.round((finalScore / totalQuestions) * 100);
      completePartOfSpeechStage('pronoun', 'errors', finalScore, accuracy);
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
    setScore(0);
    setIsCompleted(false);
  };

  if (isCompleted) {
    const accuracy = Math.round((score / totalQuestions) * 100);
    return (
      <main className="min-h-screen pb-24 pt-4">
        <div className="max-w-2xl mx-auto px-4 space-y-6">
          <div className="flex items-center justify-between">
            <Link
              href="/parts-of-speech/pronoun"
              className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              ← Back to Pronoun Hub
            </Link>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
              Stage 4 Complete
            </span>
          </div>

          <div className="glass-card p-8 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400/50 text-3xl">
              🔍
            </div>
            <h1 className="text-2xl font-bold text-white">Error Correction Completed!</h1>
            <p className="text-slate-300 text-sm max-w-md mx-auto">
              You analyzed and corrected all 20 authentic learner grammar mistakes in the Pronoun module.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 max-w-sm mx-auto">
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-2xl font-bold text-emerald-400">{accuracy}%</div>
                <div className="text-xs text-slate-400 mt-1">Accuracy</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-2xl font-bold text-indigo-400">{score}/{totalQuestions}</div>
                <div className="text-xs text-slate-400 mt-1">Score</div>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-950/90 backdrop-blur-md border-t border-slate-800">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
            <button
              onClick={handleRestart}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors border border-slate-700"
            >
              🔄 Retry Errors
            </button>
            <Link
              href="/parts-of-speech/pronoun/ielts"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-semibold shadow-lg shadow-emerald-500/20 transition-all"
            >
              Stage 5: IELTS Context →
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-28 pt-4">
      <div className="max-w-2xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/parts-of-speech/pronoun"
            className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            ← Back to Pronoun Hub
          </Link>
          <div className="text-xs text-slate-400">
            Score: <span className="font-semibold text-emerald-400">{score}</span> / {totalQuestions}
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1.5">
            <span className="font-semibold text-white">Stage 4: Error Correction</span>
            <span>Question {currentIndex + 1} of {totalQuestions}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">
              Grammar Error Detection
            </span>
            {currentQ.topic && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700 capitalize">
                {currentQ.topic}
              </span>
            )}
          </div>

          {/* Sentence with Error */}
          <div className="space-y-2">
            <h2 className="text-base md:text-lg font-semibold text-white leading-relaxed">
              {currentQ.question}
            </h2>
            {currentQ.banglaExplanation && (
              <p className="text-xs text-slate-400 bg-slate-800/40 p-2.5 rounded-lg border border-slate-700/50">
                <span className="text-amber-400 font-medium">বাংলা ইঙ্গিত:</span> {currentQ.banglaExplanation}
              </p>
            )}
          </div>

          {/* Correction Options */}
          {currentQ.options && (
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

          {/* 5-Layer Deep Feedback */}
          {isAnswerChecked && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700 space-y-4">
              <div className="flex items-center gap-2 font-bold text-sm">
                <span>{isCorrect ? '✅ Well done!' : '❌ Let\'s understand this error:'}</span>
              </div>

              {/* Layer 1: Learner Mistake vs Correct Form */}
              {currentQ.learnerError && currentQ.correctForm && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/30 text-rose-200">
                    <span className="font-bold block text-rose-400 mb-1">Mistake Pattern:</span>
                    <p>{currentQ.learnerError}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-200">
                    <span className="font-bold block text-emerald-400 mb-1">Correct Form:</span>
                    <p>{currentQ.correctForm}</p>
                  </div>
                </div>
              )}

              {/* Layer 2: Pronoun Rule */}
              <div className="text-xs space-y-1 text-slate-300">
                <span className="font-semibold text-white">Grammar Rule:</span>
                <p>{currentQ.pronounRule || currentQ.grammarRule}</p>
              </div>

              {/* Layer 3: Root Cause of Mistake */}
              {currentQ.whyMistakeHappens && (
                <div className="text-xs space-y-1 text-slate-300 pt-2 border-t border-slate-800">
                  <span className="font-semibold text-amber-300">Why this mistake happens:</span>
                  <p>{currentQ.whyMistakeHappens}</p>
                </div>
              )}

              {/* Layer 4: IELTS Relevance */}
              {currentQ.ieltsRelevance && (
                <div className="text-xs space-y-1 text-slate-300 pt-2 border-t border-slate-800">
                  <span className="font-semibold text-cyan-300">IELTS Writing &amp; Speaking Relevance:</span>
                  <p>{currentQ.ieltsRelevance}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Sticky Controls */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-950/90 backdrop-blur-md border-t border-slate-800">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <Link
            href="/parts-of-speech/pronoun"
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors border border-slate-700"
          >
            ← Exit
          </Link>

          {!isAnswerChecked ? (
            <button
              onClick={handleCheckAnswer}
              disabled={!selectedOption}
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 transition-all"
            >
              Check Answer
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-semibold shadow-lg shadow-emerald-500/20 transition-all"
            >
              {currentIndex + 1 === totalQuestions ? 'Complete Stage →' : 'Next Question →'}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
