// 강사용: 모든 체크포인트가 타입 검사와 빌드를 통과하는지 확인한다.
// 사용법: npm run verify
import { execSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const checkpointsDir = join(projectDir, '..', 'checkpoints');
const workDir = join(projectDir, '.verify');
const binDir = join(projectDir, 'node_modules', '.bin');
const SHARED_FILES = ['index.html', 'tsconfig.json', 'vite.config.ts', 'public'];
// 체크포인트에는 쓰지 않는 코드가 남아 있으면 안 되므로 검증할 때만 더 엄격하게 본다.
const TYPECHECK = `"${join(binDir, 'tsc')}" --noEmit --noUnusedLocals --noUnusedParameters`;
const BUILD = `"${join(binDir, 'vite')}" build --logLevel error`;

if (!existsSync(binDir)) {
  console.error('node_modules 가 없습니다. 먼저 npm install 을 실행해 주세요.');
  process.exit(1);
}

function verify(name) {
  const targetDir = join(workDir, name);
  mkdirSync(targetDir, { recursive: true });
  for (const file of SHARED_FILES) {
    cpSync(join(projectDir, file), join(targetDir, file), { recursive: true });
  }
  cpSync(join(checkpointsDir, name, 'src'), join(targetDir, 'src'), { recursive: true });
  execSync(TYPECHECK, { cwd: targetDir, stdio: 'pipe' });
  execSync(BUILD, { cwd: targetDir, stdio: 'pipe' });
}

const names = readdirSync(checkpointsDir)
  .filter((name) => existsSync(join(checkpointsDir, name, 'src')))
  .sort();

const failed = [];
try {
  rmSync(workDir, { recursive: true, force: true });
  for (const name of names) {
    try {
      verify(name);
      console.log(`통과  ${name}`);
    } catch (error) {
      failed.push(name);
      console.error(`실패  ${name}`);
      console.error([error.message, error.stdout, error.stderr].filter(Boolean).join('\n'));
    }
  }
} finally {
  rmSync(workDir, { recursive: true, force: true });
}

if (failed.length > 0) {
  console.error(`\n실패한 체크포인트: ${failed.join(', ')}`);
  process.exit(1);
}
console.log(`\n체크포인트 ${names.length}개 모두 통과`);
