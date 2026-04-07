import { spawn } from 'child_process';
import path from 'path';

const port = process.env.PORT || '5000';
const isDev = process.env.NODE_ENV !== 'production';

console.log(`Starting Next.js in ${isDev ? 'development' : 'production'} mode on port ${port}...`);

const nextBin = path.resolve(process.cwd(), 'node_modules', '.bin', 'next');
const command = isDev ? 'dev' : 'start';

const nextProcess = spawn(nextBin, [command, '-p', port], {
  stdio: 'inherit',
  env: { ...process.env },
  shell: true,
});

nextProcess.on('error', (error) => {
  console.error('Failed to start Next.js:', error);
  process.exit(1);
});

nextProcess.on('close', (code) => {
  process.exit(code ?? 0);
});

function shutdown(signal: string) {
  console.log(`Received ${signal}, shutting down Next.js...`);
  nextProcess.kill(signal as NodeJS.Signals);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
