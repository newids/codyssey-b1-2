// "오늘의 React 팁"을 요청하는 함수 (3일 차 실습 7에서 쓴다)
import type { Tip } from '../types';

// 요청이 너무 빨리 끝나면 로딩 화면을 볼 수 없어서 일부러 조금 기다린다.
const LOADING_DELAY_MS = 800;

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isTip(value: unknown): value is Tip {
  if (typeof value !== 'object' || value === null) return false;
  const tip = value as Record<string, unknown>;
  return (
    typeof tip.id === 'number' && typeof tip.title === 'string' && typeof tip.summary === 'string'
  );
}

/** url에서 팁 목록을 받아 온다. 실패하면 오류를 던진다. */
export async function fetchTips(url: string): Promise<Tip[]> {
  await wait(LOADING_DELAY_MS);

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`요청이 실패했습니다. (상태 코드 ${response.status})`);
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data) || !data.every(isTip)) {
    throw new Error('응답이 팁 목록 모양이 아닙니다.');
  }
  return data;
}
