'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, ShieldAlert, BarChart3, CheckCircle2 } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useProgress } from '@/contexts/ProgressContext';
import { beginnerQuestions } from '@/data/ielts/beginner';
import { intermediateQuestions } from '@/data/ielts/intermediate';
import { advancedQuestions } from '@/data/ielts/advanced';

const allQuestions = [...beginnerQuestions, ...intermediateQuestions, ...advancedQuestions];

const allTenses = [
  'present-simple', 'present-continuous', 'present-perfect', 'present-perfect-continuous',
  'past-simple', 'past-continuous', 'past-perfect', 'past-perfect-continuous',
  'future-simple', 'future-continuous', 'future-perfect', 'future-perfect-continuous'
];

function getTenseDisplayName(tenseId: string) {
  return tenseId.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
}

export default function ReviewMistakesPage() {
  const { progress } = useProgress();
  const mastery = progress.ieltsMastery;
  const errors = mastery?.errors || [];

  // Deduplicate errors by keeping the most recent attempt
  const uniqueErrors = Array.from(new Map(errors.map(e => [e.questionId, e])).values());

  const [activeIndex, setActiveIndex] = useState(0);

  // Calculate dynamic accuracy per tense from UserProgress context
  // Progress context already stores totalAccuracy for each tense
  const tenseStats = allTenses.map(tId => {
    const accuracy = progress.tenses[tId as keyof typeof progress.tenses]?.totalAccuracy || 0;
    return { id: tId, name: getTenseDisplayName(tId), accuracy };
  });

  return (
    <main className="min-h-screen hero-gradient flex flex-col items-center py-16 px-4">
      <ThemeToggle />
      
      <div className="w-full max-w-4xl animate-fade-in-up">
        {/* Header */}
        <div className="mb-10">
          <Link href="/tense/mixed" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold mb-6 transition-colors">
            <ChevronLeft size={20} /> Back to IELTS Mastery
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-4 bg-primary/10 text-primary rounded-2xl">
              <ShieldAlert size={32} />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-foreground">Review Mistakes</h1>
              <p className="text-xl text-muted-foreground mt-1 font-medium">Turn your errors into mastery</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Tense Performance Chart */}
          <div className="lg:col-span-1 space-y-4">
            <div className="glass-card rounded-3xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-6">
                <BarChart3 className="text-primary" size={24} />
                <h2 className="text-xl font-bold text-foreground">Tense Accuracy</h2>
              </div>
              <div className="space-y-4">
                {tenseStats.map((stat) => (
                  <div key={stat.id}>
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="text-foreground">{stat.name}</span>
                      <span className="text-primary">{Math.round(stat.accuracy)}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-1000"
                        style={{ width: `${stat.accuracy}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Mistake Review UI */}
          <div className="lg:col-span-2">
            {uniqueErrors.length === 0 ? (
              <div className="glass-card rounded-3xl p-12 border border-border text-center">
                <div className="w-20 h-20 mx-auto bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">No Mistakes Yet!</h2>
                <p className="text-muted-foreground">Keep practicing to identify your weak points.</p>
              </div>
            ) : (
              <div className="glass-card rounded-3xl p-6 sm:p-8 border border-border relative">
                <div className="flex items-center justify-between mb-6 pb-6 border-b border-border/50">
                  <h2 className="text-xl font-bold text-foreground">Review Questions</h2>
                  <span className="text-sm font-semibold text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    {activeIndex + 1} of {uniqueErrors.length}
                  </span>
                </div>

                {(() => {
                  const errorLog = uniqueErrors[activeIndex];
                  const q = allQuestions.find(x => x.id === errorLog.questionId);
                  
                  if (!q) return <p>Question not found.</p>;

                  return (
                    <div className="space-y-6">
                      <span className="inline-block px-3 py-1 bg-accent/10 text-accent border border-accent/20 rounded-full text-xs font-bold uppercase tracking-wider">
                        {q.tense.replace(/-/g, ' ')}
                      </span>
                      
                      <h3 className="text-2xl font-semibold text-foreground leading-snug">
                        {q.question}
                      </h3>

                      <div className="bg-primary/10 border border-primary/20 p-4 rounded-2xl">
                        <p className="text-xs font-bold text-primary uppercase mb-1">Your Answer</p>
                        <p className="text-primary dark:text-primary font-medium">{errorLog.userAnswer}</p>
                      </div>

                      <div className="bg-secondary/10 border border-secondary/20 p-4 rounded-2xl">
                        <p className="text-xs font-bold text-secondary uppercase mb-1">Correct Answer</p>
                        <p className="text-secondary dark:text-secondary font-medium">{q.correctAnswer}</p>
                      </div>

                      <div className="bg-primary/5 border border-primary/10 p-4 rounded-2xl">
                        <p className="text-xs font-bold text-primary uppercase mb-1">Explanation</p>
                        <p className="text-muted-foreground text-sm">{q.explanation}</p>
                      </div>
                    </div>
                  );
                })()}

                <div className="flex items-center justify-between mt-8 pt-6 border-t border-border/50">
                  <button
                    disabled={activeIndex === 0}
                    onClick={() => setActiveIndex(a => Math.max(0, a - 1))}
                    className="p-3 rounded-xl bg-background border border-border hover:bg-muted disabled:opacity-50 transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    disabled={activeIndex === uniqueErrors.length - 1}
                    onClick={() => setActiveIndex(a => Math.min(uniqueErrors.length - 1, a + 1))}
                    className="p-3 rounded-xl bg-background border border-border hover:bg-muted disabled:opacity-50 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
