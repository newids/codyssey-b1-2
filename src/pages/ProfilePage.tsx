import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useLessonProgress } from '@/hooks/useLessonProgress';
import { useQuizAttempts } from '@/hooks/useQuizAttempts';
import { useNotes } from '@/hooks/useNotes';
import { LESSONS } from '@/data/lessons';
import { formatDate } from '@/lib/format';
import { PageHeader } from '@/components/layout/PageHeader';
import { Avatar } from '@/components/ui/Avatar';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { AsyncBoundary } from '@/components/ui/AsyncBoundary';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Icon } from '@/components/ui/Icon';
import { NoteGrid } from '@/components/notes/NoteGrid';
import styles from './ProfilePage.module.css';

export function ProfilePage() {
  const { user, displayName, avatarUrl } = useAuth();
  const progress = useLessonProgress(user?.id);
  const quiz = useQuizAttempts(user?.id);
  const myNotes = useNotes({ ownerId: user?.id });

  const completedList = LESSONS.filter((l) => progress.completedSlugs.has(l.slug));
  const solvedCount = Object.keys(quiz.bestByLesson).length;

  return (
    <>
      <PageHeader title="내 진도" description="레슨 완료 현황, 퀴즈 최고 점수, 내가 쓴 노트를 한 곳에서 봅니다." />

      <Card className={styles.identity}>
        <Avatar name={displayName} src={avatarUrl} size={56} />
        <div>
          <h2 className={styles.name}>{displayName}</h2>
          <p className={styles.email}>{user?.email}</p>
        </div>
        <dl className={styles.stats}>
          <div><dt>완료 레슨</dt><dd>{progress.completedCount}<span>/{progress.totalCount}</span></dd></div>
          <div><dt>푼 퀴즈</dt><dd>{solvedCount}<span>/{LESSONS.length}</span></dd></div>
          <div><dt>내 노트</dt><dd>{myNotes.status === 'success' ? myNotes.data.length : '–'}</dd></div>
        </dl>
      </Card>

      <div className={styles.columns}>
        <Card as="section" aria-labelledby="progress-title">
          <h2 id="progress-title" className={styles.sectionTitle}>레슨 진도</h2>
          <AsyncBoundary status={progress.status} error={progress.error} onRetry={progress.refetch}>
            <ProgressBar label="전체 진도" value={progress.completedCount} max={progress.totalCount} />
            <ul className={styles.lessonList}>
              {LESSONS.map((l) => {
                const done = progress.completedSlugs.has(l.slug);
                return (
                  <li key={l.slug} className={done ? styles.done : ''}>
                    <span className={styles.check} aria-hidden="true">{done && <Icon name="check" size={11} />}</span>
                    <Link to={`/lessons/${l.slug}`}>{l.order}. {l.title}</Link>
                  </li>
                );
              })}
            </ul>
            {completedList.length === 0 && <p className={styles.muted}>아직 완료한 레슨이 없습니다. <Link to="/lessons">첫 레슨 시작하기</Link></p>}
          </AsyncBoundary>
        </Card>

        <Card as="section" aria-labelledby="quiz-title">
          <h2 id="quiz-title" className={styles.sectionTitle}>퀴즈 점수</h2>
          <AsyncBoundary
            status={quiz.status}
            error={quiz.error}
            isEmpty={solvedCount === 0}
            onRetry={quiz.refetch}
            empty={{ title: '아직 푼 퀴즈가 없습니다', description: '레슨 끝의 연습 문제를 풀면 여기에 최고 점수가 기록됩니다.', action: <Link to="/lessons"><Button size="sm" variant="secondary">레슨 보기</Button></Link> }}
          >
            <table className={styles.table}>
              <thead>
                <tr><th scope="col">레슨</th><th scope="col">최고 점수</th><th scope="col">시도</th><th scope="col">최근</th></tr>
              </thead>
              <tbody>
                {LESSONS.filter((l) => quiz.bestByLesson[l.slug]).map((l) => {
                  const b = quiz.bestByLesson[l.slug];
                  const isPerfect = b.score === b.total;
                  return (
                    <tr key={l.slug}>
                      <td><Link to={`/lessons/${l.slug}`}>{l.order}. {l.title}</Link></td>
                      <td><Badge tone={isPerfect ? 'success' : 'accent'}>{b.score} / {b.total}</Badge></td>
                      <td className={styles.mono}>{b.attempts}회</td>
                      <td className={styles.mono}>{formatDate(b.lastAt)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </AsyncBoundary>
        </Card>
      </div>

      <section className={styles.notes} aria-labelledby="my-notes-title">
        <div className={styles.notesHead}>
          <h2 id="my-notes-title" className={styles.sectionTitle}>내가 쓴 노트</h2>
          <Link to="/notes/new"><Button size="sm">+ 새 노트</Button></Link>
        </div>
        <AsyncBoundary
          status={myNotes.status}
          error={myNotes.error}
          isEmpty={myNotes.data.length === 0}
          onRetry={myNotes.refetch}
          loading={{ variant: 'skeleton', count: 3 }}
          empty={{ title: '아직 작성한 노트가 없습니다', description: '레슨을 읽고 배운 점을 정리해 보세요.' }}
        >
          <NoteGrid notes={myNotes.data} currentUserId={user?.id} />
        </AsyncBoundary>
      </section>
    </>
  );
}
