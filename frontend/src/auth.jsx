import { useState } from 'react';
import { AuthContext } from './authContext';

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const login = (newToken) => {
    setToken(newToken);
    localStorage.setItem('token', newToken);
  };
  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
  };
  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
