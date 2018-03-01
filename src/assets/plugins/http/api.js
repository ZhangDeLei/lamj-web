const api = {
  url_local: 'http://localhost:8080/lamj/api/',
  url_login: 'auth/login',

  url_getUserListByCondition: 'user/getUserListByCondition',
  url_deleteUser: 'user/delete',
  url_insertUser: 'user/insert',

  url_getMenuListByUserId: 'menu/getMenuListByUserId',
  url_getMenuListByTree: 'menu/getMenuListByTree',
  url_getMenuListByParentId: 'menu/getMenuListByParentId',
  url_getMenuById: 'menu/getMenuById',
  url_insertMenu: 'menu/insertMenu',
  url_updateMenu: 'menu/updateMenu',
  url_deleteMenu: 'menu/deleteMenu',

  url_getPermissionMenuForTreeById: 'permission/getPermissionMenuForTreeById',
  url_getPermissionList: 'permission/getPermissionList',
  url_insertPermission: 'permission/insert',
  url_insertPermissionMenuRela: 'permission/insertPermisionMenuRela',
  url_updatePermission: 'permission/update',
  url_deletePermission: 'permission/delete',
  url_getPermissionListByUsed: 'permission/getPermissionListByUsed',

  url_getGroupList: 'group/getGroupList',
  url_deleteGroup: 'group/deleteGroup',
  url_insertGroup: 'group/insertGroup',
  url_updateGroup: 'group/updateGroup',
  url_updateGroupPermission: 'group/updateGroupPermission',
  url_getGroupPermissionByGroupId: 'group/getGroupPermissionByGroupId',

  url_fileUpload: 'file/fileUpload'
}
export default api;
