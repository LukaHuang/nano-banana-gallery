import * as fs from 'fs';
import * as path from 'path';

const promptsPath = path.join(process.cwd(), 'data', 'prompts.ts');

try {
  console.log('Reading prompts.ts...');
  const content = fs.readFileSync(promptsPath, 'utf-8');
  const lines = content.split('\n');
  const newLines: string[] = [];

  let fixedCount = 0;
  let removedCount = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // 1. Remove ANY line that is exactly "sourceId: 'nanobana'," (ignoring indentation and quotes)
    if (/^sourceId:\s*['"]nanobana['"],?$/.test(trimmedLine)) {
      removedCount++;
      continue;
    }

    newLines.push(line);

    // 2. Check if this line is `imageUrl: ...`
    if (trimmedLine.startsWith('imageUrl:')) {
      // Check if next line is awesome source
      let isAwesome = false;

      // Look ahead in the ORIGINAL lines
      for (let j = i + 1; j < lines.length; j++) {
        const nextLine = lines[j].trim();
        if (nextLine === '') continue;

        // Ignore the line we are removing
        if (/^sourceId:\s*['"]nanobana['"],?$/.test(nextLine)) continue;

        if (nextLine.startsWith('sourceId:')) {
          if (nextLine.includes('awesome-nano-banana')) {
            isAwesome = true;
          }
          break;
        }

        // Stop at end of object
        if (nextLine === '},' || nextLine === '}') {
          break;
        }
      }

      if (!isAwesome) {
        // Add nanobana source
        // Match indentation of current line
        const indentation = line.match(/^\s*/)?.[0] || '    ';
        newLines.push(`${indentation}sourceId: 'nanobana',`);
        fixedCount++;
      }
    }
  }

  fs.writeFileSync(promptsPath, newLines.join('\n'), 'utf-8');
  console.log(`✅ Fixed prompts.ts: Removed ${removedCount} misplaced entries, Added ${fixedCount} correct entries.`);

} catch (error) {
  console.error('Error fixing prompts:', error);
}
