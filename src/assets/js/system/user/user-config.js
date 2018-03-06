import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'

export default {
  name: "user-config",
  data() {
    return {
      userList: [],
      groupList: [],
      permissionList: [],
      userGroupList: [],
      userPermissionList: [],
      checkUserId: '',
      inputValue: ''
    }
  },
  mounted() {
    this.getUserList()
    this.getGroupList()
    this.getPermissionList()
    if(this.$route.params.id){
      this.selectUser(this.$route.params.id);
    }
  },
  computed: {
    searchList: function () {
      var _this = this;
      return this.userList.filter(function (t) {
        return t.nickName.indexOf(_this.inputValue) > -1;
      });
    },
    groupData: function () {
      var data = [];
      this.groupList.forEach(t => {
        data.push({key: t.id, label: t.name});
      });
      return data;
    },
    permissionData: function () {
      var data = [];
      this.permissionList.forEach(t => {
        data.push({key: t.id, label: t.name});
      });
      return data;
    }
  },
  methods: {
    getUserList: function () {
      httpReq.get(api.url_getAllUser).then(res => {
        this.userList = res.data;
      })
    },
    getGroupList: function () {
      httpReq.get(api.url_getAllGroupList).then(res => {
        this.groupList = res.data;
      })
    },
    getPermissionList: function () {
      httpReq.get(api.url_getAllPermissionList).then(res => {
        this.permissionList = res.data;
      })
    },
    getUserGroupList: function (id) {
      httpReq.get(api.url_getUserGroupList, {UserId: id}).then(res => {
        if (res.code == 100) {
          this.userGroupList = this.convertTransList(res.data);
        }
      })
    },
    getUserPermissionList: function (id) {
      httpReq.get(api.url_getUserPermissionList, {UserId: id}).then(res => {
        if (res.code == 100) {
          this.userPermissionList = this.convertTransList(res.data);
        }
      })
    },
    selectUser: function (id) {
      this.checkUserId = id;
      this.getUserGroupList(id);
      this.getUserPermissionList(id);
    },
    convertTransList: function (list) {
      var data = [];
      list.forEach(t => {
        data.push(t.id)
      });
      return data;
    },
    confirmData: function () {
      if (this.checkUser.id) {
        this.$confirm('确认保存当前配置信息？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          var data = {UserId: this.checkUser.id, GroupIds: this.userGroupList, PerIds: this.userPermissionList};
          httpReq.post(api.url_insertGroupAndPermission, data).then(res => {
            if (res.code == 100) {
              this.$message.success("保存成功")
            } else {
              this.$message.error(res.msg);
            }
          })
        })
      } else {
        this.$message.warning('请先选择一个用户')
      }
    }
  }
}
