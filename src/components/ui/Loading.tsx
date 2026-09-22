import styles from './States.module.css';

export interface LoadingProps {
  label?: string;
  /** skeleton: 카드 여러 장 모양, spinner: 원형 */
  variant?: 'spinner' | 'skeleton';
  count?: number;
}

export function Loading({ label = '불러오는 중…', variant = 'spinner', count = 3 }: LoadingProps) {
  if (variant === 'skeleton') {
    return (
      <div className={styles.skeletonGrid} role="status" aria-live="polite" aria-label={label}>
        {Array.from({ length: count }, (_, i) => (
          <div key={i} className={styles.skeletonCard} aria-hidden="true">
            <span className={styles.skeletonLine} style={{ width: '40%' }} />
            <span className={styles.skeletonLine} style={{ width: '85%' }} />
            <span className={styles.skeletonLine} style={{ width: '70%' }} />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className={styles.state} role="status" aria-live="polite">
      <span className={styles.spinner} aria-hidden="true" />
      <p className={styles.stateText}>{label}</p>
    </div>
  );
}
