import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '@views/home/index.vue';
import NotFound from '@views/notFound/index.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  // 定向至notfound页面
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHashHistory('/'),
  routes
})

export default router
