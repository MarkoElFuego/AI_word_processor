import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { HomePage } from './pages/HomePage';
import { EditorPage } from './pages/EditorPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { LoginPage } from './pages/LoginPage';
import { AuthGuard } from './components/AuthGuard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={
            <AuthGuard>
              <ProjectsPage />
            </AuthGuard>
          } />
          <Route path="/editor" element={
            <AuthGuard>
              <EditorPage />
            </AuthGuard>
          } />
          <Route path="/editor/:id" element={
            <AuthGuard>
              <EditorPage />
            </AuthGuard>
          } />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;