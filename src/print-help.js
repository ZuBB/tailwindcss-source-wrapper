import { readFileSync, realpathSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { argv } from 'node:process';

const packageJsonFile = 'package.json';

const getPackageJsonContent = () => {
  const binPath = realpathSync(argv[1]);
  console.log(binPath)
  const packageJsonFilePath = join(dirname(binPath), packageJsonFile);
  console.log(packageJsonFilePath)

  try {
    return JSON.parse(readFileSync(packageJsonFilePath, 'utf8'));
  } catch (error) {
    throw new Error(`Can't process '${packageJsonFile}' file\n`, error);
  }
}

const getHelpMessage = () => {
  const content = getPackageJsonContent();
  const { version, bin } = content;
  const cliName = Object.keys(bin)[0];

  return `
${cliName} v${version}

Usage:
    ${cliName} [options...]

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

export default function() {
  console.log(getHelpMessage());
};
