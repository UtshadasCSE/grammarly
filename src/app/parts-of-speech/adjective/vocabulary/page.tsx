'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Volume2, BookOpen, CheckCircle, Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar } from '@/components/ProgressIndicators';
import { useProgress } from '@/contexts/ProgressContext';
import { adjectiveVocabularyList } from '@/data/parts-of-speech/adjective';
import type { AdjectiveVocabItem } from '@/types';

function VocabCard({
  item,
  onMastered,
  mastered,
}: {
  item: AdjectiveVocabItem;
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
        id={`adj-vocab-card-${item.id}`}
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
            {item.targetAdjectiveType && (
              <div className="p-3 bg-card rounded-xl border border-border">
                <p className="font-bold text-emerald-500 uppercase tracking-wider mb-1">
                  🎨 Adjective Classification
                </p>
                <p className="text-foreground font-mono text-[11px]">{item.targetAdjectiveType}</p>
              </div>
            )}
          </div>

          {/* Word Family */}
          {item.wordFamily && (
            <div className="p-3 bg-muted/40 rounded-xl border border-border/50">
              <p className="font-bold text-muted-foreground uppercase tracking-wider mb-1.5">
                📚 Word Family & Morphology
              </p>
              <div className="flex flex-wrap gap-3 text-[11px]">
                {item.wordFamily.noun && (
                  <span><strong>Noun:</strong> {item.wordFamily.noun}</span>
                )}
                {item.wordFamily.verb && (
                  <span><strong>Verb:</strong> {item.wordFamily.verb}</span>
                )}
                {item.wordFamily.adjective && (
                  <span className="text-primary"><strong>Adjective:</strong> {item.wordFamily.adjective}</span>
                )}
                {item.wordFamily.adverb && (
                  <span><strong>Adverb:</strong> {item.wordFamily.adverb}</span>
                )}
              </div>
            </div>
          )}

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
                  ? 'bg-secondary/10 text-secondary hover:bg-secondary/20'
                  : 'bg-primary text-primary-foreground hover:opacity-90'
              }`}
            >
              <CheckCircle size={14} />
              <span>{mastered ? 'Mastered ✓' : 'Mark as Mastered'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AdjectiveVocabularyPage() {
  const { getPartOfSpeechProgress, completePartOfSpeechStage, addPartOfSpeechVocabMastered } = useProgress();
  const adjectiveProgress = getPartOfSpeechProgress('adjective');
  const masteredWords = adjectiveProgress?.vocabMastered ?? [];

  const handleMastered = (word: string) => {
    addPartOfSpeechVocabMastered('adjective', word);
  };

  const handleComplete = () => {
    const accuracy = Math.min(100, Math.round((masteredWords.length / adjectiveVocabularyList.length) * 100));
    completePartOfSpeechStage('adjective', 'vocabulary', masteredWords.length, accuracy);
  };

  return (
    <main className="min-h-screen hero-gradient px-4 py-16">
      <ThemeToggle />

      <div className="w-full max-w-2xl mx-auto animate-fade-in-up">

        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
          <Link href="/parts-of-speech" className="hover:text-foreground transition-colors">Parts of Speech</Link>
          <ChevronRight size={14} />
          <Link href="/parts-of-speech/adjective" className="hover:text-foreground transition-colors">Adjective</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">Vocabulary</span>
        </div>

        {/* Stage progress */}
        <div className="mb-6">
          <StageProgressBar
            currentStage="vocabulary"
            completedStages={adjectiveProgress?.stages ?? {}}
          />
        </div>

        {/* Header */}
        <div className="glass-card rounded-3xl p-7 border border-border mb-6">
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">📖</span>
                <h1 className="text-2xl font-bold text-foreground">Key IELTS Adjectives</h1>
              </div>
              <p className="text-sm text-muted-foreground">
                20 Essential Academic Adjectives for IELTS Band 7.5–9.0
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 shrink-0">
              {masteredWords.length} / {adjectiveVocabularyList.length} Mastered
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Listen to native British English pronunciations, study exact word-family morphology, and mark each word as mastered.
          </p>
        </div>

        {/* Cards List */}
        <div className="space-y-4 mb-8">
          {adjectiveVocabularyList.map((item) => (
            <VocabCard
              key={item.id}
              item={item}
              onMastered={handleMastered}
              mastered={masteredWords.includes(item.word)}
            />
          ))}
        </div>

        {/* Completion Action */}
        <div className="glass-card rounded-3xl p-6 border border-border text-center mb-8">
          <h3 className="text-lg font-bold text-foreground mb-1">
            Finished Studying IELTS Adjectives?
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Mark Vocabulary Stage as done to unlock Stage 7: Speaking Practice with Voice Recording.
          </p>
          <button
            id="complete-adj-vocab-btn"
            onClick={handleComplete}
            className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20 text-sm"
          >
            ✓ Complete Vocabulary Stage
          </button>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-between text-sm">
          <Link
            href="/parts-of-speech/adjective/ielts"
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            ← Back to IELTS Context
          </Link>
          <Link
            href="/parts-of-speech/adjective/speaking"
            className="text-primary hover:text-primary/80 font-medium flex items-center gap-1"
          >
            Stage 7: Speaking →
          </Link>
        </div>
      </div>
    </main>
  );
}
