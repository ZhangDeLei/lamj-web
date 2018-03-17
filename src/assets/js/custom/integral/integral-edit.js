import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'
import store from '../../../../store/store'

export default {
  name: "integral-edit",
  data() {
    return {
      form: {},
      userData: [],
      rules: {
        userId: [{required: true, message: '请选择用户'}],
        integral: [{required: true, message: '请输入积分'}]
      }
    }
  },
  mounted() {
    this.getUserData();
  },
  methods: {
    getUserData: function () {
      httpReq.get(api.url_getAllUserListByCompanyId, {CompanyId: store.state.user.companyId}).then(res => {
        this.userData = res.data;
      })
    },
    onSubmit: function () {
      var _this = this;
      this.$refs['form'].validate(function (v) {
        if (v) {
          _this.form.companyId = store.state.user.companyId;
          _this.form.sourceUserId = store.state.user.id;
          _this.form.sourceUserName = store.state.user.nickName;
          httpReq.post(api.url_insertIntegralRecord, _this.form).then(res => {
            if (res.code == 100) {
              _this.form = {};
              _this.$message.success('操作成功')
            } else {
              _this.$message.error(res.msg)
            }
          });
        }
      });
    },
    onReset: function () {
      this.form = {};
    },
    changeUser: function () {
      var obj = this.userData.filter(t => {
        return t.id == this.form.userId;
      })[0]
      this.form.userName = obj.nickName;
    }
  }
}
