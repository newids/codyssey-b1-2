import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface AuthContextValue {
  user: User | null;
  session: Session | null;
  /** 세션 복원이 끝났는지 — 끝나기 전엔 보호 라우트가 판단을 미룬다 */
  isReady: boolean;
  displayName: string;
  avatarUrl: string | null;
}

const AuthContext = createContext<AuthContextValue | null>(null);

/** 보너스 1·3: 로그인 사용자를 전역 상태로, Supabase Auth 세션 구독 */
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let active = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return;
      setSession(data.session);
      setIsReady(true);
    });
    const { data: subscription } = supabase.auth.onAuthStateChange((_event, next) => {
      if (active) setSession(next);
    });
    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  const value = useMemo<AuthContextValue>(() => {
    const user = session?.user ?? null;
    const meta = (user?.user_metadata ?? {}) as { full_name?: string; name?: string; avatar_url?: string; picture?: string };
    return {
      user,
      session,
      isReady,
      displayName: meta.full_name ?? meta.name ?? user?.email?.split('@')[0] ?? '학습자',
      avatarUrl: meta.avatar_url ?? meta.picture ?? null,
    };
  }, [session, isReady]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth는 AuthProvider 안에서만 사용할 수 있습니다.');
  return ctx;
}
