import React from 'react';

function VideoPlayer({ video }) {
  return (
    <div className="video-player bg-white p-4 rounded-lg shadow-md">
      <iframe
        width="100%"
        height="400"
        src={`https://www.youtube.com/embed/${video.id.videoId || video.id}`}
        title={video.snippet.title}
        className="rounded-lg"
        allowFullScreen
      ></iframe>
      <h3 className="text-2xl font-bold mt-4">{video.snippet.title}</h3>
      <p className="mt-2 text-gray-700">{video.snippet.description}</p>
    </div>
  );
}

export default VideoPlayer;
