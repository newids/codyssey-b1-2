import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LESSONS } from '@/data/lessons';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Icon } from '@/components/ui/Icon';
import styles from './HomePage.module.css';

const STAGES = ['이벤트', '상태 변경', '리렌더링'] as const;
const STAGE_MS = 380;
const LEVEL_TONE = { 입문: 'success', 기본: 'accent', 응용: 'warn' } as const;

/**
 * 첫 화면이 곧 논지다: 버튼을 누르면(이벤트) count 가 바뀌고(상태) 숫자가 다시 그려진다(렌더링).
 * 세 단계가 순서대로 켜지는 것은 표시용이고, 실제 갱신은 setCount 한 줄이 전부다.
 */
function FlowDemo() {
  const [count, setCount] = useState(0);
  const [litStage, setLitStage] = useState(-1);

  useEffect(() => {
    if (litStage < 0) return;
    if (litStage >= STAGES.length - 1) {
      const off = window.setTimeout(() => setLitStage(-1), STAGE_MS * 2);
      return () => window.clearTimeout(off);
    }
    const next = window.setTimeout(() => setLitStage((s) => s + 1), STAGE_MS);
    return () => window.clearTimeout(next);
  }, [litStage]);

  const press = () => {
    setCount((c) => c + 1);
    setLitStage(0);
  };

  return (
    <div className={['glass-strong', styles.demo].join(' ')} aria-label="이벤트 → 상태 → 렌더링 데모">
      <ol className={styles.stages}>
        {STAGES.map((stage, i) => (
          <li key={stage} className={[styles.stage, litStage === i ? styles.stageLit : '', litStage > i ? styles.stageDone : ''].join(' ')}>
            <span className={styles.stageNum}>{i + 1}</span>
            <span>{stage}</span>
            <span className={styles.stageCode}>
              {i === 0 && 'onClick'}
              {i === 1 && 'setCount(c + 1)'}
              {i === 2 && <>{'{count}'} → <output key={count} className={styles.count}>{count}</output></>}
            </span>
          </li>
        ))}
      </ol>
      <Button size="lg" onClick={press} icon={<Icon name="bolt" size={18} />} className={styles.demoButton}>
        버튼 누르기
      </Button>
      <p className={styles.demoNote}>
        누를 때마다 <code>count</code> state가 바뀌고 React가 이 카드만 다시 그립니다. 여기까지가 이 사이트가 가르치는 전부입니다.
      </p>
    </div>
  );
}

export function HomePage() {
  const { user } = useAuth();
  return (
    <>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroText}>
          <h1 id="hero-title" className={styles.title}>
            버튼 누르면 화면이<br /><em>스르륵</em> 바뀌는 이유
          </h1>
          <p className={styles.lead}>
            React의 컴포넌트·상태·이벤트·비동기 렌더링을 8개 레슨으로 배우고, 배운 것을 학습 노트로 남기세요.
            로그인하면 진도와 퀴즈 점수가 기록됩니다.
          </p>
          <div className={styles.cta}>
            <Link to="/lessons"><Button size="lg" icon={<Icon name="book" />}>레슨 시작하기</Button></Link>
            <Link to="/notes"><Button size="lg" variant="secondary" icon={<Icon name="note" />}>학습 노트 둘러보기</Button></Link>
            {!user && <Link to="/login" className={styles.loginLink}>Google로 로그인 <Icon name="arrow-right" size={14} /></Link>}
          </div>
        </div>
        <FlowDemo />
      </section>

      <section className={['glass', styles.lessons].join(' ')} aria-labelledby="lessons-title">
        <div className={styles.sectionHead}>
          <h2 id="lessons-title">8개 레슨</h2>
          <Link to="/lessons" className={styles.more}>전체 보기 <Icon name="arrow-right" size={14} /></Link>
        </div>
        <ol className={styles.lessonList}>
          {LESSONS.map((l) => (
            <li key={l.slug}>
              <Link to={`/lessons/${l.slug}`} className={styles.lessonRow}>
                <span className={styles.lessonNum}>{l.order}</span>
                <span className={styles.lessonTitle}>{l.title}</span>
                <span className={styles.lessonSub}>{l.subtitle}</span>
                <Badge tone={LEVEL_TONE[l.level]}>{l.level}</Badge>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.how} aria-labelledby="how-title">
        <h2 id="how-title">이 사이트 자체가 교재입니다</h2>
        <div className={['glass', styles.howPanel].join(' ')}>
          <article className={styles.howLead}>
            <h3 className={styles.howLeadTitle}>라우팅 10개</h3>
            <p>목록·상세·등록·수정·프로필·404까지. URL이 바뀌면 컴포넌트가 바뀐다.</p>
            <Link to="/lessons/routing" className={styles.howLink}>라우팅 레슨으로 <Icon name="arrow-right" size={14} /></Link>
          </article>
          <ol className={styles.howList}>
            <li>
              <h3>학습 노트 CRUD</h3>
              <p>Supabase에 저장되는 핵심 데이터. 등록·조회·수정·삭제 흐름을 직접 써 본다.</p>
            </li>
            <li>
              <h3>로딩 · 에러 · 빈 상태</h3>
              <p>AsyncBoundary 하나로 모든 화면이 같은 패턴을 쓴다.</p>
            </li>
            <li>
              <h3>커스텀 훅</h3>
              <p>useNotes, useNote, useLessonProgress — 요청과 상태를 훅에 담았다.</p>
            </li>
          </ol>
        </div>
      </section>
    </>
  );
}
