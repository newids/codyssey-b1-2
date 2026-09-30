import Footer from './components/Footer';
import Header from './components/Header';
import NoteList from './components/NoteList';

export default function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <NoteList />
      </main>
      <Footer />
    </div>
  );
}
