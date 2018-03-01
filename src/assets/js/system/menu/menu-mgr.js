import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'

export default {
  name: "menu-list",
  data() {
    return {
      dialogDeleteShow: false,
      currentSelectMenuId: -1,
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
    //显示删除弹框
    showDeleteMenuDialog: function (id) {
      this.dialogDeleteShow = true;
      this.currentSelectMenuId = id;
    },
    //dialog确认提交
    confirmDeleteMenu: function () {
      this.dialogDeleteShow = false;
      httpReq.post(api.url_deleteMenu, {Id: this.currentSelectMenuId}).then(res => {
        if (res.code == 100) {
          this.$message({message: "删除菜单成功", type: "success"})
          this.getMenuList();
        } else {
          this.$message({message: res.msg, type: "warning"})
        }
      })
    },
    //dialog关闭回调
    deleteDialogClose: function () {
      this.currentSelectMenuId = -1;
    },
    gotoEditMenu:function (item) {
      this.$router.push({name:'menu-edit',params:{id:item.id},query:{name:'菜单编辑'}})
    }
  }
}
