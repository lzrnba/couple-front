// API配置文件
const API_CONFIG = {
  // 后端服务基础URL
  BASE_URL: 'http://localhost:8080',
  
  // 认证模块路径
  AUTH_BASE: '/api/auth',
  
  // 具体API端点
  ENDPOINTS: {
    SEND_EMAIL: '/send-email',
    REGISTER: '/register',
    LOGIN: '/login',
    RESET_PASSWORD: '/reset-password',
    CURRENT_USER: '/current-user'
  }
};

export default API_CONFIG;