import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // تحقق من وجود جلسة مسجلة في التخزين المحلي
    const storedUser = localStorage.getItem('isAuthenticated');
    if (storedUser) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username) => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true'); // حفظ حالة التسجيل في التخزين المحلي
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated'); // حذف حالة التسجيل من التخزين المحلي
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
