/* eslint-disable no-unused-vars */
import axios from 'axios';
import { createContext, useState } from 'react';
import * as authHelper from '../_helpers';
const API_URL = import.meta.env.VITE_APP_API_URL;
export const LOGIN_URL = `${API_URL}/auth/login`;
export const REGISTER_URL = `${API_URL}/register`;
export const FORGOT_PASSWORD_URL = `${API_URL}/forgot-password`;
export const RESET_PASSWORD_URL = `${API_URL}/reset-password`;


export const GET_USER_URL = `${API_URL}/auth/profile`;
export const GET_USER_BY_ID_URL = `${API_URL}/profile/:id`;
const AuthContext = createContext(null);
const AuthProvider = ({
  children
}) => {
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState();
  const verify = async () => {
    if (auth) {
      try {
        const {
          data: user
        } = await getUser();
        setCurrentUser(user);
      } catch {
        saveAuth(undefined);
        setCurrentUser(undefined);
      }
    }
  };
  const saveAuth = auth => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  };
  const login = async (username, password) => {
    try {
      const { data } = await axios.post(LOGIN_URL, {
        username,
        password,
      });
  
      // Simpan token dengan format yang sesuai helper
      saveAuth({ token: data.token });
  
      const { data: user } = await getUser();
      setCurrentUser(user);
    } catch (error) {
      saveAuth(undefined);
      throw new Error(error.response?.data?.message || 'Login gagal');
    }
  };
  
  
  const register = async (email, password, password_confirmation) => {
    try {
      const {
        data: auth
      } = await axios.post(REGISTER_URL, {
        email,
        password,
        password_confirmation
      });
      saveAuth(auth);
      const {
        data: user
      } = await getUser();
      setCurrentUser(user);
    } catch (error) {
      saveAuth(undefined);
      throw new Error(`Error ${error}`);
    }
  };
  const requestPasswordResetLink = async email => {
    await axios.post(FORGOT_PASSWORD_URL, {
      email
    });
  };
  const changePassword = async (email, token, password, password_confirmation) => {
    await axios.post(RESET_PASSWORD_URL, {
      email,
      token,
      password,
      password_confirmation
    });
  };
  const getUser = async () => {
    const token = authHelper.getAuth()?.token;
    return await axios.get(GET_USER_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  
  const logout = () => {
    saveAuth(undefined);
    setCurrentUser(undefined);
  };
  return <AuthContext.Provider value={{
    loading,
    setLoading,
    auth,
    saveAuth,
    currentUser,
    setCurrentUser,
    login,
    register,
    requestPasswordResetLink,
    changePassword,
    getUser,
    logout,
    verify
  }}>
      {children}
    </AuthContext.Provider>;
};
export { AuthContext, AuthProvider };