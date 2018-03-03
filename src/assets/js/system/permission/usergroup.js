import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'

export default {
  name: "user-group-mgr",
  data() {
    return {
      form: {id: '', status: false},
      groupList: [],
      checkList: [],
      nocheckList: [],
      dialogEditShow: false,
      dialogConfigShow: false,
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1;
      }
    }
  },
  mounted: function () {
    this.getData();
    this.getPerList();
  },
  methods: {
    getData: function () {
      httpReq.get(api.url_getGroupList, "").then(res => {
        this.groupList = res.data;
      })
    },
    getPerList: function () {
      httpReq.get(api.url_getPermissionListByUsed, "").then(res => {
        res.data.forEach(t => {
          if (t != null) this.nocheckList.push({label: t.name, key: t.id})
        })
      });
    },
    getGroupPerList: function (id) {
      httpReq.get(api.url_getGroupPermissionByGroupId, {Id: id}).then(res => {
        res.data.forEach(t => {
          if (t != null) this.checkList.push(t.permissionId);
        })
      })
    },
    showConfigDialog: function (item) {
      this.form = item;
      this.dialogConfigShow = true;
      this.getGroupPerList(item.id);
    },
    showEditDialog: function (item) {
      this.form = item;
      this.form.status = item.status == 1 ? true : false;
      this.dialogEditShow = true;
    },
    confirmDeleteMenu: function (id) {
      this.$confirm('确认删除当前用户组信息吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        httpReq.post(api.url_deleteGroup, {Id: id}).then(res => {
          if (res.code == 100) {
            this.getData();
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    confirmGroup: function () {
      if (!this.form.name) {
        this.$message({message: '请输入名称', type: 'warning'})
      } else {
        var url = this.form.id ? api.url_updateGroup : api.url_insertGroup;
        this.form.status = this.form.status || this.form.status == 1 ? 1 : 0;
        httpReq.post(url, this.form).then(res => {
          if (res.code == 100) {
            this.form = {};
            this.dialogEditShow = false;
            this.getData();
          } else {
            this.$message.error(res.msg)
          }
        })
      }

    },
    confirmConfigPermission: function () {
      httpReq.post(api.url_updateGroupPermission, {Id: this.form.id, mIds: this.checkList}).then(res => {
        if (res.code == 100) {
          this.dialogConfigShow = false;
          this.form = {};
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    closeConfigDialog: function () {
      this.form = {};
    }
  }
}
