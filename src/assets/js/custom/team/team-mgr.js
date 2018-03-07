import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'
import store from '../../../../store/store'

export default {
  name: "team-mgr",
  data() {
    return {
      searchForm: {},
      teamData: [],
      editForm: {},
      dialogEditShow: false,
      rules: {
        name: [{required: true, message: '请输入队伍名称'}]
      }
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData: function () {
      this.searchForm.CompanyId = store.state.user.companyId;
      httpReq.get(api.url_getTeamListByCompanyId, this.searchForm).then(res => {
        this.teamData = res.data;
      })
    },
    showInsertDialog: function () {
      this.editForm = {};
      this.dialogEditShow = true;
    },
    showEditDialog: function (obj) {
      this.editForm = obj;
      this.dialogEditShow = true;
    },
    confirmDelete: function (id) {
      this.$confirm('确认删除该队伍吗？', '提示', {confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning'}).then(() => {
        httpReq.post(api.url_deleteTeam, {Id: id}).then(res => {
          if (res.code == 100) {
            this.dialogEditShow = false;
            this.getData();
          } else {
            this.$message.error(res.msg)
          }
        })
      });
    },
    confirmEdit: function () {
      var _this = this;
      this.$refs['editForm'].validate(function (v) {
        if (v) {
          var url = _this.editForm.id ? api.url_updateTeam : api.url_insertTeam;
          _this.editForm.companyId = store.state.user.companyId;
          httpReq.post(url, _this.editForm).then(res => {
            if (res.code == 100) {
              _this.editForm = {};
              _this.dialogEditShow = false;
              _this.getData();
            } else {
              _this.$message.error(res.msg);
            }
          })
        }
      })
    }
  }
}
