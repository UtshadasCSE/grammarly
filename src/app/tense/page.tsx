'use client';

import Link from 'next/link';
import { ChevronRight, BookOpen, TrendingUp } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LinearProgress } from '@/components/ProgressIndicators';
import { NavControls } from '@/components/NavControls';
import { useProgress } from '@/contexts/ProgressContext';

export default function TensePage() {
  const { progress } = useProgress();

  // Calculate overall tense progress
  const totalProgress = Object.values(progress.tenses).reduce(
    (acc, t) => acc + t.overallProgress,
    0
  ) / 4;

  return (
    <main className="min-h-screen hero-gradient flex flex-col items-center justify-center px-4 py-16">
      <ThemeToggle />

      <div className="w-full max-w-2xl animate-fade-in-up">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">Grammar Topics</span>
        </div>

        {/* Heading */}
        <div className="mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3">
            Choose a Grammar Topic
          </h1>
          <p className="text-muted-foreground text-lg">
            Select a topic to begin your structured IELTS grammar journey.
          </p>
        </div>

        {/* Topic Card - Tense */}
        <Link
          id="tense-topic-card"
          href="/tense/tense"
          className="group block glass-card rounded-3xl p-8 border border-border hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1 mb-4"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-5">
              {/* Icon */}
              <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors duration-200 shrink-0">
                <BookOpen size={28} className="text-primary" />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold text-foreground">Tense</h2>
                  <span className="text-xs font-semibold bg-secondary/10 text-secondary dark:text-secondary px-2 py-0.5 rounded-full border border-secondary/20">
                    Active
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                  Learn how to use English tenses correctly in everyday communication 
                  and IELTS. Cover Present, Past, Future, and Mixed tenses.
                </p>

                <div className="mt-5 space-y-2">
                  <LinearProgress
                    value={Math.round(totalProgress)}
                    label="Overall Progress"
                    colorClass="progress-gradient"
                  />
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {['Present Tense', 'Past Tense', 'Future Tense', 'Mixed'].map((tag, i) => {
                    const isActive = i === 0 || i === 1 || i === 2;
                    return (
                      <span
                        key={tag}
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          isActive
                            ? 'bg-primary/10 text-primary border border-primary/20'
                            : 'bg-muted text-muted-foreground border border-border'
                        }`}
                      >
                        {isActive ? '● ' : ''}{tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-primary-foreground text-primary transition-all duration-200 shrink-0">
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </div>
        </Link>

        {/* Topic Card - Parts of Speech */}
        <Link
          id="parts-of-speech-topic-card"
          href="/parts-of-speech"
          className="group block glass-card rounded-3xl p-8 border border-border hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-5">
              {/* Icon */}
              <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors duration-200 shrink-0">
                <BookOpen size={28} className="text-primary" />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-2xl font-bold text-foreground">Parts of Speech</h2>
                  <span className="text-xs font-semibold bg-secondary/10 text-secondary dark:text-secondary px-2 py-0.5 rounded-full border border-secondary/20">
                    Active
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                  Learn English parts of speech from beginner level to IELTS advanced level through explanations, examples, vocabulary, speaking, writing, and challenges.
                </p>

                <div className="mt-5 space-y-2">
                  <LinearProgress
                    value={progress.partsOfSpeech?.noun?.overallProgress ?? 0}
                    label="Overall Progress"
                    colorClass="progress-gradient"
                  />
                </div>

                <div className="flex flex-wrap gap-2 mt-4">
                  {['Noun', 'Pronoun', 'Verb', 'Adjective', 'Adverb', 'Preposition'].map((tag, i) => {
                    const isActive = i === 0; // Noun is active
                    return (
                      <span
                        key={tag}
                        className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                          isActive
                            ? 'bg-primary/10 text-primary border border-primary/20'
                            : 'bg-muted text-muted-foreground border border-border'
                        }`}
                      >
                        {isActive ? '● ' : ''}{tag}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Arrow */}
            <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-primary-foreground text-primary transition-all duration-200 shrink-0">
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
            </div>
          </div>
        </Link>

        {/* Coming soon cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
          {['Conditionals', 'Modal Verbs', 'Passive Voice'].map((topic) => (
            <div
              key={topic}
              className="glass-card rounded-2xl p-4 opacity-50 cursor-not-allowed"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-foreground">{topic}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Coming soon</p>
                </div>
                <TrendingUp size={16} className="text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>

        <NavControls backHref="/" backLabel="Back to Home" />
      </div>
    </main>
  );
}
