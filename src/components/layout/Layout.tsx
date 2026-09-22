import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import styles from './Layout.module.css';

/** 공통 레이아웃 — 헤더/푸터를 모든 라우트에 적용. key로 라우트마다 진입 애니메이션 재생 */
export function Layout() {
  const { pathname } = useLocation();
  return (
    <div className={styles.shell}>
      <a href="#main" className="visually-hidden">본문으로 건너뛰기</a>
      <Header />
      <main id="main" className={['container', styles.main, 'page-enter'].join(' ')} key={pathname}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
