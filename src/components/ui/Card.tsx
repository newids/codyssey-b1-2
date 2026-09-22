import type { HTMLAttributes, ReactNode } from 'react';
import styles from './Card.module.css';

export interface CardProps extends HTMLAttributes<HTMLElement> {
  as?: 'div' | 'article' | 'section' | 'li';
  /** 호버 시 살짝 떠오르는 인터랙티브 카드 */
  interactive?: boolean;
  padding?: 'sm' | 'md' | 'lg';
  children: ReactNode;
}

export function Card({ as: Tag = 'div', interactive = false, padding = 'md', className, children, ...rest }: CardProps) {
  const classes = [styles.card, styles[padding], interactive ? styles.interactive : '', className ?? ''].filter(Boolean).join(' ');
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  );
}
