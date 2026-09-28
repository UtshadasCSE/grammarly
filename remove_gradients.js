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
    
    // Replace text gradients with solid text-primary
    content = content.replace(/bg-gradient-to-[a-z]+ from-[\w-]+ (via-[\w-]+ )?to-[\w-]+ bg-clip-text text-transparent/g, 'text-primary');
    
    // Replace dynamic text gradients where to-[\w-]+ bg-clip-text text-transparent is used
    content = content.replace(/bg-gradient-to-[a-z]+ from-\S+ to-\S+ bg-clip-text text-transparent/g, 'text-primary');
    
    // Replace background gradients with solid bg-primary or bg-secondary depending on the context
    content = content.replace(/bg-gradient-to-[a-z]+ from-[\w-]+ (via-[\w-]+ )?to-[\w-]+/g, 'bg-primary');
    
    // Sometimes it's dynamic like: `bg-gradient-to-r ${config.gradientFrom} ${config.gradientTo}`
    // We can replace the dynamic parts if they exist
    content = content.replace(/gradientFrom: 'from-[\w-]+'/g, "gradientFrom: 'bg-primary'");
    content = content.replace(/gradientTo: 'to-[\w-]+'/g, "gradientTo: ''");
    content = content.replace(/bg-gradient-to-r \$\{.*gradientFrom\} \$\{.*gradientTo\}/g, '${tense.gradientFrom || config.gradientFrom}');
    
    fs.writeFileSync(filePath, content);
  }
});
console.log('Gradients removed!');
