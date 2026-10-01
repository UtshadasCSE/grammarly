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
import { adverbSpeakingPrompts } from '@/data/parts-of-speech/adverb';

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
    <div className="glass-card rounded-2xl p-5 border border-border space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {recordingState === 'recording' && (
            <span className="w-3 h-3 rounded-full bg-destructive animate-pulse" />
          )}
          <span className="text-sm font-semibold text-foreground capitalize">
            {recordingState === 'idle' && 'Ready to Record'}
            {recordingState === 'recording' && 'Recording Audio...'}
            {recordingState === 'paused' && 'Recording Paused'}
            {recordingState === 'stopped' && 'Recording Complete'}
          </span>
        </div>
        <span className="text-sm font-mono font-bold text-muted-foreground">
          {formatTime(duration)}
        </span>
      </div>

      {/* Playback Audio Element */}
      {recording && (
        <audio controls src={recording.url} className="w-full h-9 rounded-lg" />
      )}

      {/* Control buttons */}
      <div className="flex flex-wrap gap-2 justify-center">
        {recordingState === 'idle' && (
          <button
            id="start-adv-recording-btn"
            onClick={startRecording}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-destructive text-destructive-foreground hover:opacity-90 font-medium text-sm transition-opacity shadow-md shadow-destructive/20"
          >
            <Mic size={16} /> Start Recording
          </button>
        )}

        {recordingState === 'recording' && (
          <>
            <button
              id="pause-adv-recording-btn"
              onClick={pauseRecording}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted text-foreground hover:bg-muted/80 text-sm font-medium transition-colors"
            >
              <Pause size={15} /> Pause
            </button>
            <button
              id="stop-adv-recording-btn"
              onClick={stopRecording}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-destructive text-destructive-foreground hover:opacity-90 text-sm font-medium transition-opacity"
            >
              <Square size={15} /> Stop
            </button>
          </>
        )}

        {recordingState === 'paused' && (
          <>
            <button
              id="resume-adv-recording-btn"
              onClick={resumeRecording}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90 text-sm font-medium transition-opacity"
            >
              <Play size={15} /> Resume
            </button>
            <button
              id="stop-paused-adv-recording-btn"
              onClick={stopRecording}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-destructive text-destructive-foreground hover:opacity-90 text-sm font-medium transition-opacity"
            >
              <Square size={15} /> Stop
            </button>
          </>
        )}

        {recordingState === 'stopped' && (
          <>
            <button
              id="save-adv-recording-btn"
              onClick={handleSave}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary text-secondary-foreground hover:opacity-90 text-sm font-semibold transition-opacity shadow-md shadow-secondary/20"
            >
              <Save size={15} /> Save &amp; Complete Prompt
            </button>
            <button
              id="rerecord-adv-btn"
              onClick={() => {
                deleteRecording();
                startRecording();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border hover:bg-muted text-foreground text-sm font-medium transition-colors"
            >
              <RotateCcw size={15} /> Re-record
            </button>
            <button
              id="delete-adv-recording-btn"
              onClick={deleteRecording}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-destructive hover:bg-destructive/10 text-sm transition-colors"
            >
              <Trash2 size={15} />
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default function AdverbSpeakingPage() {
  const { getPartOfSpeechProgress, completePartOfSpeechStage, incrementPartOfSpeechSpeaking } = useProgress();
  const prompts = adverbSpeakingPrompts;
  const adverbProgress = getPartOfSpeechProgress('adverb');

  const [currentIdx, setCurrentIdx] = useState(0);
  const [completedPrompts, setCompletedPrompts] = useState<number[]>([]);
  const [showSample, setShowSample] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const prompt = prompts[currentIdx];

  const handleSaveRecording = () => {
    incrementPartOfSpeechSpeaking('adverb');
    setShowFeedback(true);
    if (!completedPrompts.includes(currentIdx)) {
      setCompletedPrompts((prev) => [...prev, currentIdx]);
    }
  };

  const handleNext = () => {
    setShowSample(false);
    setShowFeedback(false);
    if (currentIdx < prompts.length - 1) {
      setCurrentIdx((i) => i + 1);
    } else {
      setIsFinished(true);
      const totalCount = prompts.length;
      const completedCount = completedPrompts.length + 1;
      const accuracy = Math.round((completedCount / totalCount) * 100);
      completePartOfSpeechStage('adverb', 'speaking', completedCount, Math.max(accuracy, 100));
    }
  };

  if (isFinished) {
    return (
      <main className="min-h-screen hero-gradient flex items-center justify-center px-4 py-16">
        <ThemeToggle />
        <div className="w-full max-w-xl animate-scale-in">
          <div className="glass-card rounded-3xl p-10 border border-border text-center">
            <div className="text-6xl mb-4">🎙️</div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Speaking Practice Complete!</h1>
            <p className="text-muted-foreground mb-8">
              Adverb — Spoken Fluency, Nuance &amp; Natural Modifier Integration ({prompts.length} Prompts)
            </p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-muted rounded-2xl p-4">
                <p className="text-2xl font-bold text-foreground">{prompts.length}</p>
                <p className="text-xs text-muted-foreground mt-1">Total Prompts</p>
              </div>
              <div className="bg-muted rounded-2xl p-4">
                <p className="text-2xl font-bold text-primary">100%</p>
                <p className="text-xs text-muted-foreground mt-1">Completion</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                id="restart-adv-speaking-btn"
                onClick={() => {
                  setCurrentIdx(0);
                  setCompletedPrompts([]);
                  setShowSample(false);
                  setShowFeedback(false);
                  setIsFinished(false);
                }}
                className="px-6 py-3 rounded-2xl border border-border hover:bg-muted font-medium text-sm transition-colors"
              >
                ↻ Practice Again
              </button>
              <Link
                id="continue-to-adv-writing-btn"
                href="/parts-of-speech/adverb/writing"
                className="px-6 py-3 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
              >
                Continue to Writing →
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

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
          <span className="text-foreground font-medium">Speaking</span>
        </div>

        {/* Stage progress */}
        <div className="mb-6">
          <StageProgressBar
            currentStage="speaking"
            completedStages={adverbProgress?.stages ?? {}}
          />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between gap-4 mb-4 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-500/20">
              Prompt {currentIdx + 1} of {prompts.length}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-muted text-muted-foreground capitalize">
              Level: {prompt.level}
            </span>
          </div>
          {prompt.topic && (
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 capitalize">
              Topic: {prompt.topic}
            </span>
          )}
        </div>

        {/* Prompt Card */}
        <div className="glass-card rounded-3xl p-8 border border-border space-y-6 mb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
              Speaking Task:
            </p>
            <h2 className="text-lg font-bold text-foreground leading-relaxed">
              {prompt.prompt}
            </h2>
          </div>

          {/* Grammar & Guidance Targets */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            {prompt.targetAdverbs && prompt.targetAdverbs.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-cyan-500/5 border border-cyan-500/20">
                <p className="font-bold text-cyan-600 dark:text-cyan-400 mb-1 flex items-center gap-1">
                  <span>🚀</span> Target Adverbs to Use:
                </p>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {prompt.targetAdverbs.map((adv, aIdx) => (
                    <span key={aIdx} className="px-2 py-0.5 rounded-md bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 font-medium">
                      {adv}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {prompt.collocations && prompt.collocations.length > 0 && (
              <div className="p-3.5 rounded-2xl bg-secondary/5 border border-secondary/20">
                <p className="font-bold text-secondary mb-1 flex items-center gap-1">
                  <span>🔗</span> Useful Collocations:
                </p>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {prompt.collocations.map((col, cIdx) => (
                    <span key={cIdx} className="px-2 py-0.5 rounded-md bg-secondary/10 text-secondary font-medium">
                      {col}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sentence Starter */}
          {prompt.sentenceStarter && (
            <div className="p-3.5 rounded-2xl bg-primary/5 border border-primary/20 text-xs">
              <span className="font-bold text-primary block mb-0.5">💬 Recommended Sentence Starter:</span>
              <p className="text-foreground font-medium italic">&ldquo;{prompt.sentenceStarter}&rdquo;</p>
            </div>
          )}

          {/* Voice Recorder Component */}
          <VoiceRecorder onSave={handleSaveRecording} />

          {/* Practice Feedback Banner */}
          {showFeedback && (
            <div className="p-4 rounded-2xl bg-secondary/10 border border-secondary/20 space-y-2 animate-fade-in-up text-xs">
              <div className="flex items-center gap-1.5 font-bold text-secondary">
                <Sparkles size={14} />
                <span>Practice Feedback</span>
              </div>
              <p className="text-foreground leading-relaxed">
                Recording saved! Ensure your adverb positioning sounds natural (e.g. placing frequency adverbs before main verbs, and manner/degree modifiers precisely before the words they modify). Avoid overusing generic intensifiers like &ldquo;very&rdquo; when precise academic adverbs such as &ldquo;substantially&rdquo; or &ldquo;exceptionally&rdquo; apply.
              </p>
            </div>
          )}

          {/* Model Response Toggle */}
          <div className="pt-2 border-t border-border/40">
            <button
              id="toggle-adv-sample-btn"
              onClick={() => setShowSample(!showSample)}
              className="text-xs text-primary hover:underline font-semibold"
            >
              {showSample ? '▲ Hide Band 9.0 Model Response' : '▼ View Band 9.0 Model Response & Strategy'}
            </button>

            {showSample && (
              <div className="mt-3 p-4 rounded-2xl bg-muted/40 border border-border space-y-2 text-xs animate-scale-in">
                <p className="font-bold text-foreground">Band 9.0 Spoken Model:</p>
                <p className="text-muted-foreground leading-relaxed italic">
                  &ldquo;{prompt.modelResponse}&rdquo;
                </p>
                {prompt.ieltsTips && prompt.ieltsTips.length > 0 && (
                  <div className="pt-2 border-t border-border/40">
                    <p className="font-bold text-primary mb-1">💡 Examiner Strategy:</p>
                    <ul className="space-y-1 text-muted-foreground">
                      {prompt.ieltsTips.map((tip, tIdx) => (
                        <li key={tIdx}>• {tip}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Next Button */}
          <div className="pt-2">
            <button
              id="next-adv-speaking-btn"
              onClick={handleNext}
              className="w-full py-3.5 rounded-2xl bg-primary text-primary-foreground font-semibold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
            >
              {currentIdx < prompts.length - 1 ? 'Next Speaking Prompt →' : 'Complete Speaking Stage 🏆'}
            </button>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between text-sm">
          <Link
            href="/parts-of-speech/adverb/vocabulary"
            className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
          >
            <ChevronLeft size={16} /> Stage 6: Vocabulary
          </Link>
          <Link
            href="/parts-of-speech/adverb"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            Adverb Hub
          </Link>
        </div>
      </div>
    </main>
  );
}
