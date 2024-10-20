import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import { argv, exit } from 'node:process';
import printHelpMesage from './print-help.js';
import getConfigFilePath from './config-file-path.js'

async function main() {
  const args = argv.slice(2);
  const isHelpRequested = args.includes('-h') || args.includes('--help');
  const configFilePath = getConfigFilePath(args);
  const isConfigFileExists = existsSync(configFilePath);

  if (isHelpRequested || !isConfigFileExists) {
    printHelpMesage();
    exit(0);
  }

  const twConfig = (await import(configFilePath)).default;
  const { input, output } = twConfig;
  const spawnArgs = ['node_modules/.bin/tailwindcss', '-i', input, '-o', output];

  spawn('node', spawnArgs, { stdio: 'inherit' });
}

main();