import { createRouter, createWebHashHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import MenuView from '@/views/MenuView.vue';
import ProjectsView from '@/views/ProjectsView.vue';
import ResumeView from '@/views/ResumeView.vue';
import ContactView from '@/views/ContactView.vue';
import Command from '@/util/command';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/menu',
      name: Command.MENU,
      component: MenuView
    },
    {
      path: '/about',
      name: Command.ABOUT,
      component: AboutView
    },
    {
      path: '/projects',
      name: Command.PROJECTS,
      component: ProjectsView
    },
    {
      path: '/contact',
      name: Command.CONTACT,
      component: ContactView
    },
    {
      path: '/resume',
      name: Command.RESUME,
      component: ResumeView
    }
  ]
});

export default router;
