import { createContext, useState, useCallback, useMemo } from 'react';
import { adminLogin } from '../api/auth';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    const raw = localStorage.getItem('zarxal_admin');
    return raw ? JSON.parse(raw) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('zarxal_admin_token'));

  const login = useCallback(async ({ phone, name }) => {
    const res = await adminLogin({ phone, name });
    localStorage.setItem('zarxal_admin_token', res.token);
    localStorage.setItem('zarxal_admin', JSON.stringify(res.admin));
    setToken(res.token);
    setAdmin(res.admin);
    return res;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('zarxal_admin_token');
    localStorage.removeItem('zarxal_admin');
    setToken(null);
    setAdmin(null);
  }, []);

  const value = useMemo(
    () => ({ admin, token, isAuthenticated: !!token, login, logout }),
    [admin, token, login, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
