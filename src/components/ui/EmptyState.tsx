import type { ReactNode } from 'react';
import { Icon } from './Icon';
import styles from './States.module.css';

export interface EmptyStateProps {
  title?: string;
  description?: string;
  /** 사용자가 할 수 있는 다음 행동 (예: 작성하기 버튼) */
  action?: ReactNode;
}

export function EmptyState({ title = '표시할 데이터가 없습니다', description, action }: EmptyStateProps) {
  return (
    <div className={['glass', styles.state].join(' ')}>
      <span className={styles.icon}><Icon name="slash" size={22} /></span>
      <h3 className={styles.stateTitle}>{title}</h3>
      {description && <p className={styles.stateText}>{description}</p>}
      {action}
    </div>
  );
}
