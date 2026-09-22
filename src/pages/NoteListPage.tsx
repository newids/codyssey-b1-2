import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useNotes } from '@/hooks/useNotes';
import { useDebounce } from '@/hooks/useDebounce';
import type { NoteFilter } from '@/lib/types';
import { LESSONS } from '@/data/lessons';
import { PageHeader } from '@/components/layout/PageHeader';
import { AsyncBoundary } from '@/components/ui/AsyncBoundary';
import { NoteGrid } from '@/components/notes/NoteGrid';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import styles from './NoteListPage.module.css';

const LESSON_OPTIONS = LESSONS.map((l) => ({ value: l.slug, label: `${l.order}. ${l.title}` }));

/** 검색어·필터는 URL 쿼리에 둔다 — 새로고침/공유해도 같은 화면 */
export function NoteListPage() {
  const { user } = useAuth();
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState(params.get('q') ?? '');
  const debouncedSearch = useDebounce(search, 300);
  const filter: NoteFilter = params.get('filter') === 'mine' && user ? 'mine' : 'all';
  const lessonSlug = params.get('lesson') ?? '';

  const notes = useNotes({
    ownerId: filter === 'mine' ? user?.id : undefined,
    lessonSlug: lessonSlug || undefined,
    search: debouncedSearch || undefined,
  });

  const updateParam = (key: string, value: string) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  const description = useMemo(() => {
    if (notes.status !== 'success') return undefined;
    return `${notes.data.length}개의 노트`;
  }, [notes.status, notes.data.length]);

  return (
    <>
      <PageHeader
        eyebrow="Notes"
        title="학습 노트"
        description="배운 것을 내 말로 다시 쓴 기록. 다른 학습자의 공개 노트도 읽을 수 있습니다."
        actions={
          user ? (
            <Link to="/notes/new"><Button>+ 새 노트</Button></Link>
          ) : (
            <Link to="/login" state={{ from: '/notes/new' }}><Button variant="secondary">로그인 후 작성</Button></Link>
          )
        }
      />

      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <label htmlFor="note-search" className="visually-hidden">제목 검색</label>
          <input
            id="note-search"
            type="search"
            className={styles.search}
            placeholder="제목으로 검색…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              updateParam('q', e.target.value);
            }}
          />
        </div>
        <Select
          label="레슨"
          className={styles.lessonSelect}
          options={LESSON_OPTIONS}
          placeholder="모든 레슨"
          value={lessonSlug}
          onChange={(e) => updateParam('lesson', e.target.value)}
        />
        {user && (
          <div className={styles.segment} role="group" aria-label="노트 범위">
            <button type="button" className={filter === 'all' ? styles.segActive : ''} aria-pressed={filter === 'all'} onClick={() => updateParam('filter', '')}>전체</button>
            <button type="button" className={filter === 'mine' ? styles.segActive : ''} aria-pressed={filter === 'mine'} onClick={() => updateParam('filter', 'mine')}>내 노트</button>
          </div>
        )}
      </div>

      {description && <p className={styles.count} aria-live="polite">{description}</p>}

      <AsyncBoundary
        status={notes.status}
        error={notes.error}
        isEmpty={notes.data.length === 0}
        onRetry={notes.refetch}
        loading={{ variant: 'skeleton', count: 6 }}
        empty={{
          title: debouncedSearch || lessonSlug ? '조건에 맞는 노트가 없습니다' : '표시할 노트가 없습니다',
          description: debouncedSearch || lessonSlug ? '검색어나 레슨 필터를 바꿔 보세요.' : '첫 학습 노트를 작성해 보세요.',
          action: user ? <Link to="/notes/new"><Button size="sm">노트 작성하기</Button></Link> : undefined,
        }}
      >
        <NoteGrid notes={notes.data} currentUserId={user?.id} />
      </AsyncBoundary>
    </>
  );
}
