<template>
  <div class="container">
    <div class="form_area">
      <p class="title">用户注册</p>
      <form @submit.prevent="handleRegister">
        <div class="form_group">
          <label class="sub_title" for="nickname">用户名</label>
          <input 
            v-model="form.nickname" 
            placeholder="请输入用户名" 
            id="nickname" 
            class="form_style" 
            type="text" 
            required
          />
        </div>
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
        <div class="form_group verification_group">
          <label class="sub_title" for="code">验证码</label>
          <div class="verification_container">
            <input 
              v-model="form.code" 
              placeholder="请输入验证码" 
              id="code" 
              class="form_style verification_input" 
              type="text" 
              required
            />
            <button 
              type="button" 
              class="send_code_btn"
              @click="sendVerificationCode"
              :disabled="sendingCode"
            >
              {{ sendingCode ? '发送中...' : '发送验证码' }}
            </button>
          </div>
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
            {{ loading ? '注册中...' : '注册' }}
          </button>
          <p>已有账号？ <router-link class="link" to="/login">立即登录</router-link></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AuthService from '../../services/AuthService';
import EventBus from '../../utils/eventBus';

export default {
  name: 'RegisterForm',
  data() {
    return {
      form: {
        email: '',
        nickname: '',
        password: '',
        code: ''
      },
      loading: false,
      sendingCode: false
    };
  },
  methods: {
    showNotification(title, message, type) {
      EventBus.$emit('show-notification', title, message, type);
    },
    
    async sendVerificationCode() {
      if (!this.form.email) {
        this.showNotification('输入错误', '请输入邮箱', 'error');
        return;
      }

      // 简单的邮箱格式验证
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.form.email)) {
        this.showNotification('输入错误', '请输入正确的邮箱格式', 'error');
        return;
      }

      this.sendingCode = true;
      try {
        const response = await AuthService.sendEmail(this.form.email);
        
        if (response.code === 200) {
          this.showNotification('发送成功', '验证码已发送至您的邮箱，请注意查收（包括垃圾邮件）', 'success');
        } else {
          this.showNotification('发送失败', `发送验证码失败: ${response.message || '未知错误'}`, 'error');
        }
      } catch (error) {
        console.error('Send code error:', error);
        this.showNotification('发送错误', '发送验证码请求失败，请稍后重试', 'error');
      } finally {
        this.sendingCode = false;
      }
    },

    async handleRegister() {
      if (!this.form.email || !this.form.nickname || !this.form.code || !this.form.password) {
        this.showNotification('输入错误', '请填写所有必填字段', 'error');
        return;
      }

      // 简单的邮箱格式验证
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(this.form.email)) {
        this.showNotification('输入错误', '请输入正确的邮箱格式', 'error');
        return;
      }

      // 密码长度验证
      if (this.form.password.length < 6) {
        this.showNotification('输入错误', '密码长度不能少于6位', 'error');
        return;
      }

      this.loading = true;
      try {
        const response = await AuthService.register(
          this.form.email, 
          this.form.password, 
          this.form.code,
          this.form.nickname
        );
        
        if (response.code === 200) {
          this.showNotification('注册成功', '注册成功，即将跳转到登录页面', 'success');
          setTimeout(() => {
            this.$router.push('/login');
          }, 2000);
        } else {
          this.showNotification('注册失败', `注册失败: ${response.message || '未知错误'}`, 'error');
        }
      } catch (error) {
        console.error('Register error:', error);
        this.showNotification('注册错误', '注册请求失败，请稍后重试', 'error');
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
  font-size: 16px; /* 从15px增加到16px */
  transition: transform 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}

.form_style:focus, .btn:focus, .send_code_btn:focus {
  transform: translateY(4px);
  box-shadow: 1px 2px 0px 0px #ff69b4; /* 樱花粉主色 */
}

.btn {
  padding: 15px;
  margin: 25px 0px;
  width: 100%;
  font-size: 16px; /* 从15px增加到16px */
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

.verification_container {
  display: flex;
  width: 100%;
  gap: 10px;
}

.verification_input {
  flex: 1;
  margin-bottom: 0;
}

.send_code_btn {
  padding: 12px 10px;
  font-size: 14px; /* 从13px增加到14px */
  background: #ff69b4; /* 樱花粉主色 */
  border: none;
  border-radius: 4px;
  font-weight: 800;
  box-shadow: 3px 3px 0px 0px #ffb6c1; /* 浅樱花粉 */
  color: white;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
  white-space: nowrap;
}

.send_code_btn:hover:not(:disabled) {
  opacity: .9;
  transform: translateY(2px);
  box-shadow: 2px 2px 0px 0px #ffb6c1; /* 浅樱花粉 */
}

.send_code_btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* 响应式设计 */
@media (max-width: 576px) {
  .verification_container {
    flex-direction: column;
  }
  
  .form_area {
    margin: 10px;
    padding: 15px;
  }
}
</style>