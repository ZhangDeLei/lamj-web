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
      menuList: [],
      rules:{
        name:[{required:true,message:'请输入菜单名称'}],
        level:[{required:true,message:'请选择菜单级别'}]
      }
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
      var _this = this;
      this.$refs['form'].validate(function (v) {
        if(v){
          if (_this.form.level == '1') _this.form.parentId = 0;
          var url = _this.form.id > 0 ? api.url_updateMenu : api.url_insertMenu;
          httpReq.post(url, _this.form).then(res => {
            if (res.code == 100) {
              _this.$message({message: '菜单操作成功', type: 'success'})
            } else {
              _this.$message({message: res.msg, type: 'warning'})
            }
          })
        }else{
          return false;
        }
      })
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
        } else {
          this.$message({message: res.msg, type: 'warning'});
        }
      });
    }
  }
}
