import React, { useState } from 'react';
import { FaHome, FaCode, FaMusic, FaFilm, FaGamepad, FaBars, FaSignOutAlt } from 'react-icons/fa';
import SocialMediaAd from './SocialMediaAd';

function Sidebar({ onSearchTopic, activeTopic }) {
  const [isOpen, setIsOpen] = useState(false);

  const categories = [
    { name: 'New', icon: <FaHome />, query: 'Trending' },
    { name: 'Coding', icon: <FaCode />, query: 'React with JS' },
    { name: 'Music', icon: <FaMusic />, query: 'Music' },
    { name: 'Movie', icon: <FaFilm />, query: 'Movies' },
    { name: 'Gaming', icon: <FaGamepad />, query: 'Gaming' },
  ];

  return (
    <>
      {/* زر فتح الشريط الجانبي للجوال - يظهر مرة واحدة فقط */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-red-600 text-white rounded-md"
      >
        <FaBars size={24} />
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
                setIsOpen(false); // إغلاق الشريط الجانبي بعد اختيار الموضوع في الشاشات الصغيرة
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

        {/* زر تسجيل الخروج - يظهر في الشريط الجانبي في الجوال */}


        {/* عرض المكون SocialMediaAd بعد تصنيف Gaming */}
        <div className="mt-6">
          <SocialMediaAd />
        </div>
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
