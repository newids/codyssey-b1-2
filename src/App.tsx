import { BrowserRouter, Route, Routes, useLocation, type Location } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { ToastProvider } from '@/context/ToastContext';
import { Layout } from '@/components/layout/Layout';
import { ProtectedRoute } from '@/components/auth/ProtectedRoute';
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/LoginPage';
import { LessonListPage } from '@/pages/LessonListPage';
import { LessonDetailPage } from '@/pages/LessonDetailPage';
import { NoteListPage } from '@/pages/NoteListPage';
import { NoteDetailPage } from '@/pages/NoteDetailPage';
import { NoteNewPage } from '@/pages/NoteNewPage';
import { NoteEditPage } from '@/pages/NoteEditPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { NoteComposerModal } from '@/components/notes/NoteComposerModal';

/**
 * 라우트 10개. 보호 라우트 3개(/notes/new, /notes/:id/edit, /profile)는 ProtectedRoute 아래에 둔다.
 * /notes/new 는 다른 화면에서 열면(state.backgroundLocation) 그 화면 위의 팝업으로,
 * 주소를 직접 치면 전체 페이지로 그린다.
 */
export function AppRoutes() {
  const location = useLocation();
  const background = (location.state as { backgroundLocation?: Location } | null)?.backgroundLocation;
  return (
    <>
    <Routes location={background ?? location}>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/lessons" element={<LessonListPage />} />
        <Route path="/lessons/:slug" element={<LessonDetailPage />} />
        <Route path="/notes" element={<NoteListPage />} />
        <Route path="/notes/:id" element={<NoteDetailPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/notes/new" element={<NoteNewPage />} />
          <Route path="/notes/:id/edit" element={<NoteEditPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
    {background && (
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/notes/new" element={<NoteComposerModal />} />
        </Route>
      </Routes>
    )}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
