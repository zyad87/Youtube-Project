import axios from 'axios';

const API_KEY = 'AIzaSyByviRt2i7A8SG4sHA7NM97Jp7E3jErGS0';
const BASE_URL = 'https://www.googleapis.com/youtube/v3';


// دالة لجلب قائمة الفيديوهات الأكثر شهرة
export const getVideos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/videos`, {
      params: {
        part: 'snippet',
        chart: 'mostPopular',
        maxResults: 8,
        key: API_KEY,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
};

// دالة للبحث عن الفيديوهات بناءً على الكلمة المفتاحية
export const searchVideos = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search`, {
      params: {
        part: 'snippet',
        maxResults: 8,
        q: query,
        key: API_KEY,
      },
    });
    return response.data.items;
  } catch (error) {
    console.error('Error searching videos:', error);
    return [];
  }
};
