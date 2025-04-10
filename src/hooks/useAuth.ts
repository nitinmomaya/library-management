import { useSelector } from 'react-redux';
import { RootState } from '../redux/rootReducer';
 
export const useAuth = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  return { isAuthenticated, user };
};