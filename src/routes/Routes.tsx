import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import { AuthenticatedRoute, ProtectedRoute } from './ProtectedRoute';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route element={<AuthenticatedRoute />}>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="/" element={<BooklistPage />} /> */}
      </Route>
      <Route path="/admin" element={<ProtectedRoute />}>
        {/* <Route path="/" element={<AdminPage />} /> */}
      </Route>
    </Routes>
  );
};
