type Props = {
  title: string;
  count: number;
};

export default function Header({ title, count }: Props) {
  return (
    <header className="header">
      <h1 className="header-title">{title}</h1>
      <p className="header-meta">메모 {count}개</p>
    </header>
  );
}
