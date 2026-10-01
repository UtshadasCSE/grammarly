'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronDown, ChevronUp, CheckCircle, XCircle, Sparkles, BookOpen, Lightbulb } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar } from '@/components/ProgressIndicators';
import { NavControls } from '@/components/NavControls';
import { useProgress } from '@/contexts/ProgressContext';
import { pronounLessonData } from '@/data/parts-of-speech/pronoun';
import type { SentencePart } from '@/types';

function SentenceBuilder({ parts }: { parts: SentencePart[] }) {
  const [activePart, setActivePart] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2 items-center">
        {parts.map((part, idx) => (
          <button
            key={idx}
            id={`pronoun-sentence-part-${idx}`}
            onClick={() => setActivePart(activePart === idx ? null : idx)}
            className={`sentence-part text-sm transition-all duration-200 ${
              activePart === idx ? 'ring-2 ring-offset-2 ring-offset-background shadow-lg scale-105' : ''
            }`}
            style={{
              backgroundColor: `${part.color || '#6366f1'}18`,
              color: part.color || '#6366f1',
              borderColor: activePart === idx ? (part.color || '#6366f1') : 'transparent',
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
            backgroundColor: `${parts[activePart].color || '#6366f1'}10`,
            borderColor: `${parts[activePart].color || '#6366f1'}30`,
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="p-2 rounded-xl shrink-0"
              style={{ backgroundColor: `${parts[activePart].color || '#6366f1'}20` }}
            >
              <span className="text-sm font-mono font-bold" style={{ color: parts[activePart].color || '#6366f1' }}>
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
        👆 Tap each word of the sentence to inspect its grammatical role and pronoun case structure.
      </p>
    </div>
  );
}

export default function PronounLearnPage() {
  const { getPartOfSpeechProgress, completePartOfSpeechStage } = useProgress();
  const [banglaVisible, setBanglaVisible] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>([
    'what-is-pronoun',
    'personal-pronouns',
    'relative-pronouns',
  ]);
  const [miniCheckAnswers, setMiniCheckAnswers] = useState<Record<string, number>>({});
  const [miniCheckStatus, setMiniCheckStatus] = useState<Record<string, 'correct' | 'incorrect'>>({});

  const pronounProgress = getPartOfSpeechProgress('pronoun');

  const handleComplete = () => {
    completePartOfSpeechStage('pronoun', 'learn', 100, 100);
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
    <main className="min-h-screen hero-gradient px-4 py-12">
      <ThemeToggle />

      <div className="w-full max-w-3xl mx-auto animate-fade-in-up space-y-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          <Link href="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight size={14} />
          <Link href="/parts-of-speech" className="hover:text-foreground transition-colors">Parts of Speech</Link>
          <ChevronRight size={14} />
          <Link href="/parts-of-speech/pronoun" className="hover:text-foreground transition-colors">Pronoun</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">Learn</span>
        </div>

        {/* Stage Progress Bar */}
        <StageProgressBar currentStage="learn" completedStages={pronounProgress?.stages} />

        {/* Header */}
        <div className="glass-card rounded-3xl p-8 border border-primary/20">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3.5 py-1.5 rounded-full text-xs font-semibold mb-3 border border-primary/20">
                <BookOpen size={13} />
                Stage 1 • Comprehensive Lesson (Zero to IELTS Advanced)
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                {pronounLessonData.name}
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                {pronounLessonData.introduction}
              </p>
            </div>

            {/* Bangla Toggle Button */}
            <button
              id="pronoun-bangla-toggle-btn"
              onClick={() => setBanglaVisible(!banglaVisible)}
              className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all duration-200 shrink-0 border ${
                banglaVisible
                  ? 'bg-secondary text-secondary-foreground border-secondary shadow-md'
                  : 'bg-muted/60 text-muted-foreground border-border hover:bg-muted'
              }`}
            >
              {banglaVisible ? '🇧🇩 বাংলা চালু' : '🇧🇩 বাংলা অন করুন'}
            </button>
          </div>

          {banglaVisible && (
            <div className="mt-4 p-4 rounded-2xl bg-secondary/10 border border-secondary/20 animate-scale-in">
              <p className="text-xs font-semibold text-secondary mb-1">বাংলা সারসংক্ষেপ:</p>
              <p className="text-sm text-foreground leading-relaxed">
                {pronounLessonData.introductionBangla}
              </p>
            </div>
          )}
        </div>

        {/* Interactive Sentence Breakdown */}
        <div className="glass-card rounded-3xl p-7 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles size={18} className="text-primary" />
            <h2 className="text-lg font-bold text-foreground">Interactive Sentence Breakdown</h2>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            See how personal, possessive, and demonstrative pronouns interact with verbs and nouns in natural sentences:
          </p>
          <SentenceBuilder parts={pronounLessonData.interactiveSentence} />
        </div>

        {/* Lesson Sections (Accordion / Cards) */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Pronoun Curriculum (13 Interactive Sections)
            </h2>
            <button
              onClick={() =>
                setExpandedSections(
                  expandedSections.length === pronounLessonData.sections.length
                    ? []
                    : pronounLessonData.sections.map((s) => s.id)
                )
              }
              className="text-xs text-primary hover:underline font-medium"
            >
              {expandedSections.length === pronounLessonData.sections.length ? 'Collapse All' : 'Expand All'}
            </button>
          </div>

          {pronounLessonData.sections.map((section, idx) => {
            const isExpanded = expandedSections.includes(section.id);
            const checkAnswer = miniCheckAnswers[section.id];
            const checkStatus = miniCheckStatus[section.id];

            return (
              <div
                key={section.id}
                id={`pronoun-section-${section.id}`}
                className={`glass-card rounded-3xl border transition-all duration-200 overflow-hidden ${
                  isExpanded ? 'border-primary/40 shadow-lg' : 'border-border hover:border-primary/20'
                }`}
              >
                {/* Section Header Accordion */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3.5 flex-1">
                    <span className="w-8 h-8 rounded-xl bg-primary/10 text-primary font-bold text-xs flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-base font-bold text-foreground">{section.title}</h3>
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-muted text-muted-foreground border border-border">
                          {section.level}
                        </span>
                      </div>
                      {banglaVisible && section.banglaTitle && (
                        <p className="text-xs text-secondary font-medium mt-0.5">{section.banglaTitle}</p>
                      )}
                    </div>
                  </div>
                  <div className="p-2 rounded-xl bg-muted/50 text-muted-foreground shrink-0">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                {/* Section Content */}
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-border/50 space-y-5 animate-fade-in">
                    {/* Explanation */}
                    <div>
                      <p className="text-sm text-foreground leading-relaxed">{section.description}</p>
                      {banglaVisible && section.banglaExplanation && (
                        <p className="text-xs text-secondary mt-1.5 p-3 rounded-xl bg-secondary/5 border border-secondary/20">
                          {section.banglaExplanation}
                        </p>
                      )}
                    </div>

                    {/* Rules */}
                    <div className="p-4 rounded-2xl bg-muted/40 border border-border space-y-2">
                      <p className="text-xs font-bold uppercase tracking-wider text-primary">
                        Grammar Rules &amp; Patterns
                      </p>
                      <ul className="space-y-1.5">
                        {section.rules.map((rule, rIdx) => (
                          <li key={rIdx} className="text-xs text-foreground flex items-start gap-2">
                            <span className="text-primary mt-0.5 font-bold">•</span>
                            <span>{rule}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Examples */}
                    <div className="space-y-2.5">
                      <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                        Examples in Context
                      </p>
                      {section.examples.map((ex, eIdx) => (
                        <div key={eIdx} className="p-3.5 rounded-2xl bg-background/60 border border-border space-y-1">
                          <p className="text-sm font-semibold text-foreground">{ex.text}</p>
                          <p className="text-xs font-mono text-primary">{ex.breakdown}</p>
                          {ex.note && <p className="text-xs text-muted-foreground italic">Note: {ex.note}</p>}
                        </div>
                      ))}
                    </div>

                    {/* Common Mistakes */}
                    {section.commonMistakes && section.commonMistakes.length > 0 && (
                      <div className="p-4 rounded-2xl bg-rose-500/5 border border-rose-500/20 space-y-2">
                        <p className="text-xs font-bold text-rose-500 uppercase tracking-wider flex items-center gap-1.5">
                          <XCircle size={14} /> Common Learner Mistakes
                        </p>
                        {section.commonMistakes.map((mistake, mIdx) => (
                          <div key={mIdx} className="text-xs space-y-1">
                            <p className="text-rose-400 line-through">{mistake.wrong}</p>
                            <p className="text-emerald-400 font-medium">{mistake.correct}</p>
                            <p className="text-muted-foreground text-[11px]">{mistake.reason}</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* IELTS Tips */}
                    {section.ieltsTips && section.ieltsTips.length > 0 && (
                      <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-1.5">
                        <p className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-1.5">
                          <Lightbulb size={14} /> IELTS Band 8+ Tip
                        </p>
                        {section.ieltsTips.map((tip, tIdx) => (
                          <p key={tIdx} className="text-xs text-foreground leading-relaxed">
                            {tip}
                          </p>
                        ))}
                      </div>
                    )}

                    {/* Mini Check Question */}
                    {section.miniCheck && (
                      <div className="p-4 rounded-2xl bg-secondary/5 border border-secondary/20 space-y-3">
                        <p className="text-xs font-bold uppercase tracking-wider text-secondary flex items-center gap-1.5">
                          <CheckCircle size={14} /> Quick Concept Check
                        </p>
                        <p className="text-xs font-semibold text-foreground">
                          {section.miniCheck.question}
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {section.miniCheck.options.map((opt, optIdx) => {
                            const isSelected = checkAnswer === optIdx;
                            const isCorrectOpt = optIdx === section.miniCheck!.correctIndex;

                            let btnStyle = 'bg-background hover:bg-muted text-foreground border-border';
                            if (checkStatus) {
                              if (isCorrectOpt) {
                                btnStyle = 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-bold';
                              } else if (isSelected && !isCorrectOpt) {
                                btnStyle = 'bg-rose-500/20 text-rose-300 border-rose-500/50';
                              } else {
                                btnStyle = 'bg-muted/40 text-muted-foreground border-border opacity-50';
                              }
                            } else if (isSelected) {
                              btnStyle = 'bg-primary text-primary-foreground border-primary';
                            }

                            return (
                              <button
                                key={optIdx}
                                onClick={() => handleMiniCheck(section.id, optIdx, section.miniCheck!.correctIndex)}
                                className={`text-left p-2.5 rounded-xl border text-xs transition-all ${btnStyle}`}
                              >
                                {String.fromCharCode(65 + optIdx)}. {opt}
                              </button>
                            );
                          })}
                        </div>
                        {checkStatus && (
                          <div
                            className={`p-3 rounded-xl text-xs ${
                              checkStatus === 'correct'
                                ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                                : 'bg-rose-500/10 text-rose-300 border border-rose-500/20'
                            }`}
                          >
                            <p className="font-semibold mb-0.5">
                              {checkStatus === 'correct' ? '✅ Correct!' : '❌ Incorrect'}
                            </p>
                            <p>{section.miniCheck.explanation}</p>
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

        {/* Mark Stage Complete / Continue */}
        <div className="glass-card rounded-3xl p-6 border border-primary/20 text-center space-y-4">
          <h3 className="text-base font-bold text-foreground">
            Finished the Pronoun Lesson?
          </h3>
          <p className="text-xs text-muted-foreground max-w-md mx-auto">
            Click below to mark this stage complete and proceed to Stage 2: Fill in the Blank (20 Guided &amp; Challenge Questions).
          </p>
          <div className="flex justify-center gap-3">
            <button
              id="pronoun-complete-learn-btn"
              onClick={handleComplete}
              className="px-6 py-3 rounded-2xl bg-secondary text-secondary-foreground text-xs font-bold hover:opacity-90 transition-opacity shadow-lg shadow-secondary/20"
            >
              ✓ Mark Stage 1 Complete (100%)
            </button>
            <Link
              href="/parts-of-speech/pronoun/practice"
              onClick={handleComplete}
              className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground text-xs font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
            >
              Continue to Fill in the Blank →
            </Link>
          </div>
        </div>

        <NavControls
          backHref="/parts-of-speech/pronoun"
          backLabel="Back to Pronoun Hub"
          continueHref="/parts-of-speech/pronoun/practice"
          continueLabel="Stage 2: Fill in the Blank"
        />
      </div>
    </main>
  );
}
