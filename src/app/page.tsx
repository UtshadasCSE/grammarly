'use client';

import Link from 'next/link';
import { ArrowRight, BookOpen, Mic, PenLine, Trophy, Sparkles, Star } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

const features = [
  { icon: BookOpen, label: 'Structured Lessons', desc: 'Grammar explained step by step' },
  { icon: PenLine, label: 'Practice Exercises', desc: '20+ questions per tense' },
  { icon: Mic, label: 'Speaking Practice', desc: 'Record & review your answers' },
  { icon: Trophy, label: 'Final Challenges', desc: 'IELTS-style assessments' },
];

export default function HeroPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-gradient">
      <ThemeToggle />

      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/10 dark:bg-primary/5 blur-3xl"
            style={{
              width: `${200 + i * 80}px`,
              height: `${200 + i * 80}px`,
              left: `${10 + i * 15}%`,
              top: `${5 + (i % 3) * 30}%`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto w-full">

        {/* Brand Badge */}
        <div className="animate-fade-in flex items-center gap-2 bg-primary/10 dark:bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-primary/20">
          <Sparkles size={14} />
          IELTS Grammar Platform
        </div>

        {/* Logo */}
        <div className="animate-fade-in delay-100 mb-6">
          <h1 className="text-5xl sm:text-7xl font-black tracking-tight">
            <span className="bg-gradient-to-br from-primary via-accent to-primary bg-clip-text text-transparent">
              Grammarly
            </span>
          </h1>
          <div className="flex items-center justify-center gap-1 mt-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={14} className="fill-amber-400 text-amber-400" />
            ))}
            <span className="ml-2 text-sm text-muted-foreground font-medium">IELTS Grammar Practice</span>
          </div>
        </div>

        {/* Main heading */}
        <h2 className="animate-fade-in delay-200 text-3xl sm:text-5xl font-bold tracking-tight text-foreground leading-tight mb-5">
          Master English Grammar
          <br />
          <span className="text-primary">for IELTS</span>
        </h2>

        {/* Supporting text */}
        <p className="animate-fade-in delay-300 text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed mb-10">
          Practice grammar, vocabulary, speaking, and writing from beginner to advanced level
          with structured IELTS-style exercises.
        </p>

        {/* CTA Button */}
        <div className="animate-fade-in delay-400 flex flex-col items-center gap-4">
          <Link
            id="get-started-btn"
            href="/tense"
            className="group flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            Get Started
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
          </Link>
          <p className="text-sm text-muted-foreground">
            Start with Present Tense and build your grammar step by step.
          </p>
        </div>

        {/* Feature pills */}
        <div className="animate-fade-in delay-500 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-14 w-full max-w-3xl">
          {features.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="glass-card rounded-2xl p-4 flex flex-col items-center gap-2 text-center hover:scale-105 transition-transform duration-200"
            >
              <div className="p-2 bg-primary/10 rounded-xl">
                <Icon size={20} className="text-primary" />
              </div>
              <span className="text-xs font-semibold text-foreground">{label}</span>
              <span className="text-xs text-muted-foreground leading-tight">{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
