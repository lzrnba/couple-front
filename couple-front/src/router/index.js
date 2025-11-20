import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../components/auth/LoginForm.vue';
import RegisterForm from '../components/auth/RegisterForm.vue';
import ResetPasswordForm from '../components/auth/ResetPasswordForm.vue';
import UserDashboard from '../components/auth/UserDashboard.vue';
import AuthService from '../services/AuthService';

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginForm
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterForm
  },
  {
    path: '/reset-password',
    name: 'ResetPassword',
    component: ResetPasswordForm
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: UserDashboard,
    beforeEnter: (to, from, next) => {
      if (AuthService.isAuthenticated()) {
        next();
      } else {
        next('/login');
      }
    }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  // 如果访问的是登录、注册或重置密码页面，且已经登录，则重定向到仪表板
  if (['/login', '/register', '/reset-password'].includes(to.path) && AuthService.isAuthenticated()) {
    next('/dashboard');
  } else {
    next();
  }
});

export default router;