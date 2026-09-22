import styles from './CodeBlock.module.css';

export interface CodeBlockProps {
  code: string;
  lang?: string;
  caption?: string;
}

export function CodeBlock({ code, lang = 'tsx', caption }: CodeBlockProps) {
  return (
    <figure className={styles.figure}>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
      <pre className={styles.pre} data-lang={lang}>
        <code>{code}</code>
      </pre>
    </figure>
  );
}
