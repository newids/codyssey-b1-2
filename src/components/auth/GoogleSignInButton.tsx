import { useEffect, useRef, useState } from 'react';
import { createNoncePair, GOOGLE_CLIENT_ID, loadGoogleIdentity } from '@/lib/google';
import { Button } from '@/components/ui/Button';
import styles from './GoogleSignInButton.module.css';

export interface GoogleSignInButtonProps {
  /** GIS 버튼이 준 ID 토큰과 원본 nonce */
  onCredential: (credential: string, nonce: string) => Promise<void>;
  /** GIS 를 쓸 수 없을 때(스크립트 차단, 클라이언트 ID 없음) 대신 실행할 리다이렉트 로그인 */
  onFallback: () => Promise<void>;
  disabled?: boolean;
}

type Status = 'loading' | 'ready' | 'fallback' | 'exchanging';

/**
 * Google Identity Services 버튼을 그린다.
 * 흐름: 스크립트 로드 → nonce 생성 → initialize → renderButton → (사용자 클릭·계정 선택) → callback(credential)
 *       → onCredential → Supabase 세션 생성 → AuthContext 가 세션 변경을 감지 → LoginPage 가 원래 경로로 이동
 */
export function GoogleSignInButton({ onCredential, onFallback, disabled = false }: GoogleSignInButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<Status>(GOOGLE_CLIENT_ID ? 'loading' : 'fallback');
  const [isFallbackBusy, setIsFallbackBusy] = useState(false);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;
    let cancelled = false;

    (async () => {
      try {
        const [api, { nonce, hashedNonce }] = await Promise.all([loadGoogleIdentity(), createNoncePair()]);
        if (cancelled || !containerRef.current) return;
        api.initialize({
          client_id: GOOGLE_CLIENT_ID,
          nonce: hashedNonce,
          use_fedcm_for_prompt: true,
          itp_support: true,
          callback: (response) => {
            if (cancelled) return;
            setStatus('exchanging');
            onCredential(response.credential, nonce).catch(() => {
              if (!cancelled) setStatus('ready');
            });
          },
        });
        api.renderButton(containerRef.current, {
          type: 'standard',
          theme: 'outline',
          size: 'large',
          text: 'continue_with',
          shape: 'pill',
          width: 320,
          locale: 'ko',
          logo_alignment: 'left',
        });
        setStatus('ready');
      } catch {
        if (!cancelled) setStatus('fallback');
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [onCredential]);

  if (status === 'fallback') {
    return (
      <Button
        size="lg"
        className={styles.fallback}
        loading={isFallbackBusy}
        disabled={disabled}
        onClick={async () => {
          setIsFallbackBusy(true);
          try {
            await onFallback();
          } finally {
            setIsFallbackBusy(false);
          }
        }}
      >
        Google 계정으로 계속하기
      </Button>
    );
  }

  return (
    <div className={styles.wrap} aria-busy={status !== 'ready'}>
      <div ref={containerRef} className={[styles.slot, status === 'loading' ? styles.hidden : ''].join(' ')} />
      {status === 'loading' && <div className={styles.placeholder} role="status">Google 로그인 준비 중…</div>}
      {status === 'exchanging' && <p className={styles.note} role="status">Google 계정 확인 완료. 로그인 중…</p>}
      {status === 'ready' && (
        <button
          type="button"
          className={styles.altLink}
          disabled={disabled || isFallbackBusy}
          onClick={async () => {
            setIsFallbackBusy(true);
            try {
              await onFallback();
            } finally {
              setIsFallbackBusy(false);
            }
          }}
        >
          {isFallbackBusy ? 'Google로 이동 중…' : '버튼이 동작하지 않으면 리다이렉트 방식으로 로그인'}
        </button>
      )}
    </div>
  );
}
