'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProgress } from '@/contexts/ProgressContext';
import { pronounVocabList } from '@/data/parts-of-speech/pronoun';
import { PronounVocabItem } from '@/types';

export default function PronounVocabularyPage() {
  const { addPartOfSpeechVocabMastered, completePartOfSpeechStage, getPartOfSpeechProgress } = useProgress();
  const pronounProgress = getPartOfSpeechProgress('pronoun');

  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'study' | 'quiz'>('study');
  const [quizScore, setQuizScore] = useState(0);
  const [selectedQuizOption, setSelectedQuizOption] = useState<string | null>(null);
  const [isQuizAnswerChecked, setIsQuizAnswerChecked] = useState(false);
  const [isQuizCorrect, setIsQuizCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const currentWord: PronounVocabItem = pronounVocabList[currentIndex];
  const totalWords = pronounVocabList.length;

  const playPronunciation = (word: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-GB';
      utterance.rate = 0.9;
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNextStudy = () => {
    addPartOfSpeechVocabMastered('pronoun', currentWord.word);
    if (currentIndex + 1 < totalWords) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setViewMode('quiz');
      setCurrentIndex(0);
    }
  };

  const handlePrevStudy = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Quiz helper: generates 4 options
  const quizOptions = React.useMemo(() => {
    const correct = currentWord.definition;
    const incorrects = pronounVocabList
      .filter((w) => w.id !== currentWord.id)
      .map((w) => w.definition)
      .slice(0, 3);
    const options = [correct, ...incorrects];
    return options.sort(() => (currentWord.id.charCodeAt(0) % 2 === 0 ? 0.5 - Math.random() : Math.random() - 0.5));
  }, [currentWord]);

  const handleCheckQuiz = () => {
    if (isQuizAnswerChecked || !selectedQuizOption) return;
    const correct = selectedQuizOption === currentWord.definition;
    setIsQuizCorrect(correct);
    setIsQuizAnswerChecked(true);

    if (correct) {
      setQuizScore((prev) => prev + 1);
      addPartOfSpeechVocabMastered('pronoun', currentWord.word);
    }
  };

  const handleNextQuiz = () => {
    if (currentIndex + 1 < totalWords) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedQuizOption(null);
      setIsQuizAnswerChecked(false);
    } else {
      const finalScore = quizScore + (isQuizCorrect ? 0 : 0);
      const accuracy = Math.round((finalScore / totalWords) * 100);
      completePartOfSpeechStage('pronoun', 'vocabulary', finalScore, accuracy);
      setQuizCompleted(true);
    }
  };

  if (quizCompleted) {
    const accuracy = Math.round((quizScore / totalWords) * 100);
    return (
      <main className="min-h-screen pb-24 pt-4">
        <div className="max-w-2xl mx-auto px-4 space-y-6">
          <div className="flex items-center justify-between">
            <Link
              href="/parts-of-speech/pronoun"
              className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
            >
              ← Back to Pronoun Hub
            </Link>
            <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
              Stage 6 Complete
            </span>
          </div>

          <div className="glass-card p-8 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400/50 text-3xl">
              📚
            </div>
            <h1 className="text-2xl font-bold text-white">Vocabulary Mastered!</h1>
            <p className="text-slate-300 text-sm max-w-md mx-auto">
              You reviewed and tested all 20 essential IELTS academic words in pronoun contexts.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 max-w-sm mx-auto">
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-2xl font-bold text-emerald-400">{accuracy}%</div>
                <div className="text-xs text-slate-400 mt-1">Accuracy</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-2xl font-bold text-indigo-400">{quizScore}/{totalWords}</div>
                <div className="text-xs text-slate-400 mt-1">Words Mastered</div>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-950/90 backdrop-blur-md border-t border-slate-800">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
            <button
              onClick={() => {
                setQuizCompleted(false);
                setViewMode('study');
                setCurrentIndex(0);
                setQuizScore(0);
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors border border-slate-700"
            >
              🔄 Review Flashcards
            </button>
            <Link
              href="/parts-of-speech/pronoun/speaking"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-semibold shadow-lg shadow-emerald-500/20 transition-all"
            >
              Stage 7: Speaking →
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pb-28 pt-4">
      <div className="max-w-2xl mx-auto px-4 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/parts-of-speech/pronoun"
            className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors"
          >
            ← Back to Pronoun Hub
          </Link>
          {/* Mode Switcher */}
          <div className="flex rounded-lg bg-slate-800 p-1 border border-slate-700">
            <button
              onClick={() => setViewMode('study')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                viewMode === 'study' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              📖 Flashcards
            </button>
            <button
              onClick={() => {
                setViewMode('quiz');
                setCurrentIndex(0);
                setSelectedQuizOption(null);
                setIsQuizAnswerChecked(false);
              }}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                viewMode === 'quiz' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              ✍️ Quiz Mode
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1.5">
            <span className="font-semibold text-white">
              Stage 6: Vocabulary ({viewMode === 'study' ? 'Study Mode' : 'Quiz Mode'})
            </span>
            <span>Word {currentIndex + 1} of {totalWords}</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalWords) * 100}%` }}
            />
          </div>
        </div>

        {/* Study Mode: Flashcard View */}
        {viewMode === 'study' && (
          <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
            {/* Word Header */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl md:text-3xl font-bold text-white">{currentWord.word}</h1>
                  <button
                    onClick={() => playPronunciation(currentWord.word)}
                    className="p-2 rounded-xl bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 transition-colors border border-indigo-500/30 text-base"
                    title="Listen to British English pronunciation"
                  >
                    {isPlayingAudio ? '🔊...' : '🔊'}
                  </button>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-mono text-cyan-400">{currentWord.pronunciation}</span>
                  <span className="text-xs px-2 py-0.5 rounded-md bg-slate-800 text-slate-400 border border-slate-700">
                    {currentWord.partOfSpeech}
                  </span>
                </div>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-300 font-semibold border border-emerald-500/20">
                {currentWord.banglaMeaning}
              </span>
            </div>

            {/* English Definition */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
              <span className="text-xs font-bold uppercase text-slate-400">Definition:</span>
              <p className="text-sm text-slate-200 leading-relaxed">{currentWord.definition}</p>
            </div>

            {/* Target Pronoun Context */}
            {currentWord.targetPronoun && (
              <div className="p-3.5 rounded-xl bg-indigo-950/30 border border-indigo-500/30 text-xs text-indigo-200">
                <span className="font-bold text-indigo-300 block mb-0.5">Target Pronoun Relationship:</span>
                <p>{currentWord.targetPronoun}</p>
              </div>
            )}

            {/* Collocations & Synonyms */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="font-bold text-amber-400">Common Collocations:</span>
                <p className="text-slate-300">{currentWord.collocation}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
                <span className="font-bold text-cyan-400">Synonyms &amp; Antonyms:</span>
                <p className="text-slate-300">Syn: {currentWord.synonym}</p>
                {currentWord.antonym && <p className="text-slate-400">Ant: {currentWord.antonym}</p>}
              </div>
            </div>

            {/* Examples */}
            <div className="space-y-3 pt-2 border-t border-slate-800">
              <div className="text-xs space-y-1">
                <span className="font-bold text-slate-400">Beginner Example:</span>
                <p className="text-sm text-slate-300">{currentWord.beginnerExample}</p>
              </div>
              <div className="text-xs space-y-1 p-3 rounded-xl bg-indigo-950/20 border border-indigo-500/20">
                <span className="font-bold text-cyan-300">IELTS Academic Example:</span>
                <p className="text-sm text-slate-200 italic">&ldquo;{currentWord.ieltsExample}&rdquo;</p>
              </div>
            </div>
          </div>
        )}

        {/* Quiz Mode */}
        {viewMode === 'quiz' && (
          <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
            <div>
              <span className="text-xs text-indigo-400 font-bold uppercase">Vocabulary Match Challenge</span>
              <h2 className="text-xl md:text-2xl font-bold text-white mt-1">
                What is the definition of &ldquo;<span className="text-emerald-400">{currentWord.word}</span>&rdquo;?
              </h2>
              <p className="text-xs text-slate-400 mt-1">Bangla meaning: {currentWord.banglaMeaning}</p>
            </div>

            <div className="space-y-2.5">
              {quizOptions.map((opt, idx) => {
                let btnStyle = 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700';

                if (selectedQuizOption === opt) {
                  btnStyle = 'bg-indigo-600/30 text-indigo-200 border-indigo-500';
                }

                if (isQuizAnswerChecked) {
                  if (opt === currentWord.definition) {
                    btnStyle = 'bg-emerald-500/20 text-emerald-200 border-emerald-500 font-semibold';
                  } else if (selectedQuizOption === opt && !isQuizCorrect) {
                    btnStyle = 'bg-rose-500/20 text-rose-200 border-rose-500';
                  } else {
                    btnStyle = 'bg-slate-800/40 text-slate-500 border-slate-800 opacity-60';
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => {
                      if (!isQuizAnswerChecked) setSelectedQuizOption(opt);
                    }}
                    disabled={isQuizAnswerChecked}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all duration-200 flex items-start gap-3 ${btnStyle}`}
                  >
                    <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-700/80 text-xs font-semibold shrink-0 text-slate-300">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="pt-0.5">{opt}</span>
                  </button>
                );
              })}
            </div>

            {isQuizAnswerChecked && (
              <div
                className={`p-4 rounded-xl border text-xs space-y-1 ${
                  isQuizCorrect
                    ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                    : 'bg-rose-950/30 border-rose-500/40 text-rose-200'
                }`}
              >
                <div className="font-bold text-sm">
                  {isQuizCorrect ? '✅ Correct Definition!' : '❌ Incorrect Definition'}
                </div>
                <p>IELTS Context: {currentWord.ieltsExample}</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom Controls */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-950/90 backdrop-blur-md border-t border-slate-800">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          {viewMode === 'study' ? (
            <>
              <button
                onClick={handlePrevStudy}
                disabled={currentIndex === 0}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 text-sm font-semibold transition-colors border border-slate-700"
              >
                ← Previous
              </button>
              <button
                onClick={handleNextStudy}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-semibold shadow-lg shadow-emerald-500/20 transition-all"
              >
                {currentIndex + 1 === totalWords ? 'Start Vocabulary Quiz →' : 'Next Word →'}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setViewMode('study')}
                className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors border border-slate-700"
              >
                ← Flashcards
              </button>
              {!isQuizAnswerChecked ? (
                <button
                  onClick={handleCheckQuiz}
                  disabled={!selectedQuizOption}
                  className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold shadow-lg shadow-indigo-500/20 transition-all"
                >
                  Check Answer
                </button>
              ) : (
                <button
                  onClick={handleNextQuiz}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-semibold shadow-lg shadow-emerald-500/20 transition-all"
                >
                  {currentIndex + 1 === totalWords ? 'Complete Stage →' : 'Next Quiz Word →'}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </main>
  );
}
