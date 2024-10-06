import React from 'react';
import { motion } from 'framer-motion';

function SocialMediaAd() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-blue-500 text-white p-4 rounded-lg mb-4 w-full"
    >
      <h3 className="text-lg font-bold">Follow Us on</h3>
      <a
        href="https://www.instagram.com/your_account"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 bg-white text-blue-500 px-4 py-2 rounded-lg font-semibold hover:bg-gray-200"
      >
        Visit our Instagram
      </a>
    </motion.div>
  );
}

export default SocialMediaAd;
