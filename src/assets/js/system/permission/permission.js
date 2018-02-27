import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'

export default {
  name: "permission-mgr",
  data() {
    return {
      permissionList: [],
      dialogDeleteShow: false,//删除弹框
      dialogEditShow: false, //编辑弹框
      dialogConfigShow: false, //权限配置弹框
      form: {id: '', name: '', code: '', status: true, description: ''}, //form表单
      currentSelectPermissionId: -1//当前选中的权限ID
    }
  },
  mounted: function () {
    this.getData();
  },
  methods: {
    getData: function () {
      httpReq.get(api.url_getPermissionList, "").then(res => {
        if (res.code == 100) {
          this.permissionList = res.data;
        } else {
          this.$message({message: res.msg, type: 'warning'});
        }
      })
    },
    confirmDeleteMenu: function () {
      httpReq.post(api.url_deletePermission, {Id: this.currentSelectPermissionId}).then(res => {
        if (res.code == 100) {
          this.currentSelectPermissionId = -1;
          this.dialogDeleteShow = false;
          this.getData();
        } else {
          this.$message({message: res.msg, type: 'warning'})
        }
      })
    },
    confirmPermission: function () {
      if (!this.form.name) {
        this.$message({message: '请输入权限名称', type: 'warning'})
      } else {
        this.form.status = this.form.status || this.form.status == 1 ? 1 : 0;
        httpReq.post(api.url_insertPermission, this.form).then(res => {
          if (res.code == 100) {
            this.dialogEditShow = false;
            this.getData();
          } else {
            this.$message({message: res.msg, type: 'warning'})
          }
        })
      }
    },
    showDeleteDialog: function (id) {
      this.dialogDeleteShow = true;
      this.currentSelectPermissionId = id;
    }
  }
}
