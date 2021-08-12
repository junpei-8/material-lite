import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: 'categories',
    component: () => import('../views/Guide/Categories.vue')
  }
] as RouteRecordRaw[];
