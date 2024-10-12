import { join } from 'node:path';
import { cwd } from 'node:process';

const twConfig = 'tailwind.config.js'

export default function (args) {
  const index1 = args.findIndex(el => el === '-c');
  const index2 = args.findIndex(el => el === '--config');
  const index = Math.max(index1, index2);
  const filename = index > -1
    ? args[index + 1]
    : twConfig;

  return join(cwd(), filename);
}