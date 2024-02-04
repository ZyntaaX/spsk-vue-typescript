import { execa } from 'execa';
import { existsSync } from 'fs';

(async () => {
  let exitCode = 0;
  try {
    await execa('git', ['checkout', '--orphan', 'gh-pages']);
    console.log('Building...');
    await execa('yarn', [/*'run', */'build']);
    // Understand if it's dist or build folder
    const folderName = existsSync('dist') ? 'dist' : 'build';
    await execa('git', ['--work-tree', folderName, 'add', '--all']);
    await execa('git', ['--work-tree', folderName, 'commit', '-m', 'gh-pages']);
    console.log('Pushing to gh-pages...');
    await execa('git', ['push', 'origin', 'HEAD:gh-pages', '--force']);
    await execa('rm', ['-r', folderName]);
    await execa('git', ['checkout', '-f', 'main']);
    await execa('git', ['branch', '-D', 'gh-pages']);
    console.log('Successfully deployed');
  } catch (e) {
    console.log(e.message);
    exitCode = 1;
  } finally {
    // await promises.writeFile(configFilePath, originPublicPath, fileOpts);
    await execa('git', ['checkout', '-f', 'main']);
    await execa('git', ['branch', '-D', 'gh-pages']);
  }
  process.exit(exitCode);
})();
