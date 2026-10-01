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
  { id: 'learn', label: 'Learn', desc: 'Grammar lesson with examples & 15+ concept checks', icon: BookOpen, challengesCount: '15+ checks' },
  { id: 'practice', label: 'Fill in the Blank', desc: '20 guided + challenge questions', icon: PenLine, challengesCount: '20 questions' },
  { id: 'advanced', label: 'Advanced MCQ', desc: '20 IELTS-level multiple choice', icon: Target, challengesCount: '20 questions' },
  { id: 'errors', label: 'Error Correction', desc: 'Find and fix 20 real learner grammar errors', icon: AlertCircle, challengesCount: '20 questions' },
  { id: 'ielts', label: 'IELTS Context', desc: '20 IELTS-style academic topic exercises', icon: Globe, challengesCount: '20 questions' },
  { id: 'vocabulary', label: 'Vocabulary', desc: '20 key IELTS words with definitions & speech audio', icon: BookMarked, challengesCount: '20 words' },
  { id: 'speaking', label: 'Speaking', desc: '18 record and practice speaking prompts with feedback', icon: Mic, challengesCount: '18 prompts' },
  { id: 'writing', label: 'Writing', desc: '18 IELTS writing exercises with automated analysis', icon: FileText, challengesCount: '18 tasks' },
  { id: 'test', label: 'Final Test', desc: '25 complete adverb assessment challenges with weak area tracking', icon: Trophy, challengesCount: '25 challenges' },
];

export default function AdverbHubPage() {
  const { isPartOfSpeechStageUnlocked, getPartOfSpeechProgress } = useProgress();
  const adverbProgress = getPartOfSpeechProgress('adverb');
  const allStagesDone = stages.every((s) => adverbProgress?.stages[s.id]?.completed);

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
          <span className="text-foreground font-medium">Adverb</span>
        </div>

        {/* Adverb header card */}
        <div className="glass-card rounded-3xl p-7 border border-cyan-500/30 mb-8">
          <div className="flex items-start gap-4">
            <span className="text-4xl">🚀</span>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-3xl font-bold text-foreground">Adverb</h1>
                <span className="text-xs font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                  Zero to IELTS Advanced
                </span>
              </div>
              <p className="text-sm font-medium mb-1 text-primary">ক্রিয়া বিশেষণ — Adverb Mastery</p>
              <code className="text-xs font-mono px-3 py-1.5 rounded-lg bg-primary/10 text-primary inline-block mt-2">
                Manner • Place • Time • Frequency • Degree • Focusing • Sentence Adverbs • Discourse Markers • Academic IELTS
              </code>
              <div className="mt-4">
                <LinearProgress
                  value={adverbProgress?.overallProgress ?? 0}
                  label={`${adverbProgress?.overallProgress ?? 0}% Complete`}
                  colorClass="bg-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Adverb Mastered Banner if complete */}
        {allStagesDone && (
          <div className="glass-card rounded-3xl p-6 border border-secondary/30 bg-secondary/5 mb-8 animate-scale-in">
            <div className="flex items-start gap-3">
              <div className="p-3 bg-secondary/10 rounded-2xl">
                <Trophy size={28} className="text-secondary" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                  🎉 Adverb Mastered!
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  You have successfully completed all 9 learning stages of Adverb Mastery, from zero-level adverb identification to IELTS Band 9.0 academic discourse.
                </p>
                <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-muted-foreground">
                  <Sparkles size={14} className="text-primary" />
                  <span>Next Part of Speech: <strong>Preposition</strong> (Coming Soon)</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Learning Stages List */}
        <div className="space-y-3">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Adverb Learning Path (9 Stages)
            </p>
            <span className="text-xs text-muted-foreground">
              {stages.filter((s) => adverbProgress?.stages[s.id]?.completed).length} / {stages.length} Completed
            </span>
          </div>

          {stages.map((stage, idx) => {
            const unlocked = isPartOfSpeechStageUnlocked('adverb', stage.id);
            const stageProgress = adverbProgress?.stages[stage.id];
            const isDone = stageProgress?.completed;
            const Icon = stage.icon;

            const accuracyDisplay =
              stageProgress?.accuracy !== undefined && stageProgress.accuracy > 0
                ? `${stageProgress.accuracy}% accuracy`
                : null;

            if (!unlocked) {
              return (
                <div
                  key={stage.id}
                  className="glass-card rounded-2xl p-5 border border-border opacity-50 cursor-not-allowed flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                      <Lock size={18} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-muted-foreground">Stage {idx + 1}</span>
                        <p className="font-semibold text-sm text-muted-foreground">{stage.label}</p>
                        <span className="text-[10px] font-medium bg-muted text-muted-foreground px-2 py-0.5 rounded-full border border-border">
                          Locked
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{stage.desc}</p>
                      <p className="text-[11px] text-primary/70 mt-1">
                        Complete Stage {idx} to unlock
                      </p>
                    </div>
                  </div>
                  <Lock size={16} className="text-muted-foreground shrink-0" />
                </div>
              );
            }

            return (
              <Link
                key={stage.id}
                href={`/parts-of-speech/adverb/${stage.id}`}
                className={`group block glass-card rounded-2xl p-5 border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                  isDone
                    ? 'border-secondary/30 hover:border-secondary/50 bg-secondary/5'
                    : 'border-border hover:border-primary/40'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isDone
                          ? 'bg-secondary/15 text-secondary'
                          : 'bg-primary/10 text-primary group-hover:bg-primary/20'
                      }`}
                    >
                      {isDone ? <CheckCircle size={20} /> : <Icon size={20} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-muted-foreground">Stage {idx + 1}</span>
                        <p className="font-semibold text-sm text-foreground">{stage.label}</p>
                        {isDone && (
                          <span className="text-[10px] font-bold bg-secondary/15 text-secondary px-2 py-0.5 rounded-full border border-secondary/20">
                            ✓ Done
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{stage.desc}</p>
                      <div className="flex items-center gap-3 mt-1.5 text-[11px]">
                        <span className="text-primary font-medium">✨ {stage.challengesCount}</span>
                        {accuracyDisplay && (
                          <span className="text-secondary font-medium">🎯 {accuracyDisplay}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="p-2 rounded-xl bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground text-primary transition-all shrink-0">
                    <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <NavControls backHref="/parts-of-speech" backLabel="Back to Parts of Speech" />
      </div>
    </main>
  );
}
