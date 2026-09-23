import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Modal } from '@/components/ui/Modal';
import { NoteComposer } from './NoteComposer';

/**
 * /notes/new 를 "현재 화면 위의 팝업"으로 그린다.
 * App.tsx 가 location.state.backgroundLocation 이 있을 때만 이 컴포넌트를 라우팅한다.
 */
export function NoteComposerModal() {
  const navigate = useNavigate();
  const location = useLocation();
  const background = (location.state as { backgroundLocation?: Location } | null)?.backgroundLocation;

  const close = useCallback(() => {
    if (background) navigate(-1);
    else navigate('/notes', { replace: true });
  }, [background, navigate]);

  return (
    <Modal title="새 학습 노트" description="필수 항목(제목·내용)이 비어 있으면 저장할 수 없습니다." onClose={close} size="wide">
      <NoteComposer onCancel={close} />
    </Modal>
  );
}
