'use client';

import Link from 'next/link';
import { ChevronRight, BookOpen, TrendingUp, Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LinearProgress } from '@/components/ProgressIndicators';
import { NavControls } from '@/components/NavControls';
import { useProgress } from '@/contexts/ProgressContext';

const futurePartsOfSpeech = [
  { id: 'preposition', title: 'Preposition', desc: 'Prepositions of time, place, direction & dependent prepositions.' },
  { id: 'conjunction', title: 'Conjunction', desc: 'Coordinating, subordinating & correlative conjunctions.' },
  { id: 'interjection', title: 'Interjection', desc: 'Emotional expressions, discourse markers & spoken conventions.' },
  { id: 'determiner', title: 'Determiner', desc: 'Articles, quantifiers, demonstratives & possessives in depth.' },
];

export default function PartsOfSpeechPage() {
  const { progress } = useProgress();
  const nounProgress = progress.partsOfSpeech?.noun?.overallProgress ?? 0;
  const pronounProgress = progress.partsOfSpeech?.pronoun?.overallProgress ?? 0;
  const verbProgress = progress.partsOfSpeech?.verb?.overallProgress ?? 0;
  const adjectiveProgress = progress.partsOfSpeech?.adjective?.overallProgress ?? 0;
  const adverbProgress = progress.partsOfSpeech?.adverb?.overallProgress ?? 0;

  return (
    <main className="min-h-screen hero-gradient flex flex-col items-center justify-center px-4 py-16">
      <ThemeToggle />

      <div className="w-full max-w-2xl animate-fade-in-up">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/tense" className="hover:text-foreground transition-colors">Grammar Topics</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">Parts of Speech</span>
        </div>

        {/* Heading */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3.5 py-1.5 rounded-full text-xs font-semibold mb-3 border border-primary/20">
            <Sparkles size={13} />
            Grammar Foundation & IELTS Mastery
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-3">
            Parts of Speech
          </h1>
          <p className="text-muted-foreground text-lg">
            Master English parts of speech from beginner to IELTS Advanced through structured lessons and challenges.
          </p>
        </div>

        {/* Active Cards List */}
        <div className="space-y-6">
          {/* Noun Card - Active */}
          <Link
            id="noun-category-card"
            href="/parts-of-speech/noun"
            className="group block glass-card rounded-3xl p-8 border border-border hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-5">
                {/* Icon */}
                <div className="p-4 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-colors duration-200 shrink-0">
                  <span className="text-3xl">📘</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-2xl font-bold text-foreground">Noun</h2>
                    <span className="text-xs font-semibold bg-secondary/10 text-secondary dark:text-secondary px-2.5 py-0.5 rounded-full border border-secondary/20">
                      Active
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    Learn how nouns work from absolute beginner level to IELTS Advanced, including types, sentence structure, vocabulary, grammar, speaking, and writing.
                  </p>

                  <div className="flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-xl w-fit mb-4">
                    <span>✨ 15+ challenges in every learning stage</span>
                  </div>

                  <div className="space-y-2">
                    <LinearProgress
                      value={Math.round(nounProgress)}
                      label="Progress"
                      colorClass="progress-gradient"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {[
                      'Learn (Zero to IELTS)',
                      'Fill in the Blank',
                      'Advanced MCQ',
                      'Error Correction',
                      'IELTS Context',
                      'Vocabulary',
                      'Speaking',
                      'Writing',
                      'Final Test',
                    ].map((stage) => (
                      <span
                        key={stage}
                        className="text-xs px-2.5 py-1 rounded-full font-medium bg-primary/10 text-primary border border-primary/20"
                      >
                        ● {stage}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-primary-foreground text-primary transition-all duration-200 shrink-0">
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          </Link>

          {/* Pronoun Card - Active */}
          <Link
            id="pronoun-category-card"
            href="/parts-of-speech/pronoun"
            className="group block glass-card rounded-3xl p-8 border border-border hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-5">
                {/* Icon */}
                <div className="p-4 bg-indigo-500/10 rounded-2xl group-hover:bg-indigo-500/20 transition-colors duration-200 shrink-0">
                  <span className="text-3xl">🔮</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-2xl font-bold text-foreground">Pronoun</h2>
                    <span className="text-xs font-semibold bg-emerald-500/10 text-emerald-500 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      Active
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    Learn how pronouns replace nouns and how to use them accurately from beginner level to IELTS Advanced.
                  </p>

                  <div className="flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-xl w-fit mb-4">
                    <span>✨ 15+ challenges in every learning stage</span>
                  </div>

                  <div className="space-y-2">
                    <LinearProgress
                      value={Math.round(pronounProgress)}
                      label="Progress"
                      colorClass="progress-gradient"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {[
                      'Learn (Zero to IELTS)',
                      'Fill in the Blank',
                      'Advanced MCQ',
                      'Error Correction',
                      'IELTS Context',
                      'Vocabulary',
                      'Speaking',
                      'Writing',
                      'Final Test',
                    ].map((stage) => (
                      <span
                        key={stage}
                        className="text-xs px-2.5 py-1 rounded-full font-medium bg-primary/10 text-primary border border-primary/20"
                      >
                        ● {stage}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-primary-foreground text-primary transition-all duration-200 shrink-0">
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          </Link>

          {/* Verb Card - Active */}
          <Link
            id="verb-category-card"
            href="/parts-of-speech/verb"
            className="group block glass-card rounded-3xl p-8 border border-border hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-5">
                {/* Icon */}
                <div className="p-4 bg-amber-500/10 rounded-2xl group-hover:bg-amber-500/20 transition-colors duration-200 shrink-0">
                  <span className="text-3xl">⚡</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-2xl font-bold text-foreground">Verb</h2>
                    <span className="text-xs font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400 px-2.5 py-0.5 rounded-full border border-amber-500/20">
                      Active
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    Learn verbs from absolute beginner level to IELTS Advanced, including verb forms, action and stative verbs, auxiliary verbs, modal verbs, phrasal verbs, transitive and intransitive verbs, verb patterns, and advanced academic usage.
                  </p>

                  <div className="flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-xl w-fit mb-4">
                    <span>✨ 15+ challenges in every learning stage</span>
                  </div>

                  <div className="space-y-2">
                    <LinearProgress
                      value={Math.round(verbProgress)}
                      label="Progress"
                      colorClass="progress-gradient"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {[
                      'Learn (Zero to IELTS)',
                      'Fill in the Blank',
                      'Advanced MCQ',
                      'Error Correction',
                      'IELTS Context',
                      'Vocabulary',
                      'Speaking',
                      'Writing',
                      'Final Test',
                    ].map((stage) => (
                      <span
                        key={stage}
                        className="text-xs px-2.5 py-1 rounded-full font-medium bg-primary/10 text-primary border border-primary/20"
                      >
                        ● {stage}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-primary-foreground text-primary transition-all duration-200 shrink-0">
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          </Link>

          {/* Adjective Card - Active */}
          <Link
            id="adjective-category-card"
            href="/parts-of-speech/adjective"
            className="group block glass-card rounded-3xl p-8 border border-border hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-5">
                {/* Icon */}
                <div className="p-4 bg-emerald-500/10 rounded-2xl group-hover:bg-emerald-500/20 transition-colors duration-200 shrink-0">
                  <span className="text-3xl">🎨</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-2xl font-bold text-foreground">Adjective</h2>
                    <span className="text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      Active
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    Learn how adjectives describe people, places, things, and ideas from absolute beginner level to IELTS Advanced through grammar, vocabulary, speaking, writing, and contextual challenges.
                  </p>

                  <div className="flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-xl w-fit mb-4">
                    <span>✨ 15+ challenges in every learning stage</span>
                  </div>

                  <div className="space-y-2">
                    <LinearProgress
                      value={Math.round(adjectiveProgress)}
                      label="Progress"
                      colorClass="progress-gradient"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {[
                      'Learn (Zero to IELTS)',
                      'Fill in the Blank',
                      'Advanced MCQ',
                      'Error Correction',
                      'IELTS Context',
                      'Vocabulary',
                      'Speaking',
                      'Writing',
                      'Final Test',
                    ].map((stage) => (
                      <span
                        key={stage}
                        className="text-xs px-2.5 py-1 rounded-full font-medium bg-primary/10 text-primary border border-primary/20"
                      >
                        ● {stage}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-primary-foreground text-primary transition-all duration-200 shrink-0">
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          </Link>

          {/* Adverb Card - Active */}
          <Link
            id="adverb-category-card"
            href="/parts-of-speech/adverb"
            className="group block glass-card rounded-3xl p-8 border border-border hover:border-primary/40 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-5">
                {/* Icon */}
                <div className="p-4 bg-cyan-500/10 rounded-2xl group-hover:bg-cyan-500/20 transition-colors duration-200 shrink-0">
                  <span className="text-3xl">🚀</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-2xl font-bold text-foreground">Adverb</h2>
                    <span className="text-xs font-semibold bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 px-2.5 py-0.5 rounded-full border border-cyan-500/20">
                      Active
                    </span>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                    Learn how adverbs modify verbs, adjectives, other adverbs, and sometimes entire clauses from absolute beginner level to IELTS Advanced through grammar, vocabulary, speaking, writing, and contextual challenges.
                  </p>

                  <div className="flex items-center gap-2 text-xs font-semibold text-primary bg-primary/10 border border-primary/20 px-3 py-1.5 rounded-xl w-fit mb-4">
                    <span>✨ 15+ challenges in every learning stage</span>
                  </div>

                  <div className="space-y-2">
                    <LinearProgress
                      value={Math.round(adverbProgress)}
                      label="Progress"
                      colorClass="progress-gradient"
                    />
                  </div>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {[
                      'Learn (Zero to IELTS)',
                      'Fill in the Blank',
                      'Advanced MCQ',
                      'Error Correction',
                      'IELTS Context',
                      'Vocabulary',
                      'Speaking',
                      'Writing',
                      'Final Test',
                    ].map((stage) => (
                      <span
                        key={stage}
                        className="text-xs px-2.5 py-1 rounded-full font-medium bg-primary/10 text-primary border border-primary/20"
                      >
                        ● {stage}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Arrow */}
              <div className="p-3 bg-primary/10 rounded-xl group-hover:bg-primary group-hover:text-primary-foreground text-primary transition-all duration-200 shrink-0">
                <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
              </div>
            </div>
          </Link>
        </div>

        {/* Future Parts of Speech (Coming Soon) */}
        <div className="mt-8">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4">
            Upcoming Parts of Speech
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {futurePartsOfSpeech.map((pos) => (
              <div
                key={pos.id}
                className="glass-card rounded-2xl p-4 border border-border opacity-50 cursor-not-allowed flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-foreground">{pos.title}</p>
                    <span className="text-[10px] font-medium bg-muted text-muted-foreground px-2 py-0.5 rounded-full border border-border">
                      Coming Soon
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{pos.desc}</p>
                </div>
                <TrendingUp size={16} className="text-muted-foreground shrink-0 ml-2" />
              </div>
            ))}
          </div>
        </div>

        <NavControls backHref="/tense" backLabel="Back to Grammar Topics" />
      </div>
    </main>
  );
}

