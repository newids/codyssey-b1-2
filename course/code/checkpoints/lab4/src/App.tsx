import { useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import NoteList from './components/NoteList';
import { sampleNotes } from './data/sampleNotes';
import type { Note } from './types';

export default function App() {
  const [notes, setNotes] = useState<Note[]>(sampleNotes);

  // 다른 state에서 구할 수 있는 값은 state로 두지 않고 그때그때 계산한다.
  const importantCount = notes.filter((note) => note.isImportant).length;

  function handleAdd() {
    const newNote: Note = {
      id: Date.now(),
      title: `새 메모 ${notes.length + 1}`,
      body: '내용은 3일 차에 폼을 만들어서 직접 입력한다.',
      isImportant: false,
    };
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
        <div className="toolbar">
          <button type="button" className="btn btn-primary" onClick={handleAdd}>
            메모 추가
          </button>
          <button type="button" className="btn btn-danger" onClick={handleClear}>
            모두 삭제
          </button>
        </div>
        <NoteList
          notes={notes}
          onDelete={handleDelete}
          onToggleImportant={handleToggleImportant}
        />
      </main>
      <Footer />
    </div>
  );
}
