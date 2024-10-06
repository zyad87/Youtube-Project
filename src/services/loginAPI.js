import axios from 'axios';

// رابط الـ API الوهمية
const BASE_URL = 'https://667ba97dbd627f0dcc9358df.mockapi.io/users';

// دالة لتسجيل الدخول والتحقق من اسم المستخدم وكلمة المرور
export const loginUser = async (username, password) => {
  try {
    // جلب جميع المستخدمين من الـ API
    const response = await axios.get(BASE_URL);
    const users = response.data;

    // التحقق من بيانات المستخدم المدخلة
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      return { success: true, user };
    } else {
      return { success: false, message: 'خطأ في اسم المستخدم أو كلمة المرور' };
    }
  } catch (error) {
    console.error('Error logging in:', error);
    return { success: false, message: 'حدث خطأ أثناء محاولة تسجيل الدخول' };
  }
};
