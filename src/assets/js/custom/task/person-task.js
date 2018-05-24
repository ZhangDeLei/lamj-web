import api from "../../../plugins/http/api";
import store from "../../../../store/store";
import httpReq from "../../../plugins/http/httpService";
import * as types from "../../../../store/types";

export default {
  name: "person-task",
  data() {
    return {
      form: {},
      editForm: {},
      taskData: {},
      pageSize: 10,
      multipleSelection: [],
      newData: [],
      stageData: [],
      taskInfo: {},
      taskFile: {},
      dialogEditShow: false,
      imageShow:false
    }
  },
  mounted() {
    this.getData(1);
    this.getNewData();
    this.getStageData();
  },
  methods: {
    getStageData: function () {
      httpReq.get(api.url_getDictListByEnName, {EnName: "Staged"}).then(res => {
        this.stageData = res.data;
      })
    },
    getNewData: function () {
      httpReq.get(api.url_getAllNewAuthList).then(res => {
        this.newData = res.data;
      })
    },
    getTime: function (date) {
      return date.split(' ')[0];
    },
    getData: function (page) {
      this.form.PageSize = this.pageSize;
      this.form.CurPage = page;
      this.form.UserId = store.state.user.id;
      httpReq.get(api.url_getTaskListByUserId, this.form).then(res => {
        this.taskData = res.data;
      })
    },
    onSearch: function () {
      this.getData(1);
    },
    openPage: function (url) {
      window.open(url);
    },
    handleSelectionChange: function (val) {
      val.forEach(t => {
        this.multipleSelection.push(t.id);
      })
    },
    showConfirmDialog: function (obj) {
      this.taskInfo = obj;
      this.taskInfo.imageUrl = api.url_host + obj.imageUrl;
      this.dialogEditShow = true;
    },
    changeFile: function () {
      var file = event.currentTarget.files[0];
      var fileType = ['png', 'jpg', 'jpeg'];

      if (fileType.indexOf(file.name.split('.')[1]) > -1) {
        this.taskFile = file;
      } else {
        this.$message.warning('当前文件类型不正确')
      }
    },
    removeFile: function () {
      this.taskFile = {};
    },
    confirmEdit: function () {
      var _this = this;
      this.$refs['editForm'].validate(function (v) {
        if (v) {
          if (!_this.taskFile.name) {
            alert('请选择评论截图');
          } else {
            var formData = new FormData();
            formData.append('file', _this.taskFile);
            formData.append('type', types.File_Type_Task);
            httpReq.upload(api.url_fileUpload, formData).then(res => {
              if (res.data.code == 100) {
                _this.editForm.imageUrl = res.data.data;
                _this.insertComment();
              } else {
                _this.$message.error(res.data.msg);
              }
            })
          }
        }
      })
    },
    insertComment: function () {
      this.editForm.taskId = this.taskInfo.id;
      this.editForm.companyId = store.state.user.companyId;
      this.editForm.userId = parseInt(store.state.user.id);
      this.editForm.content = '';
      this.editForm.createTime = new Date();
      httpReq.post(api.url_insertUserComment, this.editForm).then(res => {
        if (res.code == 100) {
          this.$message.success('操作成功')
          this.taskFile = {};
          this.editForm = {};
          this.dialogEditShow = false;
          this.getData(1);
        } else {
          this.$message.error(res.msg)
        }
      });
    },
    mouseOver:function () {
      this.imageShow = true;
    },
    mouseOut:function () {
      this.imageShow = false;
    }
  }
}
