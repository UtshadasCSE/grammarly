'use client';

import Link from 'next/link';
import { ChevronRight, Lock } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LinearProgress } from '@/components/ProgressIndicators';
import { NavControls } from '@/components/NavControls';
import { useProgress } from '@/contexts/ProgressContext';
import type { TenseId } from '@/types';

const tenseCards = [
  {
    id: 'simple' as TenseId,
    name: 'Present Simple',
    banglaName: 'সাধারণ বর্তমান কাল',
    formula: 'Subject + V1 (s/es)',
    uses: ['habits', 'routines', 'facts', 'general truths', 'states', 'opinions', 'scheduled events'],
    difficulty: 'Beginner',
    color: 'indigo',
    gradientFrom: 'from-indigo-500',
    gradientTo: 'to-blue-600',
    bgClass: 'bg-indigo-500/10 dark:bg-indigo-500/10',
    textClass: 'text-indigo-600 dark:text-indigo-400',
    borderClass: 'border-indigo-500/20',
    icon: '🔵',
  },
  {
    id: 'continuous' as TenseId,
    name: 'Present Continuous',
    banglaName: 'চলমান বর্তমান কাল',
    formula: 'Subject + am/is/are + V-ing',
    uses: ['actions now', 'temporary situations', 'current trends', 'changing situations', 'future arrangements'],
    difficulty: 'Beginner',
    color: 'emerald',
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-teal-600',
    bgClass: 'bg-emerald-500/10 dark:bg-emerald-500/10',
    textClass: 'text-emerald-600 dark:text-emerald-400',
    borderClass: 'border-emerald-500/20',
    icon: '🟢',
  },
  {
    id: 'perfect' as TenseId,
    name: 'Present Perfect',
    banglaName: 'পুর্ণ বর্তমান কাল',
    formula: 'Subject + have/has + V3',
    uses: ['life experiences', 'recent actions', 'unfinished time', 'past-to-present connections', 'present results'],
    difficulty: 'Intermediate',
    color: 'violet',
    gradientFrom: 'from-violet-500',
    gradientTo: 'to-purple-600',
    bgClass: 'bg-violet-500/10 dark:bg-violet-500/10',
    textClass: 'text-violet-600 dark:text-violet-400',
    borderClass: 'border-violet-500/20',
    icon: '🟣',
  },
  {
    id: 'perfect-continuous' as TenseId,
    name: 'Present Perfect Continuous',
    banglaName: 'চলমান পুর্ণ বর্তমান কাল',
    formula: 'Subject + have/has + been + V-ing',
    uses: ['duration', 'ongoing actions', 'recent activity', 'repeated ongoing actions', 'temporary situations'],
    difficulty: 'Advanced',
    color: 'rose',
    gradientFrom: 'from-rose-500',
    gradientTo: 'to-pink-600',
    bgClass: 'bg-rose-500/10 dark:bg-rose-500/10',
    textClass: 'text-rose-600 dark:text-rose-400',
    borderClass: 'border-rose-500/20',
    icon: '🔴',
  },
];

const difficultyColors: Record<string, string> = {
  'Beginner': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  'Intermediate': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  'Advanced': 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
};

export default function PresentTensePage() {
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
          <span className="text-foreground font-medium">Present Tense</span>
        </div>

        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3">Present Tense</h1>
          <p className="text-muted-foreground text-lg">
            Choose a tense to learn and practice.
          </p>
        </div>

        {/* Tense cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {tenseCards.map((tense, idx) => {
            const tenseProgress = progress.tenses[tense.id];
            const prog = tenseProgress?.overallProgress ?? 0;

            return (
              <Link
                id={`tense-card-${tense.id}`}
                key={tense.id}
                href={`/tense/present/${tense.id}`}
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
