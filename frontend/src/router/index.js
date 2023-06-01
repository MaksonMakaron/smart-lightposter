import { createRouter, createWebHistory } from 'vue-router';
import ScheduleOverviewPage from '@/pages/ScheduleOverviewPage.vue';
import SettingsPage from '@/pages/SettingsPage.vue';
import SystemInfoPage from '@/pages/SystemInfoPage.vue';
import AuthorizationPage from '@/pages/AuthorizationPage.vue';
import AddMonitorPage from '@/pages/AddMonitorPage.vue';
import AddSysInfoMonitorPage from '@/pages/AddSysInfoMonitorPage.vue';
import EditSysInfoMonitorPage from '@/pages/EditSysInfoMonitorPage.vue';
import AddMediaPage from '@/pages/AddMediaPage.vue';
import EditMediaPage from '@/pages/EditMediaPage.vue';
import HomePage from '@/pages/HomePage.vue';
import NotFoundPage from '@/pages/NotFoundPage.vue';

const routes = [
  {
    path: '/auth',
    name: 'auth',
    component: AuthorizationPage,
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '/',
    name: 'home',
    component: HomePage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/schedule/:idScreen',
    name: 'schedule',
    component: ScheduleOverviewPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/settings/:idScreen',
    name: 'settings',
    component: SettingsPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/sysinfo/:idScreen',
    name: 'sysinfo',
    component: SystemInfoPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/addMonitor',
    name: 'addMonitor',
    component: AddMonitorPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    component: AddSysInfoMonitorPage,
    path: '/addSysInfoMonitor',
    name: 'addSysInfoMonitor',
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/editSysInfoMonitor/:idScreen',
    name: 'editSysInfoMonitor',
    component: EditSysInfoMonitorPage,
    meta: {
      requiresAuth: true,
    },
  },
  {
    component: AddMediaPage,
    path: '/addMedia/:idScreen',
    name: 'addMedia',
    meta: {
      requiresAuth: true,
    },
  },
  {
    component: EditMediaPage,
    path: '/editMedia/:idScreen/:idMedia',
    name: 'editMedia',
    meta: {
      requiresAuth: true,
    },
  },

  {
    path: '/:pathMatch(.*)*',
    component: NotFoundPage,
    meta: {
      requiresAuth: false,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('jwt_token');
  const isAuthenticated = token ? true : false;
  if (to.meta.requiresAuth) {
    if (isAuthenticated) {
      next();
    } else {
      next('/auth');
    }
  } else {
    next();
  }
});

export default router;
