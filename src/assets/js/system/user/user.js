import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'

export default {
  name: 'user-mgr',
  data() {
    return {
      url: api.url_host,
      userList: [],
      form: {}
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
    confirmDeleteMenu: function (id) {
      this.$confirm('确认删除当前用户信息吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        httpReq.post(api.url_deleteUser, {Id: id}).then(res => {
          if (res.code == 100) {
            this.getData();
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    gotoConfigPage: function (id) {
      this.$router.push({name: 'user-config', params: {id: id}, query: {name: '权限配置'}})
    },
    gotoEditPage: function (id) {
      this.$router.push({name: 'user-edit', params: {id: id}, query: {name: '用户编辑'}});
    }
  }
}
