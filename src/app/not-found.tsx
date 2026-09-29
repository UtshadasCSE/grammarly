'use client';

import Link from 'next/link';
import { ArrowLeft, SearchX, Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden hero-gradient">
      <ThemeToggle />

      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-primary/10 dark:bg-primary/5 blur-3xl"
            style={{
              width: `${250 + i * 50}px`,
              height: `${250 + i * 50}px`,
              left: `${15 + i * 20}%`,
              top: `${10 + (i % 2) * 40}%`,
              animationDelay: `${i * 0.4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-2xl mx-auto w-full">
        
        {/* Badge */}
        <div className="animate-fade-in flex items-center gap-2 bg-primary/10 dark:bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-8 border border-primary/20">
          <Sparkles size={14} />
          Lost in Translation
        </div>

        {/* 404 Icon & Heading */}
        <div className="animate-fade-in delay-100 flex flex-col items-center mb-6">
          <div className="p-4 bg-primary/10 dark:bg-primary/20 rounded-full mb-6 border border-primary/20">
            <SearchX size={48} className="text-primary" />
          </div>
          <h1 className="text-7xl sm:text-9xl font-black tracking-tight text-primary">
            404
          </h1>
        </div>

        {/* Main text */}
        <h2 className="animate-fade-in delay-200 text-2xl sm:text-4xl font-bold tracking-tight text-foreground leading-tight mb-5">
          Page Not Found
        </h2>

        {/* Supporting text */}
        <p className="animate-fade-in delay-300 text-base sm:text-lg text-muted-foreground max-w-md leading-relaxed mb-10">
          The grammar rule or page you are looking for doesn't seem to exist. Let's get you back to mastering English for IELTS.
        </p>

        {/* CTA Button */}
        <div className="animate-fade-in delay-400">
          <Link
            href="/"
            className="group flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:scale-105 active:scale-95 transition-all duration-200"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform duration-200" />
            Return Home
          </Link>
        </div>
      </div>
    </main>
  );
}
