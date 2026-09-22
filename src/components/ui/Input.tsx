import { useId, type InputHTMLAttributes, type TextareaHTMLAttributes } from 'react';
import styles from './Input.module.css';

interface FieldShellProps {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement>, FieldShellProps {}
export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement>, FieldShellProps {
  /** 오른쪽 아래 글자 수 카운터 */
  maxLength?: number;
}

/** controlled input. error가 있으면 aria-invalid + 필드 바로 아래 메시지 */
export function Input({ label, hint, error, required, id, className, ...rest }: InputProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;
  return (
    <div className={[styles.field, className ?? ''].join(' ')}>
      <label htmlFor={inputId} className={styles.label}>
        {label} {required && <span className={styles.required} aria-hidden="true">*</span>}
      </label>
      <input
        id={inputId}
        className={[styles.control, error ? styles.invalid : ''].join(' ')}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        aria-required={required || undefined}
        {...rest}
      />
      <FieldMessage id={inputId} hint={hint} error={error} />
    </div>
  );
}

export function Textarea({ label, hint, error, required, id, className, maxLength, value, ...rest }: TextareaProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;
  const length = typeof value === 'string' ? value.length : 0;
  return (
    <div className={[styles.field, className ?? ''].join(' ')}>
      <label htmlFor={inputId} className={styles.label}>
        {label} {required && <span className={styles.required} aria-hidden="true">*</span>}
      </label>
      <textarea
        id={inputId}
        className={[styles.control, styles.textarea, error ? styles.invalid : ''].join(' ')}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        aria-required={required || undefined}
        value={value}
        maxLength={maxLength}
        {...rest}
      />
      <div className={styles.row}>
        <FieldMessage id={inputId} hint={hint} error={error} />
        {maxLength && (
          <span className={styles.counter} aria-live="polite">
            {length.toLocaleString()} / {maxLength.toLocaleString()}
          </span>
        )}
      </div>
    </div>
  );
}

function FieldMessage({ id, hint, error }: { id: string; hint?: string; error?: string }) {
  if (error) {
    return (
      <p id={`${id}-error`} className={styles.error} role="alert">
        {error}
      </p>
    );
  }
  if (hint) {
    return (
      <p id={`${id}-hint`} className={styles.hint}>
        {hint}
      </p>
    );
  }
  return <p className={styles.hint} aria-hidden="true">&nbsp;</p>;
}
