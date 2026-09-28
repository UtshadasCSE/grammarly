'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { ChevronRight, ChevronLeft, CheckCircle2, XCircle, Lightbulb, Trophy, AlertCircle } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { LinearProgress } from '@/components/ProgressIndicators';
import { useProgress } from '@/contexts/ProgressContext';
import { beginnerQuestions } from '@/data/ielts/beginner';
import { intermediateQuestions } from '@/data/ielts/intermediate';
import { advancedQuestions } from '@/data/ielts/advanced';
import type { IELTSQuestion } from '@/types';

export default function IELTSLevelPage({ params }: { params: { level: string } }) {
  const router = useRouter();
  const level = params.level as 'beginner' | 'intermediate' | 'advanced';
  
  let allQuestions: IELTSQuestion[] = [];
  if (level === 'beginner') allQuestions = beginnerQuestions;
  if (level === 'intermediate') allQuestions = intermediateQuestions;
  if (level === 'advanced') allQuestions = advancedQuestions;

  const { progress, updateIELTSLevel, logIELTSError, addXP } = useProgress();
  const mastery = progress.ieltsMastery;
  const levelProgress = mastery?.[level];
  
  // State
  const [currentIndex, setCurrentIndex] = useState(levelProgress?.questionsCompleted || 0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [textAnswer, setTextAnswer] = useState('');
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  
  const question = allQuestions[currentIndex];
  const isCompleted = currentIndex >= allQuestions.length;

  useEffect(() => {
    if (!allQuestions.length) router.push('/tense/mixed');
  }, [allQuestions, router]);

  if (!question && !isCompleted) return null;

  const handleNext = () => {
    if (currentIndex < allQuestions.length - 1) {
      setCurrentIndex(curr => curr + 1);
      resetState();
    } else {
      setCurrentIndex(curr => curr + 1);
      updateIELTSLevel(level, { completed: true });
    }
  };

  const resetState = () => {
    setSelectedAnswer(null);
    setTextAnswer('');
    setHasSubmitted(false);
    setIsCorrect(false);
    setShowHint(false);
    setHintUsed(false);
  };

  const checkAnswer = (userAnswer: string) => {
    if (hasSubmitted) return;
    const correct = userAnswer.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase();
    
    setIsCorrect(correct);
    setHasSubmitted(true);

    if (correct) {
      addXP(hintUsed ? 7 : 10);
      updateIELTSLevel(level, {
        questionsCompleted: currentIndex + 1,
        correctAnswers: (levelProgress?.correctAnswers || 0) + 1,
        hintsUsed: (levelProgress?.hintsUsed || 0) + (hintUsed ? 1 : 0),
        score: (levelProgress?.score || 0) + (hintUsed ? 7 : 10)
      });
    } else {
      updateIELTSLevel(level, {
        questionsCompleted: currentIndex + 1,
        incorrectAnswers: (levelProgress?.incorrectAnswers || 0) + 1,
        hintsUsed: (levelProgress?.hintsUsed || 0) + (hintUsed ? 1 : 0),
      });
      logIELTSError(question.id, userAnswer);
    }
  };

  const handleRevealHint = () => {
    setShowHint(true);
    setHintUsed(true);
  };

  if (isCompleted) {
    const totalQ = allQuestions.length;
    const correct = levelProgress?.correctAnswers || 0;
    const accuracy = Math.round((correct / totalQ) * 100);
    
    return (
      <main className="min-h-screen hero-gradient flex flex-col items-center justify-center p-4">
        <ThemeToggle />
        <div 
          
          
          className="glass-card rounded-3xl p-8 max-w-lg w-full text-center"
        >
          <div className="mx-auto w-20 h-20 bg-secondary/10 text-secondary rounded-full flex items-center justify-center mb-6">
            <Trophy size={40} />
          </div>
          <h1 className="text-3xl font-black text-foreground mb-2">Level Complete!</h1>
          <p className="text-muted-foreground mb-8">You have mastered the {level} stage.</p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-background/50 rounded-xl p-4 border border-border">
              <p className="text-sm text-muted-foreground mb-1">Accuracy</p>
              <p className="text-2xl font-bold text-foreground">{accuracy}%</p>
            </div>
            <div className="bg-background/50 rounded-xl p-4 border border-border">
              <p className="text-sm text-muted-foreground mb-1">XP Earned</p>
              <p className="text-2xl font-bold text-primary">+{levelProgress?.score || 0}</p>
            </div>
            <div className="bg-background/50 rounded-xl p-4 border border-border">
              <p className="text-sm text-muted-foreground mb-1">Hints Used</p>
              <p className="text-2xl font-bold text-foreground">{levelProgress?.hintsUsed || 0}</p>
            </div>
            <div className="bg-background/50 rounded-xl p-4 border border-border">
              <p className="text-sm text-muted-foreground mb-1">Correct</p>
              <p className="text-2xl font-bold text-secondary">{correct}/{totalQ}</p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => router.push('/tense/mixed')}
              className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
            >
              Continue to IELTS Mastery <ChevronRight size={20} />
            </button>
            <button
              onClick={() => router.push('/tense/mixed/review')}
              className="w-full bg-background border border-border py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-muted transition-colors"
            >
              Review Mistakes
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen hero-gradient flex flex-col items-center py-12 px-4">
      <ThemeToggle />
      
      <div className="w-full max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => router.push('/tense/mixed')}
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft size={20} /> Back
          </button>
          
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
              <Trophy size={14} /> {progress.totalXP || 0} XP
            </div>
            <div className="text-sm font-medium text-muted-foreground">
              {currentIndex + 1} / {allQuestions.length}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <LinearProgress 
            value={Math.round((currentIndex / allQuestions.length) * 100)} 
          />
        </div>

        
          <div
            key={currentIndex}
            
            
            
            
            className="glass-card rounded-3xl p-6 sm:p-10 border border-border shadow-xl shadow-primary/5"
          >
            <div className="mb-8">
              <span className="inline-block px-3 py-1 bg-accent/10 text-accent border border-accent/20 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                {question.tense.replace(/-/g, ' ')}
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-foreground leading-snug">
                {question.question}
              </h2>
            </div>

            {/* Answer Options */}
            {question.type === 'multiple-choice' ? (
              <div className="space-y-3 mb-8">
                {question.options?.map((opt, i) => {
                  const isSelected = selectedAnswer === opt;
                  const isCorrectAnswer = opt === question.correctAnswer;
                  
                  let stateClass = "bg-background border-border hover:border-primary/50 hover:bg-primary/5";
                  if (hasSubmitted) {
                    if (isCorrectAnswer) stateClass = "bg-secondary/10 border-secondary text-secondary dark:text-secondary";
                    else if (isSelected) stateClass = "bg-primary/10 border-primary text-primary dark:text-primary";
                    else stateClass = "bg-background border-border opacity-50";
                  } else if (isSelected) {
                    stateClass = "bg-primary/10 border-primary text-primary";
                  }

                  return (
                    <button
                      key={i}
                      disabled={hasSubmitted}
                      onClick={() => {
                        setSelectedAnswer(opt);
                        checkAnswer(opt);
                      }}
                      className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 font-medium ${stateClass} flex items-center justify-between`}
                    >
                      <span>{opt}</span>
                      {hasSubmitted && isCorrectAnswer && <CheckCircle2 className="text-secondary shrink-0" />}
                      {hasSubmitted && isSelected && !isCorrectAnswer && <XCircle className="text-primary shrink-0" />}
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="mb-8">
                <textarea
                  disabled={hasSubmitted}
                  value={textAnswer}
                  onChange={(e) => setTextAnswer(e.target.value)}
                  placeholder="Type your answer here..."
                  className="w-full bg-background border-2 border-border focus:border-primary rounded-2xl p-5 min-h-[120px] outline-none transition-colors resize-none disabled:opacity-70"
                />
                {!hasSubmitted && (
                  <button
                    onClick={() => checkAnswer(textAnswer)}
                    disabled={!textAnswer.trim()}
                    className="mt-4 w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold disabled:opacity-50"
                  >
                    Check Answer
                  </button>
                )}
                {hasSubmitted && (
                  <div className="mt-4 p-5 rounded-2xl bg-primary/10 border border-primary/20">
                    <p className="text-sm font-semibold text-primary mb-1">Model Answer / Correct Form:</p>
                    <p className="text-foreground font-medium">{question.correctAnswer}</p>
                  </div>
                )}
              </div>
            )}

            {/* Hint System */}
            {!hasSubmitted && question.hint1 && (
              <div className="mb-6">
                {!showHint ? (
                  <button 
                    onClick={handleRevealHint}
                    className="flex items-center gap-2 text-sm font-medium text-secondary hover:text-secondary transition-colors"
                  >
                    <Lightbulb size={16} /> Show Hint (Costs 3 XP)
                  </button>
                ) : (
                  <div className="p-4 bg-secondary/10 border border-secondary/20 rounded-xl flex items-start gap-3">
                    <Lightbulb size={20} className="text-secondary shrink-0 mt-0.5" />
                    <p className="text-sm text-secondary dark:text-secondary font-medium">
                      {question.hint1}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Explanation & Next */}
            {hasSubmitted && (
              <div 
                
                
                className="pt-6 border-t border-border"
              >
                <div className="flex items-start gap-3 mb-6">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0 mt-0.5">
                    <AlertCircle size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground mb-1">Explanation</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {question.explanation}
                    </p>
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-primary/90 transition-colors"
                >
                  {currentIndex < allQuestions.length - 1 ? 'Next Question' : 'Complete Level'} <ChevronRight size={20} />
                </button>
              </div>
            )}
          </div>
        
      </div>
    </main>
  );
}
