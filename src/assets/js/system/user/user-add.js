import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'
import axios from 'axios'

export default {
  name: "user-add",
  data() {
    var validPass = (rule, value, callback) => {
      if (value != this.form.password) {
        callback(new Error('两次密码输入不一样'));
      } else {
        callback();
      }
    };
    return {
      form: {id: '', sex: '1'},
      imageFile: {},
      isUpdate: false,
      rules: {
        nickName: [{required: true, message: '请输入昵称'}],
        userAccount: [{required: true, message: '请输入账号'}],
        password: [{required: true, message: '请输入密码'}, {min: 6, message: '密码最小长度为6位'}],
        cpassword: [{required: true, message: '请输入确认密码'}, {min: 6, message: '密码最小长度为6位'}, {
          validator: validPass,
          trigger: 'blur'
        }],
        tel: [{required: true, message: '请输入手机号码'}],
        sex: [{required: true, message: '请选择性别'}]
      }
    }
  },
  mounted() {
    this.updateUI();
  },
  watch: {
    "$route": "updateUI"
  },
  methods: {
    updateUI: function () {
      if (this.$route.params.id) {
        this.getUserInfo(this.$route.params.id);
      } else {
        this.isUpdate = false;
        this.form = {id: '', sex: '1'};
        this.imageFile = {};
      }
    },
    getUserInfo: function (id) {
      httpReq.get(api.url_getUserById, {Id: id}).then(res => {
        if (res.code == 100) {
          this.isUpdate = true;
          this.form = res.data;
          this.form.sex = this.form.sex + '';
          this.form.status = this.form.status == 1 ? true : false;
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    onSubmit: function () {
      var _this = this;
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (!_this.imageFile.name || _this.form.id) {
            _this.insertUser();
          } else {
            var formData = new FormData();
            formData.append('file', this.imageFile);
            httpReq.upload(api.url_fileUpload, formData).then(res => {
              if (res.data.code == 100) {
                _this.form.photoUrl = res.data.data;
                _this.insertUser();
              } else {
                _this.$message.error(res.data.msg);
              }
            })
          }
        } else {
          return false;
        }
      });
    },
    insertUser: function () {
      var url = this.isUpdate ? api.url_updateUser : api.url_insertUser;
      this.form.status = this.form.status == 1 || this.form.status ? 1 : 0;
      httpReq.post(url, this.form).then(r => {
        if (r.code == 100) {
          this.$message.success(this.isUpdate ? "修改成功" : "新增成功");
          this.form = {};
          this.imageFile = {};
          if (this.isUpdate) {
            this.$router.back();
          }
        } else {
          this.$message.error(r.msg)
        }
      })
    },
    changeFile: function (event) {
      var file = event.currentTarget.files[0];
      var fileType = ['png', 'jpg'];
      if (fileType.indexOf(file.type.split('/')[1]) > -1) {
        this.imageFile = file;
      } else {
        this.$message.warning('当前文件类型不正确')
      }
    },
    removeFile: function () {
      this.imageFile = {};
    },
    reset: function () {
      if (this.isUpdate) {
        this.getUserInfo(this.form.id);
      } else {
        this.form = {};
        this.imageFile = {};
      }
    }
  }
}
