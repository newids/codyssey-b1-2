import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import styles from './NotFoundPage.module.css';

export function NotFoundPage() {
  const { pathname } = useLocation();
  return (
    <section className={styles.wrap} aria-labelledby="nf-title">
      <p className={styles.code}>404</p>
      <h1 id="nf-title" className={styles.title}>이 주소에는 화면이 없습니다</h1>
      <p className={styles.text}>
        <code>{pathname}</code> 에 해당하는 라우트가 없습니다. SPA에서는 매칭되는 <code>&lt;Route&gt;</code>가 없으면 <code>path="*"</code> 라우트가 이 페이지를 그립니다.
      </p>
      <div className={styles.actions}>
        <Link to="/"><Button>홈으로</Button></Link>
        <Link to="/lessons"><Button variant="secondary">레슨 보기</Button></Link>
      </div>
    </section>
  );
}
