'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Send, CheckCircle, Sparkles, AlertCircle } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar } from '@/components/ProgressIndicators';
import { useProgress } from '@/contexts/ProgressContext';
import { verbWritingTasks } from '@/data/parts-of-speech/verb';

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function assessVerbWriting(text: string): {
  score: number;
  feedback: string[];
  hasAgreementError: boolean;
  hasAcademicVerb: boolean;
} {
  const feedback: string[] = [];
  let score = 74;
  const wordCount = countWords(text);

  if (wordCount >= 30) score += 8;
  if (wordCount >= 60) score += 8;
  if (text.includes(',')) score += 3;
  if (text.match(/\b(however|furthermore|moreover|consequently|therefore|additionally|thus)\b/i)) score += 4;

  let hasAgreementError = false;
  // Check common agreement & auxiliary errors
  if (text.match(/\b(he work|she work|it work|he have|she have|they was|we was|did went|did wrote|does likes|doesn't likes)\b/i)) {
    score -= 15;
    hasAgreementError = true;
    feedback.push('⚠️ Detected possible subject-verb concord or auxiliary error (e.g. "he work", "they was", or "did went"). Check your verb inflections!');
  } else {
    feedback.push('✅ Good subject-verb agreement and auxiliary verb usage.');
  }

  // Check academic verbs
  let hasAcademicVerb = false;
  if (text.match(/\b(analyze|demonstrate|indicate|evaluate|investigate|facilitate|implement|mitigate|exacerbate|constitute|allocate|sustain|illustrate|derive|enhance|prioritize)\w*\b/i)) {
    score += 5;
    hasAcademicVerb = true;
    feedback.push('✅ Excellent incorporation of high-level academic verbs!');
  }

  // Check gerund / infinitive patterns
  if (text.match(/\b(suggest to|enjoy to|avoid to)\b/i)) {
    score -= 10;
    feedback.push('⚠️ Watch out for catenative verb errors: "suggest", "enjoy", and "avoid" take gerunds (-ing), not to-infinitives.');
  }

  if (!text.match(/[.!?]$/)) {
    feedback.push('⚠️ Ensure your final sentence concludes with appropriate terminal punctuation.');
  }

  return {
    score: Math.min(98, Math.max(55, score)),
    feedback,
    hasAgreementError,
    hasAcademicVerb,
  };
}

export default function VerbWritingPage() {
  const {
    getPartOfSpeechProgress,
    completePartOfSpeechStage,
    incrementPartOfSpeechWriting,
    recordPartOfSpeechWeakArea,
  } = useProgress();

  const tasks = verbWritingTasks;
  const verbProgress = getPartOfSpeechProgress('verb');

  const [currentIdx, setCurrentIdx] = useState(0);
  const [submission, setSubmission] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [assessment, setAssessment] = useState<{
    score: number;
    feedback: string[];
    hasAgreementError: boolean;
    hasAcademicVerb: boolean;
  } | null>(null);

  const task = tasks[currentIdx];
  const wordCount = countWords(submission);

  const handleSubmit = () => {
    if (!submission.trim() || submitted) return;
    const result = assessVerbWriting(submission);
    setAssessment(result);
    setSubmitted(true);
    incrementPartOfSpeechWriting('verb');

    if (result.hasAgreementError) {
      recordPartOfSpeechWeakArea('verb', 'subject-verb-agreement');
    }
  };

  const handleNext = () => {
    if (currentIdx < tasks.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSubmission('');
      setSubmitted(false);
      setAssessment(null);
    } else {
      completePartOfSpeechStage('verb', 'writing', tasks.length, 85);
    }
  };

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
          <span className="text-foreground font-medium">Writing</span>
        </div>

        {/* Stage progress */}
        <div className="mb-6">
          <StageProgressBar
            currentStage="writing"
            completedStages={verbProgress?.stages ?? {}}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              Task {currentIdx + 1} of {tasks.length}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground capitalize">
              {task.type.replace('-', ' ')}
            </span>
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            🎯 Level: {task.level}
          </span>
        </div>

        {/* Task Card */}
        <div className="glass-card rounded-3xl p-8 mb-6 border border-border">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Writing Prompt:
            </p>
            <p className="text-lg sm:text-xl font-bold text-foreground leading-relaxed mb-3">
              {task.prompt}
            </p>
            <div className="p-4 bg-muted/40 rounded-2xl border border-border text-xs text-foreground space-y-1">
              <p className="font-bold text-primary">Instructions:</p>
              <p>{task.instructions}</p>
            </div>
          </div>

          {/* Assessment Criteria */}
          <div className="mb-6">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Assessment Checklist:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {task.assessmentCriteria.map((crit, cIdx) => (
                <div key={cIdx} className="p-2.5 bg-card rounded-xl border border-border flex items-start gap-2">
                  <span className="text-primary font-bold">✓</span>
                  <span>{crit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Writing Area */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Your Written Response:
              </label>
              <span className={`text-xs font-mono font-semibold ${
                task.wordLimit && wordCount > task.wordLimit ? 'text-destructive' : 'text-primary'
              }`}>
                {wordCount} words {task.wordLimit ? `/ ${task.wordLimit} max` : ''}
              </span>
            </div>
            <textarea
              rows={6}
              value={submission}
              onChange={(e) => setSubmission(e.target.value)}
              disabled={submitted}
              placeholder="Compose your structured response here..."
              className="w-full p-4 rounded-2xl border border-border bg-card text-foreground font-medium outline-none focus:border-primary transition-colors resize-none leading-relaxed text-sm"
            />
          </div>

          {/* Action Row */}
          <div className="flex justify-end gap-3">
            {!submitted ? (
              <button
                id="submit-verb-writing-btn"
                onClick={handleSubmit}
                disabled={wordCount < 10}
                className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-2xl text-sm hover:opacity-90 transition-opacity disabled:opacity-40 flex items-center gap-2 shadow-lg shadow-primary/20"
              >
                <Send size={15} /> Submit for Analysis
              </button>
            ) : (
              <button
                id="next-verb-writing-btn"
                onClick={handleNext}
                className="px-6 py-3 bg-secondary text-secondary-foreground font-semibold rounded-2xl text-sm hover:opacity-90 transition-opacity flex items-center gap-2 shadow-lg shadow-secondary/20 animate-scale-in"
              >
                {currentIdx < tasks.length - 1 ? 'Next Writing Task →' : 'Continue to Final Test 🎉'}
              </button>
            )}
          </div>

          {/* Diagnostic Writing Analysis */}
          {submitted && assessment && (
            <div className="mt-6 space-y-4 pt-6 border-t border-border animate-fade-in text-xs">
              <div className="p-4 bg-secondary/10 border border-secondary/20 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 font-bold text-secondary text-sm">
                    <Sparkles size={16} />
                    <span>Writing Diagnostics & Feedback</span>
                  </div>
                  <p className="text-muted-foreground mt-0.5">Evaluation Score</p>
                </div>
                <div className="text-2xl font-bold text-secondary">{assessment.score}%</div>
              </div>

              <div className="space-y-1.5">
                {assessment.feedback.map((f, fIdx) => (
                  <div key={fIdx} className="p-3 bg-card rounded-xl border border-border text-foreground">
                    {f}
                  </div>
                ))}
              </div>

              {/* Sample 5-Part Model Analysis */}
              {task.sampleAnalysis && (
                <div className="p-5 bg-card border border-border rounded-2xl space-y-3">
                  <p className="font-bold text-primary text-sm">
                    🔍 Diagnostic Case Study Analysis:
                  </p>
                  <div className="space-y-2">
                    <div>
                      <span className="font-bold text-destructive">Draft Sentence: </span>
                      <span className="line-through text-muted-foreground">"{task.sampleAnalysis.original}"</span>
                    </div>
                    <div>
                      <span className="font-bold text-amber-500">Grammar Problem: </span>
                      <span className="text-foreground">{task.sampleAnalysis.problem}</span>
                    </div>
                    <div>
                      <span className="font-bold text-primary">Correction & Explanation: </span>
                      <span className="text-foreground">{task.sampleAnalysis.explanation}</span>
                    </div>
                    <div className="p-3 bg-secondary/5 border border-secondary/20 rounded-xl">
                      <span className="font-bold text-secondary">Band 9.0 Optimized Version: </span>
                      <p className="text-foreground font-semibold mt-1">"{task.sampleAnalysis.improvedVersion}"</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between text-sm">
          <Link
            href="/parts-of-speech/verb/speaking"
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            ← Stage 7: Speaking
          </Link>
          <Link
            href="/parts-of-speech/verb/test"
            className="text-primary hover:text-primary/80 font-medium flex items-center gap-1"
          >
            Stage 9: Final Test →
          </Link>
        </div>
      </div>
    </main>
  );
}
