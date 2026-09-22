import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

/** 라우트 10개. 보호 라우트 3개(/notes/new, /notes/:id/edit, /profile)는 ProtectedRoute 아래에 둔다. */
export function AppRoutes() {
  return (
    <Routes>
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
