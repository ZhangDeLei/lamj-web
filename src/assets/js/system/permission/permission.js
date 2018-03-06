import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'

export default {
  name: "permission-mgr",
  data() {
    return {
      typeList: [],
      menuTreeList: [],//当前所有菜单树形列表
      permissionMenuTreeList: [],//当前权限菜单树形列表
      permissionData: {},
      dialogEditShow: false, //编辑弹框
      dialogConfigShow: false, //权限配置弹框
      form: {id: '', name: '', code: '', status: true, description: ''}, //form表单
      currentSelectPermissionId: -1,//当前选中的权限ID
      pageSize: 10,
      rules: {
        name: [{required: true, message: '请输入名称'}],
        typeId: [{required: true, message: '请选择类型'}]
      }
    }
  },
  mounted: function () {
    this.getData(1);
    this.getMenuTree();
    this.getTypeList();
  },
  computed: {
    getNocheckMenuTree: function () {
      var data = [];
      for (var item of this.menuTreeList) {
        var obj = {id: item.id, label: item.label, pid: item.pid};
        var children = [];
        var isExists = false;
        if (!this.contains(item, this.permissionMenuTreeList)) {
          for (var i of item.children) {
            if (!this.contains(i, this.permissionMenuTreeList)) {
              children.push(i);
            }
          }
          isExists = true;
        } else {
          for (var i of item.children) {
            if (!this.contains(i, this.permissionMenuTreeList)) {
              children.push(i);
            }
          }
        }
        obj.children = children;
        if (children.length > 0 || isExists) data.push(obj);
      }
      return data;
    },
    getPermissionTreeList: function () {
      return this.permissionMenuTreeList
    }
  },
  methods: {
    getTypeList: function () {
      httpReq.get(api.url_getDictListByEnName, {EnName: 'Type'}).then(res => {
        if (res.code == 100) {
          this.typeList = res.data;
        }
      })
    },
    removeNode: function (keys, data) {
      var list = [];
      for (var item of data) {
        var exists = keys.indexOf(item.id) >= 0;
        if (!exists) {
          item.children = item.children.filter(function (c) {
            return keys.indexOf(c.id) < 0;
          });
          list.push(item);
        }
      }
      return list;
    },
    addNode: function (nodes, data) {
      var list = [];
      nodes.forEach(n => {
        if (n.pid == 0 && !this.contains(n, data)) {
          data.push(n);
        } else if (!this.contains(n, data)) {
          var nod = this.getParentNode(n, data);
          if (nod.length == 0) {
            var node = this.getParentNode(n, this.menuTreeList)[0];
            data.push({id: node.id, label: node.label, pid: node.pid, children: [n]});
          } else if (this.contains(nod[0], data) && !this.contains(n, data)) {
            data.forEach(t => {
              if (t.id == nod[0].id) {
                t.children.push(n);
              }
            })
          }
        }
      })
      data.forEach(t => list.push(t))
      return list;
    },
    addMenu: function () {
      var keys = this.$refs.nocheckTree.getCheckedKeys();
      var nodes = this.$refs.nocheckTree.getCheckedNodes();
      if (keys.length > 0) {
        this.permissionMenuTreeList = this.addNode(nodes, this.permissionMenuTreeList);
      } else {
        this.$message({message: '请选择一个节点'})
      }
    },
    removeMenu: function () {
      var nodes = this.$refs.checkTree.getCheckedKeys();
      if (nodes.length > 0) {
        this.permissionMenuTreeList = this.removeNode(nodes, this.permissionMenuTreeList);
      } else {
        this.$message({message: '请选择一个节点'})
      }
    },
    contains: function (item, list) {
      var exists = false;
      for (var i of list) {
        if (i.id == item.id) {
          exists = true;
          break;
        }
        for (var s of i.children) {
          if (s.id == item.id) {
            exists = true;
            break;
          }
        }
        if (exists) break;
      }
      return exists;
    },
    getParentNode: function (item, list) {
      return list.filter(function (n) {
        return item.pid == n.id;
      });
    },
    //重新转换一下tree
    convertTreeList: function (list) {
      var data = [];
      if (list == null || list.length == 0) return data;
      for (var i = 0; i < list.length; i++) {
        var obj = {id: list[i].id, label: list[i].name, pid: list[i].parentId};
        obj.children = this.convertTreeList(list[i].childs);
        data.push(obj);
      }
      return data;
    },
    getData: function (curPage) {
      httpReq.get(api.url_getPermissionList, {PageSize: this.pageSize, CurPage: curPage}).then(res => {
        if (res.code == 100) {
          this.permissionData = res.data;
        } else {
          this.$message({message: res.msg, type: 'warning'});
        }
      })
    },
    getMenuTree: function () {
      httpReq.get(api.url_getMenuListByTree, "").then(res => {
        if (res.code == 100) {
          this.menuTreeList = this.convertTreeList(res.data);
        }
      })
    },
    getPermissionMenu: function (id) {
      httpReq.get(api.url_getPermissionMenuForTreeById, {Id: id}).then(res => {
        if (res.code == 100) {
          this.permissionMenuTreeList = this.convertTreeList(res.data);
        }
      })
    },
    confirmDeleteMenu: function (id) {
      this.$confirm('确认删除当前权限信息吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        httpReq.post(api.url_deletePermission, {Id: id}).then(res => {
          if (res.code == 100) {
            this.getData(1);
          } else {
            this.$message({message: res.msg, type: 'warning'})
          }
        })
      })
    },
    confirmPermission: function () {
      this.$refs['form'].validate((v) => {
        if (v) {
          this.form.status = this.form.status || this.form.status == 1 ? 1 : 0;
          var url = this.form.id > 0 ? api.url_updatePermission : api.url_insertPermission;
          httpReq.post(url, this.form).then(res => {
            if (res.code == 100) {
              this.dialogEditShow = false;
              this.getData(1);
            } else {
              this.$message({message: res.msg, type: 'warning'})
            }
          })
        } else {
          return false;
        }
      })
    },
    confirmConfigPermission: function () {
      httpReq.post(api.url_insertPermissionMenuRela, {Id: this.form.id, mIds: this.getPermissionList()}).then(res => {
        if (res.code == 100) {
          this.dialogConfigShow = false;
        } else {
          this.$message({message: res.msg, type: 'warning'})
        }
      })
    },
    getPermissionList: function () {
      var list = [];
      this.permissionMenuTreeList.forEach(t => {
        list.push(t.id)
        t.children.forEach(n => {
          list.push(n.id)
        })
      })
      return list;
    },
    showEditDialog: function (item) {
      this.form = item;
      this.form.status = item.status == 1 ? true : false;
      this.dialogEditShow = true;
    },
    showInsertDialog: function () {
      this.dialogEditShow = true;
      this.form = {};
    },
    showConfigDialog: function (item) {
      this.dialogConfigShow = true;
      this.form.name = item.name;
      this.form.id = item.id;
      this.getPermissionMenu(item.id);
    },
    closeConfigDialog: function () {
      this.form = {};
      this.dialogConfigShow = false;
      this.permissionMenuTreeList = [];
    },
    typeChange: function (e) {
      var obj = this.typeList.filter(function (t) {
        return t.id == e;
      })[0]
      this.form.typeCode = obj.code;
      this.form.typeName = obj.label;
    },
    handleCurrentChange: function (val) {
      this.getData(val);
    }
  }
}
