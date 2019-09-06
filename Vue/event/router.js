/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const routes = [
  {
    path: '/',
    name: 'index',
    component:() =>
    import(/* webpackChunkName: "index" */ './views/index'),
    meta: { title: 'emit传值' },
  },
  {
    path: '/sync',
    name: 'Sync',
    component: () => import(/* webpackChunkName: "Sync" */ './views/Sync'),
    meta: {title: 'Sync传值'},
  },
  {
    path: '/module',
    name: 'Modle',
    component: () => import(/* webpackChunkName: "Modle" */ './views/Modle'),
    meta: { title: 'v-module传值' },
  },
  {
    path: '/$parent',
    name: '$parent',
    component: () => import(/* webpackChunkName: "Parent" */ './views/Parent'),
    meta: { title: '$parent传值' },
  },
  {
    path: '/$dispatch',
    name: '$dispatch',
    component: () => import(/* webpackChunkName: "Dispatch" */ './views/Dispatch'),
    meta: { title: '$Dispatch传值' },
  },
  {
    path: '/$broadcast',
    name: '$broadcast',
    component: () => import(/* webpackChunkName: "Broadcast" */ './views/Broadcast'),
    meta: { title: '$Broadcast传值' },
  },
  {
    path: '/$attrs',
    name: '$attrs',
    component: () => import(/* webpackChunkName: "Attrs" */ './views/Attrs'),
    meta: { title: '$Attrs传值' },
  },
  {
    path: '/provide',
    name: 'provide',
    component: () => import(/* webpackChunkName: "Provide" */ './views/Provide'),
    meta: { title: 'Provide传值' },
  },
  {
    path: '/ref',
    name: 'ref',
    component: () => import(/* webpackChunkName: "Ref" */ './views/Ref'),
    meta: { title: 'Ref传值' },
  },
  {
    path: '/event-bus',
    name: 'eventBus',
    component: () => import(/* webpackChunkName: "EventBus" */ './views/EventBus'),
    meta: { title: 'EventBus传值' },
  }
];

const router = new Router({
  routes,
});

export default router;
