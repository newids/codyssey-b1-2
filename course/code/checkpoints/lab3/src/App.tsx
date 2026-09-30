import Footer from './components/Footer';
import Header from './components/Header';
import NoteList from './components/NoteList';
import { sampleNotes } from './data/sampleNotes';

export default function App() {
  return (
    <div className="app">
      <Header title="학습 메모" count={sampleNotes.length} />
      <main>
        <NoteList notes={sampleNotes} />
      </main>
      <Footer />
    </div>
  );
}
