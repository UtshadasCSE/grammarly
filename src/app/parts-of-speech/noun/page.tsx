'use client';

import Link from 'next/link';
import {
  ChevronRight,
  Lock,
  CheckCircle,
  BookOpen,
  PenLine,
  Target,
  AlertCircle,
  Globe,
  BookMarked,
  Mic,
  FileText,
  Trophy,
  Sparkles,
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LinearProgress } from '@/components/ProgressIndicators';
import { NavControls } from '@/components/NavControls';
import { useProgress } from '@/contexts/ProgressContext';
import type { StageId } from '@/types';

const stages: {
  id: StageId;
  label: string;
  desc: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  challengesCount: string;
}[] = [
  { id: 'learn', label: 'Learn', desc: 'Grammar lesson with examples & 18+ concept checks', icon: BookOpen, challengesCount: '18+ checks' },
  { id: 'practice', label: 'Fill in the Blank', desc: '20 guided + challenge questions', icon: PenLine, challengesCount: '20 questions' },
  { id: 'advanced', label: 'Advanced MCQ', desc: '20 IELTS-level multiple choice', icon: Target, challengesCount: '20 questions' },
  { id: 'errors', label: 'Error Correction', desc: 'Find and fix 20 real learner grammar errors', icon: AlertCircle, challengesCount: '20 questions' },
  { id: 'ielts', label: 'IELTS Context', desc: '20 IELTS-style academic topic exercises', icon: Globe, challengesCount: '20 questions' },
  { id: 'vocabulary', label: 'Vocabulary', desc: '20 key IELTS words with definitions & speech audio', icon: BookMarked, challengesCount: '20 words' },
  { id: 'speaking', label: 'Speaking', desc: '18 record and practice speaking prompts with feedback', icon: Mic, challengesCount: '18 prompts' },
  { id: 'writing', label: 'Writing', desc: '18 IELTS writing exercises with automated analysis', icon: FileText, challengesCount: '18 tasks' },
  { id: 'test', label: 'Final Test', desc: '25 complete noun assessment challenges with weak area tracking', icon: Trophy, challengesCount: '25 challenges' },
];

export default function NounHubPage() {
  const { progress, isPartOfSpeechStageUnlocked, getPartOfSpeechProgress } = useProgress();
  const nounProgress = getPartOfSpeechProgress('noun');
  const allStagesDone = stages.every((s) => nounProgress?.stages[s.id]?.completed);

  return (
    <main className="min-h-screen hero-gradient px-4 py-16">
      <ThemeToggle />

      <div className="w-full max-w-2xl mx-auto animate-fade-in-up">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8 flex-wrap">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/parts-of-speech" className="hover:text-foreground transition-colors">Parts of Speech</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">Noun</span>
        </div>

        {/* Noun header card */}
        <div className="glass-card rounded-3xl p-7 border border-primary/20 mb-8">
          <div className="flex items-start gap-4">
            <span className="text-4xl">📘</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold text-foreground">Noun</h1>
                <span className="text-xs font-semibold bg-secondary/10 text-secondary dark:text-secondary px-2.5 py-0.5 rounded-full border border-secondary/20">
                  Zero to IELTS Advanced
                </span>
              </div>
              <p className="text-sm font-medium mb-1 text-primary">বিশেষ্য পদ — Noun Mastery</p>
              <code className="text-xs font-mono px-3 py-1.5 rounded-lg bg-primary/10 text-primary inline-block mt-2">
                Person • Place • Thing • Animal • Concept • Noun Phrases
              </code>
              <div className="mt-4">
                <LinearProgress
                  value={nounProgress?.overallProgress ?? 0}
                  label={`${nounProgress?.overallProgress ?? 0}% Complete`}
                  colorClass="bg-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Noun Mastered Banner if complete */}
        {allStagesDone && (
          <div className="glass-card rounded-3xl p-6 border border-secondary/30 bg-secondary/5 mb-8 animate-scale-in">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-secondary/10 rounded-2xl">
                <Trophy size={28} className="text-secondary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  🎉 Noun Mastered!
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  You have successfully completed all 9 learning stages of the Noun category.
                </p>
                <div className="mt-3 inline-flex items-center gap-2 text-xs font-semibold bg-muted text-muted-foreground px-3 py-1.5 rounded-full border border-border">
                  <Sparkles size={12} />
                  Next Part of Speech: Coming Soon
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Stage cards */}
        <div className="space-y-3">
          {stages.map((stage, idx) => {
            const isUnlocked = isPartOfSpeechStageUnlocked('noun', stage.id);
            const isCompleted = nounProgress?.stages[stage.id]?.completed;
            const isCurrent = !isCompleted && isUnlocked;
            const Icon = stage.icon;

            return (
              <div key={stage.id} className="animate-fade-in-up" style={{ animationDelay: `${idx * 50}ms` }}>
                {isUnlocked ? (
                  <Link
                    id={`stage-${stage.id}-card`}
                    href={`/parts-of-speech/noun/${stage.id}`}
                    className={`group glass-card rounded-2xl p-5 border transition-all duration-200 flex items-center gap-4 ${
                      isCompleted
                        ? 'border-secondary/20 hover:border-secondary/40'
                        : isCurrent
                        ? 'border-primary/40 hover:shadow-lg hover:shadow-primary/5'
                        : 'border-border hover:border-primary/20'
                    } hover:-translate-y-0.5`}
                  >
                    {/* Status icon */}
                    <div
                      className={`p-2.5 rounded-xl shrink-0 ${
                        isCompleted
                          ? 'bg-secondary/10'
                          : isCurrent
                          ? 'bg-primary/10'
                          : 'bg-muted'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle size={18} className="text-secondary" />
                      ) : (
                        <Icon size={18} className={isCurrent ? 'text-primary' : 'text-muted-foreground'} />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`font-semibold text-sm ${isCompleted ? 'text-secondary dark:text-secondary' : 'text-foreground'}`}>
                          {stage.label}
                        </span>
                        {isCurrent && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                            Current
                          </span>
                        )}
                        {isCompleted && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary dark:text-secondary border border-secondary/20 font-medium">
                            ✓ Done
                          </span>
                        )}
                        {isCompleted && nounProgress?.stages[stage.id]?.accuracy !== undefined && (
                          <span className="text-xs text-muted-foreground ml-auto">
                            {nounProgress.stages[stage.id].accuracy}% accuracy
                          </span>
                        )}
                      </div>
                      <div className="flex items-center justify-between gap-2 mt-0.5">
                        <p className="text-xs text-muted-foreground truncate">{stage.desc}</p>
                        <span className="text-[10px] text-muted-foreground font-mono shrink-0">
                          {stage.challengesCount}
                        </span>
                      </div>
                    </div>

                    <ChevronRight
                      size={16}
                      className={`shrink-0 ${isCompleted ? 'text-secondary' : 'text-primary'} group-hover:translate-x-0.5 transition-transform`}
                    />
                  </Link>
                ) : (
                  <div className="glass-card rounded-2xl p-5 border border-border opacity-50 flex items-center gap-4 cursor-not-allowed">
                    <div className="p-2.5 bg-muted rounded-xl shrink-0">
                      <Lock size={18} className="text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-muted-foreground">{stage.label}</p>
                      <p className="text-xs text-muted-foreground">Complete previous stage to unlock</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <NavControls backHref="/parts-of-speech" backLabel="Back to Parts of Speech" />
      </div>
    </main>
  );
}
