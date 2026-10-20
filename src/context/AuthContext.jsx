import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const STORAGE_KEY = 'devdirectory-demo-session';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || null; } catch { return null; }
  });

  useEffect(() => {
    if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    else localStorage.removeItem(STORAGE_KEY);
  }, [user]);

  const login = (identifier, password) => {
    if (!identifier?.trim() || !password || password.length < 4) {
      throw new Error('Enter an email, username, or mobile number and a password of at least 4 characters.');
    }
    const admin = identifier.toLowerCase().trim() === 'admin@devdirectory.local';
    const next = {
      id: identifier.toLowerCase().trim(),
      identifier: identifier.trim(),
      displayName: admin ? 'Demo Admin' : identifier.includes('@') ? identifier.split('@')[0] : identifier,
      role: admin ? 'admin' : 'member'
    };
    setUser(next);
    return next;
  };
  const signup = (name, identifier, password) => {
    if (!name.trim()) throw new Error('Please enter your name.');
    const next = login(identifier, password);
    const named = { ...next, displayName: name.trim() };
    setUser(named);
    return named;
  };
  const logout = () => setUser(null);
  const value = useMemo(() => ({ user, isAuthenticated: !!user, login, signup, logout }), [user]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error('useAuth must be used within AuthProvider');
  return value;
}
