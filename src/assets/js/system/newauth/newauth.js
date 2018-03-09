import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'

export default {
  name: "new-auth-mgr",
  data() {
    return {
      form: {},
      editForm: {},
      newData: {},
      pageSize: 10,
      dialogEditShow: false,
      Oprs: [],
      checkOprs: [],
      rules: {
        name: [{required: true, message: '请输入名称'}]
      }
    }
  },
  mounted() {
    this.getData(1);
    this.getDictList();
  },
  methods: {
    getDictList: function () {
      httpReq.get(api.url_getDictListByEnName, {EnName: 'OprType'}).then(res => {
        this.Oprs = res.data;
      })
    },
    getData: function (pages) {
      this.form.PageSize = this.pageSize;
      this.form.CurPage = pages;
      httpReq.get(api.url_getNewAuthList, this.form).then(res => {
        this.newData = res.data;
      })
    },
    onSearch: function () {
      this.getData(1);
    },
    showEditDialog: function (obj) {
      this.editForm = obj;
      this.dialogEditShow = true;
    },
    showInsertDialog: function () {
      this.editForm = {};
      this.checkOprs = [];
      this.dialogEditShow = true;
    },
    confirmDelete: function (id) {
      this.$confirm('确认删除该信息吗？', '提示', {confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning'}).then(() => {
        httpReq.post(api.url_deleteNewAuth, {Id: id}).then(res => {
          if (res.code == 100) {
            this.$message.success('删除成功')
            this.getData(1);
          } else {
            this.$message.error(res.msg);
          }
        });
      })
    },
    confirmEdit: function () {
      var _this = this;
      this.$refs['editForm'].validate(function (v) {
        if (v) {
          var url = _this.editForm.id ? api.url_updateNewAuth : api.url_insertNewAuth;
          _this.editForm.oprs = _this.convertNewOpr(_this.editForm.name);
          httpReq.post(url, _this.editForm).then(res => {
            if (res.code == 100) {
              _this.dialogEditShow = false;
              _this.$message.success('操作成功')
              _this.getData(1);
            } else {
              _this.$message.error('操作失败')
            }
          })
        }
      });
    },
    convertNewOpr: function (name) {
      var oprs = [];
      var _this = this;
      this.checkOprs.forEach(function (c) {
        var o = _this.Oprs.filter(t => {
          return t.id == c;
        })[0]
        oprs.push({newName: name, oprTypeId: o.id, oprTypeCode: o.code, oprTypeName: o.label});
      })
      return oprs;
    }
  }
}
