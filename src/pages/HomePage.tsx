import { Link } from 'react-router-dom';
import { LESSONS } from '@/data/lessons';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import styles from './HomePage.module.css';

const FLOW = ['이벤트', '상태 변경', '리렌더링'];

export function HomePage() {
  const { user } = useAuth();
  return (
    <>
      <section className={styles.hero} aria-labelledby="hero-title">
        <div className={styles.heroText}>
          <p className={styles.eyebrow}>Codyssey B1-2 · React 학습 SPA</p>
          <h1 id="hero-title" className={styles.title}>
            버튼 누르면<br />화면이 <em>스르륵</em> 바뀌는 이유
          </h1>
          <p className={styles.lead}>
            React의 컴포넌트·상태·이벤트·비동기 렌더링을 8개 레슨으로 배우고, 배운 것을 학습 노트로 남기세요.
            로그인하면 진도와 퀴즈 점수가 기록됩니다.
          </p>
          <div className={styles.cta}>
            <Link to="/lessons"><Button size="lg">레슨 시작하기</Button></Link>
            <Link to="/notes"><Button size="lg" variant="secondary">학습 노트 둘러보기</Button></Link>
            {!user && <Link to="/login" className={styles.loginLink}>Google로 로그인 →</Link>}
          </div>
        </div>
        <div className={styles.flow} aria-label="React 데이터 흐름">
          {FLOW.map((step, i) => (
            <div key={step} className={styles.flowStep} style={{ animationDelay: `${i * 140}ms` }}>
              <span className={styles.flowNum}>{i + 1}</span>
              <span>{step}</span>
              {i < FLOW.length - 1 && <span className={styles.flowArrow} aria-hidden="true">↓</span>}
            </div>
          ))}
        </div>
      </section>

      <section className={styles.lessons} aria-labelledby="lessons-title">
        <div className={styles.sectionHead}>
          <h2 id="lessons-title">8개 레슨</h2>
          <Link to="/lessons">전체 보기 →</Link>
        </div>
        <ol className={styles.lessonList}>
          {LESSONS.map((l) => (
            <li key={l.slug}>
              <Link to={`/lessons/${l.slug}`} className={styles.lessonRow}>
                <span className={styles.lessonNum}>{String(l.order).padStart(2, '0')}</span>
                <span className={styles.lessonTitle}>{l.title}</span>
                <span className={styles.lessonSub}>{l.subtitle}</span>
                <Badge tone={l.level === '입문' ? 'success' : l.level === '기본' ? 'accent' : 'warn'}>{l.level}</Badge>
              </Link>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.how} aria-labelledby="how-title">
        <h2 id="how-title">이 사이트 자체가 교재입니다</h2>
        <div className={styles.howGrid}>
          <article className={styles.howCard}>
            <h3>라우팅 10개</h3>
            <p>목록·상세·등록·수정·프로필·404까지. URL이 바뀌면 컴포넌트가 바뀐다.</p>
          </article>
          <article className={styles.howCard}>
            <h3>학습 노트 CRUD</h3>
            <p>Supabase에 저장되는 핵심 데이터. 등록·조회·수정·삭제 흐름을 직접 써 본다.</p>
          </article>
          <article className={styles.howCard}>
            <h3>로딩 · 에러 · 빈 상태</h3>
            <p>AsyncBoundary 하나로 모든 화면이 같은 패턴을 쓴다.</p>
          </article>
          <article className={styles.howCard}>
            <h3>커스텀 훅</h3>
            <p>useNotes, useNote, useLessonProgress — 요청과 상태를 훅에 담았다.</p>
          </article>
        </div>
      </section>
    </>
  );
}
