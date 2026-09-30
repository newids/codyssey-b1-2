// 실습 단계의 완성 코드를 src 폴더로 가져온다.
// 사용법: npm run checkpoint lab3
// 지금의 src 폴더는 src.backup-날짜-시간 폴더로 옮겨 두므로 작업한 내용이 사라지지 않는다.
import { cpSync, existsSync, readdirSync, renameSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectDir = join(dirname(fileURLToPath(import.meta.url)), '..');
const checkpointsDir = join(projectDir, '..', 'checkpoints');
const srcDir = join(projectDir, 'src');

function fail(message) {
  console.error(message);
  process.exit(1);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

/** 예: 20260930-143005 (컴퓨터의 현재 시각) */
function timestamp(date) {
  const day = `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
  const time = `${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
  return `${day}-${time}`;
}

if (!existsSync(checkpointsDir)) {
  fail(`단계별 코드 폴더를 찾지 못했습니다: ${checkpointsDir}\n실습 자료를 전부 받았는지 확인해 주세요.`);
}

const available = readdirSync(checkpointsDir)
  .filter((name) => existsSync(join(checkpointsDir, name, 'src')))
  .sort();

const name = process.argv[2];
if (!name || !available.includes(name)) {
  fail(
    `가져올 단계 이름을 적어 주세요. 예: npm run checkpoint lab3\n쓸 수 있는 이름: ${available.join(', ')}`,
  );
}

let backupDir = null;
if (existsSync(srcDir)) {
  backupDir = join(projectDir, `src.backup-${timestamp(new Date())}`);
  if (existsSync(backupDir)) {
    fail('방금 만든 백업 폴더와 이름이 겹칩니다. 1초 뒤에 다시 실행해 주세요.');
  }
  try {
    renameSync(srcDir, backupDir);
  } catch (error) {
    fail(
      `src 폴더를 옮기지 못했습니다. 개발 서버(npm run dev)를 끄고 다시 실행해 주세요.\n${error.message}`,
    );
  }
  console.log(`지금까지의 src 폴더를 ${backupDir} 로 옮겼습니다.`);
}

try {
  cpSync(join(checkpointsDir, name, 'src'), srcDir, { recursive: true });
} catch (error) {
  const recovery = backupDir
    ? `작업하던 코드는 ${backupDir} 에 있습니다. 이 폴더 이름을 src 로 바꾸면 원래대로 돌아갑니다.`
    : '';
  fail(`${name} 단계의 코드를 가져오지 못했습니다.\n${error.message}\n${recovery}`);
}
console.log(`${name} 단계의 코드를 src 폴더로 가져왔습니다.`);
