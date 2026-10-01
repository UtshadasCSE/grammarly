'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useProgress } from '@/contexts/ProgressContext';
import { pronounSpeakingPrompts } from '@/data/parts-of-speech/pronoun';
import { PronounSpeakingPrompt } from '@/types';

export default function PronounSpeakingPage() {
  const { completePartOfSpeechStage, incrementPartOfSpeechSpeaking } = useProgress();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [showSampleAnswer, setShowSampleAnswer] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [completedPrompts, setCompletedPrompts] = useState<number[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentPrompt: PronounSpeakingPrompt = pronounSpeakingPrompts[currentIndex];
  const totalPrompts = pronounSpeakingPrompts.length;

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
    };
  }, [audioUrl]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
        setShowFeedback(true);
        incrementPartOfSpeechSpeaking('pronoun');
        if (!completedPrompts.includes(currentIndex)) {
          setCompletedPrompts((prev) => [...prev, currentIndex]);
        }
      };

      mediaRecorder.start();
      setIsRecording(true);
      setIsPaused(false);
      setRecordingSeconds(0);

      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Error accessing microphone:', err);
      alert('Microphone access is required to practice speaking. Please enable microphone permissions.');
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording && !isPaused) {
      mediaRecorderRef.current.pause();
      setIsPaused(true);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && isRecording && isPaused) {
      mediaRecorderRef.current.resume();
      setIsPaused(false);
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
      setIsPaused(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  };

  const resetRecording = () => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
    setShowFeedback(false);
    setRecordingSeconds(0);
  };

  const handleNextPrompt = () => {
    resetRecording();
    setShowSampleAnswer(false);
    if (currentIndex + 1 < totalPrompts) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      completePartOfSpeechStage('pronoun', 'speaking', 100, 100);
      setIsCompleted(true);
    }
  };

  const handlePrevPrompt = () => {
    if (currentIndex > 0) {
      resetRecording();
      setShowSampleAnswer(false);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  if (isCompleted) {
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
              Stage 7 Complete
            </span>
          </div>

          <div className="glass-card p-8 rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/40 via-slate-900 to-slate-950 text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400/50 text-3xl">
              🎙️
            </div>
            <h1 className="text-2xl font-bold text-white">Speaking Stage Completed!</h1>
            <p className="text-slate-300 text-sm max-w-md mx-auto">
              You practiced all 18 progressive speaking challenges with voice recording and target pronoun feedback.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4 max-w-sm mx-auto">
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-2xl font-bold text-emerald-400">18/18</div>
                <div className="text-xs text-slate-400 mt-1">Prompts Practiced</div>
              </div>
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700">
                <div className="text-2xl font-bold text-cyan-400">100%</div>
                <div className="text-xs text-slate-400 mt-1">Stage Accuracy</div>
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-950/90 backdrop-blur-md border-t border-slate-800">
          <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
            <button
              onClick={() => {
                setIsCompleted(false);
                setCurrentIndex(0);
              }}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-semibold transition-colors border border-slate-700"
            >
              🔄 Revisit Prompts
            </button>
            <Link
              href="/parts-of-speech/pronoun/writing"
              className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-semibold shadow-lg shadow-emerald-500/20 transition-all"
            >
              Stage 8: Writing →
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
          <div className="text-xs text-slate-400">
            Prompt: <span className="font-semibold text-emerald-400">{currentIndex + 1}</span> / {totalPrompts}
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-xs text-slate-400 mb-1.5">
            <span className="font-semibold text-white">Stage 7: Speaking &amp; Voice Recording</span>
            <span>{Math.round(((currentIndex + 1) / totalPrompts) * 100)}% Progress</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500 transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalPrompts) * 100}%` }}
            />
          </div>
        </div>

        {/* Prompt Card */}
        <div className="glass-card p-6 md:p-8 rounded-2xl border border-slate-800 space-y-6">
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 font-medium capitalize border border-slate-700">
              {currentPrompt.level}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
              {currentPrompt.targetGrammar}
            </span>
          </div>

          {/* Prompt Description */}
          <div className="space-y-2">
            <h2 className="text-base md:text-lg font-semibold text-white leading-relaxed">
              {currentPrompt.prompt}
            </h2>
          </div>

          {/* Guidance Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {currentPrompt.targetPronouns && (
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="font-bold text-indigo-400">🎯 Useful Pronouns:</span>
                <p className="text-slate-300">{currentPrompt.targetPronouns.join(' • ')}</p>
              </div>
            )}
            {currentPrompt.targetNouns && (
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
                <span className="font-bold text-cyan-400">📘 Target Noun Anchors:</span>
                <p className="text-slate-300">{currentPrompt.targetNouns.join(' • ')}</p>
              </div>
            )}
          </div>

          {/* Sentence Starter */}
          <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 space-y-1 text-xs">
            <span className="font-bold text-indigo-300">💡 Sentence Starter:</span>
            <p className="text-sm text-slate-200 italic">&ldquo;{currentPrompt.hintStarter}&rdquo;</p>
          </div>

          {/* Recorder UI */}
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <span className={`w-3 h-3 rounded-full ${isRecording ? 'bg-rose-500 animate-ping' : 'bg-slate-600'}`} />
              <span className="font-mono text-lg font-bold text-white">
                {formatTime(recordingSeconds)}
              </span>
            </div>

            {/* Recording Controls */}
            <div className="flex flex-wrap items-center justify-center gap-3">
              {!isRecording && !audioUrl && (
                <button
                  onClick={startRecording}
                  className="px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-semibold text-sm shadow-lg shadow-rose-500/20 flex items-center gap-2 transition-all"
                >
                  🎙️ Start Recording
                </button>
              )}

              {isRecording && (
                <>
                  {!isPaused ? (
                    <button
                      onClick={pauseRecording}
                      className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition-colors"
                    >
                      ⏸️ Pause
                    </button>
                  ) : (
                    <button
                      onClick={resumeRecording}
                      className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold transition-colors"
                    >
                      ▶️ Resume
                    </button>
                  )}
                  <button
                    onClick={stopRecording}
                    className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-lg shadow-rose-500/20 transition-colors"
                  >
                    ⏹️ Stop Recording
                  </button>
                </>
              )}

              {audioUrl && !isRecording && (
                <div className="w-full space-y-3">
                  <audio controls src={audioUrl} className="w-full max-w-md mx-auto" />
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={resetRecording}
                      className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors border border-slate-700"
                    >
                      ↻ Record Again
                    </button>
                    <button
                      onClick={() => setShowSampleAnswer(!showSampleAnswer)}
                      className="px-4 py-2 rounded-xl bg-indigo-600/30 hover:bg-indigo-600/40 text-indigo-300 text-xs font-semibold transition-colors border border-indigo-500/30"
                    >
                      {showSampleAnswer ? 'Hide Sample Answer' : '📖 View Band 9.0 Sample Answer'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Practice Feedback */}
          {showFeedback && (
            <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2 text-xs">
              <span className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
                <span>🎯</span> Practice Feedback &amp; Analysis
              </span>
              <p className="text-slate-300 leading-relaxed">
                Great job completing your speech recording! Review your recording to verify that:
              </p>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                <li>You avoided repeating the same nouns by using personal and demonstrative pronouns naturally.</li>
                <li>Your pronouns match their antecedent nouns in number (singular vs. plural).</li>
                <li>You used object pronouns after prepositions (e.g., &ldquo;between us&rdquo;, &ldquo;with them&rdquo;).</li>
              </ul>
            </div>
          )}

          {/* Sample Model Answer */}
          {showSampleAnswer && currentPrompt.sampleAnswer && (
            <div className="p-5 rounded-2xl bg-indigo-950/20 border border-indigo-500/30 space-y-2 text-xs">
              <span className="font-bold text-cyan-300 text-sm">Band 9.0 Model Spoken Production:</span>
              <p className="text-slate-200 leading-relaxed italic">&ldquo;{currentPrompt.sampleAnswer}&rdquo;</p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Sticky Controls */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-slate-950/90 backdrop-blur-md border-t border-slate-800">
        <div className="max-w-2xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={handlePrevPrompt}
            disabled={currentIndex === 0}
            className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed text-slate-200 text-sm font-semibold transition-colors border border-slate-700"
          >
            ← Previous
          </button>
          <button
            onClick={handleNextPrompt}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-sm font-semibold shadow-lg shadow-emerald-500/20 transition-all"
          >
            {currentIndex + 1 === totalPrompts ? 'Complete Speaking Stage →' : 'Next Prompt →'}
          </button>
        </div>
      </div>
    </main>
  );
}
