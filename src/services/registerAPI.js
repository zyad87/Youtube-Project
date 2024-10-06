import axios from 'axios';

// رابط الـ API الوهمية
const BASE_URL = 'https://667ba97dbd627f0dcc9358df.mockapi.io/users';

// دالة لإنشاء حساب جديد
export const registerUser = async (username, password) => {
  try {
    // إرسال البيانات لإنشاء مستخدم جديد
    const response = await axios.post(BASE_URL, { username, password });
    return { success: true, user: response.data };
  } catch (error) {
    console.error('Error registering user:', error);
    return { success: false, message: 'حدث خطأ أثناء محاولة إنشاء الحساب' };
  }
};
