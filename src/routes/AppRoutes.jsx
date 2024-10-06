import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import VideoPage from '../pages/VideoPage';
import PrivateRoute from './PrivateRoute';

function AppRoutes() {
  return (
    <Routes>
      {/* مسار تسجيل الدخول */}
      <Route path="/login" element={<LoginPage />} />
      
      {/* مسار إنشاء حساب */}
      <Route path="/register" element={<RegisterPage />} />
      
      {/* مسار الصفحة الرئيسية */}
      <Route
        path="/"
        element={
          <PrivateRoute>
            <HomePage />
          </PrivateRoute>
        }
      />
      
      {/* مسار صفحة الفيديو */}
      <Route
        path="/video/:videoId"
        element={
          <PrivateRoute>
            <VideoPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
