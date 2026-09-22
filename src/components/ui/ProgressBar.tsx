import styles from './ProgressBar.module.css';

export interface ProgressBarProps {
  value: number;
  max?: number;
  label: string;
  showValue?: boolean;
}

export function ProgressBar({ value, max = 100, label, showValue = true }: ProgressBarProps) {
  const ratio = max > 0 ? Math.min(1, Math.max(0, value / max)) : 0;
  return (
    <div className={styles.wrap}>
      <div className={styles.meta}>
        <span>{label}</span>
        {showValue && <span className={styles.value}>{Math.round(ratio * 100)}%</span>}
      </div>
      <div className={styles.track} role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={value} aria-label={label}>
        <div className={styles.fill} style={{ transform: `scaleX(${ratio})` }} />
      </div>
    </div>
  );
}
