import React, { useState, useContext } from 'react';
import { FaHome, FaCode, FaMusic, FaFilm, FaGamepad, FaSignOutAlt } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';
import SocialMediaAd from './SocialMediaAd';

function Sidebar({ onSearchTopic, activeTopic }) {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { name: 'New', icon: <FaHome />, query: 'Trending' },
    { name: 'Coding', icon: <FaCode />, query: 'React with JS' },
    { name: 'Music', icon: <FaMusic />, query: 'Music' },
    { name: 'Movie', icon: <FaFilm />, query: 'Movies' },
    { name: 'Gaming', icon: <FaGamepad />, query: 'Gaming' },
  ];

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <>
      {/* زر فتح الشريط الجانبي للجوال */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden text-white p-4 fixed top-4 left-4 z-50"
      >
        <FaHome />
      </button>

      {/* الشريط الجانبي */}
      <div
        className={`sidebar bg-black text-white w-60 h-screen p-4 fixed top-0 transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out lg:block lg:relative lg:h-auto z-40`}
      >
        <ul className="space-y-6">
          {categories.map((category) => (
            <li
              key={category.name}
              onClick={() => {
                onSearchTopic(category.query);
                setIsOpen(false);
              }}
              className={`flex items-center space-x-2 p-2 rounded cursor-pointer ${
                activeTopic === category.query ? 'bg-red-500' : 'hover:bg-red-500'
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </li>
          ))}
        </ul>

        {/* عرض المكون SocialMediaAd بعد تصنيف Gaming */}
        <div className="mt-6">
          <SocialMediaAd />
        </div>

        {/* زر تسجيل الخروج */}
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 p-2 mt-auto bg-red-500 text-white rounded cursor-pointer hover:bg-red-600"
          >
            <FaSignOutAlt />
            <span>تسجيل الخروج</span>
          </button>
        )}
      </div>

      {/* Overlay للأجهزة الصغيرة */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black opacity-50 z-30"
        ></div>
      )}
    </>
  );
}

export default Sidebar;
