'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Send, CheckCircle, Sparkles, AlertCircle } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar } from '@/components/ProgressIndicators';
import { useProgress } from '@/contexts/ProgressContext';
import { adverbWritingTasks } from '@/data/parts-of-speech/adverb';

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function assessAdverbWriting(text: string): {
  score: number;
  feedback: string[];
  hasAdverbError: boolean;
  hasAcademicAdverb: boolean;
} {
  const feedback: string[] = [];
  let score = 74;
  const wordCount = countWords(text);

  if (wordCount >= 30) score += 8;
  if (wordCount >= 60) score += 8;
  if (text.includes(',')) score += 3;
  if (text.match(/\b(however|furthermore|moreover|consequently|therefore|additionally|thus|nevertheless)\b/i)) score += 4;

  let hasAdverbError = false;

  // Check double comparatives with adverbs
  if (text.match(/\b(more faster|more harder|more better|more slower|most fastest|most hardest|most best)\b/i)) {
    score -= 15;
    hasAdverbError = true;
    feedback.push('⚠️ Detected double comparative/superlative error (e.g., "more faster" or "most best"). Single-syllable adverbs take -er/-est without "more" or "most".');
  } else {
    feedback.push('✅ Accurate comparative and superlative adverb morphology.');
  }

  // Check confusing pairs (e.g. worked hardly)
  if (text.match(/\b(worked hardly|studies hardly|tries hardly)\b/i)) {
    score -= 12;
    hasAdverbError = true;
    feedback.push('⚠️ Confusing pair error: "hardly" means "almost not". Use "hard" to express energetic or diligent effort ("worked hard").');
  }

  // Check adjective used as manner adverb
  if (text.match(/\b(drives careful|learns quick|sings beautiful|speaks fluent|works efficient)\b/i)) {
    score -= 10;
    hasAdverbError = true;
    feedback.push('⚠️ Adjective vs Adverb error: Use an adverb of manner ending in -ly (e.g., "carefully", "quickly", "beautifully", "fluently") to modify action verbs.');
  }

  // Check extreme modifiers with "very"
  if (text.match(/\b(very completely|very entirely|very universally|very absolutely)\b/i)) {
    score -= 8;
    feedback.push('⚠️ Non-gradable adverbs should not pair with "very". Use "almost completely" or simply let the absolute modifier stand alone.');
  }

  // Check high-impact academic adverbs
  let hasAcademicAdverb = false;
  if (text.match(/\b(significantly|considerably|substantially|gradually|dramatically|steadily|approximately|relatively|predominantly|primarily|increasingly|potentially|arguably|effectively|efficiently|accurately|carefully|roughly)\b/i)) {
    score += 6;
    hasAcademicAdverb = true;
    feedback.push('✅ Superb integration of high-impact IELTS academic adverbs!');
  }

  if (!text.match(/[.!?]$/)) {
    feedback.push('⚠️ Ensure your writing concludes with standard terminal punctuation.');
  }

  return {
    score: Math.min(98, Math.max(55, score)),
    feedback,
    hasAdverbError,
    hasAcademicAdverb,
  };
}

