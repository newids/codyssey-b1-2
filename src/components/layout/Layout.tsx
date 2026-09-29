import { useEffect } from 'react';
import { Outlet, useLocation, type Location } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import styles from './Layout.module.css';

/**
 * 공통 레이아웃 — 헤더/푸터를 모든 라우트에 적용. key로 라우트마다 진입 애니메이션 재생.
 * 층 0: 오로라 배경. 세 개의 색 덩어리가 한 시계(--dur-drift, 60초)로 아주 느리게 흐른다.
 * prefers-reduced-motion 이면 정지한다 (global.css).
 */
export function Layout() {
  const location = useLocation();
  const background = (location.state as { backgroundLocation?: Location } | null)?.backgroundLocation;
  // 팝업(/notes/new)이 열리면 URL은 바뀌지만 화면은 배경 페이지 그대로다 — 배경 경로를 "페이지"로 본다.
  const pagePath = background?.pathname ?? location.pathname;

  // 라우트 전환 시 맨 위로. 팝업 열고 닫기는 페이지 전환이 아니므로 스크롤을 건드리지 않는다.
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pagePath]);

  return (
    <div className={styles.shell}>
      <div className={styles.aurora} aria-hidden="true">
        <span className={[styles.field, styles.field1].join(' ')} />
        <span className={[styles.field, styles.field2].join(' ')} />
        <span className={[styles.field, styles.field3].join(' ')} />
      </div>
      <a href="#main" className="visually-hidden">본문으로 건너뛰기</a>
      <Header />
      <main id="main" className={['container', styles.main, 'page-enter'].join(' ')} key={pagePath}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
