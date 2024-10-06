import React, { useState } from 'react';
import { motion } from 'framer-motion';

function CommentSection() {
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  const handleAddComment = (e) => {
    e.preventDefault();

    if (commentText.trim() !== '') {
      const newComment = {
        id: comments.length + 1,
        text: commentText,
        date: new Date().toLocaleString(),
      };
      setComments([...comments, newComment]);
      setCommentText('');
    }
  };

  return (
    <div className="mt-8 bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-bold mb-4">التعليقات</h3>
      <form onSubmit={handleAddComment} className="mb-4">
        <textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg"
          placeholder="اكتب تعليقك هنا..."
          rows="4"
        ></textarea>
        <button type="submit" className="bg-red-600 text-white p-2 mt-2 rounded hover:bg-red-700">
          إضافة تعليق
        </button>
      </form>
      <div className="comments-list">
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-4 p-2 border-b border-gray-300"
          >
            <p className="text-sm text-gray-800">{comment.text}</p>
            <p className="text-xs text-gray-500 mt-1">{comment.date}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default CommentSection;
