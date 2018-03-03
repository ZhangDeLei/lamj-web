const api = {
  url_host: 'http://localhost:8080/lamj', //host地址
  url_local: 'http://localhost:8080/lamj/api/',//api地址
  url_login: 'auth/login',//登录接口

  url_getUserListByCondition: 'user/getUserListByCondition',//获取用户列表接口
  url_deleteUser: 'user/delete',//删除用户
  url_insertUser: 'user/insert',//新增用户
  url_getUserById: 'user/getUserById',//根据用户ID获取用户信息
  url_updateUser: 'user/update',//更新用户
  url_updatePassword: 'user/updatePassword',//更新密码
  url_updatePhoto: 'user/updatePhoto',//更新头像
  url_insertGroupAndPermission: 'user/insertGroupAndPermission',//新增用户组、权限与用户的关联关系

  url_getMenuListByUserId: 'menu/getMenuListByUserId',//根据用户ID获取菜单列表
  url_getMenuListByTree: 'menu/getMenuListByTree',//获取菜单树形列表
  url_getMenuListByParentId: 'menu/getMenuListByParentId',//根据父级ID获取菜单列表
  url_getMenuById: 'menu/getMenuById',//根据菜单ID获取菜单信息
  url_insertMenu: 'menu/insertMenu',//新增菜单
  url_updateMenu: 'menu/updateMenu',//更新菜单
  url_deleteMenu: 'menu/deleteMenu',//删除菜单

  url_getPermissionMenuForTreeById: 'permission/getPermissionMenuForTreeById',//根据权限id获取权限菜单树形列表
  url_getPermissionList: 'permission/getPermissionList',//获取权限列表
  url_insertPermission: 'permission/insert',//新增权限
  url_insertPermissionMenuRela: 'permission/insertPermisionMenuRela',//新增权限与菜单的关联关系
  url_updatePermission: 'permission/update',//更新权限
  url_deletePermission: 'permission/delete',//删除权限
  url_getPermissionListByUsed: 'permission/getPermissionListByUsed',//获取可被使用的权限列表
  url_getUserPermissionList: 'permission/getUserPermissionList',//根据用户ID获取权限列表信息
  url_insertUserPermission: 'permission/insertUserPermission',//新增用户与权限的关联关系

  url_getGroupList: 'group/getGroupList',//获取用户组列表
  url_deleteGroup: 'group/deleteGroup',//删除用户组
  url_insertGroup: 'group/insertGroup',//新增用户组
  url_updateGroup: 'group/updateGroup',//更新用户组
  url_updateGroupPermission: 'group/updateGroupPermission',//更新用户组权限
  url_getGroupPermissionByGroupId: 'group/getGroupPermissionByGroupId',//根据用户组id获取权限列表
  url_getUserGroupList: 'group/getUserGroupList',//根据用户ID获取用户组列表信息
  url_insertUserGroup: 'group/insertUserGroup',//新增用户与用户组的关联关系

  url_fileUpload: 'file/fileUpload'//文件上传
}
export default api;
