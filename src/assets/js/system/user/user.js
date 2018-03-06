import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'

export default {
  name: 'user-mgr',
  data() {
    return {
      url: api.url_host,
      userData: {},
      form: {},
      searchForm: {},
      pageSize: 10,
      StarList: [],
      TypeList: [],
      CompanyList: [],
      TeamList: [],
      showMoreDialog: false
    }
  },
  mounted() {
    this.getData(1, {});
    this.getDictList('Type');
    this.getDictList('StarLevel');
  },
  methods: {
    getData: function (page, form) {
      form.PageSize = this.pageSize;
      form.CurPage = page;
      httpReq.get(api.url_getUserListByCondition, form).then(res => {
        this.userData = res.data;
      })
    },
    getDictList: function (type) {
      httpReq.get(api.url_getDictListByEnName, {EnName: type}).then(res => {
        if (type == 'Type') this.TypeList = res.data;
        else this.StarList = res.data;
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
            this.getData(1, {});
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    onSearch: function () {
      this.showMoreDialog = false;
      this.getData(1, this.searchForm);
    },
    gotoConfigPage: function (id) {
      this.$router.push({name: 'user-config-edit', params: {id: id}, query: {name: '权限配置'}})
    },
    gotoEditPage: function (id) {
      this.$router.push({name: 'user-edit', params: {id: id}, query: {name: '用户编辑'}});
    },
    handleCurrentChange: function (val) {
      this.getData(val, this.searchForm)
    },
    showMore: function () {
      this.showMoreDialog = true;
    },
    changeType: function (e) {
      var obj = this.TypeList.filter(function (t) {
        return t.id == e;
      })[0]
      this.searchForm.TypeCode = obj.code;
    }
  }
}
