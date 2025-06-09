import fs from 'fs/promises';
import path from 'path';

const DIST_DIR = 'dist';
const OLD_ASSET_DIR_NAME = '_next';
const NEW_ASSET_DIR_NAME = 'next-assets';

const oldPath = path.join(process.cwd(), DIST_DIR, OLD_ASSET_DIR_NAME);
const newPath = path.join(process.cwd(), DIST_DIR, NEW_ASSET_DIR_NAME);

async function replaceInFile(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf-8');
    // 使用全局正则表达式来替换所有出现的/_next/
    const oldPattern = new RegExp('/_next/', 'g');
    
    if (oldPattern.test(content)) {
      content = content.replace(oldPattern, `/${NEW_ASSET_DIR_NAME}/`);
      await fs.writeFile(filePath, content, 'utf-8');
      console.log(`[Post-Build] Replaced path in: ${filePath}`);
    }
  } catch (err) {
    console.error(`[Post-Build] Could not process file ${filePath}:`, err);
  }
}

async function walkDir(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        await walkDir(fullPath);
      } else if (/\.(html|js|css)$/.test(entry.name)) {
        await replaceInFile(fullPath);
      }
    }
  } catch (err) {
     console.error(`[Post-Build] Error walking directory ${dir}:`, err);
  }
}

async function main() {
  try {
    // 1. Rename the directory
    await fs.rename(oldPath, newPath);
    console.log(`[Post-Build] Renamed '${oldPath}' to '${newPath}'`);

    // 2. Recursively find and replace paths in all relevant files
    await walkDir(newPath); // Start walking from the newly named directory
    await walkDir(path.join(process.cwd(), DIST_DIR)); // Also check root html files
    console.log('[Post-Build] Finished updating asset paths.');
  } catch (err) {
    if (err.code === 'ENOENT') {
        console.log(`[Post-Build] '${oldPath}' directory not found, skipping post-build script. This is normal if the build failed.`);
    } else {
        console.error('[Post-Build] Error during post-build process:', err);
    }
  }
}

main(); 