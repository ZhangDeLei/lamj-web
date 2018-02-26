import httpReq from '../../assets/plugins/http/httpService'
import api from '../../assets/plugins/http/api'
import msg from '../../assets/plugins/message/msg'

export default {
  name: "menu-insert",
  data() {
    return {
      form: {
        name: '',
        code: '',
        level: '',
        icon: '',
        path: '',
        status: 1,
        parentId: ''
      },
      menuList: []
    }
  },
  mounted: function () {
    this.getMenuListByParentId();
  },
  methods: {
    onSubmit() {
      if (!this.form.name) {
        msg.showErr('请输入菜单名称');
      } else if (!this.form.level) {
        msg.showErr('请选择菜单级别');
      } else if (this.form.level == '2' && !this.form.parentId) {
        msg.showErr('请选择父级菜单');
      } else if (this.form.level == '2' && !this.form.icon) {
        msg.showErr('请输入菜单图标样式');
      } else if (this.form.level == '2' && !this.form.path) {
        msg.showErr('请输入菜单路径');
      } else {
        if (this.form.level == '1') this.form.parentId = 0;
        httpReq.post(api.url_insertMenu, this.form).then(res => {
          if (res.code == 100) {
            msg.showSuc('新增菜单成功')
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
    }
  }
}
