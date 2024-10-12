import { readFileSync, realpathSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { argv } from 'node:process';

const packageJsonFile = 'package.json';

const getPackageVersion = () => {
  const binPath = realpathSync(argv[1]);
  const packageJsonFilePath = resolve(dirname(binPath), '..', packageJsonFile);

  try {
    return JSON.parse(readFileSync(packageJsonFilePath, 'utf8')).version;
  } catch (_) {
    throw new Error(`Can't process '${packageJsonFile}' file`);
  }
}

const getHelpMessage = (version) => {
  return `
tcw v${version}

Usage:
   tcw [options...]

Options:
   -w, --watch              pass '--watch' option to tailwindcss
   -p, --poll               pass '--poll' option to tailwindcss
       --content            pass '--content' option to tailwindcss
       --postcss            Load custom PostCSS configuration
   -m, --minify             pass '--minify' option to tailwindcss
   -c, --config             pass '--config' option to tailwindcss
       --no-autoprefixer    pass '--no-autoprefixer' option to tailwindcss
   -h, --help               Display usage information
`;
}

export default function () {
  console.log(getHelpMessage(getPackageVersion()));
};
