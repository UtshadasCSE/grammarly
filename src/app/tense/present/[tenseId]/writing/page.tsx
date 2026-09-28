'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Send, CheckCircle } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar } from '@/components/ProgressIndicators';
import { useProgress } from '@/contexts/ProgressContext';
import type { TenseId } from '@/types';
import { writingTasks } from '@/data/speaking/speakingAndWriting';
import { pastWritingTasks } from '@/data/speaking/pastSpeakingAndWriting';
import type { WritingTask } from '@/types';

// Merge all writing tasks
const allWritingTasks: WritingTask[] = [...writingTasks, ...pastWritingTasks];

const tenseNames: Partial<Record<TenseId, string>> = {
  simple: 'Present Simple',
  continuous: 'Present Continuous',
  perfect: 'Present Perfect',
  'perfect-continuous': 'Present Perfect Continuous',
  'past-simple': 'Past Simple',
  'past-continuous': 'Past Continuous',
  'past-perfect': 'Past Perfect',
  'past-perfect-continuous': 'Past Perfect Continuous',
};

const taskTypeLabels: Record<string, string> = {
  sentence: 'Sentence Writing',
  transformation: 'Sentence Transformation',
  paragraph: 'Paragraph Writing',
  task1: 'IELTS Task 1',
  task2: 'IELTS Task 2',
};

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function assessGrammar(text: string, tenseId: TenseId): {
  score: number;
  feedback: string[];
} {
  const feedback: string[] = [];
  let score = 70; // base score

  // Simple heuristic checks
  if (text.length > 100) score += 10;
  if (text.includes(',')) score += 5;
  if (text.includes(';') || text.includes(':')) score += 5;
  if (text.match(/\b(however|furthermore|moreover|consequently|therefore)\b/i)) score += 10;

  // Tense-specific checks
  if (tenseId === 'perfect' && text.match(/\bhave\s+\w+ed\b|\bhas\s+\w+ed\b|\bhave\s+been\b/i)) {
    score += 10;
    feedback.push('✅ Good use of Present Perfect!');
  }
  if (tenseId === 'continuous' && text.match(/\bis\s+\w+ing\b|\bare\s+\w+ing\b/i)) {
    score += 10;
    feedback.push('✅ Good use of Present Continuous!');
  }
  if (tenseId === 'perfect-continuous' && text.match(/\bhave\s+been\s+\w+ing\b|\bhas\s+been\s+\w+ing\b/i)) {
    score += 15;
    feedback.push('✅ Excellent use of Present Perfect Continuous!');
  }

  if (score > 98) score = 98;

  if (!text.match(/[.!?]$/)) feedback.push('⚠️ Make sure sentences end with a period.');
  if (feedback.length === 0) feedback.push('Good attempt! Review your tense usage.');

  return { score: Math.min(98, score), feedback };
}

