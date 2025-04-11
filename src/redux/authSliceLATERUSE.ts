// authSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import API, { setAccessToken } from '../api/axios';
import { AxiosError } from 'axios';

interface User {
    id: number;
    name: string;
    phone_number: string;
    role: string;
    username: string;
    password: string;
    email: string;
  }
interface LoginFormValues {
    email: string;
    password: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: 'idle',
  error: null,
};

export const login = createAsyncThunk<User | undefined, LoginFormValues, { rejectValue: string }>(
  'auth/login',
  async (values, { rejectWithValue }) => {
    try {
      // Below code for JWT. Dont delete.
      // const response = await API.post('/login', values);
      // setAccessToken(response.data.accessToken);
      // return response.data.user as User;
      const response = await API.get('/userlist');
      const loggedUser = response.data.find(
        (user: User) => user.email === values.email && user.password === values.password
      );
      if (loggedUser) {
        setAccessToken(response.data.accessToken || 'dummyToken');
        return loggedUser;
      } else {
        return rejectWithValue('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error, values);
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message || 'Login failed');
      }
      return rejectWithValue('An unexpected error occurred during login');
    }
  }
);

export const logout = createAsyncThunk<void, void, { rejectValue: string }>(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await API.post('/logout', {}, { withCredentials: true });
      setAccessToken('');
    } catch (error) {
      console.error('Logout failed:', error);
      if (error instanceof AxiosError) {
        return rejectWithValue(error.message || 'Logout failed');
      }
      return rejectWithValue('An unexpected error occurred during logout');
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = 'pending';
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<User | undefined>) => {
        state.loading = 'succeeded';
        state.user = action.payload || null;
        state.isAuthenticated = !!action.payload;
      })
      .addCase(login.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.loading = 'failed';
        state.error = action.payload || 'Login failed';
        state.user = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = 'idle';
        state.error = null;
      })
      .addCase(logout.rejected, (state, action: PayloadAction<string | undefined>) => {
        state.error = action.payload || 'Logout failed';
      });
  },
});

export default authSlice.reducer;

