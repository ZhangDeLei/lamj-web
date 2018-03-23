import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'
import * as types from "../../../../store/types";

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
      iconFile: {},
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
          if (!_this.iconFile.name) {
            _this.editCommit();
          } else {
            var formData = new FormData();
            formData.append('file', _this.iconFile);
            formData.append('type', types.File_Type_Newicon);
            httpReq.upload(api.url_fileUpload, formData).then(res => {
              if (res.data.code == 100) {
                _this.editForm.icon = res.data.data;
                _this.editCommit();
              } else {
                _this.$message.error(res.data.msg)
              }
            });
          }
        }
      });
    },
    editCommit: function () {
      var url = this.editForm.id ? api.url_updateNewAuth : api.url_insertNewAuth;
      this.editForm.oprs = this.convertNewOpr(this.editForm.name);
      httpReq.post(url, this.editForm).then(res => {
        if (res.code == 100) {
          this.dialogEditShow = false;
          this.$message.success('操作成功')
          this.getData(1);
        } else {
          this.$message.error('操作失败')
        }
      })
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
    },
    changeFile: function (event) {
      var file = event.currentTarget.files[0];
      var fileType = ['png', 'jpg'];
      if (fileType.indexOf(file.type.split('/')[1]) > -1) {
        this.iconFile = file;
      } else {
        this.$message.warning('当前文件类型不正确')
      }
    },
    removeFile: function () {
      this.iconFile = {};
    }
  }
}
