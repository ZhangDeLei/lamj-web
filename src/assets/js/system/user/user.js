import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'

export default {
  name: 'user-mgr',
  data() {
    return {
      userList: [],
      form: {},
      dialogDeleteShow: false
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData: function () {
      httpReq.get(api.url_getUserListByCondition, {}).then(res => {
        this.userList = res.data;
      })
    },
    confirmDeleteMenu: function () {
      httpReq.post(api.url_deleteUser, {Id: this.form.id}).then(res => {
        if (res.code == 100) {
          this.getData();
          this.dialogDeleteShow = false;
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    showDeleteDialog: function (id) {
      this.form.id = id;
      this.dialogDeleteShow = true;
    },
    gotoConfigPage: function (id) {
      this.$router.push({name: 'user-config', params: {id: id},query:{name:'权限配置'}})
    },
    gotoEditPage: function (id) {
      this.$router.push({name: 'user-edit', params: {id: id}, query: {name: '用户编辑'}});
    }
  }
}
