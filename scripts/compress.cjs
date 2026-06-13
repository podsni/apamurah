const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');
const MAX_WIDTH = 1200;
const QUALITY = 80;

// Get all files recursively
function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(file));
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.webp', '.jpg', '.jpeg', '.png'].includes(ext)) {
        results.push(file);
      }
    }
  });
  return results;
}

async function compress() {
  console.log('Finding images in:', IMAGES_DIR);
  if (!fs.existsSync(IMAGES_DIR)) {
    console.error('Images directory does not exist!');
    return;
  }

  const files = getFiles(IMAGES_DIR);
  console.log(`Found ${files.length} images to compress.\n`);

  let totalBeforeSize = 0;
  let totalAfterSize = 0;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const relPath = path.relative(IMAGES_DIR, file);
    const statsBefore = fs.statSync(file);
    const beforeSizeKB = statsBefore.size / 1024;
    totalBeforeSize += statsBefore.size;

    try {
      // Get metadata to check dimensions
      const image = sharp(file);
      const metadata = await image.metadata();

      let pipeline = sharp(file);
      
      // Only resize if wider than MAX_WIDTH
      if (metadata.width && metadata.width > MAX_WIDTH) {
        pipeline = pipeline.resize({ width: MAX_WIDTH });
      }

      // Convert to webp with target quality (since all our images are .webp or can be compressed as webp)
      const buffer = await pipeline
        .webp({ quality: QUALITY })
        .toBuffer();

      // Overwrite the original file
      fs.writeFileSync(file, buffer);

      const statsAfter = fs.statSync(file);
      const afterSizeKB = statsAfter.size / 1024;
      totalAfterSize += statsAfter.size;

      const percentage = ((beforeSizeKB - afterSizeKB) / beforeSizeKB * 100).toFixed(1);
      console.log(`[${i + 1}/${files.length}] Compressed ${relPath}: ${beforeSizeKB.toFixed(0)}KB -> ${afterSizeKB.toFixed(0)}KB (-${percentage}%)`);
    } catch (err) {
      console.error(`Failed to process ${relPath}:`, err.message);
    }
  }

  const beforeMB = (totalBeforeSize / (1024 * 1024)).toFixed(1);
  const afterMB = (totalAfterSize / (1024 * 1024)).toFixed(1);
  const totalSaved = ((totalBeforeSize - totalAfterSize) / (1024 * 1024)).toFixed(1);
  const totalPercent = ((totalBeforeSize - totalAfterSize) / totalBeforeSize * 100).toFixed(1);

  console.log('\n--- COMPRESSION COMPLETE ---');
  console.log(`Total Before Size: ${beforeMB} MB`);
  console.log(`Total After Size:  ${afterMB} MB`);
  console.log(`Saved Size:        ${totalSaved} MB (${totalPercent}% reduction)`);
}

compress();
