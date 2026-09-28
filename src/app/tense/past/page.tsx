'use client';

import Link from 'next/link';
import { ChevronRight, Lock } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LinearProgress } from '@/components/ProgressIndicators';
import { NavControls } from '@/components/NavControls';
import { useProgress } from '@/contexts/ProgressContext';
import type { PastTenseId } from '@/types';

const tenseCards = [
  {
    id: 'past-simple' as PastTenseId,
    name: 'Past Simple',
    banglaName: 'সাধারণ অতীত কাল',
    formula: 'Subject + V2',
    uses: ['completed actions', 'past habits', 'historical events', 'specific past time', 'narratives'],
    difficulty: 'Beginner',
    color: 'amber',
    gradientFrom: 'from-amber-500',
    gradientTo: 'to-orange-600',
    bgClass: 'bg-amber-500/10 dark:bg-amber-500/10',
    textClass: 'text-amber-600 dark:text-amber-400',
    borderClass: 'border-amber-500/20',
    icon: '📅',
  },
  {
    id: 'past-continuous' as PastTenseId,
    name: 'Past Continuous',
    banglaName: 'চলমান অতীত কাল',
    formula: 'Subject + was/were + V-ing',
    uses: ['ongoing past actions', 'interrupted actions', 'simultaneous actions', 'background narratives'],
    difficulty: 'Intermediate',
    color: 'teal',
    gradientFrom: 'from-teal-500',
    gradientTo: 'to-cyan-600',
    bgClass: 'bg-teal-500/10 dark:bg-teal-500/10',
    textClass: 'text-teal-600 dark:text-teal-400',
    borderClass: 'border-teal-500/20',
    icon: '⏳',
  },
  {
    id: 'past-perfect' as PastTenseId,
    name: 'Past Perfect',
    banglaName: 'পূর্ণ অতীত কাল',
    formula: 'Subject + had + V3',
    uses: ['earlier past action', 'before/by the time', 'cause and effect', 'past-before-past'],
    difficulty: 'Advanced',
    color: 'violet',
    gradientFrom: 'from-violet-500',
    gradientTo: 'to-purple-600',
    bgClass: 'bg-violet-500/10 dark:bg-violet-500/10',
    textClass: 'text-violet-600 dark:text-violet-400',
    borderClass: 'border-violet-500/20',
    icon: '⬅️',
  },
  {
    id: 'past-perfect-continuous' as PastTenseId,
    name: 'Past Perfect Continuous',
    banglaName: 'চলমান পূর্ণ অতীত কাল',
    formula: 'Subject + had been + V-ing',
    uses: ['duration before past event', 'cause of past result', 'ongoing before another past action'],
    difficulty: 'Advanced',
    color: 'pink',
    gradientFrom: 'from-pink-500',
    gradientTo: 'to-rose-600',
    bgClass: 'bg-pink-500/10 dark:bg-pink-500/10',
    textClass: 'text-pink-600 dark:text-pink-400',
    borderClass: 'border-pink-500/20',
    icon: '🔄',
  },
];

const difficultyColors: Record<string, string> = {
  'Beginner': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  'Intermediate': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  'Advanced': 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
};

export default function PastTensePage() {
  const { progress } = useProgress();

  return (
    <main className="min-h-screen hero-gradient px-4 py-16">
      <ThemeToggle />

      <div className="w-full max-w-3xl mx-auto animate-fade-in-up">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/tense" className="hover:text-foreground transition-colors">Tense</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">Past Tense</span>
        </div>

        {/* Heading */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">📖</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Past Tense</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Master the four major past tenses through grammar, vocabulary, speaking, writing, and IELTS-style practice.
          </p>
        </div>

        {/* Tense cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {tenseCards.map((tense, idx) => {
            const tenseProgress = progress.tenses[tense.id];
            const prog = tenseProgress?.overallProgress ?? 0;

            return (
              <Link
                id={`past-tense-card-${tense.id}`}
                key={tense.id}
                href={`/tense/past/${tense.id}`}
                className={`group glass-card rounded-3xl p-6 border ${tense.borderClass} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up`}
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 ${tense.bgClass} rounded-2xl`}>
                    <span className="text-2xl">{tense.icon}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${difficultyColors[tense.difficulty]}`}>
                      {tense.difficulty}
                    </span>
                    <ChevronRight
                      size={18}
                      className={`${tense.textClass} group-hover:translate-x-0.5 transition-transform`}
                    />
                  </div>
                </div>

                {/* Name */}
                <h2 className="text-xl font-bold text-foreground mb-0.5">{tense.name}</h2>
                <p className={`text-xs font-medium mb-3 ${tense.textClass}`}>{tense.banglaName}</p>

                {/* Formula */}
                <code className={`text-xs font-mono px-3 py-1.5 rounded-lg ${tense.bgClass} ${tense.textClass} block mb-4`}>
                  {tense.formula}
                </code>

                {/* Uses */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tense.uses.map((use) => (
                    <span
                      key={use}
                      className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full border border-border"
                    >
                      {use}
                    </span>
                  ))}
                </div>

                {/* Progress */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progress</span>
                    <span className="font-semibold text-foreground">{prog}%</span>
                  </div>
                  <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${tense.gradientFrom} ${tense.gradientTo} rounded-full transition-all duration-700`}
                      style={{ width: `${prog}%` }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <NavControls backHref="/tense" backLabel="Back to Topics" />
      </div>
    </main>
  );
}
