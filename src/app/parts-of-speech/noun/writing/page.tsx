'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Send, CheckCircle, Sparkles, AlertCircle } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar } from '@/components/ProgressIndicators';
import { useProgress } from '@/contexts/ProgressContext';
import { nounWritingTasks } from '@/data/parts-of-speech/noun';

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function assessNounWriting(text: string, taskIdx: number): {
  score: number;
  feedback: string[];
  hasCountableError: boolean;
  hasNominalization: boolean;
} {
  const feedback: string[] = [];
  let score = 72;
  const wordCount = countWords(text);

  if (wordCount >= 30) score += 8;
  if (wordCount >= 60) score += 8;
  if (text.includes(',')) score += 4;
  if (text.match(/\b(however|furthermore|moreover|consequently|therefore|additionally)\b/i)) score += 5;

  let hasCountableError = false;
  // Check common uncountable mistakes
  if (text.match(/\b(informations|advices|equipments|researches|evidences|traffics|furnitures)\b/i)) {
    score -= 15;
    hasCountableError = true;
    feedback.push('⚠️ Detected non-count plural error (e.g. "advices", "equipments", or "informations"). Remember that these nouns cannot take -s in English!');
  } else {
    feedback.push('✅ Excellent uncountable noun accuracy!');
  }

  // Check nominalization
  let hasNominalization = false;
  if (text.match(/\b\w+(tion|sion|ment|ance|ence|ity|ness)\b/i)) {
    score += 5;
    hasNominalization = true;
    feedback.push('✅ Good use of abstract nominalizations (e.g. -tion, -ment, -ity suffixes)!');
  }

  if (!text.match(/[.!?]$/)) {
    feedback.push('⚠️ Ensure your sentences conclude with proper terminal punctuation.');
  }

  return {
    score: Math.min(98, Math.max(55, score)),
    feedback,
    hasCountableError,
    hasNominalization,
  };
}

