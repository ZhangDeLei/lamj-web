import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import SystemMain from '@/components/views/SystemMain'
import MenuList from '@/components/system/menumanager/MenuList'
import MenuInsert from '@/components/system/menumanager/MenuInsert'
import PermissionMgr from '@/components/system/permission/PermissionMgr'
import CompanyMgr from '@/components/system/company/CompanyMgr'
import CompanyTeamMgr from '@/components/system/company/CompanyTeamMgr'
import CompanyNewMgr from '@/components/system/company/CompanyNewMgr'
import UserMgr from '@/components/system/user/UserMgr'
import UserAdd from '@/components/system/user/UserAdd'
import DataMonitor from '@/components/system/system/DataMonitor'
import DictMgr from '@/components/system/system/DictMgr'
import CaliberMgr from '@/components/system/caliber/CaliberMgr'
import NewAuthMgr from '@/components/system/newauth/NewAuthMgr'

import CustomMain from '@/components/views/CustomMain'
import TeamMgr from '@/components/custom/team/TeamMgr'
import TeamUserMgr from '@/components/custom/team/TeamUserMgr'
import TeamUserEdit from '@/components/custom/team/TeamUserEdit'
import CaliberList from '@/components/custom/caliber/CaliberList'
import TaskEdit from '@/components/custom/task/TaskEdit'
import TaskMgr from '@/components/custom/task/TaskMgr'
import PatrolList from '@/components/custom/patrol/PatrolList'

import store from "../store/store"

Vue.use(Router)

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/system',
    name: 'system',
    meta: {requireAuth: true},
    component: Index,
    children: [
      {path: '/', redirect: '/system-main'},
      {path: '/system-main', name: 'system-main', component: SystemMain, meta: {requireAuth: true}},
      {path: '/menu', name: 'menu', component: MenuList, meta: {requireAuth: true}},
      {path: '/menu-add', name: 'menu-add', component: MenuInsert, meta: {requireAuth: true}},
      {path: '/menu-edit/:id', name: 'menu-edit', component: MenuInsert, meta: {requireAuth: true}},
      {path: '/permission', name: 'permission', component: PermissionMgr, meta: {requireAuth: true}},
      {path: '/company-mgr', name: 'company-mgr', component: CompanyMgr, meta: {requireAuth: true}},
      {path: '/company/company-team-mgr', name: 'company-team-mgr', component: CompanyTeamMgr, meta: {requireAuth: true} },
      {path: '/company/company-new-mgr', name: 'company-new-mgr', component: CompanyNewMgr, meta: {requireAuth: true} },
      {path: '/user', name: 'user', component: UserMgr, meta: {requireAuth: true}},
      {path: '/user/user-add', name: 'user-add', component: UserAdd, meta: {requireAuth: true}},
      {path: '/user/user-edit/:id', name: 'user-edit', component: UserAdd, meta: {requireAuth: true}},
      {path: '/system/data-monitor', name: 'data-monitor', component: DataMonitor, meta: {requireAuth: true}},
      {path: '/system/dict-mgr', name: 'dict-mgr', component: DictMgr, meta: {requireAuth: true}},
      {path: '/system/cailber-mgr', name: 'cailber-mgr', component: CaliberMgr, meta: {requireAuth: true}},
      {path: '/system/new-auth-mgr', name: 'new-auth-mgr', component: NewAuthMgr, meta: {requireAuth: true}},
    ]
  },
  {
    path: '/custom',
    name: 'custom',
    meta: {requireAuth: true},
    component: Index,
    children: [
      {path: '/', redirect: '/custom-main'},
      {path: '/custom-main', name: 'custom-main', component: CustomMain, meta: {requireAuth: true}},
      {path: '/team/team-mgr', name: 'team-mgr', component: TeamMgr, meta: {requireAuth: true}},
      {path: '/team/team-user-mgr', name: 'team-user-mgr', component: TeamUserMgr, meta: {requireAuth: true}},
      {path: '/team/team-user-edit', name: 'team-user-edit', component: TeamUserEdit, meta: {requireAuth: true}},
      {path: '/team/team-user-edit/:id', name: 'team-user-edit', component: TeamUserEdit, meta: {requireAuth: true}},
      {path: '/caliber/caliber-list', name: 'caliber-list', component: CaliberList, meta: {requireAuth: true}},
      {path: '/task/task-add', name: 'task-add', component: TaskEdit, meta: {requireAuth: true}},
      {path: '/task/task-edit/:id', name: 'task-edit', component: TaskEdit, meta: {requireAuth: true}},
      {path: '/task/task-list', name: 'task-list', component: TaskMgr, meta: {requireAuth: true}},
      {path: '/patrol/patrol-list', name: 'patrol-list', component: PatrolList, meta: {requireAuth: true}},
    ]
  }
];

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
