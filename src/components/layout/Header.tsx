import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { signOut } from '@/lib/api/auth';
import { toUserMessage } from '@/lib/errors';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Icon } from '@/components/ui/Icon';
import styles from './Header.module.css';

const NAV_ITEMS = [
  { to: '/lessons', label: '레슨' },
  { to: '/notes', label: '학습 노트' },
  { to: '/profile', label: '내 진도' },
];

export function Header() {
  const { user, displayName, avatarUrl } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      await signOut();
      showToast('로그아웃했습니다.', 'info');
      navigate('/');
    } catch (err) {
      showToast(toUserMessage(err), 'error');
    } finally {
      setIsSigningOut(false);
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={styles.header}>
      <div className={['container', styles.bar, 'glass-strong'].join(' ')}>
        <Link to="/" className={styles.brand} onClick={() => setIsMenuOpen(false)}>
          <svg className={styles.logo} viewBox="0 0 64 64" aria-hidden="true">
            <g fill="none" stroke="currentColor" strokeWidth="4">
              <ellipse cx="32" cy="32" rx="24" ry="9" />
              <ellipse cx="32" cy="32" rx="24" ry="9" transform="rotate(60 32 32)" />
              <ellipse cx="32" cy="32" rx="24" ry="9" transform="rotate(120 32 32)" />
            </g>
            <circle cx="32" cy="32" r="5" fill="currentColor" />
          </svg>
          <span className={styles.brandText}>React <em>Playground</em></span>
        </Link>

        <button
          type="button"
          className={styles.menuButton}
          aria-expanded={isMenuOpen}
          aria-controls="primary-nav"
          aria-label={isMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
          onClick={() => setIsMenuOpen((v) => !v)}
        >
          <Icon name={isMenuOpen ? 'close' : 'menu'} size={22} />
        </button>

        <nav id="primary-nav" className={[styles.nav, isMenuOpen ? styles.navOpen : ''].join(' ')} aria-label="주요 메뉴">
          <ul className={styles.list}>
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) => [styles.link, isActive ? styles.active : ''].join(' ')}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className={styles.actions}>
            <ThemeToggle />
            {user ? (
              <div className={styles.user}>
                <Link to="/profile" className={styles.userLink} onClick={() => setIsMenuOpen(false)}>
                  <Avatar name={displayName} src={avatarUrl} size={28} />
                  <span className={styles.userName}>{displayName}</span>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleSignOut} loading={isSigningOut}>
                  로그아웃
                </Button>
              </div>
            ) : (
              <Button size="sm" onClick={() => { setIsMenuOpen(false); navigate('/login'); }}>
                로그인
              </Button>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
