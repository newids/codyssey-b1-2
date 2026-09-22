import { useId, type SelectHTMLAttributes } from 'react';
import styles from './Input.module.css';

export interface SelectOption { value: string; label: string }
export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  placeholder?: string;
}

export function Select({ label, options, placeholder, id, className, ...rest }: SelectProps) {
  const autoId = useId();
  const selectId = id ?? autoId;
  return (
    <div className={[styles.field, className ?? ''].join(' ')}>
      <label htmlFor={selectId} className={styles.label}>{label}</label>
      <select id={selectId} className={styles.control} {...rest}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <p className={styles.hint} aria-hidden="true">&nbsp;</p>
    </div>
  );
}
