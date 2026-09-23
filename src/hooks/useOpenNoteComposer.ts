import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';

/**
 * "새 노트" 진입점. 로그인 상태면 현재 화면을 배경으로 두고 /notes/new 를 팝업으로 연다.
 * 비로그인은 /login 으로 보내고, 로그인 후 /notes/new 전체 페이지로 복귀한다.
 */
export function useOpenNoteComposer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  return useCallback(
    (lessonSlug?: string) => {
      if (!user) {
        navigate('/login', { state: { from: '/notes/new' } });
        return;
      }
      navigate('/notes/new', { state: { backgroundLocation: location, lessonSlug: lessonSlug ?? null } });
    },
    [user, navigate, location],
  );
}
