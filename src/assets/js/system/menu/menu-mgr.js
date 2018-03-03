import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'

export default {
  name: "menu-list",
  data() {
    return {
      menuList: []
    }
  },
  mounted: function () {
    this.getMenuList();
  },
  methods: {
    getMenuList: function () {
      httpReq.get(api.url_getMenuListByTree, "").then(res => {
        if (res.code == 100) {
          this.menuList = res.data;
        }
      });
    },
    //dialog确认提交
    confirmDeleteMenu: function (id) {
      this.$confirm('确认删除当前选中菜单吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        httpReq.post(api.url_deleteMenu, {Id: id}).then(res => {
          if (res.code == 100) {
            this.$message({message: "删除菜单成功", type: "success"})
            this.getMenuList();
          } else {
            this.$message({message: res.msg, type: "warning"})
          }
        })
      })
    },
    gotoEditMenu: function (item) {
      this.$router.push({name: 'menu-edit', params: {id: item.id}, query: {name: '菜单编辑'}})
    }
  }
}
