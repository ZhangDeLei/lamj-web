const api = {
  url_host: 'http://localhost:8080/lamj', //host地址
  url_local: 'http://localhost:8080/lamj/api/',//api地址
  url_login: 'auth/login',//登录接口
  url_dataMonitor: '/druid',//数据库监控地址

  url_getUserListByCondition: 'user/getUserListByCondition',//获取用户列表接口
  url_deleteUser: 'user/delete',//删除用户
  url_insertUser: 'user/insert',//新增用户
  url_getUserById: 'user/getUserById',//根据用户ID获取用户信息
  url_updateUser: 'user/update',//更新用户
  url_updateCustom: 'user/updateCustom',//更新业务用户
  url_updatePassword: 'user/updatePassword',//更新密码
  url_updatePhoto: 'user/updatePhoto',//更新头像
  url_insertGroupAndPermission: 'user/insertGroupAndPermission',//新增用户组、权限与用户的关联关系
  url_getAllUser: 'user/getAllUser',//获取所有用户列表
  url_insertCustom: 'user/insertCustom',//新增业务用户

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
  url_getAllPermissionList: 'permission/getAllPermissionList',//获取所有权限列表信息

  url_getDictListByEnName: 'dictionary/getDictListByEnName',//根据英文名称获取字典值列表
  url_getDictList: 'dictionary/getDictList',//获取字典值列表
  url_insertDict: 'dictionary/insert',//新增字典值
  url_updateDict: 'dictionary/update',//更新字典值
  url_deleteDict: 'dictionary/delete',//删除字典值

  url_getAllCompanyList: 'company/getAllCompanyList',//获取所有企业列表信息
  url_getCompanyList: 'company/getCompanyList',//获取企业列表
  url_getCompanyById: 'company/getCompanyById',//根据ID获取企业信息
  url_insertCompany: 'company/insert',//新增企业
  url_updateCompany: 'company/update',//修改企业
  url_deleteCompany: 'company/delete',//删除企业

  url_getTeamListByCompanyId: 'team/getTeamListByCompanyId',//根据企业ID获取企业的队伍列表
  url_getTeamList: 'team/getTeamList',//分页查询队伍列表
  url_getAllTeamList: 'team/getAllTeamList',//获取所有队伍列表
  url_insertTeam: 'team/insert',//新增队伍
  url_updateTeam: 'team/update',//更新队伍
  url_deleteTeam: 'team/delete',//删除队伍

  url_fileUpload: 'file/fileUpload'//文件上传
}
export default api;
