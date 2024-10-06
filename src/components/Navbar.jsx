import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaHome, FaBars } from 'react-icons/fa';

function Navbar({ onSearch }) {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation(); // للحصول على الموقع الحالي
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-red-600 text-white relative">
      <div className="flex items-center">
        {/* زر القائمة الجانبية للجوال */}
        <button
          className="lg:hidden mr-4"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FaBars />
        </button>

        {/* إضافة زر الرجوع للصفحة الرئيسية إذا كنا في صفحة الفيديو */}
        {location.pathname.startsWith('/video') && (
          <button
            onClick={() => navigate('/')}
            className="flex items-center p-2 bg-white text-red-600 rounded hover:bg-gray-200"
          >
            <FaHome />
          </button>
        )}

        {/* شعار الموقع */}
        <Link to="/" className="ml-2">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/9c/YouTube_logo.png"
            alt="YouTube Logo"
            className="h-12 w-auto" // تم زيادة الارتفاع إلى 12 لجعل الشعار أكبر
          />
        </Link>
      </div>

      {/* حقل البحث وزر تسجيل الدخول/الخروج للشاشات الكبيرة */}
      <div className="hidden lg:flex items-center space-x-4">
        {location.pathname !== '/video' && (
          <input
            type="text"
            placeholder="Search..."
            className="p-2 rounded bg-gray-800 text-white"
            onChange={(e) => onSearch(e.target.value)}
          />
        )}
        {isAuthenticated ? (
          <button
            onClick={handleLogout}
            className="bg-white text-red-600 px-4 py-2 rounded hover:bg-gray-200"
          >
            تسجيل الخروج
          </button>
        ) : (
          <Link
            to="/login"
            className="bg-white text-red-600 px-4 py-2 rounded hover:bg-gray-200"
          >
            تسجيل الدخول
          </Link>
        )}
      </div>

      {/* قائمة الجوال (تظهر فقط عند الضغط على أيقونة القائمة في الشاشات الصغيرة) */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-red-600 lg:hidden">
          <div className="flex flex-col items-start p-4 space-y-4">
            {location.pathname !== '/video' && (
              <input
                type="text"
                placeholder="Search..."
                className="p-2 rounded bg-gray-800 text-white w-full"
                onChange={(e) => onSearch(e.target.value)}
              />
            )}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-white text-red-600 px-4 py-2 rounded hover:bg-gray-200 w-full text-left"
              >
                تسجيل الخروج
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-white text-red-600 px-4 py-2 rounded hover:bg-gray-200 w-full text-left"
              >
                تسجيل الدخول
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
