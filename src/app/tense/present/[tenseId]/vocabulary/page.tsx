'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Volume2, BookOpen, CheckCircle } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar } from '@/components/ProgressIndicators';
import { useProgress } from '@/contexts/ProgressContext';
import type { TenseId, VocabularyItem } from '@/types';
import {
  presentSimpleVocabulary,
  presentContinuousVocabulary,
  presentPerfectVocabulary,
  presentPerfectContinuousVocabulary,
} from '@/data/vocabulary/presentTenseVocab';

const vocabBank: Record<TenseId, VocabularyItem[]> = {
  simple: presentSimpleVocabulary,
  continuous: presentContinuousVocabulary,
  perfect: presentPerfectVocabulary,
  'perfect-continuous': presentPerfectContinuousVocabulary,
};

const tenseNames: Record<TenseId, string> = {
  simple: 'Present Simple',
  continuous: 'Present Continuous',
  perfect: 'Present Perfect',
  'perfect-continuous': 'Present Perfect Continuous',
};

function VocabCard({ item, onMastered, mastered }: {
  item: VocabularyItem;
  onMastered: (word: string) => void;
  mastered: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  const handleSpeak = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(item.word);
      utterance.lang = 'en-GB';
      utterance.rate = 0.8;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className={`glass-card rounded-2xl border overflow-hidden transition-all duration-300 ${
      mastered ? 'border-emerald-500/30 bg-emerald-500/5' : 'border-border'
    }`}>
      {/* Header */}
      <button
        id={`vocab-card-${item.id}`}
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-5 hover:bg-primary/5 transition-colors"
      >
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-xl font-bold text-foreground">{item.word}</h3>
              <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full border border-border capitalize">
                {item.partOfSpeech}
              </span>
              {mastered && (
                <span className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  ✓ Mastered
                </span>
              )}
            </div>
            <p className="text-sm text-primary font-semibold">{item.banglaMeaning}</p>
            <p className="text-xs text-muted-foreground font-mono mt-1">{item.pronunciation}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              id={`speak-${item.id}`}
              onClick={(e) => { e.stopPropagation(); handleSpeak(); }}
              className="p-2 bg-primary/10 rounded-lg text-primary hover:bg-primary/20 transition-colors"
              title="Pronounce word"
            >
              <Volume2 size={14} />
            </button>
            <span className="text-muted-foreground text-sm">{expanded ? '▲' : '▼'}</span>
          </div>
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-border pt-4 animate-fade-in">
          {/* Definition */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Definition</p>
            <p className="text-sm text-foreground leading-relaxed">{item.definition}</p>
          </div>

          {/* Collocation */}
          <div className="p-3 bg-primary/5 border border-primary/10 rounded-xl">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1.5">Common Collocations</p>
            <div className="flex flex-wrap gap-1.5">
              {item.collocation.split(', ').map((col) => (
                <span key={col} className="text-xs bg-primary/10 text-primary px-2.5 py-1 rounded-full border border-primary/20 font-medium">
                  {col}
                </span>
              ))}
            </div>
          </div>

          {/* Synonyms & Antonyms */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-emerald-500/5 border border-emerald-500/10 rounded-xl">
              <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-1">Synonyms</p>
              <p className="text-xs text-foreground">{item.synonym}</p>
            </div>
            {item.antonym && (
              <div className="p-3 bg-rose-500/5 border border-rose-500/10 rounded-xl">
                <p className="text-xs font-semibold text-rose-600 dark:text-rose-400 mb-1">Antonyms</p>
                <p className="text-xs text-foreground">{item.antonym}</p>
              </div>
            )}
          </div>

          {/* Examples */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Examples</p>
            <div className="space-y-2">
              <div className="p-3 bg-muted rounded-xl">
                <p className="text-xs font-medium text-muted-foreground mb-1">📚 Beginner</p>
                <p className="text-sm text-foreground italic">"{item.beginnerExample}"</p>
              </div>
              <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl">
                <p className="text-xs font-medium text-amber-600 dark:text-amber-400 mb-1">🎓 IELTS Example</p>
                <p className="text-sm text-foreground italic">"{item.ieltsExample}"</p>
              </div>
            </div>
          </div>

          {/* Mastered button */}
          <button
            id={`master-${item.id}`}
            onClick={() => onMastered(item.word)}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
              mastered
                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                : 'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            <CheckCircle size={15} />
            {mastered ? 'Mastered!' : 'Mark as Mastered'}
          </button>
        </div>
      )}
    </div>
  );
}

export default function VocabularyPage({ params }: { params: Promise<{ tenseId: string }> }) {
  const { tenseId } = use(params);
  const { progress, addVocabMastered, completeStage } = useProgress();
  const tId = tenseId as TenseId;
  const vocabList = vocabBank[tId] ?? [];
  const tenseProgress = progress.tenses[tId];
  const mastered = tenseProgress?.vocabMastered ?? [];

  const handleMastered = (word: string) => {
    addVocabMastered(tId, word);
  };

  const handleComplete = () => {
    completeStage(tId, 'vocabulary', mastered.length, Math.round((mastered.length / vocabList.length) * 100));
  };

  return (
    <main className="min-h-screen hero-gradient px-4 py-16">
      <ThemeToggle />
      <div className="w-full max-w-2xl mx-auto animate-fade-in-up">

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
          <Link href="/tense/present" className="hover:text-foreground transition-colors">Present</Link>
          <ChevronRight size={14} />
          <Link href={`/tense/present/${tId}`} className="hover:text-foreground transition-colors">{tenseNames[tId]}</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">Vocabulary</span>
        </div>

        <div className="mb-6">
          <StageProgressBar currentStage="vocabulary" completedStages={tenseProgress?.stages ?? {}} />
        </div>

        {/* Header */}
        <div className="glass-card rounded-3xl p-6 border border-border mb-6">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen size={22} className="text-primary" />
            <h1 className="text-2xl font-bold text-foreground">IELTS Vocabulary</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Key vocabulary for {tenseNames[tId]}. Click each card to expand and learn.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <span className="text-sm font-semibold text-foreground">{mastered.length} / {vocabList.length} mastered</span>
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full progress-gradient rounded-full transition-all duration-500"
                style={{ width: `${Math.round((mastered.length / vocabList.length) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Vocab cards */}
        <div className="space-y-4 mb-8">
          {vocabList.map((item) => (
            <VocabCard
              key={item.id}
              item={item}
              onMastered={handleMastered}
              mastered={mastered.includes(item.word)}
            />
          ))}
        </div>

        {/* Continue */}
        <div className="glass-card rounded-3xl p-6 border border-primary/20 bg-primary/5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-foreground">Ready for Speaking Practice?</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {mastered.length >= Math.ceil(vocabList.length / 2)
                  ? '🎉 Great vocabulary progress!'
                  : 'Review the words and mark them as mastered'}
              </p>
            </div>
            <Link
              id="continue-to-speaking-btn"
              href={`/tense/present/${tId}/speaking`}
              onClick={handleComplete}
              className="flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shrink-0"
            >
              Speaking <ChevronRight size={16} />
            </Link>
          </div>
        </div>

        <div className="flex items-center mt-6 pt-4 border-t border-border">
          <Link href={`/tense/present/${tId}/ielts`} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group">
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> Back to IELTS Context
          </Link>
        </div>
      </div>
    </main>
  );
}
