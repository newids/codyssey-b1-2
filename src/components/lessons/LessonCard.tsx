import { memo } from 'react';
import { Link } from 'react-router-dom';
import type { Lesson } from '@/data/lessons';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import styles from './LessonCard.module.css';

export interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  bestScore?: { score: number; total: number };
}

const LEVEL_TONE = { 입문: 'success', 기본: 'accent', 응용: 'warn' } as const;

export const LessonCard = memo(function LessonCard({ lesson, isCompleted, bestScore }: LessonCardProps) {
  return (
    <Card as="article" interactive className={[styles.card, isCompleted ? styles.done : ''].join(' ')}>
      <span className={styles.order} aria-hidden="true">{String(lesson.order).padStart(2, '0')}</span>
      <div className={styles.body}>
        <div className={styles.meta}>
          <Badge tone={LEVEL_TONE[lesson.level]}>{lesson.level}</Badge>
          <span className={styles.minutes}>{lesson.minutes}분</span>
          {isCompleted && <Badge tone="success"><Icon name="check" size={12} /> 완료</Badge>}
          {bestScore && <Badge>퀴즈 {bestScore.score}/{bestScore.total}</Badge>}
        </div>
        <h3 className={styles.title}>
          <Link to={`/lessons/${lesson.slug}`} className={styles.link}>{lesson.title}</Link>
        </h3>
        <p className={styles.subtitle}>{lesson.subtitle}</p>
        <p className={styles.summary}>{lesson.summary}</p>
      </div>
    </Card>
  );
});
