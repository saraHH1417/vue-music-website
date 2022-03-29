import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import ManageView from '@/views/ManageView.vue';
import SongView from '@/views/SongView.vue';
import store from '@/store';

const routes = [
  {
    name: 'home',
    path: '/',
    component: HomeView,
  },
  {
    name: 'about',
    path: '/about',
    component: AboutView,
  },
  {
    name: 'manage',
    // alias: '/manage',
    path: '/manage-music',
    meta: {
      requiresAuth: true,
    },
    component: ManageView,
    beforeEnter: (to, from, next) => {
      // console.log('Mange Route Guard', to, from);
      next();
    },
  },
  {
    // redirect is better for search engines compared to the alias
    path: '/manage',
    redirect: { name: 'manage' },
  },
  {
    name: 'song',
    path: '/song/:id',
    component: SongView,
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: 'text-yellow-500',
});

router.beforeEach((to, from, next) => {
  if (!to.matched.some((record) => record.meta.requiresAuth)) {
    next();
    return;
  }
  if (store.state.userLoggedIn) {
    next();
  } else {
    next({ name: 'home' });
  }
});

export default router;
