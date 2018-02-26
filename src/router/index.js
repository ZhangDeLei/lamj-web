import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import ContentMain from '@/components/views/ContentMain'
import MenuList from '@/components/menumanager/MenuList'
import MenuInsert from '@/components/menumanager/MenuInsert'
import store from "../store/store"
import * as types from "../store/types"

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/index',
    name: 'index',
    meta: {requireAuth: true},
    component: Index,
    children: [
      {path: '/content-main', name: 'content-main', component: ContentMain, meta: {requireAuth: true}},
      {path: '/menu', name: 'menu', component: MenuList, meta: {requireAuth: true}},
      {path: '/menu-add', name: 'menu-add', component: MenuInsert, meta: {requireAuth: true}}
    ]
  }
];

if (window.localStorage.getItem('token')) {
  store.commit(types.LOGIN, window.localStorage.getItem('token'));
}
const router = new Router({routes});
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.token) {
      next();
    } else {
      next({path: '/', query: {redirect: to.fullPath}});
    }
  } else {
    next();
  }
})
export default router
