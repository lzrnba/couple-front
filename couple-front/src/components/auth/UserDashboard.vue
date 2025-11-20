<template>
  <div class="material-card">
    <h2 class="dashboard-title">用户信息</h2>
    <div v-if="loading" class="loading-section">
      <div class="loading"></div>
      <span class="loading-text">加载中...</span>
    </div>
    <div v-else class="user-info">
      <div class="info-item">
        <label class="info-label">当前用户:</label>
        <span class="info-value">{{ userEmail }}</span>
      </div>
      <div class="button-group">
        <button class="pink-button" @click="handleLogout">退出登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import AuthService from '../../services/AuthService';

export default {
  name: 'UserDashboard',
  data() {
    return {
      userEmail: '',
      loading: true
    };
  },
  async mounted() {
    await this.getCurrentUser();
  },
  methods: {
    async getCurrentUser() {
      try {
        const response = await AuthService.getCurrentUser();
        if (response.code === 200) {
          this.userEmail = response.data;
        } else {
          alert('获取用户信息失败');
          this.handleLogout();
        }
      } catch (error) {
        console.error('Get user info error:', error);
        alert('获取用户信息请求失败');
        this.handleLogout();
      } finally {
        this.loading = false;
      }
    },

    handleLogout() {
      AuthService.clearAuthToken();
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.dashboard-title {
  text-align: center;
  margin-bottom: var(--spacing-lg);
  color: var(--text-primary);
  font-weight: 500;
}

.loading-section {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-lg) 0;
}

.loading-text {
  color: var(--text-secondary);
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-lg);
}

.info-item {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xs);
}

.info-label {
  font-weight: 500;
  color: var(--text-primary);
  font-size: 14px;
}

.info-value {
  color: var(--text-secondary);
  font-size: 16px;
  padding: var(--spacing-sm);
  background-color: var(--pastel-pink);
  border-radius: var(--border-radius);
}

.button-group {
  display: flex;
  justify-content: center;
  margin-top: var(--spacing-md);
}
</style>