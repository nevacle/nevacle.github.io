import { BrowserRouter, Routes, Route } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';

import BookPage from './pages/BookPage';
import ErrorPage from './pages/Error';
import Home from './pages/Home';
import RequestPage from './pages/RequestPage';
import RolesPage from './pages/RolesPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Home />} path="/" />
        <Route
          element={(
            <ProtectedRoute>
              <BookPage />
            </ProtectedRoute>
          )}
          path="/books"
        />
        <Route
          element={(
            <ProtectedRoute>
              <RequestPage />
            </ProtectedRoute>
          )}
          path="/requests"
        />
        <Route
          element={(
            <ProtectedRoute>
              <RolesPage />
            </ProtectedRoute>
          )}
          path="/roles"
        />
        <Route element={<ErrorPage />} path="/*" />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
