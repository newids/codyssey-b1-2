import styles from './Footer.module.css';

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={['container', styles.inner].join(' ')}>
        <p className={styles.text}>
          React Playground — Codyssey B1-2 「버튼 누르면 화면이 스르륵 바뀌는 요즘 웹사이트 만들기」
        </p>
        <p className={styles.text}>
          React 18 · React Router 6 · Supabase · Vite · Vercel ·{' '}
          <a href="https://github.com/newids/codyssey-b1-2" target="_blank" rel="noreferrer">GitHub</a>
        </p>
      </div>
    </footer>
  );
}
