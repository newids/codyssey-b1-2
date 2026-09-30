type Props = {
  title: string;
  count: number;
  importantCount: number;
};

export default function Header({ title, count, importantCount }: Props) {
  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>
      <p className="header-meta">
        메모 {count}개 · 중요 {importantCount}개
      </p>
    </header>
  );
}
