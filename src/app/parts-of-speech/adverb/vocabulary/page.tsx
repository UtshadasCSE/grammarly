'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Volume2, BookOpen, CheckCircle, Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar } from '@/components/ProgressIndicators';
import { useProgress } from '@/contexts/ProgressContext';
import { adverbVocabularyList } from '@/data/parts-of-speech/adverb';
import type { AdverbVocabItem } from '@/types';

function VocabCard({
  item,
  onMastered,
  mastered,
}: {
  item: AdverbVocabItem;
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
        id={`adv-vocab-card-${item.id}`}
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
                <span className="text-xs bg-secondary/10 text-secondary dark:text-secondary px-2.5 py-0.5 rounded-full border border-secondary/20 font-semibold">
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
            {item.targetAdverbType && (
              <div className="p-3 bg-card rounded-xl border border-border">
                <p className="font-bold text-cyan-500 uppercase tracking-wider mb-1">
                  🚀 Adverb Classification
                </p>
                <p className="text-foreground font-mono text-[11px]">{item.targetAdverbType}</p>
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
                  <span><strong>Adjective:</strong> {item.wordFamily.adjective}</span>
                )}
                {item.wordFamily.adverb && (
                  <span className="text-primary font-bold"><strong>Adverb:</strong> {item.wordFamily.adverb}</span>
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

          {/* Examples across 3 proficiency levels */}
          <div className="space-y-2 pt-1">
            <p className="font-bold text-muted-foreground uppercase tracking-wider">
              Graduated Sentence Examples:
            </p>
            <div className="space-y-1.5">
              <div className="p-2.5 bg-muted/40 rounded-lg">
                <span className="font-bold text-muted-foreground text-[10px] uppercase block mb-0.5">Beginner Level:</span>
                <p className="text-foreground text-[11px]">{item.beginnerExample}</p>
              </div>
              <div className="p-2.5 bg-muted/40 rounded-lg">
                <span className="font-bold text-muted-foreground text-[10px] uppercase block mb-0.5">Advanced Level:</span>
                <p className="text-foreground text-[11px]">{item.advancedExample}</p>
              </div>
              <div className="p-2.5 bg-primary/10 rounded-lg border border-primary/20">
                <span className="font-bold text-primary text-[10px] uppercase block mb-0.5">IELTS Academic (Band 8-9):</span>
                <p className="text-foreground font-medium text-[11px]">{item.ieltsExample}</p>
              </div>
            </div>
          </div>

          {/* Master Button */}
          <div className="pt-2 flex justify-end">
            <button
              id={`master-adv-btn-${item.id}`}
              onClick={() => onMastered(item.word)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                mastered
                  ? 'bg-secondary/20 text-secondary border border-secondary/30'
                  : 'bg-primary text-primary-foreground hover:opacity-90 shadow-md shadow-primary/10'
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

export default function AdverbVocabularyPage() {
  const { getPartOfSpeechProgress, completePartOfSpeechStage, addPartOfSpeechVocabMastered } = useProgress();
  const adverbProgress = getPartOfSpeechProgress('adverb');
  const masteredWords = adverbProgress?.vocabMastered ?? [];

  const handleMastered = (word: string) => {
    addPartOfSpeechVocabMastered('adverb', word);
  };

  const handleCompleteStage = () => {
    const accuracy = Math.round((masteredWords.length / adverbVocabularyList.length) * 100);
    completePartOfSpeechStage('adverb', 'vocabulary', masteredWords.length, Math.max(accuracy, 100));
  };

  const allMastered = masteredWords.length >= adverbVocabularyList.length;

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
          <span className="text-foreground font-medium">Vocabulary</span>
        </div>

        {/* Stage progress */}
        <div className="mb-6">
          <StageProgressBar
            currentStage="vocabulary"
            completedStages={adverbProgress?.stages ?? {}}
          />
        </div>

        {/* Header card */}
        <div className="glass-card rounded-3xl p-7 border border-border mb-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-3xl">📚</span>
                <h1 className="text-2xl font-bold text-foreground">Academic Adverb Lexicon</h1>
              </div>
              <p className="text-muted-foreground text-sm">
                20 High-Impact IELTS Academic Adverbs with Audio, Collocations &amp; Morphology
              </p>
            </div>
            <div className="text-right shrink-0">
              <span className="text-2xl font-bold text-primary">
                {masteredWords.length}/{adverbVocabularyList.length}
              </span>
              <p className="text-[11px] text-muted-foreground">Mastered</p>
            </div>
          </div>

          <div className="w-full bg-muted rounded-full h-2 overflow-hidden mb-3">
            <div
              className="bg-primary h-full transition-all duration-300"
              style={{
                width: `${(masteredWords.length / adverbVocabularyList.length) * 100}%`,
              }}
            />
          </div>

          <p className="text-xs text-muted-foreground">
            Tap each word to listen to its pronunciation, study its word family, collocations, and contextual examples across three proficiency tiers.
          </p>
        </div>

        {/* Vocabulary Cards List */}
        <div className="space-y-4 mb-8">
          {adverbVocabularyList.map((item) => (
            <VocabCard
              key={item.id}
              item={item}
              mastered={masteredWords.includes(item.word)}
              onMastered={handleMastered}
            />
          ))}
        </div>

        {/* Stage Completion Button */}
        <div className="glass-card rounded-3xl p-6 border border-border text-center mb-8">
          <h3 className="text-lg font-bold text-foreground mb-2">
            Ready for Speaking Practice?
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {allMastered
              ? 'All 20 high-frequency academic adverbs mastered! Proceed to Stage 7: Speaking.'
              : `You have mastered ${masteredWords.length} of ${adverbVocabularyList.length} adverbs. You can complete the stage now or continue studying.`}
          </p>
          <button
            id="complete-adv-vocab-btn"
            onClick={handleCompleteStage}
            className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-2xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
          >
            ✓ Complete Vocabulary Stage
          </button>
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between text-sm">
          <Link
            href="/parts-of-speech/adverb/ielts"
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <ChevronLeft size={16} /> Stage 5: IELTS Context
          </Link>
          <Link
            href="/parts-of-speech/adverb/speaking"
            className="text-primary hover:underline font-medium flex items-center gap-1"
          >
            Stage 7: Speaking <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </main>
  );
}
