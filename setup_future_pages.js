const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');

const futureDir = path.join(srcDir, 'app', 'tense', 'future');
fs.mkdirSync(futureDir, { recursive: true });

const futurePageCode = `'use client';

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
    gradientFrom: 'from-indigo-500',
    gradientTo: 'to-blue-600',
    bgClass: 'bg-indigo-500/10 dark:bg-indigo-500/10',
    textClass: 'text-indigo-600 dark:text-indigo-400',
    borderClass: 'border-indigo-500/20',
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
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-teal-600',
    bgClass: 'bg-emerald-500/10 dark:bg-emerald-500/10',
    textClass: 'text-emerald-600 dark:text-emerald-400',
    borderClass: 'border-emerald-500/20',
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
    gradientFrom: 'from-violet-500',
    gradientTo: 'to-purple-600',
    bgClass: 'bg-violet-500/10 dark:bg-violet-500/10',
    textClass: 'text-violet-600 dark:text-violet-400',
    borderClass: 'border-violet-500/20',
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
    gradientFrom: 'from-rose-500',
    gradientTo: 'to-pink-600',
    bgClass: 'bg-rose-500/10 dark:bg-rose-500/10',
    textClass: 'text-rose-600 dark:text-rose-400',
    borderClass: 'border-rose-500/20',
    icon: '⏳',
  },
];

const difficultyColors: Record<string, string> = {
  'Beginner': 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  'Intermediate': 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  'Advanced': 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
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
                id={\`future-tense-card-\${tense.id}\`}
                key={tense.id}
                href={\`/tense/future/\${tense.id}\`}
                className={\`group glass-card rounded-3xl p-6 border \${tense.borderClass} hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-fade-in-up\`}
                style={{ animationDelay: \`\${idx * 100}ms\` }}
              >
                {/* Top row */}
                <div className="flex items-start justify-between mb-4">
                  <div className={\`p-3 \${tense.bgClass} rounded-2xl\`}>
                    <span className="text-2xl">{tense.icon}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={\`text-xs font-semibold px-2.5 py-1 rounded-full border \${difficultyColors[tense.difficulty]}\`}>
                      {tense.difficulty}
                    </span>
                    <ChevronRight
                      size={18}
                      className={\`\${tense.textClass} group-hover:translate-x-0.5 transition-transform\`}
                    />
                  </div>
                </div>

                {/* Name */}
                <h2 className="text-xl font-bold text-foreground mb-0.5">{tense.name}</h2>
                <p className={\`text-xs font-medium mb-3 \${tense.textClass}\`}>{tense.banglaName}</p>

                {/* Formula */}
                <code className={\`text-xs font-mono px-3 py-1.5 rounded-lg \${tense.bgClass} \${tense.textClass} block mb-4\`}>
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
                      className={\`h-full bg-gradient-to-r \${tense.gradientFrom} \${tense.gradientTo} rounded-full transition-all duration-700\`}
                      style={{ width: \`\${prog}%\` }}
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
`;
fs.writeFileSync(path.join(futureDir, 'page.tsx'), futurePageCode);

const futureTenseDir = path.join(srcDir, 'app', 'tense', 'future', '[tenseId]');
fs.mkdirSync(futureTenseDir, { recursive: true });

