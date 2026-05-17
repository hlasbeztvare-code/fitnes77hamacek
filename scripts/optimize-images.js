const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const productsDir = path.join(__dirname, 'public/images/products');
const files = fs.readdirSync(productsDir);

files.forEach(file => {
    const ext = path.extname(file).toLowerCase();
    const filePath = path.join(productsDir, file);
    const fileNameNoExt = path.basename(file, ext);

    if (['.png', '.jpeg', '.jpg'].includes(ext)) {
        console.log(`Processing ${file}...`);
        const targetPath = path.join(productsDir, `${fileNameNoExt}.webp`);
        
        try {
            // Convert to webp with quality 75 and max width 1000
            execSync(`sips -s format webp -s formatOptions 75 --resampleWidth 1000 "${filePath}" --out "${targetPath}"`);
            
            // If it was a PNG or large JPEG, remove it if it's not the one we are currently using
            // But wait, it's safer to keep it for now and only delete explicitly requested ones.
            // Actually, "vsechno prevedes do nizko formatu" implies replacing.
            if (ext === '.png' || fs.statSync(filePath).size > 1000000) {
                // fs.unlinkSync(filePath);
                console.log(`  Converted to webp and ready to delete ${file}`);
            }
        } catch (e) {
            console.error(`  Error processing ${file}: ${e.message}`);
        }
    }
});
