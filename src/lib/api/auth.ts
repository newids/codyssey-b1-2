import { supabase } from '../supabase';

/**
 * 기본 경로: Google Identity Services 버튼이 준 ID 토큰을 Supabase 세션으로 교환한다.
 * Supabase 콜백 URL(…supabase.co)을 거치지 않아 Google 동의 화면에 앱 이름이 표시된다.
 */
export async function signInWithGoogleIdToken(credential: string, nonce: string): Promise<void> {
  const { error } = await supabase.auth.signInWithIdToken({ provider: 'google', token: credential, nonce });
  if (error) throw error;
}

/** 예비 경로: GIS 스크립트를 못 불러오거나 클라이언트 ID가 없을 때 쓰는 리다이렉트 방식 */
export async function signInWithGoogle(): Promise<void> {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: `${window.location.origin}/login` },
  });
  if (error) throw error;
}

export async function signInWithEmailLink(email: string): Promise<void> {
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: { emailRedirectTo: `${window.location.origin}/login` },
  });
  if (error) throw error;
}

export async function signOut(): Promise<void> {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
