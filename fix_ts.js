const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        results.push(file);
      }
    }
  });
  return results;
}

const files = walk(path.join(__dirname, 'src/app/tense'));

for (let file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let changed = false;

  // Change Record<TenseId, ...> to Partial<Record<TenseId, ...>>
  // But wait, there are types like: const mcqBank: Record<TenseId, Question[]> = {
  // Let's replace 'Record<TenseId,' with 'Partial<Record<TenseId,'
  if (content.includes('Record<TenseId,')) {
    content = content.replace(/Record<TenseId,/g, 'Partial<Record<TenseId,');
    changed = true;
  }
  
  if (content.includes('Record<string,')) {
      // nothing
  }

  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
    console.log('Fixed', file);
  }
}

// Check other files that might have Record<TenseId,...>
const rootFiles = walk(path.join(__dirname, 'src/data'));
for (let file of rootFiles) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('Record<TenseId,')) {
    content = content.replace(/Record<TenseId,/g, 'Partial<Record<TenseId,');
    fs.writeFileSync(file, content, 'utf8');
  }
}
