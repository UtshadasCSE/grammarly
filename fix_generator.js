const fs = require('fs');

function getHint(tense) {
  const hints = {
    'present-simple': 'Look for habits, routines, and repeated actions.',
    'present-continuous': 'Look for something happening now.',
    'present-perfect': 'Think about an action connected to the present.',
    'present-perfect-continuous': 'Look for duration continuing until now.',
    'past-simple': 'Look for a finished action in the past.',
    'past-continuous': 'Look for an action in progress at a past time.',
    'past-perfect': 'Look for the earlier of two past actions.',
    'past-perfect-continuous': 'Look for duration before another past event.',
    'future-simple': 'Look for predictions, decisions, promises, or future actions.',
    'future-continuous': 'Think about an action that will be in progress at a specific future time.',
    'future-perfect': 'Look for "by + future time."',
    'future-perfect-continuous': 'Look for duration continuing up to a future point.',
    'mixed': 'Consider the time markers in the sentence.'
  };
  return hints[tense] || hints['mixed'];
}

function processBlocks(raw, levelStr) {
    const blocks = raw.split(/Q\d+\r?\n/).filter(b => b.trim().length > 0);
    let questions = [];

    blocks.forEach((block, index) => {
    const lines = block.trim().split('\n').map(l => l.trim()).filter(l => l.length > 0);
    let qText = lines[0];
    let options = [];
    let answer = '';
    let tense = 'mixed';
    let type = 'multiple-choice';

    for (let i = 1; i < lines.length; i++) {
        if (lines[i].match(/^[A-D]\./)) {
        options.push(lines[i].substring(3).trim());
        } else if (lines[i].startsWith('Answer:')) {
        let ansRaw = lines[i].replace('Answer:', '').trim();
        if (ansRaw.match(/^[A-D]\./)) {
            answer = ansRaw.substring(3).trim();
        } else {
            answer = ansRaw;
        }
        } else if (lines[i].startsWith('Tense:')) {
        tense = lines[i].replace('Tense:', '').trim().toLowerCase();
        }
    }

    if (qText === 'Correct the sentence:') {
        type = 'error-correction';
        qText = lines[1].replace(/"/g, '');
    } else if (qText === 'Complete the sentence:') {
        type = 'sentence-transformation';
        qText = lines[1].replace(/"/g, '');
    } else if (qText.includes('Answer in two sentences:') || qText.includes('Answer using') || qText.includes('IELTS Speaking') || qText.includes('IELTS Writing') || qText.includes('Mixed tense challenge:') || qText.includes('Advanced transformation:') || qText.includes('Final Mastery Challenge:')) {
        type = 'writing';
        qText = lines[1] ? lines[1].replace(/"/g, '') : qText;
    }

    if (answer.startsWith('Model Answer:')) {
        answer = answer.replace('Model Answer:', '').trim();
    }

    let qObj = {
        id: 'ielts-' + levelStr + '-' + (index + 1),
        level: levelStr,
        type: type,
        question: qText,
        correctAnswer: answer,
        tense: tense,
        explanation: 'The correct answer is ' + answer + '. ' + getHint(tense),
        hint1: getHint(tense)
    };
    
    if (type === 'multiple-choice') {
        qObj.options = options;
    }

    questions.push(qObj);
    });
    return questions;
}

const rawSrc = fs.readFileSync('generate_all_ielts.js', 'utf8');
const begMatch = rawSrc.match(/const rawBeg = `([\s\S]*?)`;/);
const intMatch = rawSrc.match(/const rawInt = `([\s\S]*?)`;/);
const advMatch = rawSrc.match(/const rawAdv = `([\s\S]*?)`;/);

if (begMatch) {
  const qs = processBlocks(begMatch[1], 'beginner');
  const code = "import type { IELTSQuestion } from '@/types';\n\nexport const beginnerQuestions: IELTSQuestion[] = " + JSON.stringify(qs, null, 2) + ";\n";
  fs.writeFileSync('src/data/ielts/beginner.ts', code);
}
if (intMatch) {
  const qs = processBlocks(intMatch[1], 'intermediate');
  const code = "import type { IELTSQuestion } from '@/types';\n\nexport const intermediateQuestions: IELTSQuestion[] = " + JSON.stringify(qs, null, 2) + ";\n";
  fs.writeFileSync('src/data/ielts/intermediate.ts', code);
}
if (advMatch) {
  const qs = processBlocks(advMatch[1], 'advanced');
  const code = "import type { IELTSQuestion } from '@/types';\n\nexport const advancedQuestions: IELTSQuestion[] = " + JSON.stringify(qs, null, 2) + ";\n";
  fs.writeFileSync('src/data/ielts/advanced.ts', code);
}
