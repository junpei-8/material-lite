import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

import Home from '../views/Home.vue';
import NotFound from '../views/NotFound.vue';

import Components from '../views/Components/Components.vue';
import CDK from '../views/CDK/CDK.vue';
import Guide from '../views/Guide/Guide.vue';

import componentsChildren from './components';
import cdkChildren from './cdk';
import guideChildren from './guide';

const routes: RouteRecordRaw[] = [
  {
    path: '/components',
    redirect: '/components/categories',
    component: Components,
    children: componentsChildren
  },
  {
    path: '/cdk',
    redirect: '/cdk/categories',
    component: CDK,
    children: cdkChildren
  },
  {
    path: '/guide',
    redirect: '/cdk/categories',
    component: Guide,
    children: guideChildren
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    redirect: '/home',
    strict: true
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
