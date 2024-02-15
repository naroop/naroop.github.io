import { createRouter, createWebHashHistory } from 'vue-router';
import BlankView from '../views/HomeView.vue';
import AboutContentVue from '@/components/AboutContent.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BlankView
    },
    {
      path: '/about',
      component: AboutContentVue
    }
  ]
});

export default router;
