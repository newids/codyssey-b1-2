import type { GoogleAccountsId } from '@/types/google-gsi';

export const GOOGLE_CLIENT_ID = (import.meta.env.VITE_GOOGLE_CLIENT_ID as string | undefined)?.trim() || null;

const LOAD_TIMEOUT_MS = 6000;
const POLL_MS = 50;

/**
 * index.html 의 <script src="https://accounts.google.com/gsi/client" async defer> 가
 * window.google.accounts.id 를 채울 때까지 기다린다. 광고 차단기 등으로 못 불러오면 reject.
 */
export function loadGoogleIdentity(): Promise<GoogleAccountsId> {
  return new Promise((resolve, reject) => {
    const started = Date.now();
    const check = () => {
      const api = window.google?.accounts?.id;
      if (api) return resolve(api);
      if (Date.now() - started > LOAD_TIMEOUT_MS) {
        return reject(new Error('Google 로그인 스크립트를 불러오지 못했습니다.'));
      }
      window.setTimeout(check, POLL_MS);
    };
    check();
  });
}

/**
 * 재사용 공격 방지용 nonce 쌍.
 * Google 에는 SHA-256 해시를, Supabase signInWithIdToken 에는 원본을 넘긴다.
 * (Supabase 가 토큰 안의 해시와 원본의 해시를 비교한다)
 */
export async function createNoncePair(): Promise<{ nonce: string; hashedNonce: string }> {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  const nonce = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  const digest = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(nonce));
  const hashedNonce = Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
  return { nonce, hashedNonce };
}
