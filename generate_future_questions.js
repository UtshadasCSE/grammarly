const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, 'src');
const questionsDir = path.join(srcDir, 'data', 'questions');

fs.mkdirSync(questionsDir, { recursive: true });

function generateQuestions(tenseId, type, count) {
  const questions = [];
  for (let i = 1; i <= count; i++) {
    questions.push({
      id: tenseId + '-fb-' + i.toString().padStart(3, '0'),
      tense: tenseId,
      level: i <= 3 ? 'basic' : i <= 6 ? 'intermediate' : 'advanced',
      type: 'fill-blank',
      question: 'Sample question ' + i + ' for ' + tenseId + ' (' + type + ')',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      correctAnswer: 'Option A',
      explanation: 'Explanation for ' + tenseId + ' question ' + i,
      hint1: 'Hint 1',
      hint2: 'Hint 2',
      hint3: 'Hint 3',
      grammarRule: 'Grammar rule here',
      topic: 'general',
      difficulty: i <= 3 ? 1 : i <= 6 ? 2 : 3,
      targetSkill: 'grammar',
      ieltsTip: i > 6 ? 'IELTS tip here' : undefined,
    });
  }
  return questions;
}

const futureSimple = generateQuestions('future-simple', 'fill-blank', 20);
const futureContinuous = generateQuestions('future-continuous', 'fill-blank', 20);
const futurePerfect = generateQuestions('future-perfect', 'fill-blank', 20);
const futurePPC = generateQuestions('future-perfect-continuous', 'fill-blank', 20);

function writeTsFile(filename, varName, data) {
  const code = "import type { Question } from '@/types';\n\nexport const " + varName + ": Question[] = " + JSON.stringify(data, null, 2) + ";\n";
  fs.writeFileSync(path.join(questionsDir, filename), code);
}

writeTsFile('futureSimple.ts', 'futureSimpleQuestions', futureSimple);
writeTsFile('futureContinuous.ts', 'futureContinuousQuestions', futureContinuous);
writeTsFile('futurePerfect.ts', 'futurePerfectQuestions', futurePerfect);
writeTsFile('futurePerfectContinuous.ts', 'futurePerfectContinuousQuestions', futurePPC);
