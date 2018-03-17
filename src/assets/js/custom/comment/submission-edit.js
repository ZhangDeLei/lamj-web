import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'
import store from '../../../../store/store'
import * as types from "../../../../store/types";

export default {
  name: "submission-edit",
  data() {
    return {
      form: {},
      articleFile: {},
      levelData: [],
      rules: {
        themeName: [{required: true, message: '请输入主题'}],
        title: [{required: true, message: '请输入标题'}],
        levelId: [{required: true, message: '请选择级别'}]
      }
    }
  },
  mounted() {
    this.getDictList();
    if (this.$route.params.id) {
      this.updateUI();
    }
  },
  watch: {
    "$router": "updateUI"
  },
  methods: {
    getDictList: function () {
      httpReq.get(api.url_getDictListByEnName, {EnName: 'Submission_Level'}).then(res => {
        this.levelData = res.data;
      })
    },
    updateUI: function () {
      httpReq.get(api.url_getSubmissionById, {Id: this.$route.params.id}).then(res => {
        if (res.code == 100) {
          this.form = res.data;
        }
      })
    },
    onSubmit: function () {
      var _this = this;
      this.$refs['form'].validate(function (v) {
        if (v) {
          if (!_this.articleFile.name) {
            _this.insertArticle();
          } else {
            var formData = new FormData();
            formData.append('file', _this.articleFile);
            formData.append('type', types.File_Type_Article);
            httpReq.upload(api.url_fileUpload, formData).then(res => {
              if (res.data.code == 100) {
                _this.form.path = res.data.data;
                _this.insertArticle();
              } else {
                _this.$message.error(res.data.msg);
              }
            })
          }
        }
      })
    },
    insertArticle: function () {
      this.form.companyId = store.state.user.companyId;
      this.form.userId = store.state.user.id;
      this.form.userName = store.state.user.nickName;
      var url = this.$route.params.id ? api.url_updateSubmission : api.url_insertSubmission;
      httpReq.post(url, this.form).then(res => {
        if (res.code == 100) {
          this.$message.success('操作成功')
          this.onCancel();
        } else {
          this.$message.error(res.msg)
        }
      });
    },
    onCancel: function () {
      this.$router.push({name: 'submission', query: {name: '投稿记录'}})
    },
    changeFile: function () {
      var file = event.currentTarget.files[0];
      var fileType = ['doc', 'docx'];
      if (fileType.indexOf(file.name.split('.')[1]) > -1) {
        this.articleFile = file;
      } else {
        this.$message.warning('当前文件类型不正确')
      }
    },
    levelChange: function () {
      var obj = this.levelData.filter(t => {
        return t.id == this.form.levelId;
      })[0]
      this.form.levelCode = obj.code;
      this.form.levelName = obj.label;
    },
    removeFile: function () {
      this.articleFile = {};
    }
  }
}