export default function AdverbWritingPage() {
  const {
    getPartOfSpeechProgress,
    completePartOfSpeechStage,
    incrementPartOfSpeechWriting,
    recordPartOfSpeechWeakArea,
  } = useProgress();

  const tasks = adverbWritingTasks;
  const adverbProgress = getPartOfSpeechProgress('adverb');

  const [currentIdx, setCurrentIdx] = useState(0);
  const [submission, setSubmission] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [assessment, setAssessment] = useState<{
    score: number;
    feedback: string[];
    hasAdverbError: boolean;
    hasAcademicAdverb: boolean;
  } | null>(null);

  const task = tasks[currentIdx];
  const wordCount = countWords(submission);

  const handleSubmit = () => {
    if (!submission.trim() || submitted) return;
    const result = assessAdverbWriting(submission);
    setAssessment(result);
    setSubmitted(true);
    incrementPartOfSpeechWriting('adverb');

    if (result.hasAdverbError) {
      recordPartOfSpeechWeakArea('adverb', 'adjective-vs-adverb');
    }
  };

  const handleNext = () => {
    if (currentIdx < tasks.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSubmission('');
      setSubmitted(false);
      setAssessment(null);
    } else {
      completePartOfSpeechStage('adverb', 'writing', tasks.length, 85);
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
          <Link href="/parts-of-speech/adverb" className="hover:text-foreground transition-colors">Adverb</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">Writing</span>
        </div>

        {/* Stage progress */}
        <div className="mb-6">
          <StageProgressBar
            currentStage="writing"
            completedStages={adverbProgress?.stages ?? {}}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              Task {currentIdx + 1} of {tasks.length}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground capitalize">
              Level: {task.level}
            </span>
          </div>
          {task.topic && (
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 capitalize">
              Topic: {task.topic}
            </span>
          )}
        </div>

        {/* Task Card */}
        <div className="glass-card rounded-3xl p-8 border border-border space-y-6 mb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Writing Prompt &amp; Task Instructions:
            </p>
            <h2 className="text-lg font-bold text-foreground leading-relaxed">
              {task.task}
            </h2>
          </div>

          {/* Target Adverbs & Guidance */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {task.targetAdverbs && task.targetAdverbs.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-cyan-500/5 border border-cyan-500/20">
                <p className="font-bold text-cyan-600 dark:text-cyan-400 mb-1">
                  🚀 Recommended Target Adverbs:
                </p>
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {task.targetAdverbs.map((adv, aIdx) => (
                    <span key={aIdx} className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 font-medium">
                      {adv}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {task.grammarFocus && (
              <div className="p-3.5 rounded-2xl bg-primary/5 border border-primary/20">
                <p className="font-bold text-primary mb-1">🎯 Grammar Focus:</p>
                <p className="text-muted-foreground font-medium">{task.grammarFocus}</p>
              </div>
            )}
          </div>

          {/* Text Editor Area */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <label htmlFor="adv-writing-input" className="font-semibold">
                Your Written Response:
              </label>
              <span>{wordCount} words (Target: {task.minWords || 30}+ words)</span>
            </div>

            <textarea
              id="adv-writing-input"
              rows={6}
              disabled={submitted}
              value={submission}
              onChange={(e) => setSubmission(e.target.value)}
              placeholder="Compose your response here incorporating the targeted adverbs and collocations..."
              className="w-full p-4 rounded-2xl border border-border bg-card text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:border-primary transition-colors resize-none leading-relaxed"
            />
          </div>

          {/* Diagnostic Assessment Panel after submission */}
          {submitted && assessment && (
            <div className="space-y-4 pt-4 border-t border-border/50 animate-fade-in-up">
              {/* Score Header */}
              <div className="flex items-center justify-between p-4 rounded-2xl bg-primary/10 border border-primary/20">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Automated Grammatical Diagnostic Score
                  </span>
                  <p className="text-2xl font-bold text-foreground mt-0.5">
                    {assessment.score} / 100
                  </p>
                </div>
                <div className="text-3xl">
                  {assessment.score >= 85 ? '🌟' : assessment.score >= 70 ? '🎯' : '📝'}
                </div>
              </div>

              {/* Feedback Points */}
              <div className="p-4 rounded-2xl bg-card border border-border space-y-2 text-xs">
                <p className="font-bold text-foreground">Grammar &amp; Modifier Assessment Analysis:</p>
                <ul className="space-y-1.5 text-muted-foreground">
                  {assessment.feedback.map((item, fIdx) => (
                    <li key={fIdx} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 5-Part Diagnostic Case Study */}
              {task.caseStudy && (
                <div className="p-5 rounded-2xl bg-muted/40 border border-border space-y-3 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-primary">
                    <Sparkles size={14} />
                    <span>Examiner Diagnostic Case Study &amp; Model Rectification</span>
                  </div>

                  <div className="space-y-2">
                    <div className="p-2.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive">
                      <span className="font-bold block mb-0.5">Original (Flawed):</span>
                      <span>❌ &ldquo;{task.caseStudy.original}&rdquo;</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-200">
                      <span className="font-bold block mb-0.5">Grammatical Problem:</span>
                      <span>{task.caseStudy.problem}</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-secondary/10 border border-secondary/20 text-secondary">
                      <span className="font-bold block mb-0.5">Grammatical Correction:</span>
                      <span>✅ &ldquo;{task.caseStudy.correction}&rdquo;</span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-card border border-border text-muted-foreground">
                      <span className="font-bold text-foreground block mb-0.5">Why the Correction is Necessary:</span>
                      <span>{task.caseStudy.explanation}</span>
                    </div>

                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-foreground">
                      <span className="font-bold text-primary block mb-0.5">Band 9.0 Academic Upgrade:</span>
                      <span className="italic">&ldquo;{task.caseStudy.improvedVersion}&rdquo;</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Action button */}
          <div className="pt-2">
            {!submitted ? (
              <button
                id="submit-adv-writing-btn"
                disabled={!submission.trim()}
                onClick={handleSubmit}
                className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity disabled:opacity-40 shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              >
                <Send size={16} /> Submit &amp; Analyze Writing
              </button>
            ) : (
              <button
                id="next-adv-writing-btn"
                onClick={handleNext}
                className="w-full py-3.5 rounded-2xl bg-secondary text-secondary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-secondary/20"
              >
                {currentIdx < tasks.length - 1 ? 'Next Writing Task →' : 'Complete Writing Stage 🏆'}
              </button>
            )}
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between text-sm">
          <Link
            href="/parts-of-speech/adverb/speaking"
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <ChevronLeft size={16} /> Stage 7: Speaking
          </Link>
          <Link
            href="/parts-of-speech/adverb/test"
            className="text-primary hover:underline font-medium flex items-center gap-1"
          >
            Stage 9: Final Test <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
