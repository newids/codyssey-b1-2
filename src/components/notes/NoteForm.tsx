import type { FormEvent } from 'react';
import type { NoteInput } from '@/lib/types';
import { useNoteForm } from '@/hooks/useNoteForm';
import { NOTE_CONTENT_MAX, NOTE_TITLE_MAX } from '@/lib/validation';
import { LESSONS } from '@/data/lessons';
import { Input, Textarea } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import styles from './NoteForm.module.css';

export interface NoteFormProps {
  initialValues?: NoteInput;
  submitLabel: string;
  onSubmit: (values: NoteInput) => Promise<void>;
  onCancel: () => void;
}

const LESSON_OPTIONS = LESSONS.map((l) => ({ value: l.slug, label: `${l.order}. ${l.title}` }));

/** 등록/수정 공용 폼. 입력값 → 미리보기 카드가 실시간으로 바뀐다 (렌더링 지점) */
export function NoteForm({ initialValues, submitLabel, onSubmit, onCancel }: NoteFormProps) {
  const form = useNoteForm(initialValues);
  const { values, visibleErrors, submitStatus, submitError, setField, touch } = form;
  const isSubmitting = submitStatus === 'loading';

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void form.submit(onSubmit);
  };

  return (
    <div className={styles.layout}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate aria-busy={isSubmitting}>
        {submitStatus === 'error' && submitError && (
          <div className={styles.submitError} role="alert">
            {submitError}
          </div>
        )}
        <Input
          label="제목"
          required
          placeholder="예) useEffect 의존성 배열을 빠뜨리면 생기는 일"
          value={values.title}
          maxLength={NOTE_TITLE_MAX}
          onChange={(e) => setField('title', e.target.value)}
          onBlur={() => touch('title')}
          error={visibleErrors.title}
          disabled={isSubmitting}
        />
        <Select
          label="관련 레슨 (선택)"
          options={LESSON_OPTIONS}
          placeholder="레슨을 고르지 않으면 자유 노트"
          value={values.lesson_slug ?? ''}
          onChange={(e) => setField('lesson_slug', e.target.value || null)}
          disabled={isSubmitting}
        />
        <Textarea
          label="내용"
          required
          placeholder="오늘 배운 것을 내 말로 다시 써 보세요. 코드 조각, 헷갈린 점, 해결한 방법…"
          value={values.content}
          maxLength={NOTE_CONTENT_MAX}
          onChange={(e) => setField('content', e.target.value)}
          onBlur={() => touch('content')}
          error={visibleErrors.content}
          hint="10자 이상. 줄바꿈은 그대로 보존됩니다."
          disabled={isSubmitting}
        />
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={values.is_public}
            onChange={(e) => setField('is_public', e.target.checked)}
            disabled={isSubmitting}
          />
          다른 학습자에게 공개
        </label>
        <div className={styles.actions}>
          <Button type="button" variant="ghost" onClick={onCancel} disabled={isSubmitting}>
            취소
          </Button>
          <Button type="submit" loading={isSubmitting}>
            {isSubmitting ? '저장 중…' : submitLabel}
          </Button>
        </div>
      </form>

      <aside className={styles.preview} aria-label="미리보기">
        <p className={styles.previewLabel}>미리보기 — 입력값이 바뀌면 즉시 갱신됩니다</p>
        <Card>
          <div className={styles.previewMeta}>
            {values.lesson_slug ? (
              <Badge tone="accent">{LESSONS.find((l) => l.slug === values.lesson_slug)?.title}</Badge>
            ) : (
              <Badge>자유 노트</Badge>
            )}
            {!values.is_public && <Badge tone="warn">비공개</Badge>}
          </div>
          <h3 className={styles.previewTitle}>{values.title.trim() || <span className={styles.placeholder}>제목이 여기에 표시됩니다</span>}</h3>
          <p className={styles.previewBody}>{values.content.trim() || <span className={styles.placeholder}>내용이 여기에 표시됩니다</span>}</p>
        </Card>
      </aside>
    </div>
  );
}
