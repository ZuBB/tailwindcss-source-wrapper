import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { cwd } from 'node:process';

const twConfig = 'tailwind.config';
const twConfigExts = ['js', 'cjs', 'mjs'/*, 'ts', 'cts', 'mts'*/];

const getConfigFromCliParams = (args) => {
  const indexForShortOption = args.findIndex(el => el === '-c');
  const indexForLongOption = args.findIndex(el => el === '--config');
  const index = Math.max(indexForShortOption, indexForLongOption);
  return index > -1 ? args[index + 1] : null;
}

const findConfigInFS = () => {
  for (const ext of twConfigExts) {
    const filename = twConfig + '.' + ext;
    const filepath = join(cwd(), filename);
    if (existsSync(filepath)) return filename;
  }

  return null;
}

export default function (args) {
  const filename = getConfigFromCliParams(args) || findConfigInFS();

  if (filename) return join(cwd(), filename);

  throw new Error('Can\'t find a config file for tailwindcss!');
}