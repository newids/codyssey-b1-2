import type { ToastItem } from '@/context/ToastContext';
import styles from './Toast.module.css';

export function ToastViewport({ toasts, onDismiss }: { toasts: ToastItem[]; onDismiss: (id: number) => void }) {
  return (
    <div className={styles.viewport} aria-live="polite" aria-atomic="false">
      {toasts.map((t) => (
        <div key={t.id} className={[styles.toast, styles[t.tone]].join(' ')} role="status">
          <span>{t.message}</span>
          <button type="button" className={styles.close} onClick={() => onDismiss(t.id)} aria-label="알림 닫기">
            ×
          </button>
        </div>
      ))}
    </div>
  );
}
