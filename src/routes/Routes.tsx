import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
// import { HomePage } from '../pages/HomePage';
import { ProtectedRoute } from './ProtectedRoute';
 
export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<LoginPage />} />
    <Route element={<ProtectedRoute />}>
      {/* <Route path="/" element={<HomePage />} /> */}
    </Route>
  </Routes>
);