'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronDown, ChevronUp, CheckCircle, XCircle, Sparkles, Lightbulb } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar } from '@/components/ProgressIndicators';
import { NavControls } from '@/components/NavControls';
import { useProgress } from '@/contexts/ProgressContext';
import { adverbLesson } from '@/data/parts-of-speech/adverb';
import type { SentencePart } from '@/types';

function SentenceBuilder({ parts }: { parts: SentencePart[] }) {
  const [activePart, setActivePart] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        {parts.map((part, idx) => (
          <button
            key={idx}
            id={`adv-sentence-part-${idx}`}
            onClick={() => setActivePart(activePart === idx ? null : idx)}
            className={`sentence-part text-sm transition-all duration-200 ${
              activePart === idx ? 'ring-2 ring-offset-2 ring-offset-background shadow-lg scale-105' : ''
            }`}
            style={{
              backgroundColor: `${part.color || '#06b6d4'}18`,
              color: part.color || '#06b6d4',
              borderColor: activePart === idx ? (part.color || '#06b6d4') : 'transparent',
            }}
          >
            {part.text}
          </button>
        ))}
      </div>

      {activePart !== null && (
        <div
          className="p-4 rounded-2xl border animate-scale-in"
          style={{
            backgroundColor: `${parts[activePart].color || '#06b6d4'}10`,
            borderColor: `${parts[activePart].color || '#06b6d4'}30`,
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="p-2 rounded-xl shrink-0"
              style={{ backgroundColor: `${parts[activePart].color || '#06b6d4'}20` }}
            >
              <span className="text-sm font-mono font-bold" style={{ color: parts[activePart].color || '#06b6d4' }}>
                {parts[activePart].text}
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                {parts[activePart].partOfSpeech || parts[activePart].role}
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                {parts[activePart].explanation}
              </p>
            </div>
          </div>
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        👆 Tap each word of the sentence to inspect its grammatical role and modifier hierarchy.
      </p>
    </div>
  );
}

export default function AdverbLearnPage() {
  const { getPartOfSpeechProgress, completePartOfSpeechStage } = useProgress();
  const [banglaVisible, setBanglaVisible] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'what-is-an-adverb',
    'adverb-vs-adjective',
    'common-adverb-formation',
  ]);
  const [miniCheckAnswers, setMiniCheckAnswers] = useState<Record<string, number>>({});
  const [miniCheckStatus, setMiniCheckStatus] = useState<Record<string, 'correct' | 'incorrect'>>({});

  const adverbProgress = getPartOfSpeechProgress('adverb');

  const handleComplete = () => {
    completePartOfSpeechStage('adverb', 'learn', 100, 100);
  };

  const toggleSection = (id: string) => {
    setExpandedSections((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleMiniCheck = (sectionId: string, selectedIdx: number, correctIdx: number) => {
    setMiniCheckAnswers((prev) => ({ ...prev, [sectionId]: selectedIdx }));
    setMiniCheckStatus((prev) => ({
      ...prev,
      [sectionId]: selectedIdx === correctIdx ? 'correct' : 'incorrect',
    }));
  };

  return (
    <main className="min-h-screen hero-gradient px-4 py-16">
      <ThemeToggle />

      <div className="w-full max-w-2xl mx-auto animate-fade-in-up">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
          <Link href="/parts-of-speech" className="hover:text-foreground transition-colors">Parts of Speech</Link>
          <ChevronRight size={14} />
          <Link href="/parts-of-speech/adverb" className="hover:text-foreground transition-colors">Adverb</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">Learn</span>
        </div>

        {/* Stage progress */}
        <div className="mb-8">
          <StageProgressBar
            currentStage="learn"
            completedStages={adverbProgress?.stages ?? {}}
          />
        </div>

        {/* Lesson Header */}
        <div className="glass-card rounded-3xl p-7 mb-6 border border-border">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-3xl">🚀</span>
                <h1 className="text-2xl font-bold text-foreground">{adverbLesson.name}</h1>
              </div>
              <p className="text-muted-foreground text-sm">{adverbLesson.banglaName}</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full border bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20">
              Zero → IELTS Band 8+
            </span>
          </div>

          <p className="text-foreground leading-relaxed mb-3">{adverbLesson.introduction}</p>

          <button
            id="toggle-adverb-bangla-btn"
            onClick={() => setBanglaVisible(!banglaVisible)}
            className="text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
          >
            {banglaVisible ? '▲ Hide Bangla explanation' : '▼ Show Bangla explanation (বাংলায় দেখুন)'}
          </button>

          {banglaVisible && (
            <div className="mt-3 p-4 bg-primary/5 rounded-xl border border-primary/10 animate-scale-in">
              <p className="text-foreground text-sm leading-relaxed font-medium">
                {adverbLesson.introductionBangla}
              </p>
            </div>
          )}
        </div>

        {/* Interactive Sentence Breakdown */}
        <div className="glass-card rounded-3xl p-7 mb-6 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={18} className="text-primary" />
            <h2 className="text-lg font-bold text-foreground">Interactive Adverb Structure & Modifier Anatomy</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-5">
            Click each component of this complex sentence to inspect how determiners, subject nouns, manner adverbs, verbs, objects, and time adverbs work together.
          </p>
          <SentenceBuilder parts={adverbLesson.interactiveSentence} />
        </div>

        {/* Lesson Sections (15 Progressive Modules) */}
        <div className="space-y-4 mb-8">
          {adverbLesson.sections.map((section) => {
            const isExpanded = expandedSections.includes(section.id);
            const checkStatus = miniCheckStatus[section.id];
            const selectedOption = miniCheckAnswers[section.id];

            return (
              <div
                key={section.id}
                className="glass-card rounded-3xl border border-border overflow-hidden transition-all duration-300"
              >
                {/* Section Header */}
                <button
                  id={`section-toggle-${section.id}`}
                  onClick={() => toggleSection(section.id)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 hover:bg-primary/5 transition-colors"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
                        {section.level}
                      </span>
                      <h3 className="text-base font-bold text-foreground">{section.title}</h3>
                    </div>
                    {section.banglaTitle && (
                      <p className="text-xs text-muted-foreground">{section.banglaTitle}</p>
                    )}
                  </div>
                  <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </button>

                {/* Section Content */}
                {isExpanded && (
                  <div className="p-6 pt-0 border-t border-border/50 space-y-6 animate-fade-in-up">
                    <p className="text-sm text-foreground leading-relaxed mt-4">{section.description}</p>

                    {section.banglaExplanation && (
                      <div className="p-4 bg-muted/40 rounded-2xl border border-border/40">
                        <p className="text-xs font-semibold text-primary mb-1">বাংলা সারসংক্ষেপ:</p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {section.banglaExplanation}
                        </p>
                      </div>
                    )}

                    {/* Rules */}
                    {section.rules && section.rules.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Key Rules & Grammar Principles:
                        </p>
                        <ul className="space-y-1.5">
                          {section.rules.map((rule, rIdx) => (
                            <li key={rIdx} className="text-sm text-foreground flex items-start gap-2">
                              <span className="text-primary font-bold shrink-0">•</span>
                              <span>{rule}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Examples */}
                    {section.examples && section.examples.length > 0 && (
                      <div className="space-y-3">
                        <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                          Practical & Academic Examples:
                        </p>
                        <div className="space-y-2">
                          {section.examples.map((eg, eIdx) => (
                            <div
                              key={eIdx}
                              className="p-4 rounded-2xl bg-primary/5 border border-primary/10 space-y-1.5"
                            >
                              <p className="text-sm font-semibold text-foreground">{eg.text}</p>
                              <p className="text-xs text-primary font-medium">{eg.breakdown}</p>
                              {eg.note && (
                                <p className="text-xs text-muted-foreground italic">💡 {eg.note}</p>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Common Mistakes */}
                    {section.commonMistakes && section.commonMistakes.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                          Common Learner Mistakes & Fixes:
                        </p>
                        <div className="space-y-2">
                          {section.commonMistakes.map((cm, cIdx) => (
                            <div
                              key={cIdx}
                              className="p-3.5 rounded-2xl bg-destructive/5 border border-destructive/20 space-y-1 text-xs"
                            >
                              <p className="text-destructive line-through">❌ {cm.wrong}</p>
                              <p className="text-secondary font-medium">✅ {cm.correct}</p>
                              <p className="text-muted-foreground">Reason: {cm.reason}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* IELTS Tips */}
                    {section.ieltsTips && section.ieltsTips.length > 0 && (
                      <div className="p-4 rounded-2xl bg-secondary/5 border border-secondary/20 space-y-2">
                        <div className="flex items-center gap-2 text-secondary font-bold text-xs uppercase tracking-wider">
                          <Lightbulb size={14} />
                          <span>IELTS Academic & Band 8-9 Insight</span>
                        </div>
                        <ul className="space-y-1">
                          {section.ieltsTips.map((tip, tIdx) => (
                            <li key={tIdx} className="text-xs text-muted-foreground flex items-start gap-2">
                              <span className="text-secondary font-bold">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Mini Knowledge Check */}
                    {section.miniCheck && (
                      <div className="p-5 rounded-2xl bg-muted/60 border border-border space-y-4">
                        <div className="flex items-center gap-2">
                          <Sparkles size={16} className="text-primary" />
                          <p className="text-xs font-bold uppercase tracking-wider text-foreground">
                            Mini Knowledge Check
                          </p>
                        </div>

                        <p className="text-sm font-medium text-foreground">
                          {section.miniCheck.question}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {section.miniCheck.options.map((opt, oIdx) => {
                            const isSelected = selectedOption === oIdx;
                            const isCorrect = oIdx === section.miniCheck?.correctIndex;

                            let btnStyle = 'bg-background border-border hover:border-primary/40';
                            if (checkStatus) {
                              if (isCorrect) {
                                btnStyle = 'bg-secondary/15 border-secondary text-secondary font-semibold';
                              } else if (isSelected) {
                                btnStyle = 'bg-destructive/15 border-destructive text-destructive';
                              }
                            }

                            return (
                              <button
                                key={oIdx}
                                id={`mini-check-${section.id}-opt-${oIdx}`}
                                disabled={Boolean(checkStatus)}
                                onClick={() =>
                                  handleMiniCheck(
                                    section.id,
                                    oIdx,
                                    section.miniCheck?.correctIndex ?? 0
                                  )
                                }
                                className={`p-3 rounded-xl border text-xs text-left transition-all ${btnStyle}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {checkStatus && (
                          <div
                            className={`p-3.5 rounded-xl border text-xs space-y-1 animate-scale-in ${
                              checkStatus === 'correct'
                                ? 'bg-secondary/10 border-secondary/30 text-secondary'
                                : 'bg-destructive/10 border-destructive/30 text-destructive'
                            }`}
                          >
                            <div className="flex items-center gap-1.5 font-bold">
                              {checkStatus === 'correct' ? (
                                <>
                                  <CheckCircle size={14} /> Correct!
                                </>
                              ) : (
                                <>
                                  <XCircle size={14} /> Incorrect
                                </>
                              )}
                            </div>
                            <p className="text-muted-foreground">{section.miniCheck.explanation}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Completion Action */}
        <div className="glass-card rounded-3xl p-6 border border-border text-center mb-8">
          <h3 className="text-lg font-bold text-foreground mb-2">
            Completed Adverb Grammar Lesson?
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            Mark this stage as complete to unlock Stage 2: Fill in the Blank challenges.
          </p>
          <button
            id="complete-adverb-learn-btn"
            onClick={handleComplete}
            className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
          >
            ✓ Mark Learn Stage as Done
          </button>
        </div>

        {/* Bottom Navigation */}
        <NavControls
          backHref="/parts-of-speech/adverb"
          backLabel="Back to Adverb Hub"
          continueHref="/parts-of-speech/adverb/practice"
          continueLabel="Continue to Fill in the Blank →"
        />
      </div>
    </main>
  );
}
