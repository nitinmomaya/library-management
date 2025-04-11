import API, { setAccessToken } from '../../api/axios';
import { LOGIN_SUCCESS, LOGOUT, AuthActionTypes, User, LoginFormValues } from './authTypes';
import { Dispatch } from 'redux';
 
export const login = (values: LoginFormValues) => {
    return async (dispatch: Dispatch<AuthActionTypes>): Promise<void> => {
        try {
        // Below code for JWT. Dont delete.
        // const response = await API.post('/login', values);
        // setAccessToken(response.data.accessToken);
        // dispatch({ type: LOGIN_SUCCESS, payload: response.data.user as User });
        const response = await API.get('/userlist');
        const loggedUser = response.data.find((user: User) => user.email === values.email && user.password === values.password);
        if (loggedUser){
            setAccessToken(response.data.accessToken || 'dummyToken');
            //comment below code after nodejs backend as cookie setup done.
            localStorage.setItem('loggedLibraryUser', JSON.stringify({ loggedUser: loggedUser as User, accessToken: 'dummyToken' }));
        }
        dispatch({ type: LOGIN_SUCCESS, payload: loggedUser as User });
        } catch (err) {
            console.error('Login failed:', err, values);
        }
    }
};
 
export const logout = () => async (dispatch: Dispatch<AuthActionTypes>) => {
await API.post('/logout', {}, { withCredentials: true });
  setAccessToken('');
  dispatch({ type: LOGOUT });
};