import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Loading } from '@/components/ui/Loading';

/** 보너스 3: 보호 라우트 — 세션 복원 전엔 로딩, 비로그인은 /login으로 (돌아올 주소 보존) */
export function ProtectedRoute() {
  const { user, isReady } = useAuth();
  const location = useLocation();
  if (!isReady) return <Loading label="로그인 상태 확인 중…" />;
  if (!user) return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  return <Outlet />;
}
