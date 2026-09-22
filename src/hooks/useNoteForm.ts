import { useCallback, useMemo, useState } from 'react';
import { hasErrors, validateNote, type NoteErrors } from '@/lib/validation';
import { toUserMessage } from '@/lib/errors';
import type { AsyncStatus, NoteInput } from '@/lib/types';

export const EMPTY_NOTE: NoteInput = { title: '', content: '', lesson_slug: null, is_public: true };

export interface NoteFormState {
  values: NoteInput;
  errors: NoteErrors;
  /** touched 필드만 에러를 노출한다 */
  visibleErrors: NoteErrors;
  isValid: boolean;
  submitStatus: AsyncStatus;
  /** 사용자에게 바로 보여줄 수 있는 한 줄 메시지 (toUserMessage 적용됨) */
  submitError: string | null;
  setField: <K extends keyof NoteInput>(name: K, value: NoteInput[K]) => void;
  touch: (name: keyof NoteInput) => void;
  submit: (onSubmit: (values: NoteInput) => Promise<void>) => Promise<void>;
}

/** 폼 입력·검증·제출 상태를 훅으로 분리 — controlled input의 단일 출처 */
export function useNoteForm(initial: NoteInput = EMPTY_NOTE): NoteFormState {
  const [values, setValues] = useState<NoteInput>(initial);
  const [touched, setTouched] = useState<Set<keyof NoteInput>>(() => new Set());
  const [submitStatus, setSubmitStatus] = useState<AsyncStatus>('idle');
  const [submitError, setSubmitError] = useState<string | null>(null);

  const errors = useMemo(() => validateNote(values), [values]);
  const isValid = !hasErrors(errors);

  const visibleErrors = useMemo(() => {
    const out: NoteErrors = {};
    (Object.keys(errors) as (keyof NoteInput)[]).forEach((key) => {
      if (touched.has(key)) out[key] = errors[key];
    });
    return out;
  }, [errors, touched]);

  const setField = useCallback(<K extends keyof NoteInput>(name: K, value: NoteInput[K]) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const touch = useCallback((name: keyof NoteInput) => {
    setTouched((prev) => (prev.has(name) ? prev : new Set(prev).add(name)));
  }, []);

  const submit = useCallback(
    async (onSubmit: (values: NoteInput) => Promise<void>) => {
      setTouched(new Set<keyof NoteInput>(['title', 'content', 'lesson_slug', 'is_public']));
      if (!isValid) return;
      setSubmitStatus('loading');
      setSubmitError(null);
      try {
        await onSubmit({ ...values, title: values.title.trim(), content: values.content.trim() });
        setSubmitStatus('success');
      } catch (err) {
        setSubmitStatus('error');
        setSubmitError(toUserMessage(err));
      }
    },
    [isValid, values],
  );

  return { values, errors, visibleErrors, isValid, submitStatus, submitError, setField, touch, submit };
}
