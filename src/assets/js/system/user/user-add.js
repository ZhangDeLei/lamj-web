import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'
import axios from 'axios'

export default {
  name: "user-add",
  data() {
    return {
      form: {sex: 1},
      imageFile: {},
      rules: {
        nickName: [{required: true, message: '请输入昵称'}],
        userAccount: [{required: true, message: '请输入账号'}],
        password: [{required: true, message: '请输入密码'}],
        tel: [{required: true, message: '请输入手机号码'}]
      }
    }
  },
  methods: {
    onSubmit: function () {
      // this.$refs['form'].validate((valid) => {
      //   if (valid) {
      //     this.form.file = this.imageFile;
      //     // httpReq.post(api.url_insertUser, this.form).then(res => {
      //     //
      //     // })
      //     httpReq.post(api.url_fileUpload, {file: this.imageFile}).then(res => {
      //       console.log(res);
      //     })
      //   } else {
      //     return false;
      //   }
      // });
      var form = new FormData();
      form.append('file',this.imageFile);
      axios.post('http://localhost:8080/lamj/api/file/fileUpload',form).then(res=>{

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
      this.form = {};
      this.imageFile = {};
    }
  }
}
