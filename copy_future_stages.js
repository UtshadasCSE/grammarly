const fs = require('fs');
const path = require('path');

const pastDir = path.join(__dirname, 'src/app/tense/past/[tenseId]');
const futureDir = path.join(__dirname, 'src/app/tense/future/[tenseId]');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (let entry of entries) {
    if (entry.name === 'page.tsx' && src === pastDir) continue; // skip the root page.tsx
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      let content = fs.readFileSync(srcPath, 'utf8');
      
      // Replace past with future
      content = content.replace(/tense\/past/g, 'tense/future');
      content = content.replace(/Past/g, 'Future');
      content = content.replace(/past/g, 'future');
      
      content = content.replace(/pastSimpleQuestions/gi, 'futureSimpleQuestions');
      content = content.replace(/pastContinuousQuestions/gi, 'futureContinuousQuestions');
      content = content.replace(/pastPerfectQuestions/gi, 'futurePerfectQuestions');
      content = content.replace(/pastPerfectContinuousQuestions/gi, 'futurePerfectContinuousQuestions');
      
      // Clean up imports that might have been mangled
      content = content.replace(/@\/data\/questions\/futureSimple/g, '@/data/questions/futureSimple');
      content = content.replace(/@\/data\/questions\/futureContinuous/g, '@/data/questions/futureContinuous');
      content = content.replace(/@\/data\/questions\/futurePerfect/g, '@/data/questions/futurePerfect');
      content = content.replace(/@\/data\/questions\/futurePerfectContinuous/g, '@/data/questions/futurePerfectContinuous');
      
      // the question banks in practice/page.tsx etc map past tenses, we need to map future tenses
      // e.g. 'future-simple': futureSimpleQuestions
      content = content.replace(/'future-simple': futureSimpleQuestions/g, "'future-simple': futureSimpleQuestions"); // Just to ensure it's not double replacing
      
      fs.writeFileSync(destPath, content);
    }
  }
}

copyDir(pastDir, futureDir);
