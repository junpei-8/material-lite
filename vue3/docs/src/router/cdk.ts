import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: 'categories',
    component: () => import('../views/CDK/Categories.vue')
  }
] as RouteRecordRaw[];
