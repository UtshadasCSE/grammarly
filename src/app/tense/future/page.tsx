'use client';

import Link from 'next/link';
import { ChevronRight, Lock } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LinearProgress } from '@/components/ProgressIndicators';
import { NavControls } from '@/components/NavControls';
import { useProgress } from '@/contexts/ProgressContext';
import type { FutureTenseId } from '@/types';

const tenseCards = [
  {
    id: 'future-simple' as FutureTenseId,
    name: 'Future Simple',
    banglaName: 'সাধারণ ভবিষ্যৎ কাল',
    formula: 'Subject + will + V1',
    uses: ['predictions', 'spontaneous decisions', 'promises', 'offers', 'future facts'],
    difficulty: 'Beginner',
    color: 'indigo',
    gradientFrom: 'bg-primary',
    gradientTo: '',
    bgClass: 'bg-primary/10 dark:bg-primary/10',
    textClass: 'text-primary dark:text-primary',
    borderClass: 'border-primary/20',
    icon: '🔮',
  },
  {
    id: 'future-continuous' as FutureTenseId,
    name: 'Future Continuous',
    banglaName: 'চলমান ভবিষ্যৎ কাল',
    formula: 'Subject + will be + V-ing',
    uses: ['actions in progress at a future time', 'expected activity', 'ongoing future actions'],
    difficulty: 'Intermediate',
    color: 'emerald',
    gradientFrom: 'bg-primary',
    gradientTo: '',
    bgClass: 'bg-secondary/10 dark:bg-secondary/10',
    textClass: 'text-secondary dark:text-secondary',
    borderClass: 'border-secondary/20',
    icon: '🚀',
  },
  {
    id: 'future-perfect' as FutureTenseId,
    name: 'Future Perfect',
    banglaName: 'পুরাঘটিত ভবিষ্যৎ কাল',
    formula: 'Subject + will have + V3',
    uses: ['completed action before a future point', 'deadlines', 'sequence of future events'],
    difficulty: 'Advanced',
    color: 'violet',
    gradientFrom: 'bg-primary',
    gradientTo: '',
    bgClass: 'bg-primary/10 dark:bg-primary/10',
    textClass: 'text-primary dark:text-primary',
    borderClass: 'border-primary/20',
    icon: '✅',
  },
  {
    id: 'future-perfect-continuous' as FutureTenseId,
    name: 'Future Perfect Continuous',
    banglaName: 'পুরাঘটিত চলমান ভবিষ্যৎ কাল',
    formula: 'Subject + will have been + V-ing',
    uses: ['duration up to a future point', 'ongoing actions before a future deadline', 'continuous development'],
    difficulty: 'Advanced',
    color: 'rose',
    gradientFrom: 'bg-primary',
    gradientTo: '',
    bgClass: 'bg-primary/10 dark:bg-primary/10',
    textClass: 'text-primary dark:text-primary',
    borderClass: 'border-primary/20',
    icon: '⏳',
  },
];

const difficultyColors: Record<string, string> = {
  'Beginner': 'bg-secondary/10 text-secondary dark:text-secondary border-secondary/20',
  'Intermediate': 'bg-secondary/10 text-secondary dark:text-secondary border-secondary/20',
  'Advanced': 'bg-primary/10 text-primary dark:text-primary border-primary/20',
};

export default function FutureTensePage() {
  const { progress } = useProgress();

  return (
    <main className="min-h-screen hero-gradient px-4 py-16">
      <ThemeToggle />

      <div className="w-full max-w-3xl mx-auto animate-fade-in-up">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/tense/tense" className="hover:text-foreground transition-colors">Tense</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">Future Tense</span>
        </div>

        {/* Heading */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl">🔮</span>
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground">Future Tense</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Master the four major future tenses through grammar, vocabulary, speaking, writing, and IELTS-style practice.
          </p>
        </div>

        {/* Tense cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {tenseCards.map((tense, idx) => {
            const tenseProgress = progress.tenses[tense.id];
            const prog = tenseProgress?.overallProgress ?? 0;

            return (
              <Link
                id={`future-tense-card-${tense.id}`}
                key={tense.id}
                href={`/tense/future/${tense.id}`}
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
                      className={`h-full bg-primary rounded-full transition-all duration-700`}
                      style={{ width: `${prog}%` }}
                    />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <NavControls backHref="/tense/tense" backLabel="Back to Topics" />
      </div>
    </main>
  );
}
