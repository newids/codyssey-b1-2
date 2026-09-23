import { useMemo, useState } from 'react';
import { LESSONS, type Lesson } from '@/data/lessons';
import { useAuth } from '@/context/AuthContext';
import { useLessonProgress } from '@/hooks/useLessonProgress';
import { useQuizAttempts } from '@/hooks/useQuizAttempts';
import { PageHeader } from '@/components/layout/PageHeader';
import { LessonCard } from '@/components/lessons/LessonCard';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Card } from '@/components/ui/Card';
import styles from './LessonListPage.module.css';

type LevelFilter = '전체' | Lesson['level'];
const LEVELS: LevelFilter[] = ['전체', '입문', '기본', '응용'];

export function LessonListPage() {
  const { user } = useAuth();
  const progress = useLessonProgress(user?.id);
  const quiz = useQuizAttempts(user?.id);
  const [level, setLevel] = useState<LevelFilter>('전체');

  /** 필터 변경 → 목록 변경 (렌더링 지점). useMemo로 level이 바뀔 때만 재계산 */
  const visible = useMemo(() => (level === '전체' ? LESSONS : LESSONS.filter((l) => l.level === level)), [level]);

  return (
    <>
      <PageHeader
        title="8개 레슨으로 배우는 React"
        description="컴포넌트에서 커스텀 훅까지, 미션의 과제 목표 5개를 순서대로 다룹니다. 각 레슨 끝의 연습 문제로 확인하세요."
      />

      {user && (
        <Card className={styles.progressCard}>
          <ProgressBar label={`내 진도 — ${progress.completedCount} / ${progress.totalCount} 레슨 완료`} value={progress.completedCount} max={progress.totalCount} />
        </Card>
      )}

      <div className={styles.filters} role="group" aria-label="난이도 필터">
        {LEVELS.map((l) => (
          <button
            key={l}
            type="button"
            className={[styles.filter, level === l ? styles.filterActive : ''].join(' ')}
            aria-pressed={level === l}
            onClick={() => setLevel(l)}
          >
            {l}
            <span className={styles.count}>{l === '전체' ? LESSONS.length : LESSONS.filter((x) => x.level === l).length}</span>
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {visible.map((lesson) => (
          <LessonCard
            key={lesson.slug}
            lesson={lesson}
            isCompleted={progress.completedSlugs.has(lesson.slug)}
            bestScore={quiz.bestByLesson[lesson.slug]}
          />
        ))}
      </div>
    </>
  );
}
