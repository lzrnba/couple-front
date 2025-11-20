import API_CONFIG from '../config/api';

class AuthService {
  // 发送验证码邮件
  static async sendEmail(email) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.AUTH_BASE}${API_CONFIG.ENDPOINTS.SEND_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
      });
      
      return await response.json();
    } catch (error) {
      console.error('Send email error:', error);
      // 返回统一格式的错误响应
      return {
        code: 500,
        message: '网络错误，请检查网络连接'
      };
    }
  }

  // 用户注册
  static async register(email, password, code, nickname) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.AUTH_BASE}${API_CONFIG.ENDPOINTS.REGISTER}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, code, nickname })
      });
      
      return await response.json();
    } catch (error) {
      console.error('Register error:', error);
      // 返回统一格式的错误响应
      return {
        code: 500,
        message: '网络错误，请检查网络连接'
      };
    }
  }

  // 用户登录
  static async login(email, password) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.AUTH_BASE}${API_CONFIG.ENDPOINTS.LOGIN}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });
      
      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      // 返回统一格式的错误响应
      return {
        code: 500,
        message: '网络错误，请检查网络连接'
      };
    }
  }

  // 重置密码
  static async resetPassword(email, newPassword, code) {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.AUTH_BASE}${API_CONFIG.ENDPOINTS.RESET_PASSWORD}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, newPassword, code })
      });
      
      return await response.json();
    } catch (error) {
      console.error('Reset password error:', error);
      // 返回统一格式的错误响应
      return {
        code: 500,
        message: '网络错误，请检查网络连接'
      };
    }
  }

  // 获取当前用户信息
  static async getCurrentUser() {
    const token = localStorage.getItem('authToken');
    if (!token) {
      throw new Error('No auth token found');
    }

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.AUTH_BASE}${API_CONFIG.ENDPOINTS.CURRENT_USER}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      return await response.json();
    } catch (error) {
      console.error('Get current user error:', error);
      // 返回统一格式的错误响应
      return {
        code: 500,
        message: '网络错误，请检查网络连接'
      };
    }
  }

  // 保存认证令牌
  static setAuthToken(token) {
    localStorage.setItem('authToken', token);
  }

  // 获取认证令牌
  static getAuthToken() {
    return localStorage.getItem('authToken');
  }

  // 清除认证令牌
  static clearAuthToken() {
    localStorage.removeItem('authToken');
  }

  // 检查是否已认证
  static isAuthenticated() {
    return !!this.getAuthToken();
  }
}

export default AuthService;