import { Button } from './Button';
import { Icon } from './Icon';
import styles from './States.module.css';

export interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export function ErrorState({ title = '요청에 실패했습니다', message, onRetry }: ErrorStateProps) {
  return (
    <div className={['glass', styles.state, styles.error].join(' ')} role="alert">
      <span className={styles.icon}><Icon name="alert" size={22} /></span>
      <h3 className={styles.stateTitle}>{title}</h3>
      <p className={styles.stateText}>{message}</p>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          다시 시도
        </Button>
      )}
    </div>
  );
}
