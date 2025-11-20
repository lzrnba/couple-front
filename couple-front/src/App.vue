<script>
import { RouterLink, RouterView } from 'vue-router'
import Notification from './components/auth/Notification.vue'
import EventBus from './utils/eventBus'

export default {
  name: 'App',
  components: {
    RouterLink,
    RouterView,
    Notification
  },
  mounted() {
    // 监听来自子组件的通知事件
    EventBus.$on('show-notification', this.showNotification);
  },
  beforeUnmount() {
    // 清理事件监听
    EventBus.$off('show-notification', this.showNotification);
  },
  methods: {
    showNotification(title, message, type) {
      this.$refs.notification.addNotification(title, message, type);
    }
  }
}
</script>

<template>
  <div class="app-container">
    <RouterView />
    <Notification ref="notification" />
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  width: 100%;
  position: relative;
  background-color: #fff5f7; /* 浅樱花粉背景 */
}

/* 爱心背景装饰 */
.app-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(#ffd1dc 10%, transparent 11%),
    radial-gradient(#ffb6c1 10%, transparent 11%);
  background-size: 30px 30px;
  background-position: 0 0, 15px 15px;
  opacity: 0.3;
  z-index: 0;
}

.app-container > * {
  position: relative;
  z-index: 1;
}
</style>