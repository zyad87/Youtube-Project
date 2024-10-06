import React from 'react';
import { Link } from 'react-router-dom';

function VideoCard({ video }) {
  if (!video || !video.snippet) {
    return null;
  }

  return (
    <Link to={`/video/${video.id.videoId || video.id}`} className="block">
      <div className="bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:scale-105 p-2">
        <img
          src={video.snippet.thumbnails.medium.url}
          alt={video.snippet.title}
          className="w-full h-32 sm:h-40 object-cover rounded-lg"
        />
        <div className="mt-2 text-white">
          <h3 className="text-sm font-bold line-clamp-2">{video.snippet.title}</h3>
          <p className="text-xs text-gray-400 mt-1">{video.snippet.channelTitle}</p>
        </div>
      </div>
    </Link>
  );
}

export default VideoCard;
