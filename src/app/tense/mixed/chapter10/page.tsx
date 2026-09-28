'use client';

import Link from 'next/link';
import { ChevronLeft, Book, Clock } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { NavControls } from '@/components/NavControls';

const tenses = [
  {
    name: 'Present Simple',
    structure: 'Subject + V1 / V1+s',
    uses: ['Habits', 'Routines', 'Facts', 'General truths', 'Permanent situations'],
    example: 'I study English every day.',
    signals: ['every day', 'usually', 'always', 'often', 'sometimes', 'generally']
  },
  {
    name: 'Present Continuous',
    structure: 'Subject + am/is/are + V-ing',
    uses: ['Actions happening now', 'Temporary situations', 'Current trends', 'Planned near-future arrangements'],
    example: 'I am preparing for IELTS.',
    signals: ['now', 'right now', 'at the moment', 'currently', 'these days']
  },
  {
    name: 'Present Perfect',
    structure: 'Subject + have/has + V3',
    uses: ['Past actions connected to the present', 'Life experiences', 'Recent actions', 'Unfinished time periods'],
    example: 'I have completed three mock tests this week.',
    signals: ['already', 'yet', 'just', 'ever', 'never', 'recently', 'so far']
  },
  {
    name: 'Present Perfect Continuous',
    structure: 'Subject + have/has been + V-ing',
    uses: ['Actions that started in the past and continue now', 'Duration', 'Recently completed activities with visible results'],
    example: 'I have been studying English for two years.',
    signals: ['for', 'since', 'all day', 'lately', 'recently']
  },
  {
    name: 'Past Simple',
    structure: 'Subject + V2',
    uses: ['Completed past actions'],
    example: 'I studied English yesterday.',
    signals: ['yesterday', 'last week', 'last year', 'ago', 'in 2020']
  },
  {
    name: 'Past Continuous',
    structure: 'Subject + was/were + V-ing',
    uses: ['Actions in progress at a specific past time'],
    example: 'I was studying when my friend called.',
    signals: ['while', 'when', 'at that time']
  },
  {
    name: 'Past Perfect',
    structure: 'Subject + had + V3',
    uses: ['The earlier of two past actions'],
    example: 'The train had left before I arrived.',
    signals: ['before', 'after', 'by the time', 'already']
  },
  {
    name: 'Past Perfect Continuous',
    structure: 'Subject + had been + V-ing',
    uses: ['Duration before a past event'],
    example: 'I had been studying for two hours before I took a break.',
    signals: ['for', 'since', 'before', 'until']
  },
  {
    name: 'Future Simple',
    structure: 'Subject + will + V1',
    uses: ['Predictions', 'Promises', 'Decisions', 'Future actions'],
    example: 'I will take my IELTS exam next month.',
    signals: ['tomorrow', 'next week', 'next year', 'soon', 'I think', 'probably']
  },
  {
    name: 'Future Continuous',
    structure: 'Subject + will be + V-ing',
    uses: ['An action that will be in progress at a specific future time'],
    example: 'At 8 p.m. tomorrow, I will be studying.',
    signals: ['this time tomorrow', 'at 8 p.m. tomorrow', 'this time next week']
  },
  {
    name: 'Future Perfect',
    structure: 'Subject + will have + V3',
    uses: ['Actions completed before a future point'],
    example: 'By Friday, I will have completed the assignment.',
    signals: ['by tomorrow', 'by next week', 'by next year', 'by the time']
  },
  {
    name: 'Future Perfect Continuous',
    structure: 'Subject + will have been + V-ing',
    uses: ['Duration continuing up to a future point'],
    example: 'By next year, I will have been studying English for three years.',
    signals: ['for', 'since', 'by next year', 'by the time']
  }
];

export default function Chapter10Page() {
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
              <Book size={32} />
            </div>
            <div>
              <h1 className="text-4xl sm:text-5xl font-black text-foreground">Chapter 10</h1>
              <p className="text-xl text-muted-foreground mt-1 font-medium">Master Hints & Tense Guide</p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl leading-relaxed mt-4">
            Use this section as your final reference guide. Review the structures, primary uses, and common signal words for all 12 English tenses to maximize your IELTS score.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {tenses.map((tense) => (
            <div key={tense.name} className="glass-card rounded-3xl p-6 sm:p-8 border border-border hover:border-primary/20 transition-colors">
              <h2 className="text-2xl font-bold text-foreground mb-4 pb-4 border-b border-border/50">
                {tense.name}
              </h2>
              
              <div className="space-y-5">
                <div>
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Structure</h3>
                  <code className="px-3 py-1.5 bg-muted rounded-lg text-foreground font-mono text-sm block border border-border">
                    {tense.structure}
                  </code>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-primary uppercase tracking-wider mb-2">Use For</h3>
                  <ul className="space-y-1.5">
                    {tense.uses.map((use, i) => (
                      <li key={i} className="text-muted-foreground text-sm flex items-start gap-2">
                        <span className="text-primary mt-1">•</span> {use}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-primary/5 p-4 rounded-xl border border-primary/10">
                  <h3 className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Example</h3>
                  <p className="text-foreground font-medium italic">"{tense.example}"</p>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-secondary uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Clock size={16} /> Signal Words
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tense.signals.map((sig, i) => (
                      <span key={i} className="px-2.5 py-1 bg-secondary/10 text-secondary dark:text-secondary border border-secondary/20 rounded-md text-xs font-medium">
                        {sig}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <NavControls backHref="/tense/mixed" backLabel="Back to Mastery" />
      </div>
    </main>
  );
}
