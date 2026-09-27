'use client';

import { use, useState, useRef, useCallback, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, Mic, Square, Pause, Play, Trash2, Save, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar } from '@/components/ProgressIndicators';
import { useProgress } from '@/contexts/ProgressContext';
import type { TenseId } from '@/types';
import { speakingPrompts } from '@/data/speaking/speakingAndWriting';

const tenseNames: Record<TenseId, string> = {
  simple: 'Present Simple',
  continuous: 'Present Continuous',
  perfect: 'Present Perfect',
  'perfect-continuous': 'Present Perfect Continuous',
};

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
  transcript?: string;
}

function VoiceRecorder({
  onSave,
  tenseId,
}: {
  onSave: (recording: Recording) => void;
  tenseId: string;
}) {
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
      <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl">
        <p className="text-sm text-rose-600 dark:text-rose-400">
          🎙️ Microphone access denied. Please allow microphone access in your browser settings and reload the page.
        </p>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-2xl p-6 border border-border">
      <h3 className="font-bold text-foreground mb-4 flex items-center gap-2">
        <Mic size={18} className="text-primary" /> Your Answer
      </h3>

      {/* Recording indicator */}
      {recordingState === 'recording' && (
        <div className="flex items-center gap-3 mb-4 p-3 bg-rose-500/5 border border-rose-500/20 rounded-xl">
          <div className="animate-recording w-3 h-3 bg-rose-500 rounded-full" />
          <div className="recording-wave text-rose-500">
            <span /><span /><span /><span /><span />
          </div>
          <span className="text-rose-600 dark:text-rose-400 font-mono text-sm font-bold">
            {formatTime(duration)} Recording...
          </span>
        </div>
      )}

      {recordingState === 'paused' && (
        <div className="flex items-center gap-3 mb-4 p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl">
          <Pause size={16} className="text-amber-500" />
          <span className="text-amber-600 dark:text-amber-400 font-mono text-sm font-bold">
            {formatTime(duration)} — Paused
          </span>
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-wrap gap-2">
        {recordingState === 'idle' && (
          <button
            id="start-recording-btn"
            onClick={startRecording}
            className="flex items-center gap-2 px-5 py-3 bg-rose-500 text-white rounded-xl font-semibold hover:bg-rose-600 hover:scale-105 active:scale-95 transition-all"
          >
            <Mic size={16} /> Start Recording
          </button>
        )}

        {recordingState === 'recording' && (
          <>
            <button
              id="pause-recording-btn"
              onClick={pauseRecording}
              className="flex items-center gap-2 px-4 py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-all"
            >
              <Pause size={15} /> Pause
            </button>
            <button
              id="stop-recording-btn"
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
              id="resume-recording-btn"
              onClick={resumeRecording}
              className="flex items-center gap-2 px-4 py-3 bg-emerald-500 text-white rounded-xl font-semibold hover:bg-emerald-600 transition-all"
            >
              <Play size={15} /> Resume
            </button>
            <button
              id="stop-paused-btn"
              onClick={stopRecording}
              className="flex items-center gap-2 px-4 py-3 bg-foreground text-background rounded-xl font-semibold hover:opacity-80 transition-all"
            >
              <Square size={15} /> Stop
            </button>
          </>
        )}
      </div>

      {/* Audio preview */}
      {recordingState === 'stopped' && recording && (
        <div className="mt-4 space-y-3 animate-scale-in">
          <div className="p-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
            <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-2">▶ Preview Recording ({formatTime(recording.duration)})</p>
            <audio
              id="audio-preview"
              controls
              src={recording.url}
              className="w-full h-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              id="re-record-btn"
              onClick={deleteRecording}
              className="flex items-center gap-2 px-4 py-2.5 bg-muted text-foreground rounded-xl text-sm font-medium hover:bg-muted/80 border border-border transition-all"
            >
              <RotateCcw size={14} /> Re-record
            </button>
            <button
              id="delete-recording-btn"
              onClick={deleteRecording}
              className="flex items-center gap-2 px-4 py-2.5 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-xl text-sm font-medium border border-rose-500/20 hover:bg-rose-500/20 transition-all"
            >
              <Trash2 size={14} /> Delete
            </button>
            <button
              id="save-recording-btn"
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 text-white rounded-xl text-sm font-semibold hover:bg-emerald-600 transition-all"
            >
              <Save size={14} /> Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function SpeakingPage({ params }: { params: Promise<{ tenseId: string }> }) {
  const { tenseId } = use(params);
  const { progress, completeStage, incrementSpeaking } = useProgress();
  const tId = tenseId as TenseId;
  const prompts = speakingPrompts.filter((p) => p.tense === tId);
  const tenseProgress = progress.tenses[tId];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [savedRecordings, setSavedRecordings] = useState<Map<number, Recording>>(new Map());
  const [showSample, setShowSample] = useState(false);

  const prompt = prompts[currentIdx];

  interface Recording {
    url: string;
    duration: number;
    blob: Blob;
  }

  const handleSave = useCallback((recording: Recording) => {
    setSavedRecordings((prev) => new Map(prev).set(currentIdx, recording));
    incrementSpeaking(tId);
  }, [currentIdx, incrementSpeaking, tId]);

  const handleComplete = () => {
    completeStage(tId, 'speaking', savedRecordings.size, Math.round((savedRecordings.size / Math.max(prompts.length, 1)) * 100));
  };

  if (!prompt) {
    return (
      <main className="min-h-screen hero-gradient flex items-center justify-center px-4">
        <ThemeToggle />
        <div className="text-center">
          <p className="text-muted-foreground">No speaking prompts available for this tense.</p>
          <Link href={`/tense/present/${tId}/writing`} className="text-primary hover:underline mt-2 block">
            Continue to Writing →
          </Link>
        </div>
      </main>
    );
  }

  const stageTypeLabels: Record<string, string> = {
    'read-aloud': 'Read Aloud',
    'complete': 'Complete the Sentence',
    'short-answer': 'Short Answer',
    'speak-30': 'Speak for 30 seconds',
    'speak-60': 'Speak for 1 minute',
    'ielts-part2': 'IELTS Speaking Part 2',
    'ielts-part3': 'IELTS Speaking Part 3',
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
          <span className="text-foreground font-medium">Speaking</span>
        </div>

        <div className="mb-6">
          <StageProgressBar currentStage="speaking" completedStages={tenseProgress?.stages ?? {}} />
        </div>

        {/* Progress through prompts */}
        <div className="flex items-center gap-2 mb-6">
          {prompts.map((_, i) => (
            <button
              key={i}
              id={`speaking-prompt-${i}`}
              onClick={() => { setCurrentIdx(i); setShowSample(false); }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIdx
                  ? 'bg-primary w-8'
                  : savedRecordings.has(i)
                  ? 'bg-emerald-500 w-4'
                  : 'bg-muted w-4'
              }`}
            />
          ))}
          <span className="ml-2 text-xs text-muted-foreground">{currentIdx + 1}/{prompts.length}</span>
        </div>

        {/* Prompt card */}
        <div className="glass-card rounded-3xl p-7 border border-border mb-5">
          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
              Stage {prompt.stage} — {stageTypeLabels[prompt.type] ?? prompt.type}
            </span>
            {prompt.duration && (
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full border border-border">
                ⏱ {prompt.duration}s
              </span>
            )}
          </div>

          <p className="text-base font-semibold text-foreground leading-relaxed mb-4 whitespace-pre-line">
            {prompt.prompt}
          </p>

          {/* Target tense usage */}
          <div className="p-3 bg-primary/5 border border-primary/10 rounded-xl mb-4">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Target Language</p>
            <p className="text-sm text-foreground">{prompt.targetTenseUsage}</p>
          </div>

          {/* Sample answer toggle */}
          {prompt.sampleAnswer && (
            <button
              id="sample-answer-btn"
              onClick={() => setShowSample(!showSample)}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-2"
            >
              {showSample ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              {showSample ? 'Hide' : 'Show'} Sample Answer
            </button>
          )}
          {showSample && prompt.sampleAnswer && (
            <div className="p-4 bg-muted rounded-xl border border-border animate-scale-in">
              <p className="text-xs font-semibold text-muted-foreground mb-2">📝 Sample Answer</p>
              <p className="text-sm text-foreground leading-relaxed italic">{prompt.sampleAnswer}</p>
            </div>
          )}
        </div>

        {/* Voice recorder */}
        {savedRecordings.has(currentIdx) ? (
          <div className="glass-card rounded-2xl p-5 border border-emerald-500/20 bg-emerald-500/5 mb-5">
            <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 mb-2">✅ Recording saved!</p>
            <audio
              id={`saved-audio-${currentIdx}`}
              controls
              src={savedRecordings.get(currentIdx)!.url}
              className="w-full h-10"
            />
            <button
              id="re-record-prompt-btn"
              onClick={() => setSavedRecordings((prev) => { const next = new Map(prev); next.delete(currentIdx); return next; })}
              className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw size={12} /> Record again
            </button>
          </div>
        ) : (
          <div className="mb-5">
            <VoiceRecorder onSave={handleSave} tenseId={tId} />
          </div>
        )}

        {/* Navigation between prompts */}
        <div className="flex items-center justify-between gap-4">
          <button
            id="prev-prompt-btn"
            onClick={() => { setCurrentIdx((i) => Math.max(0, i - 1)); setShowSample(false); }}
            disabled={currentIdx === 0}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-muted text-foreground rounded-xl text-sm font-medium border border-border disabled:opacity-50 hover:bg-muted/80 transition-all"
          >
            <ChevronLeft size={14} /> Previous
          </button>

          {currentIdx < prompts.length - 1 ? (
            <button
              id="next-prompt-btn"
              onClick={() => { setCurrentIdx((i) => i + 1); setShowSample(false); }}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all"
            >
              Next Prompt <ChevronRight size={14} />
            </button>
          ) : (
            <Link
              id="complete-speaking-btn"
              href={`/tense/present/${tId}/writing`}
              onClick={handleComplete}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-500 text-white rounded-xl text-sm font-semibold hover:bg-emerald-600 transition-all"
            >
              Continue to Writing <ChevronRight size={14} />
            </Link>
          )}
        </div>

        <div className="flex items-center mt-6 pt-4 border-t border-border">
          <Link href={`/tense/present/${tId}/vocabulary`} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group">
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> Back to Vocabulary
          </Link>
        </div>
      </div>
    </main>
  );
}
