import { RouteRecordRaw } from 'vue-router';

export default [
  {
    path: 'categories',
    component: () => import('../views/Components/Categories.vue')
  },
  {
    path: 'button/:id',
    component: () => import('../views/Components/Button/Button.vue'),
    redirect: 'components/button/overview'
  }
] as RouteRecordRaw[];
