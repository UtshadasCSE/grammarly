const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) walkDir(dirPath, callback);
    else callback(dirPath);
  });
}

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // In [tenseId]/page.tsx, there's no `tense` defined for the header, it's `config`.
    // Let's replace `${tense.gradientFrom || config.gradientFrom}` with whatever is appropriate.
    // If config is defined (as in [tenseId]/page.tsx), use config.gradientFrom.
    // If tense is defined (as in tense/future/page.tsx mapping over tenses), use tense.gradientFrom.
    
    // Instead of conditional, we can just replace the whole string with 'bg-primary' 
    // since we already established the user wants clean solid colors and we set gradientFrom: 'bg-primary'
    // in our previous script!
    
    content = content.replace(/colorClass="?\$\{tense\.gradientFrom \|\| config\.gradientFrom\}"?/g, 'colorClass="bg-primary"');
    
    // Also fix the other one where it was className={`h-full ${tense.gradientFrom || config.gradientFrom} rounded-full transition-all duration-700`}
    content = content.replace(/\$\{tense\.gradientFrom \|\| config\.gradientFrom\}/g, 'bg-primary');
    
    fs.writeFileSync(filePath, content);
  }
});
console.log('Fixed undefined variables!');
