'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar } from '@/components/ProgressIndicators';
import { NavControls } from '@/components/NavControls';
import { useProgress } from '@/contexts/ProgressContext';
import type { TenseId } from '@/types';
import { presentSimpleLesson } from '@/data/lessons/presentSimple';
import { presentContinuousLesson } from '@/data/lessons/presentContinuous';
import { presentPerfectLesson } from '@/data/lessons/presentPerfect';
import { presentPerfectContinuousLesson } from '@/data/lessons/presentPerfectContinuous';
import { pastSimpleLesson } from '@/data/lessons/pastSimple';
import { pastContinuousLesson } from '@/data/lessons/pastContinuous';
import { pastPerfectLesson } from '@/data/lessons/pastPerfect';
import { pastPerfectContinuousLesson } from '@/data/lessons/pastPerfectContinuous';
import type { TenseLesson, SentencePart } from '@/types';

const lessons: Partial<Record<TenseId, TenseLesson>> = {
  // Present tenses
  simple: presentSimpleLesson,
  continuous: presentContinuousLesson,
  perfect: presentPerfectLesson,
  'perfect-continuous': presentPerfectContinuousLesson,
  // Past tenses
  'past-simple': pastSimpleLesson,
  'past-continuous': pastContinuousLesson,
  'past-perfect': pastPerfectLesson,
  'past-perfect-continuous': pastPerfectContinuousLesson,
};

