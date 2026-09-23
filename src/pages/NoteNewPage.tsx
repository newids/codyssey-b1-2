import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/layout/PageHeader';
import { NoteComposer } from '@/components/notes/NoteComposer';

/** /notes/new 를 주소로 직접 열었을 때의 전체 페이지 버전. 다른 화면에서 열면 팝업(NoteComposerModal)으로 뜬다. */
export function NoteNewPage() {
  const navigate = useNavigate();
  return (
    <>
      <PageHeader title="새 학습 노트" description="필수 항목(제목·내용)이 비어 있으면 저장할 수 없습니다." />
      <NoteComposer onCancel={() => navigate(-1)} />
    </>
  );
}
