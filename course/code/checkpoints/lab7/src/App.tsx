import { useEffect, useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import TipList from './components/TipList';
import { loadNotes, saveNotes } from './storage';
import type { Note } from './types';

export default function App() {
  // 처음 그릴 때만 localStorage에서 읽어 온다. (함수를 호출하지 않고 함수 자체를 넘긴다)
  const [notes, setNotes] = useState<Note[]>(loadNotes);
  // 도전 과제(실습 5): 중요만 보기
  const [showImportantOnly, setShowImportantOnly] = useState(false);
  // 도전 과제(실습 6): 제목 검색
  const [query, setQuery] = useState('');

  // notes가 바뀔 때마다 저장한다.
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  // 다른 state에서 구할 수 있는 값은 state로 두지 않고 그때그때 계산한다.
  const importantCount = notes.filter((note) => note.isImportant).length;
  const keyword = query.trim().toLowerCase();
  const visibleNotes = notes
    .filter((note) => !showImportantOnly || note.isImportant)
    .filter((note) => note.title.toLowerCase().includes(keyword));

  function handleAdd(title: string, body: string) {
    const newNote: Note = { id: Date.now(), title, body, isImportant: false };
    setNotes([newNote, ...notes]);
  }

  function handleDelete(id: number) {
    setNotes(notes.filter((note) => note.id !== id));
  }

  function handleToggleImportant(id: number) {
    setNotes(
      notes.map((note) => (note.id === id ? { ...note, isImportant: !note.isImportant } : note)),
    );
  }

  // 도전 과제(실습 4): 모두 삭제
  function handleClear() {
    if (!window.confirm('메모를 모두 삭제할까요?')) return;
    setNotes([]);
  }

  return (
    <div className="app">
      <Header title="학습 메모" count={notes.length} importantCount={importantCount} />
      <main>
        <NoteForm onAdd={handleAdd} />

        <div className="toolbar">
          <input
            className="input"
            type="search"
            aria-label="제목으로 검색"
            placeholder="제목으로 검색"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button
            type="button"
            className={showImportantOnly ? 'btn is-active' : 'btn'}
            aria-pressed={showImportantOnly}
            onClick={() => setShowImportantOnly(!showImportantOnly)}
          >
            중요만 보기
          </button>
          <button type="button" className="btn btn-danger" onClick={handleClear}>
            모두 삭제
          </button>
        </div>

        {visibleNotes.length === 0 ? (
          <p className="empty">
            {notes.length === 0
              ? '아직 메모가 없습니다. 첫 메모를 추가해 보세요.'
              : '조건에 맞는 메모가 없습니다.'}
          </p>
        ) : (
          <NoteList
            notes={visibleNotes}
            onDelete={handleDelete}
            onToggleImportant={handleToggleImportant}
          />
        )}

        <TipList />
      </main>
      <Footer />
    </div>
  );
}
