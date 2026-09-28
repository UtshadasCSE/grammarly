'use client';

import Link from 'next/link';
import { ChevronRight, Target, Zap, Crown, Book, ShieldAlert } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LinearProgress } from '@/components/ProgressIndicators';
import { NavControls } from '@/components/NavControls';
import { useProgress } from '@/contexts/ProgressContext';

export default function IELTSMasteryHub() {
  const { progress } = useProgress();
  const mastery = progress.ieltsMastery;

  const levels = [
    {
      id: 'beginner',
      title: 'Beginner',
      subtitle: 'Master the Foundations',
      description: '55 mixed questions covering all major English tenses.',
      icon: Target,
      color: 'text-secondary',
      bg: 'bg-secondary/10',
      activeBg: 'group-hover:bg-secondary',
      questions: 55,
      prog: mastery?.beginner,
      unlocked: true,
    },
    {
      id: 'intermediate',
      title: 'Intermediate',
      subtitle: 'Mixed Tense Mastery',
      description: '50 mixed questions covering all tenses, with a stronger focus on future tense.',
      icon: Zap,
      color: 'text-secondary',
      bg: 'bg-secondary/10',
      activeBg: 'group-hover:bg-secondary',
      questions: 50,
      prog: mastery?.intermediate,
      unlocked: mastery?.beginner?.completed,
    },
    {
      id: 'advanced',
      title: 'Advanced',
      subtitle: 'IELTS Tense Mastery',
      description: '50 challenging questions. Tests natural tense forms rather than grammar rules.',
      icon: Crown,
      color: 'text-primary',
      bg: 'bg-primary/10',
      activeBg: 'group-hover:bg-primary',
      questions: 50,
      prog: mastery?.advanced,
      unlocked: mastery?.intermediate?.completed,
    }
  ];

  const totalScore = (mastery?.beginner?.score || 0) + (mastery?.intermediate?.score || 0) + (mastery?.advanced?.score || 0);

  return (
    <main className="min-h-screen hero-gradient flex flex-col items-center py-16 px-4">
      <ThemeToggle />
      
      <div className="w-full max-w-3xl animate-fade-in-up">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/tense/tense" className="hover:text-foreground transition-colors">Tense</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">IELTS Mastery</span>
        </div>

        {/* Header */}
        <div className="mb-10 text-center sm:text-left flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-3">
              <span className="text-primary">
                IELTS Mastery Method
              </span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl">
              Complete the three stages of tense mastery to perfect your grammar for IELTS speaking and writing.
            </p>
          </div>
          
          <div className="glass-card rounded-2xl p-4 flex flex-col items-center min-w-[140px] shrink-0 border border-primary/20">
            <span className="text-sm font-semibold text-muted-foreground mb-1">Total XP Earned</span>
            <span className="text-3xl font-black text-primary">{progress.totalXP || 0}</span>
          </div>
        </div>

        {/* Level Cards */}
        <div className="space-y-4 mb-8">
          {levels.map((level) => {
            const Icon = level.icon;
            const isCompleted = level.prog?.completed;
            const qDone = level.prog?.questionsCompleted || 0;
            const percentage = Math.round((qDone / level.questions) * 100);

            return level.unlocked ? (
              <Link
                key={level.id}
                href={`/tense/mixed/${level.id}`}
                className="group block glass-card rounded-3xl p-6 sm:p-8 border border-border hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              >
                {isCompleted && (
                  <div className="absolute top-0 right-0 bg-secondary text-white text-xs font-bold px-4 py-1 rounded-bl-xl shadow-md z-10">
                    COMPLETED
                  </div>
                )}
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <div className={`p-4 rounded-2xl shrink-0 transition-colors duration-300 ${level.bg} ${level.activeBg} group-hover:text-white ${level.color}`}>
                    <Icon size={32} />
                  </div>
                  
                  <div className="flex-1 w-full">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                      <h2 className="text-2xl font-bold text-foreground">{level.title}</h2>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-sm font-medium text-muted-foreground bg-background/50 px-3 py-1 rounded-full border border-border/50">
                        {level.questions} Questions
                      </span>
                      <span className="text-sm font-medium text-secondary dark:text-secondary bg-secondary/10 px-3 py-1 rounded-full border border-secondary/20">
                        Hints Available
                      </span>
                      <span className="text-sm font-medium text-primary dark:text-primary bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                        Challenge Available
                      </span>
                    </div>
                    <p className="font-medium text-foreground/90 mb-1">{level.subtitle}</p>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed max-w-lg">
                      {level.description}
                    </p>
                    
                    <LinearProgress
                      value={percentage}
                      label={isCompleted ? "Completed" : "Progress"}
                      colorClass="progress-gradient"
                    />
                    
                    {qDone > 0 && !isCompleted && (
                      <div className="mt-3 text-sm text-primary font-semibold flex items-center gap-1">
                        Resume practice <ChevronRight size={16} />
                      </div>
                    )}
                    {isCompleted && (
                      <div className="mt-3 text-sm text-secondary font-semibold flex items-center gap-1">
                        Review or replay <ChevronRight size={16} />
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ) : (
              <div key={level.id} className="glass-card rounded-3xl p-6 sm:p-8 border border-border/50 opacity-60 cursor-not-allowed">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                  <div className="p-4 rounded-2xl shrink-0 bg-muted text-muted-foreground">
                    <Icon size={32} />
                  </div>
                  <div className="flex-1 w-full">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-2xl font-bold text-muted-foreground">{level.title}</h2>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-background/50 border border-border/50 text-muted-foreground">
                        Locked
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{level.description}</p>
                    <p className="text-xs font-medium text-secondary/80">
                      Complete {levels[levels.indexOf(level) - 1].title} to unlock
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/tense/mixed/chapter10"
            className="glass-card rounded-2xl p-5 border border-border hover:border-primary/30 transition-colors flex items-center gap-4 group"
          >
            <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:scale-110 transition-transform">
              <Book size={24} />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Chapter 10: Tense Guide</h3>
              <p className="text-xs text-muted-foreground mt-1">Master Hints & Signal Words</p>
            </div>
          </Link>

          <Link
            href="/tense/mixed/review"
            className="glass-card rounded-2xl p-5 border border-border hover:border-primary/30 transition-colors flex items-center gap-4 group"
          >
            <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:scale-110 transition-transform">
              <ShieldAlert size={24} />
            </div>
            <div>
              <h3 className="font-bold text-foreground">Review Mistakes</h3>
              <p className="text-xs text-muted-foreground mt-1">
                {mastery?.errors?.length || 0} incorrect answers saved
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-8">
          <NavControls backHref="/tense/tense" backLabel="Back to Categories" />
        </div>
      </div>
    </main>
  );
}
