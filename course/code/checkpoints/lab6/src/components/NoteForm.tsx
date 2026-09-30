import { useState } from 'react';
import type { FormEvent } from 'react';

type Props = {
  onAdd: (title: string, body: string) => void;
};

type FormErrors = {
  title?: string;
  body?: string;
};

const TITLE_MAX = 30;
const BODY_MAX = 200;

function validateTitle(title: string): string | undefined {
  const trimmed = title.trim();
  if (trimmed === '') return '제목을 입력하세요.';
  if (trimmed.length > TITLE_MAX) return `제목은 ${TITLE_MAX}자까지 쓸 수 있습니다.`;
  return undefined;
}

function validateBody(body: string): string | undefined {
  if (body.length > BODY_MAX) return `내용은 ${BODY_MAX}자까지 쓸 수 있습니다.`;
  return undefined;
}

export default function NoteForm({ onAdd }: Props) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    // 폼을 제출하면 브라우저가 페이지를 새로 고치는데, 그 기본 동작을 막는다.
    event.preventDefault();

    const nextErrors: FormErrors = {
      title: validateTitle(title),
      body: validateBody(body),
    };
    setErrors(nextErrors);
    if (nextErrors.title || nextErrors.body) return;

    onAdd(title.trim(), body.trim());
    setTitle('');
    setBody('');
  }

  return (
    <form className="note-form" onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label className="field-label" htmlFor="note-title">
          제목
        </label>
        <input
          id="note-title"
          className={errors.title ? 'input has-error' : 'input'}
          aria-invalid={Boolean(errors.title)}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="오늘 배운 것을 한 줄로"
        />
        {errors.title && (
          <p className="field-error" role="alert">
            {errors.title}
          </p>
        )}
      </div>

      <div className="field">
        <label className="field-label" htmlFor="note-body">
          내용
        </label>
        <textarea
          id="note-body"
          className={errors.body ? 'input has-error' : 'input'}
          aria-invalid={Boolean(errors.body)}
          value={body}
          onChange={(event) => setBody(event.target.value)}
          placeholder="기억하고 싶은 내용을 적어 보세요"
        />
        <p className="field-hint">
          {body.length} / {BODY_MAX}
        </p>
        {errors.body && (
          <p className="field-error" role="alert">
            {errors.body}
          </p>
        )}
      </div>

      <button type="submit" className="btn btn-primary">
        메모 추가
      </button>
    </form>
  );
}
