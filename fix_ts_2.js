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

  if (content.includes('Partial<Record<TenseId,')) {
    // regex to fix missing closing >
    // e.g. Partial<Record<TenseId, string> = { -> Partial<Record<TenseId, string>> = {
    // Partial<Record<TenseId, Question[]> = { -> Partial<Record<TenseId, Question[]>> = {
    content = content.replace(/Partial<Record<TenseId, ([^>]+)> =/g, 'Partial<Record<TenseId, $1>> =');
    
    // some might have nested like TenseId | null>
    content = content.replace(/Partial<Record<TenseId, ([^>]+)> =/g, 'Partial<Record<TenseId, $1>> =');
    content = content.replace(/Partial<Record<TenseId, TenseId \| null> =/g, 'Partial<Record<TenseId, TenseId | null>> =');

    // ielts/page.tsx: }[]> = {
    content = content.replace(/}\[\]> =/g, '}[]>> =');
    
    // present/[tenseId]/page.tsx: }> = {
    content = content.replace(/}>> =/g, '}>>> =');
    
    changed = true;
  }
  
  if (changed) {
    fs.writeFileSync(file, content, 'utf8');
  }
}
