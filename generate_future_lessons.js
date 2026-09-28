const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src/data');

function writeLesson(filename, varName, id) {
  const code = "import type { TenseLesson } from '@/types';\n\n" +
"export const " + varName + ": TenseLesson = {\n" +
"  id: '" + id + "',\n" +
"  name: 'Dummy " + id + "',\n" +
"  banglaName: 'Dummy Bangla',\n" +
"  formula: {\n" +
"    positive: 'Subject + will + V1',\n" +
"    negative: 'Subject + will + not + V1',\n" +
"    question: 'Will + Subject + V1?',\n" +
"    whQuestion: 'Wh + will + Subject + V1?',\n" +
"  },\n" +
"  introduction: 'This is a dummy introduction.',\n" +
"  introductionBangla: 'এটি একটি ডামি পরিচিতি।',\n" +
"  positiveExamples: ['I will go.'],\n" +
"  negativeExamples: ['I will not go.'],\n" +
"  questionExamples: ['Will I go?'],\n" +
"  whQuestionExamples: ['When will I go?'],\n" +
"  uses: [\n" +
"    { title: 'Use 1', explanation: 'Explanation 1', example: 'Example 1' }\n" +
"  ],\n" +
"  signalWords: ['tomorrow'],\n" +
"  signalWordsNote: 'Note',\n" +
"  interactiveSentence: [\n" +
"    { text: 'I', role: 'subject', explanation: 'Subject', color: 'indigo' },\n" +
"    { text: 'will', role: 'auxiliary', explanation: 'Auxiliary', color: 'rose' },\n" +
"    { text: 'go', role: 'verb', explanation: 'Main verb', color: 'emerald' }\n" +
"  ],\n" +
"  difficulty: 'Beginner',\n" +
"  color: 'indigo'\n" +
"};\n";
  fs.writeFileSync(path.join(dataDir, 'lessons', filename + '.ts'), code);
}

writeLesson('futureSimple', 'futureSimpleLesson', 'future-simple');
writeLesson('futureContinuous', 'futureContinuousLesson', 'future-continuous');
writeLesson('futurePerfect', 'futurePerfectLesson', 'future-perfect');
writeLesson('futurePerfectContinuous', 'futurePerfectContinuousLesson', 'future-perfect-continuous');
