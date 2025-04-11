import { useNavigate } from 'react-router-dom';
import {  useDispatch } from 'react-redux';
import { store } from './redux/store';
import { AppRoutes } from './routes/Routes';
import './App.css';
import { useEffect, useState } from 'react';
import  { setAccessToken } from '../src/api/axios';
import { AxiosError } from 'axios';
import { LOGIN_SUCCESS, User } from './redux/auth/authTypes';

function App() {
  const dispatch = useDispatch<DispatchType>(); // Define DispatchType based on your store
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restoreAuth = async () => {
      try {
        // const response = await API.post('/refresh1');
        // setAccessToken(response.data.accessToken);
        // dispatch({ type: LOGIN_SUCCESS, payload: response.data.user as User });
        const storedToken = localStorage.getItem('loggedLibraryUser');
          if (storedToken) {
            const localToken = JSON.parse(storedToken) as { accessToken: string; loggedUser: User };
            setAccessToken(localToken.accessToken);
            dispatch({ type: LOGIN_SUCCESS, payload: localToken.loggedUser as User });
          }
      } catch (error) {
        if (error instanceof AxiosError) {
            navigate('/login');
        } else {
          console.error('An unexpected error occurred during token refresh:', error);
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    restoreAuth();
  }, [dispatch, navigate]);

  if (loading) return <div>Loading...</div>;

  return (
        <AppRoutes />
  );
}

// Define the DispatchType based on your store's dispatch function
type DispatchType = typeof store.dispatch;

export default App;