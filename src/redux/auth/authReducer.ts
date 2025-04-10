import { AuthState, AuthActionTypes, LOGIN_SUCCESS, LOGOUT } from './authTypes';
 
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
};
 
export const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, user: action.payload, isAuthenticated: true };
    case LOGOUT:
      return { ...state, user: null, isAuthenticated: false };
    default:
      return state;
  }
};