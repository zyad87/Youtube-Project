import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { registerUser } from '../services/registerAPI';
import { Link } from 'react-router-dom';

function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { isAuthenticated, login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState('');

  useEffect(() => {
    // إذا كان المستخدم مسجلًا، يتم توجيهه للصفحة الرئيسية
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // استدعاء دالة إنشاء الحساب
    const result = await registerUser(username, password);

    if (result.success) {
      // تسجيل الدخول تلقائيًا بعد إنشاء الحساب
      login(username);
      navigate('/');
    } else {
      // عرض رسالة خطأ
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">إنشاء حساب جديد</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="form-group">
            <label htmlFor="username" className="block text-white mb-2">اسم المستخدم:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input-field w-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="block text-white mb-2">كلمة المرور:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field w-full p-2 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>
          <button
            type="submit"
            className="register-button w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
          >
            إنشاء حساب
          </button>
        </form>
        <p className="text-gray-400 mt-4 text-center">
          هل لديك حساب؟{' '}
          <Link to="/login" className="text-red-600 hover:underline">
            تسجيل الدخول
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
