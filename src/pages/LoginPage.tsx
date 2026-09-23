import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { signInWithEmailLink, signInWithGoogle, signInWithGoogleIdToken } from '@/lib/api/auth';
import { isValidEmail } from '@/lib/validation';
import { toUserMessage } from '@/lib/errors';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { GoogleSignInButton } from '@/components/auth/GoogleSignInButton';
import styles from './LoginPage.module.css';

type Mode = 'idle' | 'google' | 'email';

export function LoginPage() {
  const { user, isReady } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? '/profile';

  const [mode, setMode] = useState<Mode>('idle');
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 로그인 완료 → 원래 가려던 곳으로
  useEffect(() => {
    if (isReady && user) navigate(from, { replace: true });
  }, [isReady, user, from, navigate]);

  /** GIS 버튼 → ID 토큰 → Supabase 세션. 성공하면 AuthContext 가 user 를 채우고 위 useEffect 가 이동시킨다 */
  const handleGoogleCredential = useCallback(async (credential: string, nonce: string) => {
    setMode('google');
    setError(null);
    try {
      await signInWithGoogleIdToken(credential, nonce);
    } catch (err) {
      setError(toUserMessage(err));
      setMode('idle');
      throw err;
    }
  }, []);

  /** 예비: GIS 를 못 쓰면 Supabase 리다이렉트 방식 */
  const handleGoogleFallback = useCallback(async () => {
    setMode('google');
    setError(null);
    try {
      await signInWithGoogle(); // 리다이렉트되므로 성공 시 이 아래는 실행되지 않는다
    } catch (err) {
      setError(toUserMessage(err));
      setMode('idle');
    }
  }, []);

  const emailError = emailTouched && !isValidEmail(email) ? '올바른 이메일 주소를 입력해 주세요.' : undefined;

  const handleEmail = async (e: FormEvent) => {
    e.preventDefault();
    setEmailTouched(true);
    if (!isValidEmail(email)) return;
    setMode('email');
    setError(null);
    try {
      await signInWithEmailLink(email.trim());
      setIsEmailSent(true);
    } catch (err) {
      setError(toUserMessage(err));
    } finally {
      setMode('idle');
    }
  };

  return (
    <div className={styles.wrap}>
      <Card padding="lg" className={styles.card}>
        <h1 className={styles.title}>진도와 점수를 기록하려면<br />로그인하세요</h1>
        <p className={styles.lead}>학습 노트 작성·수정·삭제, 레슨 완료 표시, 퀴즈 점수 기록에 로그인이 필요합니다.</p>

        {error && <div className={styles.error} role="alert">{error}</div>}

        <GoogleSignInButton onCredential={handleGoogleCredential} onFallback={handleGoogleFallback} disabled={mode !== 'idle'} />

        <div className={styles.divider}><span>또는 이메일 링크</span></div>

        {isEmailSent ? (
          <p className={styles.sent} role="status">
            <strong>{email}</strong> 로 로그인 링크를 보냈습니다. 메일함을 확인해 주세요.
          </p>
        ) : (
          <form onSubmit={handleEmail} noValidate className={styles.form}>
            <Input
              label="이메일"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onBlur={() => setEmailTouched(true)}
              error={emailError}
              disabled={mode !== 'idle'}
            />
            <Button type="submit" variant="secondary" loading={mode === 'email'}>로그인 링크 받기</Button>
          </form>
        )}
      </Card>
    </div>
  );
}

