// utils/axiosInstance.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000', // 你的后端API地址
  timeout: 10000,
  withCredentials: true, // 👈 关键：确保Axios发送请求时携带Cookie
});

// 可选：添加响应拦截器处理全局错误或重定向
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error('认证失败或会话过期，请重新登录！');
      // 如果你有一个统一的认证上下文或路由，可以在这里进行重定向
      // 例如：window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;