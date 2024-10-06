import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

function VideoPage() {
  const { videoId } = useParams(); // الحصول على videoId من عنوان URL
  const [videoDetails, setVideoDetails] = useState(null);
  const [relatedVideos, setRelatedVideos] = useState([]);
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]); // حالة لتخزين التعليقات

  useEffect(() => {
    // جلب تفاصيل الفيديو
    const fetchVideoDetails = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/videos', {
          params: {
            part: 'snippet,statistics',
            id: videoId,
            key: 'AIzaSyByviRt2i7A8SG4sHA7NM97Jp7E3jErGS0',
          },
        });
        setVideoDetails(response.data.items[0]);
      } catch (error) {
        console.error('Error fetching video details:', error);
      }
    };

    // جلب فيديوهات عامة
    const fetchRelatedVideos = async () => {
      try {
        const response = await axios.get('https://www.googleapis.com/youtube/v3/search', {
          params: {
            part: 'snippet',
            q: 'React tutorials', // يمكنك تغيير مصطلح البحث هنا لجلب فيديوهات مختلفة
            type: 'video',
            maxResults: 5,
            key: 'AIzaSyByviRt2i7A8SG4sHA7NM97Jp7E3jErGS0',
          },
        });
        setRelatedVideos(response.data.items);
      } catch (error) {
        console.error('Error fetching related videos:', error);
      }
    };

    // جلب التعليقات من Local Storage
    const fetchCommentsFromLocalStorage = () => {
      const storedComments = localStorage.getItem(`comments-${videoId}`);
      if (storedComments) {
        setComments(JSON.parse(storedComments));
      }
    };

    fetchVideoDetails();
    fetchRelatedVideos();
    fetchCommentsFromLocalStorage();
  }, [videoId]);

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      const newComments = [...comments, comment];
      setComments(newComments);
      setComment('');

      // حفظ التعليقات في Local Storage
      localStorage.setItem(`comments-${videoId}`, JSON.stringify(newComments));
    }
  };

  if (!videoDetails) {
    return <p>Loading...</p>;
  }

  const handleSearch = (query) => {
    // يمكنك تنفيذ منطق البحث هنا أو إعادة التوجيه إلى الصفحة الرئيسية مع عرض نتائج البحث
    console.log('Search query:', query);
  };

  return (
    <div className="p-4">
      {/* إضافة Navbar */}
      <Navbar onSearch={handleSearch} />

      <div className="flex flex-col lg:flex-row">
        <div className="flex-1">
          {/* تشغيل الفيديو */}
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={videoDetails.snippet.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* تفاصيل الفيديو */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mt-4 text-white">
            <div>
              <h1 className="text-2xl font-bold">{videoDetails.snippet.title}</h1>
              <p className="text-gray-400 mt-1">{videoDetails.snippet.channelTitle}</p>
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-semibold">
                Subscribe
              </button>
            </div>
          </div>

          {/* وصف الفيديو */}
          <div className="mt-4 bg-gray-800 p-4 rounded-lg text-white">
            {videoDetails.snippet.description.split('\n').map((line, index) => (
              <p key={index} className="mb-2">{line}</p>
            ))}
          </div>

          {/* قسم التعليقات */}
          <div className="mt-6">
            <h2 className="text-xl font-bold text-white">Comments</h2>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 mt-2 rounded-lg bg-gray-800 text-white"
              placeholder="Add a comment..."
            ></textarea>
            <button
              onClick={handleCommentSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
              Submit
            </button>
            {/* عرض التعليقات */}
            <div className="mt-4">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index} className="bg-gray-800 p-3 mt-2 rounded-lg">
                    <p className="text-white">{comment}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 mt-2">No comments yet. Be the first to comment!</p>
              )}
            </div>
          </div>
        </div>

        {/* الفيديوهات العامة */}
        <div className="lg:w-1/3 lg:ml-4 mt-8 lg:mt-0">
          <div className="bg-blue-500 text-white p-4 rounded-lg mt-6 w-full">
            <h3 className="text-lg font-bold">Follow Us on Social Media!</h3>
            <p className="mt-2">Stay connected with us for the latest updates and more.</p>
            <a
              href="https://www.instagram.com/your_account"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-white text-blue-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200"
            >
              Visit our Instagram
            </a>
          </div>
          <h2 className="text-xl font-bold text-white mb-4">Related Videos</h2>
          {relatedVideos.map((video) => (
            <div
              key={video.id.videoId || video.id.channelId}
              className="flex mb-4 cursor-pointer"
              onClick={() => window.location.href = `/video/${video.id.videoId}`}
            >
              <img
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.title}
                className="w-40 h-24 object-cover rounded-lg"
              />
              <div className="ml-4 text-white">
                <h3 className="text-sm font-bold line-clamp-2">{video.snippet.title}</h3>
                <p className="text-xs text-gray-400">{video.snippet.channelTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoPage;
