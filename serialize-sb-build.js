import { spawn } from 'child_process';

function run(cmd, args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(cmd, args, { stdio: 'inherit' });
    proc.on('exit', (code) => {
      if (code !== 0) reject(new Error(`${cmd} ${args.join(' ')} failed with code ${code}`));
      else resolve();
    });
  });
}

(async () => {
  try {
    console.log('Running turbo build...');
    await run('pnpm', ['build']); // chiama turbo run build, build:styles, analyze

    console.log('Building Storybook...');
    await run('storybook', ['build']);
  } catch (err) {
    console.error('Build failed:', err.message);
    process.exit(1);
  }
})();
