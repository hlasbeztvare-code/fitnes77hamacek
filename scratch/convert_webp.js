const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDirs = [
  'fit77-bot/vstupy_od_jardy',
  'fit77-bot/vstupy_od_jardy/Nová složka s položkami'
];

const outputDir = 'public/images/jarda_imports';

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function convert() {
  for (const dir of inputDirs) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      if (file.toLowerCase().endsWith('.jpg') || file.toLowerCase().endsWith('.png')) {
        const inputPath = path.join(dir, file);
        const outputPath = path.join(outputDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
        
        try {
          await sharp(inputPath)
            .webp({ quality: 85 })
            .toFile(outputPath);
          console.log(`✅ Converted: ${file}`);
        } catch (err) {
          console.error(`❌ Failed: ${file}`, err.message);
        }
      }
    }
  }
}

convert();
