import { spawn, execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const port = process.env.PORT || '5000';
const isDev = process.env.NODE_ENV !== 'production';

try {
  execSync(`fuser -k ${port}/tcp 2>/dev/null`, { stdio: 'ignore' });
} catch {}

if (isDev) {
  const nextDir = path.resolve(process.cwd(), '.next');
  if (fs.existsSync(nextDir)) {
    fs.rmSync(nextDir, { recursive: true, force: true });
    console.log('Cleared .next dev cache');
  }

  const nodeModules = path.resolve(process.cwd(), 'node_modules');
  const bundledReact = path.resolve(nodeModules, 'next/dist/compiled/react');
  const bundledReactDom = path.resolve(nodeModules, 'next/dist/compiled/react-dom');
  const installedReact = path.resolve(nodeModules, 'react');
  const installedReactDom = path.resolve(nodeModules, 'react-dom');

  function syncDir(src: string, dest: string) {
    for (const file of fs.readdirSync(src)) {
      if (file === 'package.json') continue;
      const s = path.join(src, file);
      const d = path.join(dest, file);
      const stat = fs.statSync(s);
      if (stat.isDirectory()) {
        fs.cpSync(s, d, { recursive: true, force: true });
      } else {
        fs.copyFileSync(s, d);
      }
    }
  }

  if (fs.existsSync(bundledReact)) {
    try {
      const bundledIndex = fs.readFileSync(path.join(bundledReact, 'cjs/react.development.js'), 'utf-8');
      const installedIndex = fs.readFileSync(path.join(installedReact, 'cjs/react.development.js'), 'utf-8');

      const getVersion = (content: string) => {
        const m = content.match(/version\s*=\s*["']([^"']+)["']/);
        return m ? m[1] : null;
      };

      const bundledVer = getVersion(bundledIndex);
      const installedVer = getVersion(installedIndex);

      if (bundledVer && installedVer && bundledVer !== installedVer) {
        syncDir(bundledReact, installedReact);
        syncDir(bundledReactDom, installedReactDom);
        console.log(`Synced React ${installedVer} → ${bundledVer} to match Next.js`);
      } else if (bundledVer === installedVer) {
        console.log(`React versions match (${installedVer})`);
      }
    } catch (e) {
      console.warn('React version check skipped:', (e as Error).message);
    }
  }
}

console.log(`Starting Next.js in ${isDev ? 'development' : 'production'} mode on port ${port}...`);

const nextBin = path.resolve(process.cwd(), 'node_modules', '.bin', 'next');
const command = isDev ? 'dev' : 'start';

const nextProcess = spawn(nextBin, [command, '-p', port], {
  stdio: 'inherit',
  env: { ...process.env },
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
  setTimeout(() => {
    try { nextProcess.kill('SIGKILL'); } catch {}
    process.exit(0);
  }, 5000);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));
