export interface User {
    id: number;
    name: string;
    phone_number: string;
    role: string;
    username: string;
    password: string;
    email: string;
  }
  export interface LoginFormValues {
    email: string;
    password: string;
  }
  export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
  }
  
  // Action Types
  export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
  export const LOGOUT = 'LOGOUT';
  
  interface LoginSuccessAction {
    type: typeof LOGIN_SUCCESS;
    payload: User;
  }
  
  interface LogoutAction {
    type: typeof LOGOUT;
  }
  
  export type AuthActionTypes = LoginSuccessAction | LogoutAction;