import { argv } from 'node:process';
import * as esbuild from 'esbuild'
import start from '@es-exec/esbuild-plugin-start';

const outfile = 'pkg/cli.mjs';
const config = {
  entryPoints: ['src/index.js'],
  outfile,
  banner: {
    js: '#!/usr/bin/env node\n',
  },
  bundle: true,
  format: 'esm',
  platform: 'node',
  plugins: [
    start({ script: `chmod +x ${outfile}` })
  ]
}

async function main () {
  const args = argv.slice(2);

  if (args.includes('--watch')) {
    await (await esbuild.context(config)).watch()
  } else if (args.includes('--prod')) {
    await esbuild.build({ ...config, minify: true });
  } else {
    await esbuild.build(config);
  }
}

main();