export default function NounWritingPage() {
  const {
    getPartOfSpeechProgress,
    completePartOfSpeechStage,
    incrementPartOfSpeechWriting,
    recordPartOfSpeechWeakArea,
  } = useProgress();

  const tasks = nounWritingTasks;
  const nounProgress = getPartOfSpeechProgress('noun');

  const [currentIdx, setCurrentIdx] = useState(0);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<ReturnType<typeof assessNounWriting> | null>(null);
  const [showSample, setShowSample] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  const task = tasks[currentIdx];

  const handleSubmit = () => {
    if (!text.trim() || submitted) return;
    const result = assessNounWriting(text, currentIdx);
    setFeedback(result);
    setSubmitted(true);
    setCompletedTasks((prev) => [...new Set([...prev, currentIdx])]);
    incrementPartOfSpeechWriting('noun');

    if (result.hasCountableError) {
      recordPartOfSpeechWeakArea('noun', 'countable-vs-uncountable');
    }
  };

  const handleNext = () => {
    if (currentIdx < tasks.length - 1) {
      setCurrentIdx((i) => i + 1);
      setText('');
      setSubmitted(false);
      setFeedback(null);
      setShowSample(false);
    } else {
      completePartOfSpeechStage(
        'noun',
        'writing',
        completedTasks.length,
        Math.round((completedTasks.length / tasks.length) * 100)
      );
    }
  };

  if (!task) return null;

  const wordCount = countWords(text);
  const wordLimit = task.wordLimit ?? 60;

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
          <span className="text-foreground font-medium">Writing</span>
        </div>

        <div className="mb-6">
          <StageProgressBar currentStage="writing" completedStages={nounProgress?.stages ?? {}} />
        </div>

        {/* Task Selector Pills */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
          {tasks.map((_, i) => (
            <button
              key={i}
              id={`noun-writing-task-${i}`}
              onClick={() => {
                if (!submitted) {
                  setCurrentIdx(i);
                  setText('');
                  setFeedback(null);
                  setShowSample(false);
                }
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIdx
                  ? 'bg-primary w-8'
                  : completedTasks.includes(i)
                  ? 'bg-secondary w-4'
                  : 'bg-muted w-4'
              }`}
            />
          ))}
          <span className="ml-2 text-xs text-muted-foreground shrink-0">{currentIdx + 1}/{tasks.length}</span>
        </div>

        {/* Task Prompt Card */}
        <div className="glass-card rounded-3xl p-7 border border-border mb-5">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full capitalize">
              Stage {task.stage} — {task.type.replace('-', ' ')}
            </span>
            {task.wordLimit && (
              <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full border border-border font-mono">
                {task.wordLimit}+ words
              </span>
            )}
          </div>

          <p className="text-base font-semibold text-foreground leading-relaxed mb-4 whitespace-pre-line">
            {task.prompt}
          </p>

          <div className="p-3 bg-muted rounded-xl mb-3">
            <p className="text-xs font-bold text-muted-foreground mb-1">📋 Instructions</p>
            <p className="text-sm text-foreground">{task.instructions}</p>
          </div>

          <div className="p-3 bg-primary/5 border border-primary/10 rounded-xl mb-3">
            <p className="text-xs font-bold text-primary mb-1">🎯 Target Language & Noun Focus</p>
            <p className="text-sm text-foreground">{task.targetGrammar}</p>
          </div>
        </div>

        {/* Writing Response Area */}
        <div className="glass-card rounded-3xl p-6 border border-border mb-4">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-foreground">Your Response</label>
            <span
              className={`text-xs font-mono font-medium ${
                wordCount >= wordLimit ? 'text-secondary dark:text-secondary font-bold' : 'text-muted-foreground'
              }`}
            >
              {wordCount} / {wordLimit} words
            </span>
          </div>

          <textarea
            id="noun-writing-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={submitted}
            placeholder="Type your response here. Focus on precise noun choice, accurate countable/uncountable forms, and academic noun phrases..."
            rows={8}
            className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none leading-relaxed"
          />

          {/* Assessment Criteria Pills */}
          <div className="mt-4 p-3 bg-muted rounded-xl">
            <p className="text-xs font-semibold text-muted-foreground mb-2">Assessment Focus:</p>
            <div className="flex flex-wrap gap-1.5">
              {task.assessmentCriteria.map((crit) => (
                <span key={crit} className="text-xs bg-background border border-border px-2.5 py-0.5 rounded-full text-foreground">
                  {crit}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            {!submitted ? (
              <button
                id="submit-noun-writing-btn"
                onClick={handleSubmit}
                disabled={wordCount < 10}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Send size={15} /> Submit Writing for Feedback
              </button>
            ) : (
              <button
                id="next-noun-writing-btn"
                onClick={handleNext}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {currentIdx < tasks.length - 1 ? 'Next Writing Task' : 'Continue to Final Test'} <ChevronRight size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Practice Feedback & Analysis */}
        {submitted && feedback && (
          <div className="glass-card rounded-3xl p-6 border border-secondary/20 bg-secondary/5 mb-5 animate-scale-in">
            <div className="flex items-start gap-3 mb-4">
              <CheckCircle size={22} className="text-secondary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-secondary dark:text-secondary">Writing Submitted!</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Practice Feedback & Diagnostic Estimate (Not an official IELTS score)</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center shrink-0 shadow-lg">
                <span className="text-white font-bold text-xl">{feedback.score}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Estimated Practice Score</p>
                <p className="text-xs text-muted-foreground">Keep refining your noun accuracy and academic phrases.</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {feedback.feedback.map((f, i) => (
                <p key={i} className="text-sm text-foreground">{f}</p>
              ))}
            </div>

            {/* Model Analysis: Original vs Problem vs Correction vs Improved */}
            {task.sampleAnalysis && (
              <div className="p-4 bg-card rounded-2xl border border-border space-y-3 mb-4">
                <p className="text-xs font-bold uppercase tracking-wider text-primary flex items-center gap-1.5">
                  <Sparkles size={13} /> Common Learner Error Breakdown & Fix
                </p>
                <div className="text-xs space-y-2">
                  <div className="p-2.5 bg-primary/5 rounded-xl border border-primary/20">
                    <p className="font-semibold text-primary">❌ Learner Version: "{task.sampleAnalysis.original}"</p>
                    <p className="text-muted-foreground mt-1">Problem: {task.sampleAnalysis.problem}</p>
                  </div>
                  <div className="p-2.5 bg-secondary/5 rounded-xl border border-secondary/20">
                    <p className="font-semibold text-secondary">✅ Grammatical Correction: "{task.sampleAnalysis.correction}"</p>
                    <p className="text-muted-foreground mt-1">{task.sampleAnalysis.explanation}</p>
                  </div>
                  <div className="p-2.5 bg-muted rounded-xl">
                    <p className="font-bold text-foreground">🌟 Band 8.5+ Improved Version:</p>
                    <p className="text-foreground italic mt-0.5">"{task.sampleAnalysis.improvedVersion}"</p>
                  </div>
                </div>
              </div>
            )}

            {/* Sample model answer */}
            {task.sampleAnswer && (
              <div>
                <button
                  id="toggle-noun-writing-sample-btn"
                  onClick={() => setShowSample(!showSample)}
                  className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  {showSample ? '▲ Hide' : '▼ Show'} Complete Model Answer
                </button>
                {showSample && (
                  <div className="mt-3 p-4 bg-muted rounded-xl border border-border animate-scale-in">
                    <p className="text-xs font-bold text-muted-foreground mb-2">📝 Full Model Answer</p>
                    <p className="text-sm text-foreground leading-relaxed italic">{task.sampleAnswer}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center mt-6 pt-4 border-t border-border">
          <Link href="/parts-of-speech/noun/speaking" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group">
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> Back to Speaking
          </Link>
        </div>
      </div>
    </main>
  );
}
