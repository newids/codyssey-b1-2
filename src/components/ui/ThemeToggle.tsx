import { useTheme } from '@/context/ThemeContext';
import { Icon } from './Icon';
import styles from './ThemeToggle.module.css';

/** 클릭 → ThemeContext state 변경 → 전체 앱 색상 리렌더링 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={isDark ? '라이트 모드로 전환' : '다크 모드로 전환'}
      aria-pressed={isDark}
      title={isDark ? '라이트 모드' : '다크 모드'}
    >
      <span className={styles.knob} aria-hidden="true"><Icon name={isDark ? 'moon' : 'sun'} size={13} /></span>
    </button>
  );
}
