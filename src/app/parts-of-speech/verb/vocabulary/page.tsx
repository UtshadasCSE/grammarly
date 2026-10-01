'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Volume2, BookOpen, CheckCircle, Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar } from '@/components/ProgressIndicators';
import { useProgress } from '@/contexts/ProgressContext';
import { verbVocabularyList } from '@/data/parts-of-speech/verb';
import type { VerbVocabItem } from '@/types';

function VocabCard({
  item,
  onMastered,
  mastered,
}: {
  item: VerbVocabItem;
  onMastered: (word: string) => void;
  mastered: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(item.word);
      utterance.lang = 'en-GB';
      utterance.rate = 0.85;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div
      className={`glass-card rounded-2xl border overflow-hidden transition-all duration-300 ${
        mastered ? 'border-secondary/30 bg-secondary/5' : 'border-border hover:border-primary/30'
      }`}
    >
      {/* Header */}
      <button
        id={`verb-vocab-card-${item.id}`}
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5 hover:bg-primary/5 transition-colors"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-3 mb-1 flex-wrap">
              <h3 className="text-xl font-bold text-foreground">{item.word}</h3>
              <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full border border-border capitalize">
                {item.partOfSpeech}
              </span>
              {mastered && (
                <span className="text-xs bg-secondary/10 text-secondary dark:text-secondary px-2 py-0.5 rounded-full border border-secondary/20 font-semibold">
                  ✓ Mastered
                </span>
              )}
            </div>
            <p className="text-sm text-primary font-semibold">{item.banglaMeaning}</p>
            <p className="text-xs text-muted-foreground font-mono mt-1">{item.pronunciation}</p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id={`speak-btn-${item.id}`}
              onClick={(e) => {
                e.stopPropagation();
                handleSpeak();
              }}
              className="p-2 rounded-xl bg-primary/10 hover:bg-primary/20 text-primary transition-colors shrink-0"
              title="Listen to British English pronunciation"
            >
              <Volume2 size={16} />
            </button>
            <span className="text-xs text-muted-foreground font-medium">
              {expanded ? '▲ Close' : '▼ Details'}
            </span>
          </div>
        </div>
      </button>

      {/* Expanded Details */}
      {expanded && (
        <div className="px-5 pb-5 pt-2 space-y-4 border-t border-border animate-fade-in text-xs">
          {/* Definition */}
          <div>
            <p className="font-bold text-muted-foreground uppercase tracking-wider mb-1">
              English Definition
            </p>
            <p className="text-sm text-foreground leading-relaxed">{item.definition}</p>
          </div>

          {/* Collocation & Pattern */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-card rounded-xl border border-border">
              <p className="font-bold text-primary uppercase tracking-wider mb-1">
                🔗 Common Collocations
              </p>
              <p className="text-foreground font-mono text-[11px]">{item.collocation}</p>
            </div>
            {item.targetVerbPattern && (
              <div className="p-3 bg-card rounded-xl border border-border">
                <p className="font-bold text-amber-500 uppercase tracking-wider mb-1">
                  ⚡ Verb Grammar Pattern
                </p>
                <p className="text-foreground font-mono text-[11px]">{item.targetVerbPattern}</p>
              </div>
            )}
          </div>

          {/* Synonyms & Antonyms */}
          <div className="flex flex-wrap gap-4 text-[11px]">
            <div>
              <span className="font-bold text-secondary">Synonyms: </span>
              <span className="text-foreground">{item.synonym}</span>
            </div>
            {item.antonym && (
              <div>
                <span className="font-bold text-destructive">Antonyms: </span>
                <span className="text-foreground">{item.antonym}</span>
              </div>
            )}
          </div>

          {/* Examples */}
          <div className="space-y-2">
            <div className="p-3 bg-muted/50 rounded-xl">
              <p className="font-bold text-muted-foreground mb-0.5">Everyday / Beginner Example:</p>
              <p className="text-foreground">"{item.beginnerExample}"</p>
            </div>
            <div className="p-3 bg-secondary/5 border border-secondary/15 rounded-xl">
              <p className="font-bold text-secondary mb-0.5">🎯 IELTS Band 8.5 Academic Example:</p>
              <p className="text-foreground italic">"{item.ieltsExample}"</p>
            </div>
          </div>

          {/* Mastered Button */}
          <div className="flex justify-end pt-2">
            <button
              id={`master-btn-${item.id}`}
              onClick={() => onMastered(item.word)}
              className={`px-4 py-2 rounded-xl font-semibold text-xs transition-colors flex items-center gap-1.5 ${
                mastered
                  ? 'bg-secondary/15 text-secondary border border-secondary/30'
                  : 'bg-primary text-primary-foreground hover:opacity-90'
              }`}
            >
              <CheckCircle size={14} />
              {mastered ? 'Mastered ✓' : 'Mark as Mastered'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function VerbVocabularyPage() {
  const { getPartOfSpeechProgress, completePartOfSpeechStage, addPartOfSpeechVocabMastered } = useProgress();
  const vocabList = verbVocabularyList;
  const verbProgress = getPartOfSpeechProgress('verb');
  const masteredList = verbProgress?.vocabMastered ?? [];

  const handleMastered = (word: string) => {
    addPartOfSpeechVocabMastered('verb', word);
  };

  const handleCompleteStage = () => {
    const accuracy = Math.round((masteredList.length / vocabList.length) * 100) || 100;
    completePartOfSpeechStage('verb', 'vocabulary', masteredList.length || vocabList.length, accuracy);
  };

  return (
    <main className="min-h-screen hero-gradient px-4 py-16">
      <ThemeToggle />

      <div className="w-full max-w-2xl mx-auto animate-fade-in-up">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
          <Link href="/parts-of-speech" className="hover:text-foreground transition-colors">Parts of Speech</Link>
          <ChevronRight size={14} />
          <Link href="/parts-of-speech/verb" className="hover:text-foreground transition-colors">Verb</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">Vocabulary</span>
        </div>

        {/* Stage progress */}
        <div className="mb-6">
          <StageProgressBar
            currentStage="vocabulary"
            completedStages={verbProgress?.stages ?? {}}
          />
        </div>

        {/* Header Card */}
        <div className="glass-card rounded-3xl p-7 mb-6 border border-border">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">⚡</span>
                <h1 className="text-2xl font-bold text-foreground">Academic Verbs for IELTS</h1>
              </div>
              <p className="text-sm text-muted-foreground">
                High-utility academic verbs with Bengali meanings, British audio, collocations, and IELTS examples.
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 shrink-0">
              {masteredList.length} / {vocabList.length} Mastered
            </span>
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            💡 Tap the speaker icon to hear the British English pronunciation. Tap each card to expand definitions, collocations, and Band 8.5 model sentences.
          </p>
        </div>

        {/* Vocabulary Cards List */}
        <div className="space-y-3 mb-8">
          {vocabList.map((item) => (
            <VocabCard
              key={item.id}
              item={item}
              mastered={masteredList.includes(item.word)}
              onMastered={handleMastered}
            />
          ))}
        </div>

        {/* Completion Action */}
        <div className="glass-card rounded-3xl p-6 border border-border text-center mb-8">
          <h3 className="text-lg font-bold text-foreground mb-1">
            Finished Studying High-Frequency Verbs?
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Mark this vocabulary stage as complete to unlock Stage 7: Speaking Practice.
          </p>
          <button
            id="complete-verb-vocab-btn"
            onClick={handleCompleteStage}
            className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 text-sm"
          >
            ✓ Complete Vocabulary Stage
          </button>
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between text-sm">
          <Link
            href="/parts-of-speech/verb/ielts"
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            ← Stage 5: IELTS Context
          </Link>
          <Link
            href="/parts-of-speech/verb/speaking"
            className="text-primary hover:text-primary/80 font-medium flex items-center gap-1"
          >
            Stage 7: Speaking →
          </Link>
        </div>
      </div>
    </main>
  );
}
