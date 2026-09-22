import { useEffect, useState, type FormEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { signInWithEmailLink, signInWithGoogle } from '@/lib/api/auth';
import { isValidEmail } from '@/lib/validation';
import { toUserMessage } from '@/lib/errors';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
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

  const handleGoogle = async () => {
    setMode('google');
    setError(null);
    try {
      await signInWithGoogle(); // 리다이렉트되므로 성공 시 이 아래는 실행되지 않는다
    } catch (err) {
      setError(toUserMessage(err));
      setMode('idle');
    }
  };

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
        <p className={styles.eyebrow}>로그인</p>
        <h1 className={styles.title}>진도와 점수를 기록하려면<br />로그인하세요</h1>
        <p className={styles.lead}>학습 노트 작성·수정·삭제, 레슨 완료 표시, 퀴즈 점수 기록에 로그인이 필요합니다.</p>

        {error && <div className={styles.error} role="alert">{error}</div>}

        <Button size="lg" onClick={handleGoogle} loading={mode === 'google'} className={styles.googleButton}
          icon={<GoogleIcon />}>
          Google 계정으로 계속하기
        </Button>

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

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.5l6.7-6.7C35.6 2.6 30.2 0 24 0 14.6 0 6.5 5.4 2.6 13.3l7.8 6.1C12.3 13.6 17.7 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.5 24.5c0-1.6-.1-2.8-.4-4H24v8.1h12.7c-.3 2.1-1.7 5.3-4.8 7.4l7.4 5.7c4.4-4.1 7.2-10.1 7.2-17.2z"/>
      <path fill="#FBBC05" d="M10.4 28.6A14.6 14.6 0 0 1 9.5 24c0-1.6.3-3.2.8-4.6l-7.8-6.1A24 24 0 0 0 0 24c0 3.9.9 7.5 2.6 10.7l7.8-6.1z"/>
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.4-5.7c-2 1.4-4.8 2.4-8.5 2.4-6.3 0-11.7-4.1-13.6-9.9l-7.8 6.1C6.5 42.6 14.6 48 24 48z"/>
    </svg>
  );
}