export default function WritingPage({ params }: { params: Promise<{ tenseId: string }> }) {
  const { tenseId } = use(params);
  const { progress, completeStage, incrementWriting } = useProgress();
  const tId = tenseId as TenseId;
  const tasks = allWritingTasks.filter((t) => t.tense === tId);
  const tenseProgress = progress.tenses[tId];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [text, setText] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<{ score: number; feedback: string[] } | null>(null);
  const [showSample, setShowSample] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<number[]>([]);

  const task = tasks[currentIdx];

  const handleSubmit = () => {
    if (!text.trim() || submitted) return;
    const result = assessGrammar(text, tId);
    setFeedback(result);
    setSubmitted(true);
    setCompletedTasks((prev) => [...new Set([...prev, currentIdx])]);
    incrementWriting(tId);
  };

  const handleNext = () => {
    if (currentIdx < tasks.length - 1) {
      setCurrentIdx((i) => i + 1);
      setText('');
      setSubmitted(false);
      setFeedback(null);
      setShowSample(false);
    } else {
      completeStage(tId, 'writing', completedTasks.length, Math.round((completedTasks.length / tasks.length) * 100));
    }
  };

  if (!task) {
    return (
      <main className="min-h-screen hero-gradient flex items-center justify-center px-4">
        <ThemeToggle />
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">No writing tasks available.</p>
          <Link href={`/tense/present/${tId}/test`} onClick={() => completeStage(tId, 'writing', 0, 0)} className="text-primary hover:underline">
            Continue to Final Test →
          </Link>
        </div>
      </main>
    );
  }

  const wordCount = countWords(text);
  const wordLimit = task.wordLimit ?? 150;

  return (
    <main className="min-h-screen hero-gradient px-4 py-16">
      <ThemeToggle />
      <div className="w-full max-w-2xl mx-auto animate-fade-in-up">

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
          <Link href="/tense/present" className="hover:text-foreground transition-colors">Present</Link>
          <ChevronRight size={14} />
          <Link href={`/tense/present/${tId}`} className="hover:text-foreground transition-colors">{tenseNames[tId]}</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">Writing</span>
        </div>

        <div className="mb-6">
          <StageProgressBar currentStage="writing" completedStages={tenseProgress?.stages ?? {}} />
        </div>

        {/* Task selector */}
        <div className="flex items-center gap-2 mb-6">
          {tasks.map((t, i) => (
            <button
              key={i}
              id={`writing-task-${i}`}
              onClick={() => { if (!submitted) { setCurrentIdx(i); setText(''); setFeedback(null); setShowSample(false); } }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIdx ? 'bg-primary w-8' :
                completedTasks.includes(i) ? 'bg-secondary w-4' : 'bg-muted w-4'
              }`}
            />
          ))}
          <span className="ml-2 text-xs text-muted-foreground">{currentIdx + 1}/{tasks.length}</span>
        </div>

        {/* Task prompt */}
        <div className="glass-card rounded-3xl p-7 border border-border mb-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
              {taskTypeLabels[task.type] ?? task.type}
            </span>
            {task.wordLimit && (
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full border border-border">
                {task.wordLimit}+ words
              </span>
            )}
            {task.timeLimit && (
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full border border-border">
                ⏱ {task.timeLimit} min
              </span>
            )}
          </div>

          <p className="text-base font-semibold text-foreground leading-relaxed mb-4 whitespace-pre-line">
            {task.prompt}
          </p>

          <div className="p-3 bg-muted rounded-xl mb-4">
            <p className="text-xs font-semibold text-muted-foreground mb-1">📋 Instructions</p>
            <p className="text-sm text-foreground">{task.instructions}</p>
          </div>

          <div className="p-3 bg-primary/5 border border-primary/10 rounded-xl">
            <p className="text-xs font-semibold text-primary mb-1">🎯 Target Language</p>
            <p className="text-sm text-foreground">{task.targetTenseUsage}</p>
          </div>
        </div>

        {/* Writing area */}
        <div className="glass-card rounded-3xl p-6 border border-border mb-4">
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-semibold text-foreground">Your Response</label>
            <span className={`text-xs font-mono ${wordCount >= wordLimit ? 'text-secondary dark:text-secondary' : 'text-muted-foreground'}`}>
              {wordCount} / {wordLimit} words
            </span>
          </div>
          <textarea
            id="writing-textarea"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={submitted}
            placeholder="Write your response here. Focus on using the target tense naturally..."
            rows={10}
            className="w-full px-4 py-3 rounded-xl border-2 border-border bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none leading-relaxed"
          />

          {/* Assessment criteria */}
          <div className="mt-4 p-3 bg-muted rounded-xl">
            <p className="text-xs font-semibold text-muted-foreground mb-2">Assessment Focus:</p>
            <div className="flex flex-wrap gap-1.5">
              {task.assessmentCriteria.map((criterion) => (
                <span key={criterion} className="text-xs bg-background border border-border px-2 py-0.5 rounded-full text-foreground">
                  {criterion}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 mt-4">
            {!submitted ? (
              <button
                id="submit-writing-btn"
                onClick={handleSubmit}
                disabled={wordCount < 20}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Send size={15} /> Submit Writing
              </button>
            ) : (
              <button
                id="next-writing-task-btn"
                onClick={handleNext}
                className="flex-1 flex items-center justify-center gap-2 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                {currentIdx < tasks.length - 1 ? 'Next Task' : 'Continue to Final Test'} <ChevronRight size={15} />
              </button>
            )}
          </div>
        </div>

        {/* Feedback */}
        {submitted && feedback && (
          <div className="glass-card rounded-3xl p-6 border border-secondary/20 bg-secondary/5 mb-5 animate-scale-in">
            <div className="flex items-start gap-3 mb-4">
              <CheckCircle size={20} className="text-secondary shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-secondary dark:text-secondary">Writing Submitted!</h3>
                <p className="text-sm text-muted-foreground mt-0.5">Practice Estimate (not an official IELTS score)</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center shrink-0">
                <span className="text-white font-bold text-xl">{feedback.score}</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Practice Score</p>
                <p className="text-xs text-muted-foreground">Keep practising to improve!</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              {feedback.feedback.map((f, i) => (
                <p key={i} className="text-sm text-foreground">{f}</p>
              ))}
            </div>

            {/* Sample answer */}
            {task.sampleAnswer && (
              <div>
                <button
                  id="show-sample-writing-btn"
                  onClick={() => setShowSample(!showSample)}
                  className="flex items-center gap-1.5 text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  {showSample ? '▲ Hide' : '▼ Show'} Sample Answer
                </button>
                {showSample && (
                  <div className="mt-3 p-4 bg-muted rounded-xl border border-border animate-scale-in">
                    <p className="text-xs font-semibold text-muted-foreground mb-2">📝 Sample Answer</p>
                    <p className="text-sm text-foreground leading-relaxed">{task.sampleAnswer}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        <div className="flex items-center mt-6 pt-4 border-t border-border">
          <Link href={`/tense/present/${tId}/speaking`} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group">
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> Back to Speaking
          </Link>
        </div>
      </div>
    </main>
  );
}
