'use client';

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
  simple: {
    name: 'Present Simple',
    banglaName: 'সাধারণ বর্তমান কাল',
    formula: 'Subject + V1 (s/es for he/she/it)',
    color: 'indigo',
    gradientFrom: 'bg-primary',
    gradientTo: '',
    textClass: 'text-primary dark:text-primary',
    bgClass: 'bg-primary/10',
    borderClass: 'border-primary/20',
    icon: '🔵',
    nextTense: 'continuous',
  },
  continuous: {
    name: 'Present Continuous',
    banglaName: 'চলমান বর্তমান কাল',
    formula: 'Subject + am/is/are + V-ing',
    color: 'emerald',
    gradientFrom: 'bg-primary',
    gradientTo: '',
    textClass: 'text-secondary dark:text-secondary',
    bgClass: 'bg-secondary/10',
    borderClass: 'border-secondary/20',
    icon: '🟢',
    nextTense: 'perfect',
  },
  perfect: {
    name: 'Present Perfect',
    banglaName: 'পুর্ণ বর্তমান কাল',
    formula: 'Subject + have/has + V3',
    color: 'violet',
    gradientFrom: 'bg-primary',
    gradientTo: '',
    textClass: 'text-primary dark:text-primary',
    bgClass: 'bg-primary/10',
    borderClass: 'border-primary/20',
    icon: '🟣',
    nextTense: 'perfect-continuous',
  },
  'perfect-continuous': {
    name: 'Present Perfect Continuous',
    banglaName: 'চলমান পুর্ণ বর্তমান কাল',
    formula: 'Subject + have/has + been + V-ing',
    color: 'rose',
    gradientFrom: 'bg-primary',
    gradientTo: '',
    textClass: 'text-primary dark:text-primary',
    bgClass: 'bg-primary/10',
    borderClass: 'border-primary/20',
    icon: '🔴',
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
          <Link href="/tense/present" className="text-primary hover:underline">
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
          <Link href="/tense/present" className="hover:text-foreground transition-colors">Present</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">{config.name}</span>
        </div>

        {/* Tense header */}
        <div className={`glass-card rounded-3xl p-7 border ${config.borderClass} mb-8`}>
          <div className="flex items-start gap-4">
            <span className="text-4xl">{config.icon}</span>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-foreground mb-0.5">{config.name}</h1>
              <p className={`text-sm font-medium mb-1 ${config.textClass}`}>{config.banglaName}</p>
              <code className={`text-sm font-mono px-3 py-1.5 rounded-lg ${config.bgClass} ${config.textClass} inline-block mt-2`}>
                {config.formula}
              </code>
              <div className="mt-4">
                <LinearProgress
                  value={tenseProgress?.overallProgress ?? 0}
                  label={`${tenseProgress?.overallProgress ?? 0}% Complete`}
                  colorClass={`bg-primary`}
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
              <div key={stage.id} className={`animate-fade-in-up`} style={{ animationDelay: `${idx * 60}ms` }}>
                {isUnlocked ? (
                  <Link
                    id={`stage-${stage.id}-card`}
                    href={`/tense/present/${tId}/${stage.id}`}
                    className={`group glass-card rounded-2xl p-5 border transition-all duration-200 flex items-center gap-4 ${
                      isCompleted
                        ? 'border-secondary/20 hover:border-secondary/40'
                        : isCurrent
                        ? `${config.borderClass} hover:shadow-lg hover:shadow-primary/5`
                        : 'border-border hover:border-primary/20'
                    } hover:-translate-y-0.5`}
                  >
                    {/* Status icon */}
                    <div className={`p-2.5 rounded-xl shrink-0 ${
                      isCompleted
                        ? 'bg-secondary/10'
                        : isCurrent
                        ? config.bgClass
                        : 'bg-muted'
                    }`}>
                      {isCompleted ? (
                        <CheckCircle size={18} className="text-secondary" />
                      ) : (
                        <Icon size={18} className={isCurrent ? config.textClass : 'text-muted-foreground'} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold text-sm ${isCompleted ? 'text-secondary dark:text-secondary' : 'text-foreground'}`}>
                          {stage.label}
                        </span>
                        {isCurrent && (
                          <span className={`text-xs px-2 py-0.5 rounded-full ${config.bgClass} ${config.textClass} border ${config.borderClass} font-medium`}>
                            Current
                          </span>
                        )}
                        {isCompleted && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary dark:text-secondary border border-secondary/20 font-medium">
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
                      className={`shrink-0 ${isCompleted ? 'text-secondary' : config.textClass} group-hover:translate-x-0.5 transition-transform`}
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

        <NavControls backHref="/tense/present" backLabel="Back to Present Tense" />
      </div>
    </main>
  );
}