const futureTensePageCode = `'use client';

import { use } from 'react';
import Link from 'next/link';
import { ChevronRight, Lock, CheckCircle, BookOpen, PenLine, Target, AlertCircle, Globe, BookMarked, Mic, FileText, Trophy } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LinearProgress } from '@/components/ProgressIndicators';
import { NavControls } from '@/components/NavControls';
import { useProgress } from '@/contexts/ProgressContext';
import type { TenseId, StageId } from '@/types';

const tenseConfig: Partial<Record<TenseId, {
  name: string;
  banglaName: string;
  formula: string;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  textClass: string;
  bgClass: string;
  borderClass: string;
  icon: string;
  nextTense?: TenseId;
}>> = {
  'future-simple': {
    name: 'Future Simple',
    banglaName: 'সাধারণ ভবিষ্যৎ কাল',
    formula: 'Subject + will + V1',
    color: 'indigo',
    gradientFrom: 'from-indigo-500',
    gradientTo: 'to-blue-600',
    textClass: 'text-indigo-600 dark:text-indigo-400',
    bgClass: 'bg-indigo-500/10',
    borderClass: 'border-indigo-500/20',
    icon: '🔮',
    nextTense: 'future-continuous',
  },
  'future-continuous': {
    name: 'Future Continuous',
    banglaName: 'চলমান ভবিষ্যৎ কাল',
    formula: 'Subject + will be + V-ing',
    color: 'emerald',
    gradientFrom: 'from-emerald-500',
    gradientTo: 'to-teal-600',
    textClass: 'text-emerald-600 dark:text-emerald-400',
    bgClass: 'bg-emerald-500/10',
    borderClass: 'border-emerald-500/20',
    icon: '🚀',
    nextTense: 'future-perfect',
  },
  'future-perfect': {
    name: 'Future Perfect',
    banglaName: 'পুরাঘটিত ভবিষ্যৎ কাল',
    formula: 'Subject + will have + V3',
    color: 'violet',
    gradientFrom: 'from-violet-500',
    gradientTo: 'to-purple-600',
    textClass: 'text-violet-600 dark:text-violet-400',
    bgClass: 'bg-violet-500/10',
    borderClass: 'border-violet-500/20',
    icon: '✅',
    nextTense: 'future-perfect-continuous',
  },
  'future-perfect-continuous': {
    name: 'Future Perfect Continuous',
    banglaName: 'পুরাঘটিত চলমান ভবিষ্যৎ কাল',
    formula: 'Subject + will have been + V-ing',
    color: 'rose',
    gradientFrom: 'from-rose-500',
    gradientTo: 'to-pink-600',
    textClass: 'text-rose-600 dark:text-rose-400',
    bgClass: 'bg-rose-500/10',
    borderClass: 'border-rose-500/20',
    icon: '⏳',
  },
};

const stages: { id: StageId; label: string; desc: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { id: 'learn', label: 'Learn', desc: 'Grammar lesson with examples', icon: BookOpen },
  { id: 'practice', label: 'Fill in the Blank', desc: '20 guided + challenge questions', icon: PenLine },
  { id: 'advanced', label: 'Advanced MCQ', desc: '20 IELTS-level multiple choice', icon: Target },
  { id: 'errors', label: 'Error Correction', desc: 'Find and fix grammar errors', icon: AlertCircle },
  { id: 'ielts', label: 'IELTS Context', desc: '10 IELTS-style exercises', icon: Globe },
  { id: 'vocabulary', label: 'Vocabulary', desc: 'Key IELTS words with examples', icon: BookMarked },
  { id: 'speaking', label: 'Speaking', desc: 'Record and practice speaking', icon: Mic },
  { id: 'writing', label: 'Writing', desc: 'IELTS writing exercises', icon: FileText },
  { id: 'test', label: 'Final Test', desc: 'Complete tense assessment', icon: Trophy },
];

export default function TenseHubPage({ params }: { params: Promise<{ tenseId: string }> }) {
  const { tenseId } = use(params);
  const { progress, isStageUnlocked } = useProgress();

  const tId = tenseId as TenseId;
  const config = tenseConfig[tId];
  const tenseProgress = progress.tenses[tId];

  if (!config) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Tense not found.</p>
          <Link href="/tense/future" className="text-primary hover:underline">
            Go back
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen hero-gradient px-4 py-16">
      <ThemeToggle />

      <div className="w-full max-w-2xl mx-auto animate-fade-in-up">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/tense/future" className="hover:text-foreground transition-colors">Future</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">{config.name}</span>
        </div>

        {/* Tense header */}
        <div className={\`glass-card rounded-3xl p-7 border \${config.borderClass} mb-8\`}>
          <div className="flex items-start gap-4">
            <span className="text-4xl">{config.icon}</span>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-0.5">{config.name}</h1>
              <p className={\`text-sm font-medium mb-1 \${config.textClass}\`}>{config.banglaName}</p>
              <code className={\`text-sm font-mono px-3 py-1.5 rounded-lg \${config.bgClass} \${config.textClass} inline-block mt-2\`}>
                {config.formula}
              </code>
              <div className="mt-4">
                <LinearProgress
                  value={tenseProgress?.overallProgress ?? 0}
                  label={\`\${tenseProgress?.overallProgress ?? 0}% Complete\`}
                  colorClass={\`bg-gradient-to-r \${config.gradientFrom} \${config.gradientTo}\`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stage cards */}
        <div className="space-y-3">
          {stages.map((stage, idx) => {
            const isUnlocked = isStageUnlocked(tId, stage.id);
            const isCompleted = tenseProgress?.stages[stage.id]?.completed;
            const isCurrent = !isCompleted && isUnlocked;
            const Icon = stage.icon;

            return (
              <div key={stage.id} className={\`animate-fade-in-up\`} style={{ animationDelay: \`\${idx * 60}ms\` }}>
                {isUnlocked ? (
                  <Link
                    id={\`stage-\${stage.id}-card\`}
                    href={\`/tense/future/\${tId}/\${stage.id}\`}
                    className={\`group glass-card rounded-2xl p-5 border transition-all duration-200 flex items-center gap-4 \${
                      isCompleted
                        ? 'border-emerald-500/20 hover:border-emerald-500/40'
                        : isCurrent
                        ? \`\${config.borderClass} hover:shadow-lg hover:shadow-primary/5\`
                        : 'border-border hover:border-primary/20'
                    } hover:-translate-y-0.5\`}
                  >
                    {/* Status icon */}
                    <div className={\`p-2.5 rounded-xl shrink-0 \${
                      isCompleted
                        ? 'bg-emerald-500/10'
                        : isCurrent
                        ? config.bgClass
                        : 'bg-muted'
                    }\`}>
                      {isCompleted ? (
                        <CheckCircle size={18} className="text-emerald-500" />
                      ) : (
                        <Icon size={18} className={isCurrent ? config.textClass : 'text-muted-foreground'} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={\`font-semibold text-sm \${isCompleted ? 'text-emerald-600 dark:text-emerald-400' : 'text-foreground'}\`}>
                          {stage.label}
                        </span>
                        {isCurrent && (
                          <span className={\`text-xs px-2 py-0.5 rounded-full \${config.bgClass} \${config.textClass} border \${config.borderClass} font-medium\`}>
                            Current
                          </span>
                        )}
                        {isCompleted && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-medium">
                            ✓ Done
                          </span>
                        )}
                        {isCompleted && tenseProgress?.stages[stage.id]?.accuracy !== undefined && (
                          <span className="text-xs text-muted-foreground ml-auto">
                            {tenseProgress.stages[stage.id].accuracy}% accuracy
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{stage.desc}</p>
                    </div>

                    <ChevronRight
                      size={16}
                      className={\`shrink-0 \${isCompleted ? 'text-emerald-500' : config.textClass} group-hover:translate-x-0.5 transition-transform\`}
                    />
                  </Link>
                ) : (
                  <div className="glass-card rounded-2xl p-5 border border-border opacity-50 flex items-center gap-4 cursor-not-allowed">
                    <div className="p-2.5 bg-muted rounded-xl shrink-0">
                      <Lock size={18} className="text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-muted-foreground">{stage.label}</p>
                      <p className="text-xs text-muted-foreground">Complete previous stage to unlock</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <NavControls backHref="/tense/future" backLabel="Back to Future Tense" />
      </div>
    </main>
  );
}
`;
fs.writeFileSync(path.join(futureTenseDir, 'page.tsx'), futureTensePageCode);
