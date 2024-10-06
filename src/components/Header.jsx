import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

function Header() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="flex items-center justify-between p-4 bg-red-600 text-white">
      <h1 className="text-lg font-bold">YouTube Clone</h1>
      {isAuthenticated && (
        <button onClick={handleLogout} className="bg-white text-red-600 px-4 py-2 rounded hover:bg-gray-200">
          تسجيل الخروج
        </button>
      )}
    </header>
  );
}

export default Header;
