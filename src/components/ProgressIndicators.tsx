'use client';

import { CheckCircle, Lock, Circle } from 'lucide-react';
import type { StageId } from '@/types';

const STAGES: { id: StageId; label: string; short: string }[] = [
  { id: 'learn', label: 'Learn', short: 'L' },
  { id: 'practice', label: 'Practice', short: 'P' },
  { id: 'advanced', label: 'Advanced', short: 'A' },
  { id: 'errors', label: 'Errors', short: 'E' },
  { id: 'ielts', label: 'IELTS', short: 'I' },
  { id: 'vocabulary', label: 'Vocab', short: 'V' },
  { id: 'speaking', label: 'Speaking', short: 'S' },
  { id: 'writing', label: 'Writing', short: 'W' },
  { id: 'test', label: 'Test', short: 'T' },
];

interface StageProgressBarProps {
  currentStage: StageId;
  completedStages: Partial<Record<StageId, { completed: boolean }>>;
  tenseId?: string;
}

export function StageProgressBar({ currentStage, completedStages }: StageProgressBarProps) {
  return (
    <div className="w-full overflow-x-auto pb-2">
      <div className="flex items-center min-w-max mx-auto gap-0">
        {STAGES.map((stage, idx) => {
          const isCompleted = completedStages[stage.id]?.completed === true;
          const isCurrent = stage.id === currentStage;
          const isLocked = !isCompleted && !isCurrent && idx > STAGES.findIndex((s) => s.id === currentStage);

          return (
            <div key={stage.id} className="flex items-center">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    isCompleted
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                      : isCurrent
                      ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30 ring-2 ring-primary/30 ring-offset-2 ring-offset-background'
                      : isLocked
                      ? 'bg-muted text-muted-foreground'
                      : 'bg-secondary text-secondary-foreground'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle size={14} />
                  ) : isLocked ? (
                    <Lock size={12} />
                  ) : (
                    <span className="text-xs">{stage.short}</span>
                  )}
                </div>
                <span
                  className={`text-[10px] font-medium whitespace-nowrap transition-colors ${
                    isCurrent ? 'text-primary' : isCompleted ? 'text-emerald-500' : 'text-muted-foreground'
                  }`}
                >
                  {stage.label}
                </span>
              </div>
              {idx < STAGES.length - 1 && (
                <div
                  className={`h-0.5 w-6 mx-1 rounded-full transition-all duration-500 ${
                    isCompleted ? 'bg-emerald-500' : 'bg-border'
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface ProgressRingProps {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  color?: string;
  label?: string;
}

export function ProgressRing({
  progress,
  size = 80,
  strokeWidth = 6,
  color = 'var(--color-primary)',
  label,
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-border"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      {label && (
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
      )}
    </div>
  );
}

interface LinearProgressProps {
  value: number; // 0-100
  label?: string;
  showPercent?: boolean;
  colorClass?: string;
}

export function LinearProgress({
  value,
  label,
  showPercent = true,
  colorClass = 'bg-primary',
}: LinearProgressProps) {
  return (
    <div className="w-full space-y-1.5">
      {(label || showPercent) && (
        <div className="flex justify-between items-center text-sm">
          {label && <span className="text-muted-foreground font-medium">{label}</span>}
          {showPercent && (
            <span className="text-foreground font-semibold tabular-nums">{value}%</span>
          )}
        </div>
      )}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClass} rounded-full transition-all duration-700 ease-out progress-gradient`}
          style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
        />
      </div>
    </div>
  );
}
