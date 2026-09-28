const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, 'src/data');

// Ensure dirs
fs.mkdirSync(path.join(dataDir, 'lessons'), { recursive: true });
fs.mkdirSync(path.join(dataDir, 'speaking'), { recursive: true });
fs.mkdirSync(path.join(dataDir, 'vocabulary'), { recursive: true });

function writeLesson(filename, varName, id) {
  const code = "import type { TenseLesson } from '@/types';\n\nexport const " + varName + " = {\n  id: '" + id + "',\n} as unknown as TenseLesson;\n";
  fs.writeFileSync(path.join(dataDir, 'lessons', filename + '.ts'), code);
}
writeLesson('futureSimple', 'futureSimpleLesson', 'future-simple');
writeLesson('futureContinuous', 'futureContinuousLesson', 'future-continuous');
writeLesson('futurePerfect', 'futurePerfectLesson', 'future-perfect');
writeLesson('futurePerfectContinuous', 'futurePerfectContinuousLesson', 'future-perfect-continuous');

// Speaking and Writing
const speakingWritingCode = "export const futureSpeakingPrompts = [];\nexport const futureWritingTasks = [];\n";
fs.writeFileSync(path.join(dataDir, 'speaking', 'futureSpeakingAndWriting.ts'), speakingWritingCode);

// Vocabulary
const vocabCode = "import type { VocabularyItem } from '@/types';\n\nexport const futureSimpleVocabulary: VocabularyItem[] = [];\nexport const futureContinuousVocabulary: VocabularyItem[] = [];\nexport const futurePerfectVocabulary: VocabularyItem[] = [];\nexport const futurePerfectContinuousVocabulary: VocabularyItem[] = [];\n";
fs.writeFileSync(path.join(dataDir, 'vocabulary', 'futureTenseVocab.ts'), vocabCode);

// Fix test/page.tsx
function fixTestPage(filePath) {
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/const qs = allQuestions\\[tId\\] \\?\\? \\[\\];/, 'const qs = (allQuestions as any)[tId] ?? [];');
    fs.writeFileSync(filePath, content);
  }
}

fixTestPage(path.join(__dirname, 'src/app/tense/present/[tenseId]/test/page.tsx'));
fixTestPage(path.join(__dirname, 'src/app/tense/past/[tenseId]/test/page.tsx'));
fixTestPage(path.join(__dirname, 'src/app/tense/future/[tenseId]/test/page.tsx'));
