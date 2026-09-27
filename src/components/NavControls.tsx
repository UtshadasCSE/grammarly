'use client';

import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface NavControlsProps {
  backHref?: string;
  backLabel?: string;
  continueHref?: string;
  continueLabel?: string;
  onContinue?: () => void;
  continueDisabled?: boolean;
  className?: string;
}

export function NavControls({
  backHref,
  backLabel = 'Back',
  continueHref,
  continueLabel = 'Continue',
  onContinue,
  continueDisabled = false,
  className = '',
}: NavControlsProps) {
  return (
    <div className={`flex items-center justify-between mt-10 pt-6 border-t border-border ${className}`}>
      {backHref ? (
        <Link
          id="nav-back-btn"
          href={backHref}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200 group text-sm font-medium"
        >
          <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-200" />
          {backLabel}
        </Link>
      ) : (
        <div />
      )}

      {(continueHref || onContinue) && (
        <>
          {continueHref && !onContinue ? (
            <Link
              id="nav-continue-btn"
              href={continueDisabled ? '#' : continueHref}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 group ${
                continueDisabled
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-lg hover:shadow-primary/30'
              }`}
              onClick={continueDisabled ? (e) => e.preventDefault() : undefined}
            >
              {continueLabel}
              <ChevronRight size={16} className={`${!continueDisabled ? 'group-hover:translate-x-1' : ''} transition-transform duration-200`} />
            </Link>
          ) : (
            <button
              id="nav-continue-btn"
              onClick={onContinue}
              disabled={continueDisabled}
              className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-200 group ${
                continueDisabled
                  ? 'bg-muted text-muted-foreground cursor-not-allowed'
                  : 'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 active:scale-95 shadow-lg hover:shadow-primary/30'
              }`}
            >
              {continueLabel}
              <ChevronRight size={16} className={`${!continueDisabled ? 'group-hover:translate-x-1' : ''} transition-transform duration-200`} />
            </button>
          )}
        </>
      )}
    </div>
  );
}
