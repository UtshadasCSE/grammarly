'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProgress } from '@/contexts/ProgressContext';
import { pronounWritingTasks } from '@/data/parts-of-speech/pronoun';
import { PronounWritingTask } from '@/types';

export default function PronounWritingPage() {
  const { completePartOfSpeechStage, incrementPartOfSpeechWriting } = useProgress();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userSubmission, setUserSubmission] = useState('');
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [showSampleAnswer, setShowSampleAnswer] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentTask: PronounWritingTask = pronounWritingTasks[currentIndex];
  const totalTasks = pronounWritingTasks.length;

  const wordCount = userSubmission.trim() ? userSubmission.trim().split(/\s+/).length : 0;

  const handleEvaluate = () => {
    if (!userSubmission.trim()) return;
    setShowAnalysis(true);
    incrementPartOfSpeechWriting('pronoun');
    if (!completedTasks.includes(currentIndex)) {
      setCompletedTasks((prev) => [...prev, currentIndex]);
    }
  };

  const handleNextTask = () => {
    setUserSubmission('');
    setShowAnalysis(false);
    setShowSampleAnswer(false);
    if (currentIndex + 1 < totalTasks) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      completePartOfSpeechStage('pronoun', 'writing', 100, 100);
      setIsCompleted(true);
    }
  };

  const handlePrevTask = () => {
    if (currentIndex > 0) {
      setUserSubmission('');
      setShowAnalysis(false);
      setShowSampleAnswer(false);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (isCompleted) {
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
              Stage 8 Complete
            </span>
          </div>

          <div className="glass-card p-8 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400/50 text-3xl">
              ✍️
            </div>
            <h1 className="text-2xl font-bold text-white">Writing Stage Completed!</h1>
            <p className="text-slate-300 text-sm max-w-md mx-auto">
              You submitted and reviewed all 18 IELTS writing challenges with automated pronoun analysis.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 max-w-sm mx-auto">
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-2xl font-bold text-emerald-400">18/18</div>
                <div className="text-xs text-slate-400 mt-1">Tasks Completed</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-2xl font-bold text-cyan-400">100%</div>
                <div className="text-xs text-slate-400 mt-1">Writing Mastery</div>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-950/90 backdrop-blur-md border-t border-slate-800">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
            <button
              onClick={() => {
                setIsCompleted(false);
                setCurrentIndex(0);
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors border border-slate-700"
            >
              🔄 Review Tasks
            </button>
            <Link
              href="/parts-of-speech/pronoun/test"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-semibold shadow-lg shadow-emerald-500/20 transition-all"
            >
              Stage 9: Final Test →
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
            Task: <span className="font-semibold text-emerald-400">{currentIndex + 1}</span> / {totalTasks}
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1.5">
            <span className="font-semibold text-white">Stage 8: IELTS Writing &amp; Structure</span>
            <span>{Math.round(((currentIndex + 1) / totalTasks) * 100)}% Complete</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalTasks) * 100}%` }}
            />
          </div>
        </div>

        {/* Task Card */}
        <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-medium capitalize border border-slate-700">
              {currentTask.level}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              {currentTask.targetGrammar}
            </span>
          </div>

          {/* Prompt */}
          <div className="space-y-2">
            <h2 className="text-base md:text-lg font-semibold text-white leading-relaxed">
              {currentTask.prompt}
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed bg-slate-900 p-3 rounded-xl border border-slate-800">
              <span className="text-indigo-400 font-semibold">Instructions:</span> {currentTask.instructions}
            </p>
          </div>

          {/* Criteria Checklist */}
          {currentTask.assessmentCriteria && (
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1 text-xs">
              <span className="font-bold text-slate-400 uppercase tracking-wider">Assessment Focus:</span>
              <ul className="list-disc list-inside space-y-0.5 text-slate-300">
                {currentTask.assessmentCriteria.map((crit, idx) => (
                  <li key={idx}>{crit}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Text Editor Input */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Your Written Response:</span>
              <span>Words: <span className="font-semibold text-emerald-400">{wordCount}</span> {currentTask.wordLimit && `(Target: ~${currentTask.wordLimit})`}</span>
            </div>
            <textarea
              rows={5}
              value={userSubmission}
              onChange={(e) => setUserSubmission(e.target.value)}
              placeholder="Type your response here using accurate pronouns and cohesive referencing..."
              className="w-full p-4 rounded-xl bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 transition-colors leading-relaxed"
            />
          </div>

          {/* Evaluation Action */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={handleEvaluate}
              disabled={!userSubmission.trim()}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-semibold shadow-lg shadow-indigo-500/20 transition-all"
            >
              🔍 Submit &amp; Evaluate Response
            </button>
            <button
              onClick={() => setShowSampleAnswer(!showSampleAnswer)}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors border border-slate-700"
            >
              {showSampleAnswer ? 'Hide Sample Answer' : '📖 View Band 9.0 Model Answer'}
            </button>
          </div>

          {/* Model Sample Answer */}
          {showSampleAnswer && currentTask.sampleAnswer && (
            <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/30 text-xs space-y-1.5 animate-fade-in">
              <span className="font-bold text-cyan-300">Band 9.0 Model Answer:</span>
              <p className="text-slate-200 leading-relaxed italic">&ldquo;{currentTask.sampleAnswer}&rdquo;</p>
            </div>
          )}

          {/* Detailed Writing Analysis */}
          {showAnalysis && currentTask.sampleAnalysis && (
            <div className="p-5 rounded-2xl bg-slate-900 border border-slate-700 space-y-3.5 text-xs animate-scale-in">
              <div className="flex items-center gap-2 font-bold text-sm text-emerald-400">
                <span>📊</span> Diagnostic Writing Analysis
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div className="p-3 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-200 space-y-0.5">
                  <span className="font-bold text-rose-400 block">Common Pitfall:</span>
                  <p>{currentTask.sampleAnalysis.problem}</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-emerald-200 space-y-0.5">
                  <span className="font-bold text-emerald-400 block">Syntactic Correction:</span>
                  <p>{currentTask.sampleAnalysis.correction}</p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700 text-slate-300 space-y-1">
                <span className="font-bold text-amber-400 block">Grammar Explanation:</span>
                <p className="leading-relaxed">{currentTask.sampleAnalysis.explanation}</p>
              </div>

              <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-slate-200 space-y-1">
                <span className="font-bold text-indigo-300 block">Band 9.0 High-Level Formulation:</span>
                <p className="italic text-cyan-200 leading-relaxed">&ldquo;{currentTask.sampleAnalysis.improvedVersion}&rdquo;</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Sticky Controls */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-950/90 backdrop-blur-md border-t border-slate-800">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={handlePrevTask}
            disabled={currentIndex === 0}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 text-sm font-semibold transition-colors border border-slate-700"
          >
            ← Previous
          </button>
          <button
            onClick={handleNextTask}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-semibold shadow-lg shadow-emerald-500/20 transition-all"
          >
            {currentIndex + 1 === totalTasks ? 'Complete Writing Stage →' : 'Next Task →'}
          </button>
        </div>
      </div>
    </main>
  );
}
