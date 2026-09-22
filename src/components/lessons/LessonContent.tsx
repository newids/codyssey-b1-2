import type { LessonBlock } from '@/data/lessons';
import { CodeBlock } from '@/components/ui/CodeBlock';
import styles from './LessonContent.module.css';

/** 정적 콘텐츠 블록을 종류별로 렌더링. 마크다운 라이브러리 없이 구조화 데이터로 처리 */
export function LessonContent({ blocks }: { blocks: LessonBlock[] }) {
  return (
    <div className={styles.content}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h':
            return <h2 key={i} className={styles.heading}>{block.text}</h2>;
          case 'p':
            return <p key={i} className={styles.paragraph}>{block.text}</p>;
          case 'list':
            return (
              <ul key={i} className={styles.list}>
                {block.items.map((item, j) => <li key={j}>{item}</li>)}
              </ul>
            );
          case 'code':
            return <CodeBlock key={i} code={block.code} lang={block.lang} caption={block.caption} />;
          case 'tip':
            return (
              <aside key={i} className={styles.tip}>
                <strong>Tip</strong> {block.text}
              </aside>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
