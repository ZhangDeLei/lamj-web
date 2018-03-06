import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import ContentMain from '@/components/views/ContentMain'
import MenuList from '@/components/system/menumanager/MenuList'
import MenuInsert from '@/components/system/menumanager/MenuInsert'
import PermissionMgr from '@/components/system/permission/PermissionMgr'
import UserGroupMgr from '@/components/system/permission/UserGroupMgr'
import CompanyMgr from '@/components/system/company/CompanyMgr'
import UserMgr from '@/components/system/user/UserMgr'
import UserAdd from '@/components/system/user/UserAdd'
import UserConfig from '@/components/system/user/UserConfig'
import DataMonitor from '@/components/system/system/DataMonitor'
import DictMgr from '@/components/system/system/DictMgr'
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
      {path: '/', redirect: '/content-main'},
      {path: '/content-main', name: 'content-main', component: ContentMain, meta: {requireAuth: true}},
      {path: '/menu', name: 'menu', component: MenuList, meta: {requireAuth: true}},
      {path: '/menu-add', name: 'menu-add', component: MenuInsert, meta: {requireAuth: true}},
      {path: '/menu-edit/:id', name: 'menu-edit', component: MenuInsert, meta: {requireAuth: true}},
      {path: '/permission', name: 'permission', component: PermissionMgr, meta: {requireAuth: true}},
      {path: '/permission/user-group-mgr', name: 'user-group-mgr', component: UserGroupMgr, meta: {requireAuth: true}},
      {path: '/company-mgr', name: 'company-mgr', component: CompanyMgr, meta: {requireAuth: true}},
      {path: '/user', name: 'user', component: UserMgr, meta: {requireAuth: true}},
      {path: '/user/user-add', name: 'user-add', component: UserAdd, meta: {requireAuth: true}},
      {path: '/user/user-edit/:id', name: 'user-edit', component: UserAdd, meta: {requireAuth: true}},
      {path: '/user/user-config/:id', name: 'user-config-edit', component: UserConfig, meta: {requireAuth: true}},
      {path: '/user/user-config', name: 'user-config', component: UserConfig, meta: {requireAuth: true}},
      {path: '/system/data-monitor', name: 'data-monitor', component: DataMonitor, meta: {requireAuth: true}},
      {path: '/system/dict-mgr', name: 'dict-mgr', component: DictMgr, meta: {requireAuth: true}}
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
