import styles from './Avatar.module.css';

export function Avatar({ name, src, size = 32 }: { name: string; src?: string | null; size?: number }) {
  const initial = name.trim().charAt(0).toUpperCase() || '?';
  const style = { width: size, height: size, fontSize: size * 0.45 };
  return src ? (
    <img className={styles.avatar} src={src} alt={name} width={size} height={size} style={style} referrerPolicy="no-referrer" />
  ) : (
    <span className={styles.avatar} style={style} aria-label={name} role="img">
      {initial}
    </span>
  );
}
