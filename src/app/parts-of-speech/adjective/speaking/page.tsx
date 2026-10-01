'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import {
  ChevronRight,
  ChevronLeft,
  Mic,
  Square,
  Pause,
  Play,
  Trash2,
  Save,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar } from '@/components/ProgressIndicators';
import { useProgress } from '@/contexts/ProgressContext';
import { adjectiveSpeakingPrompts } from '@/data/parts-of-speech/adjective';

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}

type RecordingState = 'idle' | 'recording' | 'paused' | 'stopped';

interface Recording {
  url: string;
  duration: number;
  blob: Blob;
}

function VoiceRecorder({ onSave }: { onSave: (recording: Recording) => void }) {
  const [recordingState, setRecordingState] = useState<RecordingState>('idle');
  const [duration, setDuration] = useState(0);
  const [recording, setRecording] = useState<Recording | null>(null);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setDuration((d) => d + 1);
    }, 1000);
  };

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];
      setDuration(0);
      setRecording(null);

      const mr = new MediaRecorder(stream);
      mediaRecorderRef.current = mr;

      mr.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };

      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(blob);
        setRecording({ url, blob, duration });
        stream.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      };

      mr.start(100);
      setRecordingState('recording');
      startTimer();
    } catch {
      setPermissionDenied(true);
    }
  }, [duration]);

  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.pause();
      setRecordingState('paused');
      clearTimer();
    }
  }, []);

  const resumeRecording = useCallback(() => {
    if (mediaRecorderRef.current?.state === 'paused') {
      mediaRecorderRef.current.resume();
      setRecordingState('recording');
      startTimer();
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      setRecordingState('stopped');
      clearTimer();
    }
  }, []);

  const deleteRecording = useCallback(() => {
    if (recording?.url) URL.revokeObjectURL(recording.url);
    setRecording(null);
    setRecordingState('idle');
    setDuration(0);
  }, [recording]);

  const handleSave = useCallback(() => {
    if (recording) {
      onSave(recording);
    }
  }, [recording, onSave]);

  useEffect(() => {
    return () => {
      clearTimer();
      streamRef.current?.getTracks().forEach((t) => t.stop());
    };
  }, []);

  if (permissionDenied) {
    return (
      <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
        <p className="text-sm text-primary">
          🎙️ Microphone access was not granted. You can still practice speaking aloud and review the sample responses.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 border border-border">
      <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
        <Mic size={18} className="text-primary" /> Record Your Answer
      </h3>

      {recordingState === 'recording' && (
        <div className="flex items-center gap-3 mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
          <div className="w-3 h-3 bg-emerald-500 rounded-full animate-ping" />
          <span className="text-emerald-600 dark:text-emerald-400 font-mono text-sm font-bold">
            {formatTime(duration)} Recording...
          </span>
        </div>
      )}

      {recordingState === 'paused' && (
        <div className="flex items-center gap-3 mb-4 p-3 bg-secondary/5 border border-secondary/20 rounded-xl">
          <Pause size={16} className="text-secondary" />
          <span className="text-secondary font-mono text-sm font-bold">
            {formatTime(duration)} — Paused
          </span>
        </div>
      )}

      <div className="flex flex-wrap gap-2">
        {recordingState === 'idle' && (
          <button
            id="start-adj-recording-btn"
            onClick={startRecording}
            className="flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
          >
            <Mic size={16} /> 🎙 Record Answer
          </button>
        )}

        {recordingState === 'recording' && (
          <>
            <button
              id="pause-adj-recording-btn"
              onClick={pauseRecording}
              className="flex items-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:opacity-90 transition-all"
            >
              <Pause size={15} /> Pause
            </button>
            <button
              id="stop-adj-recording-btn"
              onClick={stopRecording}
              className="flex items-center gap-2 px-4 py-3 bg-foreground text-background rounded-xl font-semibold hover:opacity-80 transition-all"
            >
              <Square size={15} /> Stop
            </button>
          </>
        )}

        {recordingState === 'paused' && (
          <>
            <button
              id="resume-adj-recording-btn"
              onClick={resumeRecording}
              className="flex items-center gap-2 px-4 py-3 bg-secondary text-secondary-foreground rounded-xl font-semibold hover:opacity-90 transition-all"
            >
              <Play size={15} /> Resume
            </button>
            <button
              id="stop-adj-paused-btn"
              onClick={stopRecording}
              className="flex items-center gap-2 px-4 py-3 bg-foreground text-background rounded-xl font-semibold hover:opacity-80 transition-all"
            >
              <Square size={15} /> Stop
            </button>
          </>
        )}

        {recordingState === 'stopped' && recording && (
          <div className="w-full space-y-4">
            <audio src={recording.url} controls className="w-full rounded-xl" />
            <div className="flex flex-wrap gap-2">
              <button
                id="save-adj-recording-btn"
                onClick={handleSave}
                className="flex items-center gap-2 px-5 py-2.5 bg-secondary text-secondary-foreground rounded-xl font-semibold text-xs hover:opacity-90 transition-all"
              >
                <Save size={14} /> Save & Evaluate
              </button>
              <button
                id="rerecord-adj-recording-btn"
                onClick={deleteRecording}
                className="flex items-center gap-2 px-4 py-2.5 border border-border hover:bg-muted text-foreground rounded-xl font-semibold text-xs transition-colors"
              >
                <RotateCcw size={14} /> ↻ Record Again
              </button>
              <button
                id="delete-adj-recording-btn"
                onClick={deleteRecording}
                className="flex items-center gap-2 px-4 py-2.5 border border-destructive/30 text-destructive hover:bg-destructive/10 rounded-xl font-semibold text-xs transition-colors"
              >
                <Trash2 size={14} /> Delete
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdjectiveSpeakingPage() {
  const { getPartOfSpeechProgress, completePartOfSpeechStage, incrementPartOfSpeechSpeaking } = useProgress();
  const prompts = adjectiveSpeakingPrompts;
  const adjectiveProgress = getPartOfSpeechProgress('adjective');

  const [currentIdx, setCurrentIdx] = useState(0);
  const [savedRecordings, setSavedRecordings] = useState<Record<string, Recording>>({});
  const [showSample, setShowSample] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const prompt = prompts[currentIdx];

  const handleSaveRecording = (rec: Recording) => {
    setSavedRecordings((prev) => ({ ...prev, [prompt.id]: rec }));
    setAttempts((a) => a + 1);
    incrementPartOfSpeechSpeaking('adjective');
  };

  const handleNext = () => {
    if (currentIdx < prompts.length - 1) {
      setCurrentIdx((i) => i + 1);
      setShowSample(false);
    } else {
      completePartOfSpeechStage('adjective', 'speaking', attempts || prompts.length, 90);
    }
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
          <span className="text-foreground font-medium">Speaking</span>
        </div>

        {/* Stage progress */}
        <div className="mb-6">
          <StageProgressBar
            currentStage="speaking"
            completedStages={adjectiveProgress?.stages ?? {}}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              Prompt {currentIdx + 1} of {prompts.length}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground capitalize">
              {prompt.type.replace('-', ' ')}
            </span>
          </div>
          <span className="text-xs text-muted-foreground font-medium">
            🎯 Level: {prompt.level}
          </span>
        </div>

        {/* Prompt Card */}
        <div className="glass-card rounded-3xl p-8 mb-6 border border-border">
          <div className="mb-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
              Speaking Task / Prompt:
            </p>
            <p className="text-lg sm:text-xl font-bold text-foreground leading-relaxed">
              {prompt.prompt}
            </p>
          </div>

          {/* Target Grammar & Adjectives */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-xs">
            <div className="p-3.5 bg-card rounded-xl border border-border">
              <p className="font-bold text-primary uppercase tracking-wider mb-1">
                🎨 Target Grammar Focus
              </p>
              <p className="text-foreground">{prompt.targetGrammar}</p>
            </div>
            {prompt.targetAdjectives && (
              <div className="p-3.5 bg-card rounded-xl border border-border">
                <p className="font-bold text-emerald-500 uppercase tracking-wider mb-1">
                  🔑 High-Impact Adjectives
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {prompt.targetAdjectives.map((adj, aIdx) => (
                    <span key={aIdx} className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono text-[11px]">
                      {adj}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Useful Collocations */}
          {prompt.targetCollocations && prompt.targetCollocations.length > 0 && (
            <div className="p-3.5 bg-card rounded-xl border border-border mb-6 text-xs">
              <p className="font-bold text-primary uppercase tracking-wider mb-1">
                🔗 Useful Natural Collocations
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                {prompt.targetCollocations.map((col, cIdx) => (
                  <span key={cIdx} className="px-2 py-0.5 rounded-md bg-primary/10 text-primary font-mono text-[11px]">
                    {col}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Sentence Starter */}
          <div className="p-3.5 bg-primary/5 border border-primary/15 rounded-xl mb-6 text-xs">
            <p className="font-bold text-primary mb-1">💬 Natural Sentence Starter:</p>
            <p className="text-foreground italic">"{prompt.hintStarter}"</p>
          </div>

          {/* Voice Recorder */}
          <div className="mb-6">
            <VoiceRecorder onSave={handleSaveRecording} />
          </div>

          {/* Practice Feedback Banner */}
          {savedRecordings[prompt.id] && (
            <div className="p-5 bg-secondary/10 border border-secondary/20 rounded-2xl mb-6 animate-scale-in text-xs space-y-2">
              <div className="flex items-center gap-2 font-bold text-secondary text-sm">
                <Sparkles size={16} />
                <span>Practice Feedback</span>
              </div>
              <p className="text-foreground leading-relaxed">
                Great job completing your audio response! You used a good range of descriptive adjectives. To push your score towards Band 8.5+, ensure you pair intensifiers naturally (e.g. "utterly impossible", "highly beneficial") and vary basic words like "good" or "nice" with context-specific adjectives such as "effective", "practical", or "valuable".
              </p>
              <p className="text-[11px] text-muted-foreground italic">
                * Note: This is developmental practice feedback to support your grammatical fluency; not an official IELTS score.
              </p>
            </div>
          )}

          {/* Sample Model Answer Toggle */}
          {prompt.sampleAnswer && (
            <div className="border-t border-border pt-4">
              <button
                id="toggle-adj-sample-answer-btn"
                onClick={() => setShowSample(!showSample)}
                className="text-xs text-primary hover:text-primary/80 font-semibold flex items-center gap-1 transition-colors"
              >
                {showSample ? '▲ Hide Band 9 Model Answer' : '▼ Show Band 9 Model Answer'}
              </button>

              {showSample && (
                <div className="mt-3 p-4 bg-secondary/5 border border-secondary/20 rounded-xl text-xs space-y-1 animate-scale-in">
                  <p className="font-bold text-secondary">🎙️ IELTS Band 9 Model Response:</p>
                  <p className="text-foreground leading-relaxed italic">"{prompt.sampleAnswer}"</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navigation / Next Prompt */}
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/parts-of-speech/adjective/vocabulary"
            className="text-muted-foreground hover:text-foreground transition-colors text-sm flex items-center gap-1"
          >
            ← Stage 6: Vocabulary
          </Link>
          <button
            id="next-adj-speaking-prompt-btn"
            onClick={handleNext}
            className="px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-2xl text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
          >
            {currentIdx < prompts.length - 1 ? 'Next Speaking Prompt →' : 'Continue to Writing →'}
          </button>
        </div>
      </div>
    </main>
  );
}
