import type { ReactNode } from 'react';
import styles from './PageHeader.module.css';

export interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

/** 제목이 스스로 무게를 가진다 — 위에 작은 라벨을 두지 않는다 */
export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className={styles.header}>
      <div>
        <h1 className={styles.title}>{title}</h1>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {actions && <div className={styles.actions}>{actions}</div>}
    </div>
  );
}