function SentenceBuilder({ parts }: { parts: SentencePart[] }) {
  const [activePart, setActivePart] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {/* Interactive sentence */}
      <div className="flex flex-wrap gap-2 items-center">
        {parts.map((part, idx) => (
          <button
            key={idx}
            id={`sentence-part-${idx}`}
            onClick={() => setActivePart(activePart === idx ? null : idx)}
            className={`sentence-part text-sm transition-all duration-200 ${
              activePart === idx ? 'ring-2 ring-offset-2 ring-offset-background shadow-lg scale-105' : ''
            }`}
            style={{
              backgroundColor: `${part.color}18`,
              color: part.color,
              borderColor: activePart === idx ? part.color : 'transparent',
            }}
          >
            {part.text}
          </button>
        ))}
      </div>

      {/* Explanation panel */}
      {activePart !== null && (
        <div
          className="p-4 rounded-2xl border animate-scale-in"
          style={{
            backgroundColor: `${parts[activePart].color}10`,
            borderColor: `${parts[activePart].color}30`,
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="p-2 rounded-xl shrink-0"
              style={{ backgroundColor: `${parts[activePart].color}20` }}
            >
              <span className="text-sm font-mono font-bold" style={{ color: parts[activePart].color }}>
                {parts[activePart].text}
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                {parts[activePart].role}
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                {parts[activePart].explanation}
              </p>
            </div>
          </div>
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        👆 Click any word to understand its grammatical role.
      </p>
    </div>
  );
}

interface Params {
  tenseId: string;
}

export default function LearnPage({ params }: { params: Promise<Params> }) {
  const { tenseId } = use(params);
  const { progress, completeStage } = useProgress();
  const [banglaVisible, setBanglaVisible] = useState(false);
  const [usesExpanded, setUsesExpanded] = useState<number[]>([0]);

  const tId = tenseId as TenseId;
  const lesson = lessons[tId];
  const tenseProgress = progress.tenses[tId];

  if (!lesson) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Lesson not found.</p>
      </main>
    );
  }

  const handleComplete = () => {
    completeStage(tId, 'learn', 100, 100);
  };

  const toggleUse = (idx: number) => {
    setUsesExpanded((prev) =>
      prev.includes(idx) ? prev.filter((i) => i !== idx) : [...prev, idx]
    );
  };

  const difficultyColors: Record<string, string> = {
    Beginner: 'bg-secondary/10 text-secondary dark:text-secondary border-secondary/20',
    Intermediate: 'bg-secondary/10 text-secondary dark:text-secondary border-secondary/20',
    Advanced: 'bg-primary/10 text-primary dark:text-primary border-primary/20',
  };

  return (
    <main className="min-h-screen hero-gradient px-4 py-16">
      <ThemeToggle />

      <div className="w-full max-w-2xl mx-auto animate-fade-in-up">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
          <Link href="/tense/present" className="hover:text-foreground transition-colors">Present</Link>
          <ChevronRight size={14} />
          <Link href={`/tense/present/${tId}`} className="hover:text-foreground transition-colors">{lesson.name}</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">Learn</span>
        </div>

        {/* Stage progress */}
        <div className="mb-8">
          <StageProgressBar
            currentStage="learn"
            completedStages={tenseProgress?.stages ?? {}}
          />
        </div>

        {/* Lesson header */}
        <div className="glass-card rounded-3xl p-7 mb-6 border border-border">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-3xl">{lesson.icon}</span>
                <h1 className="text-2xl font-bold text-foreground">{lesson.name}</h1>
              </div>
              <p className="text-muted-foreground text-sm">{lesson.banglaName}</p>
            </div>
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${difficultyColors[lesson.difficulty]}`}>
              {lesson.difficulty}
            </span>
          </div>

          {/* Introduction */}
          <p className="text-foreground leading-relaxed mb-3">{lesson.introduction}</p>

          <button
            id="toggle-bangla-btn"
            onClick={() => setBanglaVisible(!banglaVisible)}
            className="text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
          >
            {banglaVisible ? '▲ Hide Bangla explanation' : '▼ Show Bangla explanation (বাংলায় দেখুন)'}
          </button>

          {banglaVisible && (
            <div className="mt-3 p-4 bg-primary/5 rounded-xl border border-primary/10 animate-scale-in">
              <p className="text-foreground text-sm leading-relaxed font-medium" dir="ltr">
                {lesson.introductionBangla}
              </p>
            </div>
          )}
        </div>

        {/* Formula */}
        <div className="glass-card rounded-3xl p-7 mb-6 border border-border">
          <h2 className="text-lg font-bold text-foreground mb-4">📐 Formula</h2>
          <div className="space-y-3">
            {[
              { label: '✅ Positive', formula: lesson.formula.positive, color: 'emerald' },
              { label: '❌ Negative', formula: lesson.formula.negative, color: 'rose' },
              { label: '❓ Question', formula: lesson.formula.question, color: 'amber' },
              { label: '🔍 WH Question', formula: lesson.formula.whQuestion, color: 'blue' },
            ].map(({ label, formula, color }) => (
              <div key={label} className={`flex items-start gap-3 p-3 rounded-xl bg-${color}-500/5 border border-${color}-500/10`}>
                <span className="text-xs font-semibold text-muted-foreground whitespace-nowrap pt-0.5">{label}</span>
                <code className={`text-sm font-mono text-${color}-600 dark:text-${color}-400 font-bold flex-1`}>{formula}</code>
              </div>
            ))}
          </div>
        </div>

        {/* Examples */}
        <div className="glass-card rounded-3xl p-7 mb-6 border border-border">
          <h2 className="text-lg font-bold text-foreground mb-5">📝 Examples</h2>
          <div className="space-y-5">
            {/* Positive */}
            <div>
              <h3 className="text-sm font-semibold text-secondary dark:text-secondary mb-2">✅ Positive</h3>
              <div className="space-y-2">
                {lesson.positiveExamples.map((ex) => (
                  <div key={ex} className="bg-secondary/5 border border-secondary/10 rounded-xl px-4 py-2.5">
                    <p className="text-sm text-foreground">{ex}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Negative */}
            <div>
              <h3 className="text-sm font-semibold text-primary dark:text-primary mb-2">❌ Negative</h3>
              <div className="space-y-2">
                {lesson.negativeExamples.map((ex) => (
                  <div key={ex} className="bg-primary/5 border border-primary/10 rounded-xl px-4 py-2.5">
                    <p className="text-sm text-foreground">{ex}</p>
                  </div>
                ))}
              </div>
            </div>
            {/* Questions */}
            <div>
              <h3 className="text-sm font-semibold text-secondary dark:text-secondary mb-2">❓ Questions</h3>
              <div className="space-y-2">
                {lesson.questionExamples.map((ex) => (
                  <div key={ex} className="bg-secondary/5 border border-secondary/10 rounded-xl px-4 py-2.5">
                    <p className="text-sm text-foreground">{ex}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Uses */}
        <div className="glass-card rounded-3xl p-7 mb-6 border border-border">
          <h2 className="text-lg font-bold text-foreground mb-4">🎯 When to Use It</h2>
          <div className="space-y-3">
            {lesson.uses.map((use, idx) => (
              <button
                key={idx}
                id={`use-${idx}`}
                onClick={() => toggleUse(idx)}
                className="w-full text-left p-4 rounded-xl border border-border hover:border-primary/30 bg-card hover:bg-primary/5 transition-all duration-200 group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-primary bg-primary/10 rounded-lg px-2 py-1">
                      {idx + 1}
                    </span>
                    <span className="font-semibold text-foreground text-sm">{use.title}</span>
                  </div>
                  {usesExpanded.includes(idx) ? (
                    <ChevronUp size={16} className="text-muted-foreground" />
                  ) : (
                    <ChevronDown size={16} className="text-muted-foreground" />
                  )}
                </div>
                {usesExpanded.includes(idx) && (
                  <div className="mt-3 pl-8 space-y-2 animate-scale-in">
                    <p className="text-sm text-muted-foreground">{use.explanation}</p>
                    <div className="bg-primary/5 border border-primary/10 rounded-lg px-3 py-2">
                      <p className="text-sm text-foreground italic">"{use.example}"</p>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Signal Words */}
        <div className="glass-card rounded-3xl p-7 mb-6 border border-border">
          <h2 className="text-lg font-bold text-foreground mb-3">💡 Signal Words</h2>
          <div className="flex flex-wrap gap-2 mb-4">
            {lesson.signalWords.map((word) => (
              <span
                key={word}
                className="text-sm px-3 py-1.5 bg-primary/10 text-primary border border-primary/20 rounded-full font-medium"
              >
                {word}
              </span>
            ))}
          </div>
          <div className="p-3 bg-secondary/5 border border-secondary/15 rounded-xl">
            <p className="text-sm text-secondary dark:text-secondary">
              ⚠️ <strong>Note:</strong> {lesson.signalWordsNote}
            </p>
          </div>
        </div>

        {/* Interactive Sentence Builder */}
        <div className="glass-card rounded-3xl p-7 mb-6 border border-border">
          <h2 className="text-lg font-bold text-foreground mb-2">🏗️ Interactive Sentence Builder</h2>
          <p className="text-sm text-muted-foreground mb-5">
            Tap each part of the sentence to understand its grammatical role.
          </p>
          <SentenceBuilder parts={lesson.interactiveSentence} />
        </div>

        {/* Complete & Continue */}
        <div className="glass-card rounded-3xl p-6 border border-secondary/20 bg-secondary/5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-foreground">Ready to Practice?</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                You&apos;ve reviewed the lesson. Now test your understanding!
              </p>
            </div>
            <Link
              id="start-practice-btn"
              href={`/tense/present/${tId}/practice`}
              onClick={handleComplete}
              className="flex items-center gap-2 px-5 py-3 bg-secondary text-white rounded-xl font-semibold text-sm hover:bg-secondary hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shadow-secondary/25 shrink-0"
            >
              Start Practice
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>

        <NavControls
          backHref={`/tense/present/${tId}`}
          backLabel={`Back to ${lesson.name}`}
        />
      </div>
    </main>
  );
}
