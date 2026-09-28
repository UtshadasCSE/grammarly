const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src', function(filePath) {
  if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace primary-like colors
    content = content.replace(/(text|bg|border|ring|shadow|from|via|to)-(indigo|violet|cyan|blue|purple|pink|rose|red)-[0-9]+/g, '$1-primary');
    
    // Replace secondary-like colors
    content = content.replace(/(text|bg|border|ring|shadow|from|via|to)-(amber|emerald|yellow|orange|green)-[0-9]+/g, '$1-secondary');
    
    fs.writeFileSync(filePath, content);
  }
});
console.log('Colors replaced!');
