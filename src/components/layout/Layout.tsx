import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import styles from './Layout.module.css';

/**
 * 공통 레이아웃 — 헤더/푸터를 모든 라우트에 적용. key로 라우트마다 진입 애니메이션 재생.
 * 층 0: 오로라 배경. 세 개의 색 덩어리가 한 시계(--dur-drift, 60초)로 아주 느리게 흐른다.
 * prefers-reduced-motion 이면 정지한다 (global.css).
 */
export function Layout() {
  const { pathname } = useLocation();
  return (
    <div className={styles.shell}>
      <div className={styles.aurora} aria-hidden="true">
        <span className={[styles.field, styles.field1].join(' ')} />
        <span className={[styles.field, styles.field2].join(' ')} />
        <span className={[styles.field, styles.field3].join(' ')} />
      </div>
      <a href="#main" className="visually-hidden">본문으로 건너뛰기</a>
      <Header />
      <main id="main" className={['container', styles.main, 'page-enter'].join(' ')} key={pathname}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
