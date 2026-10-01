'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Volume2, BookOpen, CheckCircle, Sparkles } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar } from '@/components/ProgressIndicators';
import { useProgress } from '@/contexts/ProgressContext';
import { nounVocabularyList } from '@/data/parts-of-speech/noun';
import type { NounVocabItem } from '@/types';

function VocabCard({
  item,
  onMastered,
  mastered,
}: {
  item: NounVocabItem;
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
        id={`noun-vocab-card-${item.id}`}
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

          <div className="flex items-center gap-2 shrink-0">
            <button
              id={`noun-speak-${item.id}`}
              onClick={(e) => {
                e.stopPropagation();
                handleSpeak();
              }}
              className="p-2 bg-primary/10 rounded-lg text-primary hover:bg-primary/20 transition-colors"
              title="Pronounce word"
            >
              <Volume2 size={16} />
            </button>
            <span className="text-muted-foreground text-sm">{expanded ? '▲' : '▼'}</span>
          </div>
        </div>
      </button>

      {/* Expanded Details */}
      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-border pt-4 animate-fade-in">
          {/* Definition */}
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Definition</p>
            <p className="text-sm text-foreground leading-relaxed">{item.definition}</p>
          </div>

          {/* Noun Formation */}
          {item.nounFormation && (
            <div className="p-3 bg-primary/5 border border-primary/10 rounded-xl">
              <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1 flex items-center gap-1">
                <Sparkles size={12} /> Noun Formation
              </p>
              <p className="text-xs text-foreground mb-1">
                <span className="font-mono font-bold text-primary">{item.nounFormation.rootWord}</span> ({item.nounFormation.rootType}) +{' '}
                <span className="font-mono font-bold text-primary">{item.nounFormation.suffix}</span>
              </p>
              <p className="text-xs text-muted-foreground">{item.nounFormation.explanation}</p>
            </div>
          )}

          {/* Collocations */}
          <div className="p-3 bg-secondary/5 border border-secondary/10 rounded-xl">
            <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-1.5">Common IELTS Collocations</p>
            <div className="flex flex-wrap gap-1.5">
              {item.collocation.split(', ').map((col) => (
                <span key={col} className="text-xs bg-secondary/10 text-secondary px-2.5 py-1 rounded-full border border-secondary/20 font-medium">
                  {col}
                </span>
              ))}
            </div>
          </div>

          {/* Synonyms & Antonyms */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-muted rounded-xl">
              <p className="text-xs font-semibold text-muted-foreground mb-1">Synonyms</p>
              <p className="text-xs text-foreground font-medium">{item.synonym}</p>
            </div>
            {item.antonym && (
              <div className="p-3 bg-muted rounded-xl">
                <p className="text-xs font-semibold text-muted-foreground mb-1">Antonyms</p>
                <p className="text-xs text-foreground font-medium">{item.antonym}</p>
              </div>
            )}
          </div>

          {/* Examples */}
          <div className="space-y-2">
            <div className="p-3 bg-muted rounded-xl">
              <p className="text-xs font-medium text-muted-foreground mb-1">📚 Beginner Example</p>
              <p className="text-sm text-foreground italic">"{item.beginnerExample}"</p>
            </div>
            <div className="p-3 bg-secondary/5 border border-secondary/10 rounded-xl">
              <p className="text-xs font-medium text-secondary dark:text-secondary mb-1">🎓 IELTS Academic Example</p>
              <p className="text-sm text-foreground italic leading-relaxed">"{item.ieltsExample}"</p>
            </div>
          </div>

          {/* Mastered button */}
          <button
            id={`noun-master-${item.id}`}
            onClick={() => onMastered(item.word)}
            className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 ${
              mastered
                ? 'bg-secondary/10 text-secondary dark:text-secondary border border-secondary/20'
                : 'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98]'
            }`}
          >
            <CheckCircle size={16} />
            {mastered ? 'Mastered!' : 'Mark as Mastered'}
          </button>
        </div>
      )}
    </div>
  );
}

export default function NounVocabularyPage() {
  const {
    getPartOfSpeechProgress,
    addPartOfSpeechVocabMastered,
    completePartOfSpeechStage,
  } = useProgress();

  const vocabList = nounVocabularyList;
  const nounProgress = getPartOfSpeechProgress('noun');
  const mastered = nounProgress?.vocabMastered ?? [];

  const handleMastered = (word: string) => {
    addPartOfSpeechVocabMastered('noun', word);
  };

  const handleComplete = () => {
    completePartOfSpeechStage(
      'noun',
      'vocabulary',
      mastered.length,
      Math.round((mastered.length / vocabList.length) * 100)
    );
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
          <span className="text-foreground font-medium">Vocabulary</span>
        </div>

        <div className="mb-6">
          <StageProgressBar currentStage="vocabulary" completedStages={nounProgress?.stages ?? {}} />
        </div>

        {/* Vocabulary Header Banner */}
        <div className="glass-card rounded-3xl p-6 border border-border mb-6">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen size={22} className="text-primary" />
            <h1 className="text-2xl font-bold text-foreground">IELTS Academic Noun Vocabulary</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            20 high-yield academic nouns for IELTS Speaking and Writing. Click to expand and listen to pronunciation.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <span className="text-sm font-semibold text-foreground">
              {mastered.length} / {vocabList.length} mastered
            </span>
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full progress-gradient rounded-full transition-all duration-500"
                style={{ width: `${Math.round((mastered.length / vocabList.length) * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Vocab Cards List */}
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

        {/* Continue to Speaking */}
        <div className="glass-card rounded-3xl p-6 border border-primary/20 bg-primary/5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-foreground">Ready for Speaking Practice?</h3>
              <p className="text-sm text-muted-foreground mt-0.5">
                {mastered.length >= Math.ceil(vocabList.length / 2)
                  ? '🎉 Great vocabulary progress! Practice speaking with these nouns.'
                  : 'Review the words and continue to speaking practice.'}
              </p>
            </div>
            <Link
              id="continue-to-noun-speaking-btn"
              href="/parts-of-speech/noun/speaking"
              onClick={handleComplete}
              className="flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg shrink-0"
            >
              Speaking Practice <ChevronRight size={16} />
            </Link>
          </div>
        </div>

        <div className="flex items-center mt-6 pt-4 border-t border-border">
          <Link href="/parts-of-speech/noun/ielts" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group">
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> Back to IELTS Context
          </Link>
        </div>
      </div>
    </main>
  );
}
