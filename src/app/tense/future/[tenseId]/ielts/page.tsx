'use client';

import { use, useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { StageProgressBar } from '@/components/ProgressIndicators';
import { useProgress } from '@/contexts/ProgressContext';
import type { TenseId } from '@/types';

const tenseNames: Partial<Record<TenseId, string>> = {
  simple: 'Present Simple',
  continuous: 'Present Continuous',
  perfect: 'Present Perfect',
  'perfect-continuous': 'Present Perfect Continuous',
  'future-simple': 'Future Simple',
  'future-continuous': 'Future Continuous',
  'future-perfect': 'Future Perfect',
  'future-perfect-continuous': 'Future Perfect Continuous',
};

// IELTS Context questions per tense (using the fill-blank questions with IELTS topics)
const ieltsContextData: Partial<Record<TenseId, {
  question: string;
  context: string;
  topic: string;
  correctAnswer: string;
  options: string[];
  explanation: string;
  ieltsTip: string;
}[]>> = {
  simple: [
    {
      question: 'Urban planning ______ a critical role in determining quality of life for millions of city dwellers worldwide.',
      context: 'IELTS Task 2 — A growing body of research explores the relationship between city design and resident well-being.',
      topic: 'Urban development',
      correctAnswer: 'plays',
      options: ['play', 'plays', 'is playing', 'has played'],
      explanation: '"Urban planning" is a singular noun phrase → "plays." General truth about a permanent role → Present Simple.',
      ieltsTip: '"X plays a critical/vital/key role in Y" is one of the most powerful sentence structures in IELTS Writing Task 2.',
    },
    {
      question: 'Research consistently ______ that access to quality education correlates strongly with long-term economic mobility.',
      context: 'IELTS Academic Reading — Education and Social Mobility',
      topic: 'Education',
      correctAnswer: 'shows',
      options: ['show', 'shows', 'is showing', 'has shown'],
      explanation: '"Research" is uncountable/singular → "shows." Established research findings → Present Simple.',
      ieltsTip: '"Research shows/indicates/suggests that..." is essential academic vocabulary for IELTS Writing Band 7+.',
    },
    {
      question: 'Many governments around the world ______ digital literacy as a core competency for the 21st-century workforce.',
      context: 'IELTS Task 2 — Technology and Education policy',
      topic: 'Technology',
      correctAnswer: 'consider',
      options: ['considers', 'consider', 'are considering', 'have considered'],
      explanation: '"Many governments" is plural → "consider" (base form, no -s).',
      ieltsTip: 'In IELTS Writing, using "consider X as Y" or "regard X as Y" shows academic sophistication.',
    },
    {
      question: 'The consumption of fossil fuels ______ the primary driver of climate change, according to the IPCC.',
      context: 'IELTS Task 2 — Environmental Science',
      topic: 'Environment',
      correctAnswer: 'remains',
      options: ['remain', 'remains', 'is remaining', 'remained'],
      explanation: '"The consumption of fossil fuels" — the key noun is "consumption" (singular) → "remains." A current established fact → Present Simple.',
      ieltsTip: '"X remains the primary/main/key driver of Y" is a sophisticated academic structure for IELTS writing.',
    },
    {
      question: 'In highly competitive job markets, interpersonal skills often ______ the deciding factor between otherwise equally qualified candidates.',
      context: 'IELTS Task 2 — Employment and Career Development',
      topic: 'Career development',
      correctAnswer: 'represent',
      options: ['represents', 'represent', 'are representing', 'have represented'],
      explanation: '"Interpersonal skills" is plural → "represent" (base form). General truth → Present Simple.',
      ieltsTip: 'Using "represent" instead of "are" or "is" shows lexical variety in IELTS academic writing.',
    },
  ],
  continuous: [
    {
      question: 'As the global population ______, the demand for sustainable food production systems ______ increasingly urgent.',
      context: 'IELTS Task 2 — Population and Food Security',
      topic: 'Environment',
      correctAnswer: 'is growing / becomes',
      options: ['grows / is becoming', 'is growing / becomes', 'is growing / is becoming', 'grows / becomes'],
      explanation: 'Simultaneous trend (population growing) + general fact becoming clearer → Present Continuous + Present Simple.',
      ieltsTip: 'Mixing Present Continuous and Present Simple in a single IELTS sentence demonstrates advanced grammatical range.',
    },
    {
      question: 'Remote working arrangements ______ the traditional office model, raising complex questions about productivity and work-life balance.',
      context: 'IELTS Task 2 — Technology and Workplace',
      topic: 'Work',
      correctAnswer: 'are transforming',
      options: ['transform', 'transforms', 'are transforming', 'have transformed'],
      explanation: 'Ongoing disruption of the traditional model → Present Continuous.',
      ieltsTip: '"X is transforming Y" is more dynamic than "X transforms Y" when describing current disruption in IELTS writing.',
    },
    {
      question: 'Climate scientists ______ increasingly alarming data about the rate at which polar ice caps are retreating.',
      context: 'IELTS Academic Reading — Climate Science',
      topic: 'Environment',
      correctAnswer: 'are recording',
      options: ['record', 'records', 'are recording', 'have recorded'],
      explanation: 'Ongoing scientific activity producing current evidence → Present Continuous.',
      ieltsTip: 'Using "are recording/observing/documenting" shows that the process is active and ongoing, strengthening IELTS arguments.',
    },
  ],
  perfect: [
    {
      question: 'In recent years, artificial intelligence ______ industries that were once considered immune to automation.',
      context: 'IELTS Task 2 — Technology and Employment',
      topic: 'Technology',
      correctAnswer: 'has disrupted',
      options: ['disrupts', 'has disrupted', 'is disrupting', 'disrupted'],
      explanation: '"In recent years" = unfinished period ending now → Present Perfect. "Artificial intelligence" is singular → "has."',
      ieltsTip: '"In recent years, X has + future participle" is one of the most effective IELTS Task 2 opening sentence structures.',
    },
    {
      question: 'Researchers at leading universities ______ compelling evidence linking sedentary behaviour to a range of chronic health conditions.',
      context: 'IELTS Academic Reading — Public Health',
      topic: 'Health',
      correctAnswer: 'have gathered',
      options: ['gather', 'gathers', 'have gathered', 'are gathering'],
      explanation: 'Accumulated research over time → Present Perfect. "Researchers" is plural → "have."',
      ieltsTip: '"Researchers have gathered/found/demonstrated compelling evidence that..." is a high-scoring IELTS evidence-citing structure.',
    },
    {
      question: 'The development of renewable energy technologies ______ new opportunities for economic development in previously energy-dependent regions.',
      context: 'IELTS Task 2 — Energy and Economics',
      topic: 'Environment',
      correctAnswer: 'has created',
      options: ['creates', 'is creating', 'has created', 'created'],
      explanation: 'Future development with ongoing present opportunities → Present Perfect. Singular "development" → "has."',
      ieltsTip: 'Present Perfect is the natural tense for describing developments that have created current conditions in IELTS writing.',
    },
  ],
  'perfect-continuous': [
    {
      question: 'Environmental activists ______ for stricter international agreements on carbon emissions for decades, yet meaningful progress ______ slow.',
      context: 'IELTS Task 2 — Climate Policy',
      topic: 'Environment',
      correctAnswer: 'have been advocating / has been',
      options: ['have advocated / is', 'have been advocating / has been', 'are advocating / is', 'have been advocating / is'],
      explanation: 'Duration emphasis for advocacy → Perfect Continuous. "Progress" (singular) + ongoing state → "has been."',
      ieltsTip: 'Combining Perfect Continuous + Present Perfect/Simple in one sentence shows high grammatical range for IELTS Band 8.',
    },
    {
      question: 'Scientists ______ the link between processed food consumption and rising obesity rates for several decades, with concerning results.',
      context: 'IELTS Academic Reading — Public Health Research',
      topic: 'Health',
      correctAnswer: 'have been investigating',
      options: ['investigate', 'have investigated', 'have been investigating', 'are investigating'],
      explanation: '"For several decades" = duration of ongoing research → Perfect Continuous.',
      ieltsTip: '"Scientists have been investigating X for several decades" is an authoritative, academic-sounding IELTS structure.',
    },
    {
      question: 'The quality of air in many megacities ______ due to a combination of industrial growth, vehicle emissions, and inadequate regulation.',
      context: 'IELTS Task 2 — Urban Environment',
      topic: 'Environment',
      correctAnswer: 'has been deteriorating',
      options: ['deteriorates', 'has deteriorated', 'has been deteriorating', 'is deteriorating'],
      explanation: 'Ongoing gradual deterioration from the future to now, with emphasis on the process → Perfect Continuous.',
      ieltsTip: '"X has been deteriorating/worsening/declining" — using Perfect Continuous shows the process is both long-term and ongoing in IELTS.',
    },
  ],
  // ─── Future tense IELTS context questions ───────────────────────────────
  'future-simple': [
    {
      question: 'Carbon dioxide emissions ______ by 15% between 2000 and 2010, according to the environmental report.',
      context: 'IELTS Task 1 — Environmental Data',
      topic: 'Environment',
      correctAnswer: 'fell',
      options: ['fall', 'fell', 'have fallen', 'had fallen'],
      explanation: '"Between 2000 and 2010" = specific finished future period. Use Future Simple: fell.',
      ieltsTip: '"Fell" is essential IELTS vocabulary for describing decreases in future data. Never use Present Perfect with specific future time expressions.',
    },
    {
      question: 'The researchers ______ their findings in a peer-reviewed journal in 2019, which ______ significant attention from the scientific community.',
      context: 'IELTS Academic — Research Reporting',
      topic: 'Science',
      correctAnswer: 'published / attracted',
      options: ['publish / attract', 'published / attracted', 'published / has attracted', 'have published / attracted'],
      explanation: '"In 2019" pins both events in the future. Both use Future Simple: published, attracted.',
      ieltsTip: 'When reporting research findings from a specific future year, always use Future Simple.',
    },
    {
      question: 'IELTS Task 1 — The graph covers 1990-2020. Which sentence is correct?',
      context: 'IELTS Writing Task 1 — Graph Description',
      topic: 'Data Analysis',
      correctAnswer: 'In 2000, the proportion of urban dwellers reached 45%, having risen from 30% in 1990.',
      options: [
        'In 2000, the proportion of urban dwellers has reached 45%, having risen from 30% in 1990.',
        'In 2000, the proportion of urban dwellers reached 45%, having risen from 30% in 1990.',
        'In 2000, the proportion of urban dwellers was reaching 45%, having risen from 30% in 1990.',
        'In 2000, the proportion of urban dwellers had reached 45%, having risen from 30% in 1990.',
      ],
      explanation: '"In 2000" = specific future year. Future Simple (reached) is correct. "Having risen" = perfect participle for prior change.',
      ieltsTip: 'For IELTS Task 1 with future data, use Future Simple consistently. Avoid Present Perfect with specific future years.',
    },
  ],
  'future-continuous': [
    {
      question: 'At the time of the economic crash, thousands of workers ______ their jobs, while companies ______ to cut costs.',
      context: 'IELTS Task 2 — Economic Crisis',
      topic: 'Economics',
      correctAnswer: 'were losing / were attempting',
      options: ['lost / attempted', 'were losing / were attempting', 'were losing / attempted', 'lost / were attempting'],
      explanation: '"At the time of the crash" = specific future moment. Simultaneous ongoing conditions → Future Continuous + Future Continuous.',
      ieltsTip: 'Future Continuous is effective in IELTS Task 2 for showing simultaneous ongoing conditions during a future event.',
    },
    {
      question: 'While environmental scientists ______ the long-term effects of pollution, policymakers ______ to act on their recommendations.',
      context: 'IELTS Task 2 — Environment and Policy',
      topic: 'Environment',
      correctAnswer: 'were documenting / were failing',
      options: ['documented / failed', 'were documenting / were failing', 'were documenting / failed', 'documented / were failing'],
      explanation: 'Two simultaneous ongoing situations in the future: "While + Future Continuous, Future Continuous" shows contrast.',
      ieltsTip: '"While scientists were..., policymakers were..." is a powerful IELTS Task 2 contrast structure.',
    },
    {
      question: 'Which sentence correctly uses Future Continuous in an IELTS Task 2 argument?',
      context: 'IELTS Task 2 — Grammar Choice',
      topic: 'Grammar',
      correctAnswer: 'During the 1990s, inequality was widening as globalisation disrupted traditional labour markets.',
      options: [
        'During the 1990s, inequality widened as globalisation disrupted traditional labour markets.',
        'During the 1990s, inequality was widening as globalisation disrupted traditional labour markets.',
        'During the 1990s, inequality has been widening as globalisation disrupted traditional labour markets.',
        'During the 1990s, inequality had been widening as globalisation disrupted traditional labour markets.',
      ],
      explanation: '"Was widening" = Future Continuous for ongoing gradual trend. "Disrupted" = Future Simple for the precipitating event.',
      ieltsTip: 'Use Future Continuous for ongoing gradual trends at a specific future period; Future Simple for events that caused or coincided with them.',
    },
  ],
  'future-perfect': [
    {
      question: 'By the time international organisations ______ the severity of the famine, millions ______ already displaced.',
      context: 'IELTS Task 2 — Humanitarian Crisis',
      topic: 'Social Issues',
      correctAnswer: 'recognised / had been',
      options: ['recognised / were', 'recognised / had been', 'had recognised / were', 'recognised / have been'],
      explanation: '"By the time...recognised" = reference point (Future Simple). Displacement before that → Future Perfect: "had been displaced".',
      ieltsTip: '"By the time" + Future Simple → Future Perfect for the earlier event. This is a key IELTS grammar structure.',
    },
    {
      question: 'Which sentence uses Future Perfect correctly in an IELTS Task 2 context?',
      context: 'IELTS Task 2 — Historical Analysis',
      topic: 'History',
      correctAnswer: 'By the mid-twentieth century, industrialisation had fundamentally altered the economic landscape of most developed nations.',
      options: [
        'By the mid-twentieth century, industrialisation fundamentally altered the economic landscape of most developed nations.',
        'By the mid-twentieth century, industrialisation had fundamentally altered the economic landscape of most developed nations.',
        'By the mid-twentieth century, industrialisation has fundamentally altered the economic landscape of most developed nations.',
        'By the mid-twentieth century, industrialisation was fundamentally altering the economic landscape of most developed nations.',
      ],
      explanation: '"By the mid-twentieth century" = reference point. The alteration completed before then → Future Perfect: "had altered".',
      ieltsTip: '"By" + future year/period → Future Perfect is a Band 7+ grammatical structure in IELTS.',
    },
    {
      question: 'The report found that many governments ______ action despite repeated scientific warnings, which ______ to the severity of the crisis.',
      context: 'IELTS Task 2 — Climate Action',
      topic: 'Environment',
      correctAnswer: 'had failed to take / contributed',
      options: ['failed to take / contributed', 'had failed to take / contributed', 'had failed to take / had contributed', 'failed to take / had contributed'],
      explanation: 'Failing to take action is the prior cause → Future Perfect. Contributing to the crisis = the result at the main future level → Future Simple.',
      ieltsTip: 'In academic IELTS essays about causes, Future Perfect for the root cause and Future Simple for the immediate result is a high-scoring structure.',
    },
  ],
  'future-perfect-continuous': [
    {
      question: 'By the time the company declared bankruptcy, it ______ significant losses for nearly a decade.',
      context: 'IELTS Task 2 — Business Failure',
      topic: 'Economics',
      correctAnswer: 'had been accumulating',
      options: ['accumulated', 'had accumulated', 'had been accumulating', 'was accumulating'],
      explanation: '"For nearly a decade" = long duration. "By the time it declared" = reference point. PPC: had been accumulating.',
      ieltsTip: 'PPC + "for" + duration + "by the time" = a highly precise IELTS grammatical combination that shows Band 8 range.',
    },
    {
      question: "Which sentence is grammatically most accurate for IELTS?\\n\\\"The poverty rate dropped dramatically in 2010. Before that, poverty had been increasing for many years.\\\"",
      context: 'IELTS Task 2 — Poverty Reduction',
      topic: 'Social Issues',
      correctAnswer: 'After years during which poverty had been rising steadily, the introduction of targeted welfare programmes in 2010 finally reversed the trend.',
      options: [
        'After years when poverty rose steadily, the introduction of targeted welfare programmes in 2010 finally reversed the trend.',
        'After years during which poverty had been rising steadily, the introduction of targeted welfare programmes in 2010 finally reversed the trend.',
        'After years during which poverty was rising steadily, the introduction of targeted welfare programmes in 2010 finally reversed the trend.',
        'After years during which poverty has been rising steadily, the introduction of targeted welfare programmes in 2010 finally reversed the trend.',
      ],
      explanation: '"Had been rising" = PPC for the ongoing process before the reversal. "Reversed" = Future Simple for the event in 2010.',
      ieltsTip: 'PPC is the most precise way to describe an ongoing prior trend before a future turning point in IELTS Task 2.',
    },
    {
      question: 'The environmental degradation ______ for so long that by the time authorities ______, the damage was irreversible.',
      context: 'IELTS Task 2 — Environmental Damage',
      topic: 'Environment',
      correctAnswer: 'had been occurring / acted',
      options: ['occurred / acted', 'had been occurring / acted', 'had been occurring / had acted', 'was occurring / acted'],
      explanation: '"Had been occurring for so long" = PPC for duration. "By the time authorities acted" = reference point (Future Simple).',
      ieltsTip: '"Had been occurring/declining/worsening for so long before..." is a powerful IELTS academic phrase.',
    },
  ],
};

export default function IELTSPage({ params }: { params: Promise<{ tenseId: string }> }) {
  const { tenseId } = use(params);
  const { progress, completeStage } = useProgress();
  const tId = tenseId as TenseId;
  const questions = ieltsContextData[tId] ?? [];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [answered, setAnswered] = useState(false);
  const [results, setResults] = useState<{ correct: boolean }[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const question = questions[currentIdx];
  const tenseProgress = progress.tenses[tId];

  const handleSubmit = () => {
    if (answered || !selectedAnswer) return;
    const isCorrect = selectedAnswer === question.correctAnswer;
    setAnswered(true);
    setResults((prev) => [...prev, { correct: isCorrect }]);
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((i) => i + 1);
      setSelectedAnswer('');
      setAnswered(false);
    } else {
      setIsFinished(true);
      const correctCount = results.filter((r) => r.correct).length;
      const accuracy = Math.round((correctCount / questions.length) * 100);
      completeStage(tId, 'ielts', correctCount, accuracy);
    }
  };

  if (isFinished) {
    const correctCount = results.filter((r) => r.correct).length;
    return (
      <main className="min-h-screen hero-gradient flex items-center justify-center px-4 py-16">
        <ThemeToggle />
        <div className="w-full max-w-xl animate-scale-in">
          <div className="glass-card rounded-3xl p-10 border border-border text-center">
            <div className="text-6xl mb-4">🎓</div>
            <h1 className="text-3xl font-bold text-foreground mb-2">IELTS Context Complete!</h1>
            <p className="text-muted-foreground mb-8">{tenseNames[tId]}</p>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-muted rounded-2xl p-4">
                <p className="text-2xl font-bold">{correctCount}/{results.length}</p>
                <p className="text-xs text-muted-foreground">Correct</p>
              </div>
              <div className="bg-secondary/10 rounded-2xl p-4">
                <p className="text-2xl font-bold text-secondary dark:text-secondary">
                  {Math.round((correctCount / results.length) * 100)}%
                </p>
                <p className="text-xs text-muted-foreground">Accuracy</p>
              </div>
            </div>
            <Link
              id="continue-to-vocab-btn"
              href={`/tense/future/${tId}/vocabulary`}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              Continue to Vocabulary <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!question) return null;

  return (
    <main className="min-h-screen hero-gradient px-4 py-16">
      <ThemeToggle />
      <div className="w-full max-w-2xl mx-auto animate-fade-in-up">

        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 flex-wrap">
          <Link href="/tense/future" className="hover:text-foreground transition-colors">Future</Link>
          <ChevronRight size={14} />
          <Link href={`/tense/future/${tId}`} className="hover:text-foreground transition-colors">{tenseNames[tId]}</Link>
          <ChevronRight size={14} />
          <span className="text-foreground font-medium">IELTS Context</span>
        </div>

        <div className="mb-6">
          <StageProgressBar currentStage="ielts" completedStages={tenseProgress?.stages ?? {}} />
        </div>

        {/* IELTS badge */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-xs font-bold text-secondary dark:text-secondary bg-secondary/10 border border-secondary/20 px-3 py-1.5 rounded-full">
            🎓 IELTS-Style Practice — Not an official IELTS test
          </span>
          <span className="text-xs text-muted-foreground">{currentIdx + 1}/{questions.length}</span>
        </div>

        <div className="glass-card rounded-3xl p-7 border border-secondary/20 mb-4">
          {/* Context */}
          <div className="mb-4 p-3 bg-secondary/5 border border-secondary/15 rounded-xl">
            <p className="text-xs font-semibold text-secondary dark:text-secondary mb-1">📄 Context</p>
            <p className="text-xs text-muted-foreground">{question.context}</p>
          </div>

          {/* Topic */}
          <p className="text-xs font-medium text-primary mb-3">🏷️ {question.topic}</p>

          {/* Question */}
          <p className="text-base font-semibold text-foreground leading-relaxed mb-6">{question.question}</p>

          {/* Options */}
          <div className="space-y-3 mb-4">
            {question.options.map((opt, i) => {
              const label = ['A', 'B', 'C', 'D'][i];
              const isSelected = selectedAnswer === opt;
              const isCorrectOpt = opt === question.correctAnswer;
              let cls = 'border-border bg-card text-foreground hover:border-secondary/40';
              if (answered) {
                if (isCorrectOpt) cls = 'border-secondary bg-secondary/10 text-secondary dark:text-secondary';
                else if (isSelected) cls = 'border-primary bg-primary/10 text-primary dark:text-primary';
                else cls = 'border-border bg-muted text-muted-foreground';
              } else if (isSelected) {
                cls = 'border-secondary bg-secondary/10 text-secondary dark:text-secondary';
              }
              return (
                <button
                  id={`ielts-opt-${i}`}
                  key={opt}
                  onClick={() => { if (!answered) setSelectedAnswer(opt); }}
                  disabled={answered}
                  className={`w-full flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all duration-200 ${cls} ${!answered ? 'cursor-pointer hover:scale-[1.01]' : 'cursor-default'}`}
                >
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-lg shrink-0 mt-0.5 ${
                    answered && isCorrectOpt ? 'bg-secondary text-white' :
                    answered && isSelected ? 'bg-primary text-white' :
                    isSelected ? 'bg-secondary text-white' : 'bg-muted text-muted-foreground'
                  }`}>{label}</span>
                  <span className="text-sm">{opt}</span>
                </button>
              );
            })}
          </div>

          <div className="flex gap-3">
            {!answered ? (
              <button
                id="submit-ielts-btn"
                onClick={handleSubmit}
                disabled={!selectedAnswer}
                className="flex-1 py-3 bg-secondary text-white rounded-xl font-semibold disabled:opacity-50 hover:bg-secondary transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Check Answer
              </button>
            ) : (
              <button
                id="next-ielts-btn"
                onClick={handleNext}
                className="flex-1 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {currentIdx < questions.length - 1 ? 'Next Question' : 'See Results'} <ChevronRight size={16} />
              </button>
            )}
          </div>
        </div>

        {answered && (
          <div className={`glass-card rounded-3xl p-6 border animate-scale-in ${
            selectedAnswer === question.correctAnswer ? 'border-secondary/30 bg-secondary/5' : 'border-primary/30 bg-primary/5'
          }`}>
            <h3 className={`font-bold mb-3 ${selectedAnswer === question.correctAnswer ? 'text-secondary dark:text-secondary' : 'text-primary dark:text-primary'}`}>
              {selectedAnswer === question.correctAnswer ? '✅ Excellent!' : `❌ Correct Answer: ${question.correctAnswer}`}
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-primary/5 border border-primary/10 rounded-xl">
                <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Explanation</p>
                <p className="text-sm text-foreground leading-relaxed">{question.explanation}</p>
              </div>
              <div className="p-3 bg-secondary/5 border border-secondary/15 rounded-xl">
                <p className="text-xs font-semibold text-secondary dark:text-secondary uppercase tracking-wider mb-1">🎓 IELTS Tip</p>
                <p className="text-sm text-secondary dark:text-secondary leading-relaxed">{question.ieltsTip}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center mt-6 pt-4 border-t border-border">
          <Link href={`/tense/future/${tId}/errors`} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors group">
            <ChevronLeft size={16} className="group-hover:-translate-x-0.5 transition-transform" /> Back
          </Link>
        </div>
      </div>
    </main>
  );
}
