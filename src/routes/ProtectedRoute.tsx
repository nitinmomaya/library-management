import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
 
export const ProtectedRoute = () => {
  const { isAuthenticated, user } = useAuth();
  return isAuthenticated && user?.role=="admin" ? <Outlet /> : <Navigate to="/login" />;
};

export const AuthenticatedRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};