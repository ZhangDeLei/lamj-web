import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'
import store from '../../../../store/store'
import * as types from '../../../../store/types'

export default {
  name: "app-manager",
  data() {
    return {
      searchForm: {},
      editForm: {},
      dictList: [],
      appData: {},
      pageSize: 10,
      dialogEditShow: false,
      appFile: {},
      rules: {
        name: [{required: true, message: '请输入应用名称'}],
        version: [{required: true, message: '请输入版本号'}],
        versionCode: [{required: true, message: '请输入版本编码'}],
        typeId: [{required: true, message: '请选择类别'}],
        comment: [{required: true, message: '请输入更新内容'}]
      }
    }
  },
  mounted() {
    this.getDictList();
    this.getData(1)
  },
  methods: {
    getData: function (pages) {
      this.searchForm.PageSize = this.pageSize;
      this.searchForm.CurPage = pages;
      httpReq.get(api.url_getAppList, this.searchForm).then(res => {
        this.appData = res.data;
      })
    },
    getDictList: function () {
      httpReq.get(api.url_getDictListByEnName, {EnName: 'App_Type'}).then(res => {
        this.dictList = res.data;
      })
    },
    confirmEdit: function () {
      var _this = this;
      this.$refs['editForm'].validate((v) => {
        if (v) {
          if (!_this.appFile.name) {
            _this.postEdit();
          } else {
            var formData = new FormData();
            formData.append('file', _this.appFile);
            formData.append('type', types.File_Type_App);
            httpReq.upload(api.url_fileUpload, formData).then(res => {
              if (res.data.code == 100) {
                _this.editForm.url = res.data.data;
                _this.postEdit();
              } else {
                _this.$message.error(res.data.msg)
              }
            })
          }
        }
      });
    },
    postEdit: function () {
      var url = this.editForm.id ? api.url_updateApp : api.url_insertApp;
      this.editForm.uploadUserId = store.state.user.id;
      this.editForm.uploadUserName = store.state.user.nickName;
      httpReq.post(url, this.editForm).then(res => {
        if (res.code == 100) {
          this.$message.success('操作成功')
          this.dialogEditShow = false;
          this.getData(1)
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    confirmDelete: function (id) {
      this.$confirm('确认删除该更新记录吗?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        httpReq.post(api.url_deleteApp, {Id: id}).then(res => {
          if (res.code == 100) {
            this.$message.success('删除成功')
            this.getData(1)
          } else {
            this.$message.error(res.msg)
          }
        });
      })
    },
    showEditDialog: function (obj) {
      this.editForm = obj;
      this.appFile = {};
      this.dialogEditShow = true;
    },
    showInsertDialog: function () {
      this.editForm = {};
      this.appFile = {};
      this.dialogEditShow = true;
    },
    handleCurrentChange: function (val) {
      this.getData(val)
    },
    onSearch: function () {
      this.getData(1)
    },
    typeChange: function () {
      var obj = this.dictList.filter(t => {
        return t.id == this.editForm.typeId;
      })[0]
      this.editForm.typeCode = obj.code;
      this.editForm.typeName = obj.label;
    },
    changeFile: function (event) {
      var file = event.currentTarget.files[0];
      var fileType = ['apk', 'ipa'];
      if (fileType.indexOf(file.name.split('.')[1]) > -1) {
        this.appFile = file;
      } else {
        this.$message.warning('当前文件类型不正确')
      }
    },
    removeFile: function () {
      this.appFile = {};
    }
  }
}
