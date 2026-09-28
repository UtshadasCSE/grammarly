'use client';

import Link from 'next/link';
import { ChevronRight, BookOpen, TrendingUp } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LinearProgress } from '@/components/ProgressIndicators';
import { NavControls } from '@/components/NavControls';
import { useProgress } from '@/contexts/ProgressContext';

const categories = [
  {
    id: 'present',
    title: 'Present Tense',
    description: 'Master Present Simple, Present Continuous, Present Perfect, and Present Perfect Continuous.',
    icon: '🟢',
    active: true,
    tenses: 4,
  },
  {
    id: 'past',
    title: 'Past Tense',
    description: 'Past Simple, Past Continuous, Past Perfect, and Past Perfect Continuous.',
    icon: '🔵',
    active: true,
    tenses: 4,
  },
  {
    id: 'future',
    title: 'Future Tense',
    description: 'Will, Going to, Future Continuous, and Future Perfect.',
    icon: '🟣',
    active: false,
    tenses: 4,
  },
  {
    id: 'mixed',
    title: 'Mixed Tenses',
    description: 'Practice all tenses in context with advanced IELTS exercises.',
    icon: '⭐',
    active: false,
    tenses: 6,
  },
];

export default function TenseCategoryPage() {
  const { progress } = useProgress();

  const presentProgress =
    Object.values(progress.tenses)
      .filter((t) => t.id && !t.id.startsWith('past')) // Simple check for present
      .reduce((acc, t) => acc + t.overallProgress, 0) / 4;

  const pastProgress =
    Object.values(progress.tenses)
      .filter((t) => t.id && t.id.startsWith('past')) // past tenses
      .reduce((acc, t) => acc + t.overallProgress, 0) / 4;

  return (
    <main className="min-h-screen hero-gradient flex flex-col items-center justify-center px-4 py-16">
      <ThemeToggle />

      <div className="w-full max-w-2xl animate-fade-in-up">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/tense" className="hover:text-foreground transition-colors">Tense</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">Tense</span>
        </div>

        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3">Tense</h1>
          <p className="text-muted-foreground text-lg">
            Understand and practice English tenses step by step.
          </p>
        </div>

        {/* Category cards */}
        <div className="space-y-4">
          {categories.map((cat) => (
            <div key={cat.id}>
              {cat.active ? (
                <Link
                  id={`tense-category-${cat.id}`}
                  href={`/tense/${cat.id}`}
                  className="group block glass-card rounded-3xl p-7 border border-border hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl mt-0.5">{cat.icon}</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-xl font-bold text-foreground">{cat.title}</h2>
                          <span className="text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                            Active
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                          {cat.description}
                        </p>
                        <LinearProgress
                          value={Math.round(cat.id === 'past' ? pastProgress : presentProgress)}
                          label="Progress"
                          colorClass="progress-gradient"
                        />
                      </div>
                    </div>
                    <div className="p-2.5 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-primary-foreground text-primary transition-all duration-200 shrink-0">
                      <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="glass-card rounded-3xl p-7 border border-border opacity-50 cursor-not-allowed">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <span className="text-3xl mt-0.5 grayscale">{cat.icon}</span>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h2 className="text-xl font-bold text-foreground">{cat.title}</h2>
                          <span className="text-xs font-semibold bg-muted text-muted-foreground px-2 py-0.5 rounded-full border border-border">
                            Coming Soon
                          </span>
                        </div>
                        <p className="text-muted-foreground text-sm">{cat.description}</p>
                      </div>
                    </div>
                    <TrendingUp size={18} className="text-muted-foreground shrink-0 mt-1" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <NavControls backHref="/tense" backLabel="Back to Topics" />
      </div>
    </main>
  );
}
