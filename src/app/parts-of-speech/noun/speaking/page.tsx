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
  ChevronDown,
  ChevronUp,
  Sparkles,
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar } from '@/components/ProgressIndicators';
import { useProgress } from '@/contexts/ProgressContext';
import { nounSpeakingPrompts } from '@/data/parts-of-speech/noun';

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
        <div className="flex items-center gap-3 mb-4 p-3 bg-primary/5 border border-primary/20 rounded-xl">
          <div className="animate-recording w-3 h-3 bg-primary rounded-full" />
          <div className="recording-wave text-primary">
            <span /><span /><span /><span /><span />
          </div>
          <span className="text-primary font-mono text-sm font-bold">
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
            id="start-noun-recording-btn"
            onClick={startRecording}
            className="flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary hover:scale-105 active:scale-95 transition-all"
          >
            <Mic size={16} /> Start Recording
          </button>
        )}

        {recordingState === 'recording' && (
          <>
            <button
              id="pause-noun-recording-btn"
              onClick={pauseRecording}
              className="flex items-center gap-2 px-4 py-3 bg-secondary text-white rounded-xl font-semibold hover:bg-secondary transition-all"
            >
              <Pause size={15} /> Pause
            </button>
            <button
              id="stop-noun-recording-btn"
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
              id="resume-noun-recording-btn"
              onClick={resumeRecording}
              className="flex items-center gap-2 px-4 py-3 bg-secondary text-white rounded-xl font-semibold hover:bg-secondary transition-all"
            >
              <Play size={15} /> Resume
            </button>
            <button
              id="stop-noun-paused-btn"
              onClick={stopRecording}
              className="flex items-center gap-2 px-4 py-3 bg-foreground text-background rounded-xl font-semibold hover:opacity-80 transition-all"
            >
              <Square size={15} /> Stop
            </button>
          </>
        )}
      </div>

      {recordingState === 'stopped' && recording && (
        <div className="mt-4 space-y-3 animate-scale-in">
          <div className="p-3 bg-secondary/5 border border-secondary/20 rounded-xl">
            <p className="text-xs font-semibold text-secondary dark:text-secondary mb-2">
              ▶ Preview Recording ({formatTime(recording.duration)})
            </p>
            <audio id="noun-audio-preview" controls src={recording.url} className="w-full h-10" />
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              id="re-record-noun-btn"
              onClick={deleteRecording}
              className="flex items-center gap-2 px-4 py-2.5 bg-muted text-foreground rounded-xl text-sm font-medium hover:bg-muted/80 border border-border transition-all"
            >
              <RotateCcw size={14} /> Re-record
            </button>
            <button
              id="delete-noun-recording-btn"
              onClick={deleteRecording}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary/10 text-primary rounded-xl text-sm font-medium border border-primary/20 hover:bg-primary/20 transition-all"
            >
              <Trash2 size={14} /> Delete
            </button>
            <button
              id="save-noun-recording-btn"
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2.5 bg-secondary text-white rounded-xl text-sm font-semibold hover:bg-secondary transition-all"
            >
              <Save size={14} /> Save Response
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function NounSpeakingPage() {
  const { getPartOfSpeechProgress, completePartOfSpeechStage, incrementPartOfSpeechSpeaking } = useProgress();
  const prompts = nounSpeakingPrompts;
  const nounProgress = getPartOfSpeechProgress('noun');

  const [currentIdx, setCurrentIdx] = useState(0);
  const [savedRecordings, setSavedRecordings] = useState<Map<number, Recording>>(new Map());
  const [showSample, setShowSample] = useState(false);

  const prompt = prompts[currentIdx];

  const handleSave = useCallback((recording: Recording) => {
    setSavedRecordings((prev) => new Map(prev).set(currentIdx, recording));
    incrementPartOfSpeechSpeaking('noun');
  }, [currentIdx, incrementPartOfSpeechSpeaking]);

  const handleComplete = () => {
    completePartOfSpeechStage(
      'noun',
      'speaking',
      savedRecordings.size,
      Math.round((savedRecordings.size / Math.max(prompts.length, 1)) * 100)
    );
  };

  if (!prompt) return null;

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
          <span className="text-foreground font-medium">Speaking</span>
        </div>

        <div className="mb-6">
          <StageProgressBar currentStage="speaking" completedStages={nounProgress?.stages ?? {}} />
        </div>

        {/* Prompt Selector Pills */}
        <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
          {prompts.map((_, i) => (
            <button
              key={i}
              id={`noun-speaking-prompt-${i}`}
              onClick={() => { setCurrentIdx(i); setShowSample(false); }}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === currentIdx
                  ? 'bg-primary w-8'
                  : savedRecordings.has(i)
                  ? 'bg-secondary w-4'
                  : 'bg-muted w-4'
              }`}
            />
          ))}
          <span className="ml-2 text-xs text-muted-foreground shrink-0">{currentIdx + 1}/{prompts.length}</span>
        </div>

        {/* Prompt Card */}
        <div className="glass-card rounded-3xl p-7 border border-border mb-5">
          <div className="flex items-center gap-2 mb-4 flex-wrap">
            <span className="text-xs font-bold text-primary bg-primary/10 border border-primary/20 px-3 py-1 rounded-full">
              Stage {prompt.stage} — {prompt.level.replace('-', ' ').toUpperCase()}
            </span>
            {prompt.duration && (
              <span className="text-xs text-muted-foreground bg-muted px-2.5 py-1 rounded-full border border-border">
                ⏱ Target: {prompt.duration}s
              </span>
            )}
          </div>

          <p className="text-base font-semibold text-foreground leading-relaxed mb-4 whitespace-pre-line">
            {prompt.prompt}
          </p>

          {/* Target Grammar */}
          <div className="p-3 bg-primary/5 border border-primary/10 rounded-xl mb-3">
            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">🎯 Target Noun Grammar</p>
            <p className="text-sm text-foreground">{prompt.targetGrammar}</p>
          </div>

          {/* Target Useful Vocabulary */}
          {prompt.targetNouns && prompt.targetNouns.length > 0 && (
            <div className="p-3 bg-secondary/5 border border-secondary/15 rounded-xl mb-3">
              <p className="text-xs font-bold text-secondary uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Sparkles size={12} /> Useful Academic Nouns
              </p>
              <div className="flex flex-wrap gap-1.5">
                {prompt.targetNouns.map((word) => (
                  <span key={word} className="text-xs bg-secondary/10 text-secondary px-2.5 py-0.5 rounded-full font-medium">
                    {word}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Sentence Starter Hint */}
          {prompt.hintStarter && (
            <div className="p-3 bg-muted rounded-xl mb-3">
              <p className="text-xs font-semibold text-muted-foreground mb-1">💡 Sentence Starter</p>
              <p className="text-sm text-foreground italic">"{prompt.hintStarter}"</p>
            </div>
          )}

          {/* Sample answer toggle */}
          {prompt.sampleAnswer && (
            <div>
              <button
                id="toggle-noun-speaking-sample-btn"
                onClick={() => setShowSample(!showSample)}
                className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors my-2"
              >
                {showSample ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                {showSample ? 'Hide' : 'Show'} Band 8+ Sample Response
              </button>
              {showSample && (
                <div className="p-4 bg-muted rounded-xl border border-border animate-scale-in mt-2">
                  <p className="text-xs font-bold text-muted-foreground mb-2">📝 Model Band 8+ Response</p>
                  <p className="text-sm text-foreground leading-relaxed italic">{prompt.sampleAnswer}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Voice Recorder & Practice Feedback */}
        {savedRecordings.has(currentIdx) ? (
          <div className="glass-card rounded-2xl p-5 border border-secondary/20 bg-secondary/5 mb-5">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold text-secondary">✅ Recording Saved!</p>
              <span className="text-xs text-muted-foreground">{formatTime(savedRecordings.get(currentIdx)!.duration)}</span>
            </div>
            <audio
              id={`noun-saved-audio-${currentIdx}`}
              controls
              src={savedRecordings.get(currentIdx)!.url}
              className="w-full h-10 mb-3"
            />

            {/* Practice Feedback Banner */}
            <div className="p-3.5 bg-card border border-border rounded-xl mb-3">
              <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">
                🎙️ Practice Feedback
              </p>
              <p className="text-xs text-foreground leading-relaxed">
                Great job completing this speaking prompt! Compare your recorded answer with the model response above. Ensure you used target noun phrases, observed countable/uncountable rules (e.g. no "advices" or "equipments"), and maintained natural flow.
              </p>
            </div>

            <button
              id="re-record-noun-prompt-btn"
              onClick={() =>
                setSavedRecordings((prev) => {
                  const next = new Map(prev);
                  next.delete(currentIdx);
                  return next;
                })
              }
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <RotateCcw size={12} /> Record again
            </button>
          </div>
        ) : (
          <div className="mb-5">
            <VoiceRecorder onSave={handleSave} />
          </div>
        )}

        {/* Navigation between prompts */}
        <div className="flex items-center justify-between gap-4">
          <button
            id="prev-noun-speaking-btn"
            onClick={() => { setCurrentIdx((i) => Math.max(0, i - 1)); setShowSample(false); }}
            disabled={currentIdx === 0}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-muted text-foreground rounded-xl text-sm font-medium border border-border disabled:opacity-50 hover:bg-muted/80 transition-all"
          >
            <ChevronLeft size={14} /> Previous Prompt
          </button>

          {currentIdx < prompts.length - 1 ? (
            <button
              id="next-noun-speaking-btn"
              onClick={() => { setCurrentIdx((i) => i + 1); setShowSample(false); }}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-semibold hover:bg-primary/90 transition-all"
            >
              Next Prompt <ChevronRight size={14} />
            </button>
          ) : (
            <Link
              id="complete-noun-speaking-btn"
              href="/parts-of-speech/noun/writing"
              onClick={handleComplete}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-secondary text-white rounded-xl text-sm font-semibold hover:bg-secondary/90 transition-all shadow-lg"
            >
              Continue to Writing <ChevronRight size={14} />
            </Link>
          )}
        </div>

        <div className="flex items-center mt-6 pt-4 border-t border-border">
          <Link href="/parts-of-speech/noun/vocabulary" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group">
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> Back to Vocabulary
          </Link>
        </div>
      </div>
    </main>
  );
}
