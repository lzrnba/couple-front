<template>
  <div class="container">
    <div class="form_area">
      <p class="title">用户登录</p>
      <form @submit.prevent="handleLogin">
        <div class="form_group">
          <label class="sub_title" for="email">邮箱</label>
          <input 
            v-model="form.email" 
            placeholder="请输入邮箱" 
            id="email" 
            class="form_style" 
            type="email" 
            required
          />
        </div>
        <div class="form_group">
          <label class="sub_title" for="password">密码</label>
          <input 
            v-model="form.password" 
            placeholder="请输入密码" 
            id="password" 
            class="form_style" 
            type="password" 
            required
          />
        </div>
        <div>
          <button type="submit" class="btn" :disabled="loading">
            {{ loading ? '登录中...' : '登录' }}
          </button>
          <p>还没有账号？ <router-link class="link" to="/register">立即注册</router-link></p>
          <p><router-link class="link" to="/reset-password">忘记密码？</router-link></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AuthService from '../../services/AuthService';
import EventBus from '../../utils/eventBus';

export default {
  name: 'LoginForm',
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      loading: false
    };
  },
  methods: {
    showNotification(title, message, type) {
      EventBus.$emit('show-notification', title, message, type);
    },
    
    async handleLogin() {
      this.loading = true;
      try {
        const response = await AuthService.login(this.form.email, this.form.password);
        
        if (response.code === 200 && response.data && response.data.token) {
          AuthService.setAuthToken(response.data.token);
          this.$router.push('/dashboard');
        } else {
          // 处理错误情况
          const errorMessage = response.data?.error || response.message || '登录失败，请检查邮箱和密码';
          this.showNotification('登录失败', errorMessage, 'error');
        }
      } catch (error) {
        console.error('Login error:', error);
        this.showNotification('登录错误', '登录请求失败，请稍后重试', 'error');
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  width: 100%;
  min-height: 100vh;
  position: relative;
  z-index: 1;
}

.form_area {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f8cdda; /* 樱花粉浅色 */
  height: auto;
  width: auto;
  border: 2px solid #ff69b4; /* 樱花粉主色 */
  border-radius: 20px;
  box-shadow: 3px 4px 0px 1px #ffb6c1; /* 浅樱花粉 */
  max-width: 500px;
  width: 100%;
  padding: 20px;
  margin: 20px;
}

.title {
  color: white; /* 主标题改为白色 */
  font-weight: 900;
  font-size: 1.8em; /* 增大主标题字体 */
  margin-top: 20px;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.3); /* 添加文字阴影使白色文字在浅色背景上更清晰 */
}

.sub_title {
  font-weight: 600;
  margin: 5px 0;
  color: #ff69b4; /* 樱花粉主色 */
  text-align: left;
  width: 100%;
  font-size: 1.1em; /* 增大副标题字体 */
}

.form_group {
  display: flex;
  flex-direction: column;
  align-items: baseline;
  margin: 10px;
  width: 100%;
}

.form_style {
  outline: none;
  border: 2px solid #ff69b4; /* 樱花粉主色 */
  box-shadow: 3px 4px 0px 1px #ffb6c1; /* 浅樱花粉 */
  width: 100%;
  padding: 12px 10px;
  border-radius: 4px;
    font-size: 16px;
  transition: transform 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.form_style:focus, .btn:focus {
  transform: translateY(4px);
  box-shadow: 1px 2px 0px 0px #ff69b4; /* 樱花粉主色 */
}

.btn {
  padding: 15px;
  margin: 25px 0px;
  width: 100%;
  font-size: 16px;
  background: #ff69b4; /* 樱花粉主色 */
  border: none;
  border-radius: 10px;
  font-weight: 800;
  box-shadow: 3px 3px 0px 0px #ffb6c1; /* 浅樱花粉 */
  color: white;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
}

.btn:hover:not(:disabled) {
  opacity: .9;
  transform: translateY(2px);
  box-shadow: 2px 2px 0px 0px #ffb6c1; /* 浅樱花粉 */
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.link {
  font-weight: 800;
  color: #ff1493; /* 深樱花粉 */
  padding: 5px;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

/* 响应式设计 */
@media (max-width: 576px) {
  .form_area {
    margin: 10px;
    padding: 15px;
  }
}
</style>