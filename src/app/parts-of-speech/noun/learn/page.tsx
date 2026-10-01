'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronDown, ChevronUp, CheckCircle, XCircle, Sparkles, BookOpen, Lightbulb } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar } from '@/components/ProgressIndicators';
import { NavControls } from '@/components/NavControls';
import { useProgress } from '@/contexts/ProgressContext';
import { nounLesson } from '@/data/parts-of-speech/noun';
import type { SentencePart } from '@/types';

function SentenceBuilder({ parts }: { parts: SentencePart[] }) {
  const [activePart, setActivePart] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        {parts.map((part, idx) => (
          <button
            key={idx}
            id={`noun-sentence-part-${idx}`}
            onClick={() => setActivePart(activePart === idx ? null : idx)}
            className={`sentence-part text-sm transition-all duration-200 ${
              activePart === idx ? 'ring-2 ring-offset-2 ring-offset-background shadow-lg scale-105' : ''
            }`}
            style={{
              backgroundColor: `${part.color}18`,
              color: part.color,
              borderColor: activePart === idx ? part.color : 'transparent',
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
            backgroundColor: `${parts[activePart].color}10`,
            borderColor: `${parts[activePart].color}30`,
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="p-2 rounded-xl shrink-0"
              style={{ backgroundColor: `${parts[activePart].color}20` }}
            >
              <span className="text-sm font-mono font-bold" style={{ color: parts[activePart].color }}>
                {parts[activePart].text}
              </span>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
                {parts[activePart].role}
              </p>
              <p className="text-sm text-foreground leading-relaxed">
                {parts[activePart].explanation}
              </p>
            </div>
          </div>
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        👆 Tap each chunk of the sentence to inspect its grammatical role and noun phrase structure.
      </p>
    </div>
  );
}

export default function NounLearnPage() {
  const { getPartOfSpeechProgress, completePartOfSpeechStage } = useProgress();
  const [banglaVisible, setBanglaVisible] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['section-1', 'section-5', 'section-8']);
  const [miniCheckAnswers, setMiniCheckAnswers] = useState<Record<string, number>>({});
  const [miniCheckStatus, setMiniCheckStatus] = useState<Record<string, 'correct' | 'incorrect'>>({});

  const nounProgress = getPartOfSpeechProgress('noun');

  const handleComplete = () => {
    completePartOfSpeechStage('noun', 'learn', 100, 100);
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
          <Link href="/parts-of-speech/noun" className="hover:text-foreground transition-colors">Noun</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">Learn</span>
        </div>

        {/* Stage progress */}
        <div className="mb-8">
          <StageProgressBar
            currentStage="learn"
            completedStages={nounProgress?.stages ?? {}}
          />
        </div>

        {/* Lesson Header */}
        <div className="glass-card rounded-3xl p-7 mb-6 border border-border">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-3xl">📘</span>
                <h1 className="text-2xl font-bold text-foreground">{nounLesson.name}</h1>
              </div>
              <p className="text-muted-foreground text-sm">{nounLesson.banglaName}</p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full border bg-primary/10 text-primary border-primary/20">
              Zero → IELTS Band 8+
            </span>
          </div>

          <p className="text-foreground leading-relaxed mb-3">{nounLesson.introduction}</p>

          <button
            id="toggle-noun-bangla-btn"
            onClick={() => setBanglaVisible(!banglaVisible)}
            className="text-xs text-primary hover:text-primary/80 font-medium flex items-center gap-1 transition-colors"
          >
            {banglaVisible ? '▲ Hide Bangla explanation' : '▼ Show Bangla explanation (বাংলায় দেখুন)'}
          </button>

          {banglaVisible && (
            <div className="mt-3 p-4 bg-primary/5 rounded-xl border border-primary/10 animate-scale-in">
              <p className="text-foreground text-sm leading-relaxed font-medium">
                {nounLesson.introductionBangla}
              </p>
            </div>
          )}
        </div>

        {/* Interactive Sentence Builder */}
        <div className="glass-card rounded-3xl p-7 mb-6 border border-border">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={18} className="text-primary" />
            <h2 className="text-lg font-bold text-foreground">Interactive Noun Phrase Anatomy</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-5">
            Click each component of this IELTS Band 8 sentence to understand how pre-modifiers and post-modifiers build sophisticated noun phrases.
          </p>
          <SentenceBuilder parts={nounLesson.interactiveSentence} />
        </div>

        {/* Lesson Sections (13 Core Modules) */}
        <div className="space-y-4 mb-8">
          {nounLesson.sections.map((section, idx) => {
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
                      <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-primary/10 text-primary">
                        {section.level}
                      </span>
                      <h3 className="text-base font-bold text-foreground">{section.title}</h3>
                    </div>
                    {section.banglaTitle && (
                      <p className="text-xs text-muted-foreground">{section.banglaTitle}</p>
                    )}
                  </div>
                  <div className="p-2 rounded-xl bg-muted shrink-0">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {/* Expanded Section Body */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 space-y-5 border-t border-border animate-fade-in">
                    {/* Description */}
                    <p className="text-sm text-foreground leading-relaxed">{section.description}</p>

                    {section.banglaExplanation && (
                      <div className="p-3.5 bg-primary/5 border border-primary/10 rounded-xl">
                        <p className="text-xs text-foreground font-medium leading-relaxed">
                          🇧🇩 <strong>বাংলা ব্যাখ্যা:</strong> {section.banglaExplanation}
                        </p>
                      </div>
                    )}

                    {/* Key Rules */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                        <BookOpen size={13} className="text-primary" /> Key Grammar Rules
                      </h4>
                      <ul className="space-y-1.5 text-sm text-foreground">
                        {section.rules.map((rule, rIdx) => (
                          <li key={rIdx} className="flex items-start gap-2 bg-card p-2.5 rounded-xl border border-border">
                            <span className="text-primary font-bold">✓</span>
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Examples */}
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                        📝 Practical Examples & Sentence Breakdown
                      </h4>
                      <div className="space-y-2">
                        {section.examples.map((ex, eIdx) => (
                          <div key={eIdx} className="p-3 bg-secondary/5 border border-secondary/15 rounded-xl">
                            <p className="text-sm font-semibold text-foreground mb-1">"{ex.text}"</p>
                            <p className="text-xs text-secondary font-mono">{ex.breakdown}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Common Mistakes */}
                    {section.commonMistakes && section.commonMistakes.length > 0 && (
                      <div className="p-4 bg-primary/5 border border-primary/20 rounded-2xl">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-primary mb-2 flex items-center gap-1.5">
                          ⚠️ Common Learner Mistakes (Avoid in IELTS)
                        </h4>
                        <div className="space-y-2 text-sm">
                          {section.commonMistakes.map((m, mIdx) => (
                            <div key={mIdx} className="space-y-0.5">
                              <p className="text-primary line-through text-xs">{m.wrong}</p>
                              <p className="text-secondary font-semibold text-xs">{m.correct}</p>
                              <p className="text-[11px] text-muted-foreground">{m.reason}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* IELTS Tips */}
                    {section.ieltsTips && section.ieltsTips.length > 0 && (
                      <div className="p-3.5 bg-secondary/5 border border-secondary/15 rounded-xl">
                        <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1 flex items-center gap-1.5">
                          🎓 IELTS Academic Tip
                        </p>
                        {section.ieltsTips.map((tip, tIdx) => (
                          <p key={tIdx} className="text-xs text-foreground leading-relaxed">{tip}</p>
                        ))}
                      </div>
                    )}

                    {/* Interactive Mini Check */}
                    {section.miniCheck && (
                      <div className="p-4 bg-card rounded-2xl border-2 border-dashed border-primary/30">
                        <div className="flex items-center gap-2 mb-2">
                          <Lightbulb size={16} className="text-primary" />
                          <span className="text-xs font-bold uppercase tracking-wider text-primary">
                            Concept Quick Check #{idx + 1}
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-foreground mb-3">
                          {section.miniCheck.question}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-3">
                          {section.miniCheck.options.map((opt, oIdx) => {
                            const isSelected = selectedOption === oIdx;
                            const isCorrect = oIdx === section.miniCheck!.correctIndex;
                            let btnCls = 'border-border bg-background hover:border-primary/40';
                            if (checkStatus) {
                              if (isCorrect) btnCls = 'border-secondary bg-secondary/10 text-secondary dark:text-secondary';
                              else if (isSelected && !isCorrect) btnCls = 'border-primary bg-primary/10 text-primary dark:text-primary';
                              else btnCls = 'border-border bg-muted opacity-50';
                            } else if (isSelected) {
                              btnCls = 'border-primary bg-primary/10 text-primary';
                            }

                            return (
                              <button
                                key={oIdx}
                                id={`mini-check-${section.id}-opt-${oIdx}`}
                                onClick={() => handleMiniCheck(section.id, oIdx, section.miniCheck!.correctIndex)}
                                disabled={Boolean(checkStatus)}
                                className={`p-3 rounded-xl border text-xs font-medium text-left transition-all ${btnCls}`}
                              >
                                {opt}
                              </button>
                            );
                          })}
                        </div>

                        {checkStatus && (
                          <div className={`p-3 rounded-xl border animate-scale-in ${
                            checkStatus === 'correct' ? 'bg-secondary/10 border-secondary/20' : 'bg-primary/10 border-primary/20'
                          }`}>
                            <div className="flex items-start gap-2">
                              {checkStatus === 'correct' ? (
                                <CheckCircle size={16} className="text-secondary shrink-0 mt-0.5" />
                              ) : (
                                <XCircle size={16} className="text-primary shrink-0 mt-0.5" />
                              )}
                              <div>
                                <p className={`text-xs font-bold ${checkStatus === 'correct' ? 'text-secondary' : 'text-primary'}`}>
                                  {checkStatus === 'correct' ? 'Correct!' : 'Incorrect'}
                                </p>
                                <p className="text-xs text-foreground mt-0.5">
                                  {section.miniCheck.explanation}
                                </p>
                              </div>
                            </div>
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

        {/* Complete & Continue to Fill in the Blank */}
        <div className="glass-card rounded-3xl p-6 border border-secondary/20 bg-secondary/5 mb-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-foreground">Ready to Practice Nouns?</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                You've reviewed the full lesson. Now test yourself in Fill in the Blank!
              </p>
            </div>
            <Link
              id="start-noun-practice-btn"
              href="/parts-of-speech/noun/practice"
              onClick={handleComplete}
              className="flex items-center gap-2 px-5 py-3 bg-secondary text-white rounded-xl font-semibold text-sm hover:bg-secondary/90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shrink-0"
            >
              Start Practice
              <ChevronRight size={16} />
            </Link>
          </div>
        </div>

        <NavControls backHref="/parts-of-speech/noun" backLabel="Back to Noun Overview" />
      </div>
    </main>
  );
}
