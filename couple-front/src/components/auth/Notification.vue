<template>
  <div class="notification-container">
    <transition-group name="slide" tag="div">
      <div 
        v-for="notification in notifications" 
        :key="notification.id"
        class="notification-alert"
        :class="getNotificationClass(notification.type)"
      >
        <div class="notification-content">
          <div class="notification-icon">
            <svg
              v-if="notification.type === 'error'"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="icon-svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              ></path>
            </svg>
            <svg
              v-else-if="notification.type === 'success'"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="icon-svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="icon-svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
          </div>
          <div class="notification-text">
            <p class="notification-title">{{ notification.title }}</p>
            <p class="notification-message">{{ notification.message }}</p>
          </div>
        </div>
        <button
          @click="removeNotification(notification.id)"
          class="notification-close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="close-svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18 18 6M6 6l12 12"
            ></path>
          </svg>
        </button>
      </div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'Notification',
  data() {
    return {
      notifications: []
    };
  },
  methods: {
    addNotification(title, message, type = 'info') {
      const id = Date.now() + Math.random();
      this.notifications.push({
        id,
        title,
        message,
        type
      });
      
      // 5秒后自动移除通知
      setTimeout(() => {
        this.removeNotification(id);
      }, 5000);
    },
    
    removeNotification(id) {
      const index = this.notifications.findIndex(notification => notification.id === id);
      if (index !== -1) {
        this.notifications.splice(index, 1);
      }
    },
    
    getNotificationClass(type) {
      // 使用樱花粉色系
      switch (type) {
        case 'success':
          return 'notification-success';
        case 'error':
          return 'notification-error';
        case 'warning':
          return 'notification-warning';
        default:
          return 'notification-info';
      }
    }
  }
};
</script>

<style scoped>
.notification-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  width: 300px;
}

/* 修改通知容器位置 */
@media (min-width: 768px) {
  .notification-container {
    top: calc(100vh * 0.2);
    right: calc(100vw * 0.2);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .notification-container {
    width: calc(100% - 40px);
    top: 10px;
    right: 10px;
  }
}

/* 修改通知容器位置 */
@media (min-width: 768px) {
  .notification-container {
    top: calc(100vh * 0.2);
    right: calc(100vw * 0.2);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .notification-container {
    width: calc(100% - 40px);
    top: 10px;
    right: 10px;
  }
}

.notification-alert {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  border-radius: 8px;
  padding: 12px 10px;
  margin-bottom: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  animation: popIn 0.3s ease-out;
}

.notification-content {
  display: flex;
  gap: 8px;
}

.notification-icon {
  padding: 4px;
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.5);
  backdrop-filter: blur(10px);
}

.icon-svg, .close-svg {
  width: 24px;
  height: 24px;
}

.notification-text {
  display: flex;
  flex-direction: column;
}

.notification-title {
  font-weight: 600;
  margin: 0 0 2px 0;
  font-size: 16px;
}

.notification-message {
  margin: 0;
  font-size: 14px;
  opacity: 0.9;
}

.notification-close {
  color: inherit;
  opacity: 0.7;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
}

.notification-close:hover {
  opacity: 1;
  background-color: rgba(255, 255, 255, 0.2);
}

/* 不同类型通知的样式 */
.notification-success {
  background-color: #f0fdf4;
  border: 1px solid #bbf7d0;
  color: #166534;
}

.notification-error {
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #991b1b;
}

.notification-warning {
  background-color: #fffbeb;
  border: 1px solid #fde68a;
  color: #854d0e;
}

.notification-info {
  background-color: #eff6ff;
  border: 1px solid #bfdbfe;
  color: #1e40af;
}

.slide-enter-active, .slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

@keyframes popIn {
  from {
    transform: scale(0);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .notification-container {
    width: calc(100% - 40px);
    top: 10px;
    right: 10px;
  }
}
</style>