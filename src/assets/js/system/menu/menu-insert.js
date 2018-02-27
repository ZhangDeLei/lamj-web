import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'

export default {
  name: "menu-insert",
  data() {
    return {
      form: {
        id: '',
        name: '',
        code: '',
        level: '',
        icon: '',
        path: '',
        status: true,
        parentId: ''
      },
      menuList: []
    }
  },
  mounted: function () {
    this.getMenuListByParentId();
    if (this.$route.params.id) {
      this.getMenuDetail(this.$route.params.id);
    }
  },
  methods: {
    onSubmit() {
      if (!this.form.name) {
        this.$message({message: '请输入菜单名称', type: 'warning'})
      } else if (!this.form.level) {
        this.$message({message: '请选择菜单级别', type: 'warning'})
      } else if (this.form.level == '2' && !this.form.parentId) {
        this.$message({message: '请选择父级菜单', type: 'warning'})
      } else if (this.form.level == '2' && !this.form.icon) {
        this.$message({message: '请输入菜单图标样式', type: 'warning'})
      } else if (this.form.level == '2' && !this.form.path) {
        this.$message({message: '请输入菜单路径', type: 'warning'})
      } else {
        if (this.form.level == '1') this.form.parentId = 0;
        var url = this.form.id > 0 ? api.url_updateMenu : api.url_insertMenu;
        this.form.status = this.form.status || this.form.status == 1 ? 1 : 0;
        httpReq.post(url, this.form).then(res => {
          if (res.code == 100) {
            this.$message({message: '菜单操作成功', type: 'success'})
          } else {
            this.$message({message: res.msg, type: 'warning'})
          }
        })
      }
    },
    getMenuListByParentId() {
      httpReq.get(api.url_getMenuListByParentId, {'ParentId': 0}).then(res => {
        if (res.code == 100) {
          this.menuList = res.data;
        }
      })
    },
    getMenuDetail(id) {
      httpReq.get(api.url_getMenuById, {Id: id}).then(res => {
        if (res.code == 100) {
          this.form = res.data;
          this.form.status = this.form.status == 1 ? true : false;
        } else {
          this.$message({message: res.msg, type: 'warning'});
        }
      });
    }
  }
}
