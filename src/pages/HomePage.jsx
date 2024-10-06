import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import VideoCard from '../components/VideoCard';
import { getVideos, searchVideos } from '../services/youtubeAPI';

function HomePage() {
  const [videos, setVideos] = useState([]);
  const [activeTopic, setActiveTopic] = useState('Trending');

  useEffect(() => {
    // جلب الفيديوهات الأكثر شهرة عند تحميل الصفحة
    const fetchVideos = async () => {
      try {
        const data = await getVideos();
        setVideos(data);
      } catch (error) {
        console.error('Error fetching videos:', error);
      }
    };

    fetchVideos();
  }, []);

  // التعامل مع البحث عند النقر على موضوع
  const handleSearch = async (query) => {
    // إعادة تعيين الفيديوهات أثناء عملية البحث لتجنب عرض الفيديوهات القديمة
    setVideos([]);
    setActiveTopic(query);

    if (query.trim() === '') {
      // إذا كان الحقل فارغًا، جلب الفيديوهات الأكثر شهرة مرة أخرى
      const data = await getVideos();
      setVideos(data);
    } else {
      // جلب الفيديوهات بناءً على البحث
      const data = await searchVideos(query);
      setVideos(data);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* الشريط الجانبي */}
      <Sidebar onSearchTopic={handleSearch} activeTopic={activeTopic} />

      {/* المحتوى الرئيسي */}
      <div className="flex-1 bg-black min-h-screen">
        <Navbar onSearch={handleSearch} />
        <div className="p-4">
          <h2 className="text-red-500 text-2xl font-bold mb-4">{activeTopic} Videos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {videos.length > 0 ? (
              videos.map((video) => (
                <VideoCard key={video.id.videoId || video.id} video={video} />
              ))
            ) : (
              <p className="text-white">لا توجد فيديوهات لعرضها</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
