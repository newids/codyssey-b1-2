import { Link, useParams } from 'react-router-dom';
import { getLesson, LESSONS } from '@/data/lessons';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useLessonProgress } from '@/hooks/useLessonProgress';
import { useQuizAttempts } from '@/hooks/useQuizAttempts';
import { useNotes } from '@/hooks/useNotes';
import { useOpenNoteComposer } from '@/hooks/useOpenNoteComposer';
import { toUserMessage } from '@/lib/errors';
import { LessonContent } from '@/components/lessons/LessonContent';
import { Quiz } from '@/components/lessons/Quiz';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { AsyncBoundary } from '@/components/ui/AsyncBoundary';
import { NoteGrid } from '@/components/notes/NoteGrid';
import { NotFoundPage } from './NotFoundPage';
import styles from './LessonDetailPage.module.css';

export function LessonDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const lesson = getLesson(slug);
  const { user } = useAuth();
  const { showToast } = useToast();
  const progress = useLessonProgress(user?.id);
  const quiz = useQuizAttempts(user?.id);
  const relatedNotes = useNotes({ lessonSlug: slug });
  const openComposer = useOpenNoteComposer();

  if (!lesson) return <NotFoundPage />;

  const isCompleted = progress.completedSlugs.has(lesson.slug);
  const prev = LESSONS.find((l) => l.order === lesson.order - 1);
  const next = LESSONS.find((l) => l.order === lesson.order + 1);
  const best = quiz.bestByLesson[lesson.slug];

  const handleToggle = async () => {
    try {
      await progress.toggle(lesson.slug);
      showToast(isCompleted ? '완료 표시를 해제했습니다.' : `레슨 ${lesson.order} 완료`, 'success');
    } catch (err) {
      showToast(toUserMessage(err), 'error');
    }
  };

  return (
    <article className={styles.article}>
      <header className={styles.header}>
        <h1 className={styles.title}>{lesson.title}</h1>
        <p className={styles.subtitle}>{lesson.subtitle}</p>
        <div className={styles.meta}>
          <Badge tone="accent">레슨 {lesson.order}</Badge>
          <Badge>{lesson.level}</Badge>
          <span className={styles.minutes}>약 {lesson.minutes}분</span>
          {isCompleted && <Badge tone="success"><Icon name="check" size={12} /> 완료</Badge>}
          {best && <Badge>최고 점수 {best.score}/{best.total}</Badge>}
        </div>
      </header>

      <div className={styles.grid}>
        <div>
          <div className={['plate', styles.plate].join(' ')}>
            <LessonContent blocks={lesson.blocks} />
          </div>

          <section className={styles.usedIn} aria-labelledby="used-in">
            <h2 id="used-in" className={styles.usedInTitle}>이 사이트에서 쓰인 곳</h2>
            <ul>
              {lesson.usedIn.map((f) => (
                <li key={f}>
                  <a href={`https://github.com/newids/codyssey-b1-2/blob/main/${f}`} target="_blank" rel="noreferrer">
                    <code>{f}</code>
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <Quiz
            key={lesson.slug}
            questions={lesson.quiz}
            isLoggedIn={Boolean(user)}
            onSubmit={user ? (score, total) => quiz.record(lesson.slug, score, total) : undefined}
          />
        </div>

        <aside className={styles.side}>
          <div className={['glass', styles.sideCard].join(' ')}>
            <h3 className={styles.sideTitle}>노트 남기기</h3>
            <p className={styles.sideText}>배운 내용을 내 말로 정리하면 오래 남습니다.</p>
            <Button variant="secondary" className={styles.sideButton} icon={<Icon name="plus" size={16} />} onClick={() => openComposer(lesson.slug)}>
              이 레슨에 노트 작성
            </Button>
          </div>
          <div className={['glass', styles.sideCard].join(' ')}>
            <h3 className={styles.sideTitle}>진도</h3>
            {user ? (
              <Button
                variant={isCompleted ? 'secondary' : 'primary'}
                onClick={handleToggle}
                loading={progress.pendingSlug === lesson.slug}
                className={styles.sideButton}
              >
                {isCompleted ? '완료 취소' : '이 레슨 완료로 표시'}
              </Button>
            ) : (
              <p className={styles.sideText}>
                <Link to="/login" state={{ from: `/lessons/${lesson.slug}` }}>로그인</Link>하면 진도를 기록할 수 있어요.
              </p>
            )}
          </div>
          <nav className={styles.pager} aria-label="레슨 이동">
            {prev ? (
              <Link to={`/lessons/${prev.slug}`} className={styles.pagerLink}>
                <Button variant="secondary" className={styles.sideButton} icon={<Icon name="arrow-left" size={16} />}>
                  <span className={styles.pagerLabel}>이전 · {prev.order}. {prev.title}</span>
                </Button>
              </Link>
            ) : null}
            {next ? (
              <Link to={`/lessons/${next.slug}`} className={styles.pagerLink}>
                <Button className={styles.sideButton} icon={<Icon name="arrow-right" size={16} />}>
                  <span className={styles.pagerLabel}>다음 · {next.order}. {next.title}</span>
                </Button>
              </Link>
            ) : (
              <Link to="/lessons" className={styles.pagerLink}>
                <Button className={styles.sideButton} icon={<Icon name="book" size={16} />}>모든 레슨 완료 · 목록으로</Button>
              </Link>
            )}
          </nav>
        </aside>
      </div>

      <section className={styles.related} aria-labelledby="related-title">
        <h2 id="related-title">이 레슨의 학습 노트</h2>
        <AsyncBoundary
          status={relatedNotes.status}
          error={relatedNotes.error}
          isEmpty={relatedNotes.data.length === 0}
          onRetry={relatedNotes.refetch}
          loading={{ variant: 'skeleton', count: 2 }}
          empty={{ title: '아직 이 레슨의 노트가 없습니다', description: '첫 노트를 남겨 보세요.' }}
        >
          <NoteGrid notes={relatedNotes.data} currentUserId={user?.id} />
        </AsyncBoundary>
      </section>
    </article>
  );
}
