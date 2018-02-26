import httpReq from '../plugins/http/httpService'
import api from '../plugins/http/api'
import msg from '../plugins/message/msg'
import store from "../../store/store";

export default {
  name: 'login',
  data() {
    return {userAccount: '', password: ''}
  },
  methods: {
    login: function () {
      if (!this.userAccount) {
        msg.showErr('请输入账号');
      } else if (!this.password) {
        msg.showErr('请输入密码')
      } else {
        var param = {'UserAccount': this.userAccount, 'Password': this.password};
        httpReq.post(api.url_login, param).then((res) => {
          if (res.code == 100) {
            store.state.token = res.data.token;
            store.state.user = res.data.user;
            this.$router.push({path: '/index'});
          } else {
            msg.showErr(res.msg);
          }
        }).catch((err) => {
          msg.showErr(err);
        })
      }
    }
  }
}
