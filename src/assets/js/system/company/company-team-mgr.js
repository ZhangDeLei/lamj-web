import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'

export default {
  name: "company-team-mgr",
  data() {
    return {
      searchForm: {},
      editForm: {},
      teamData: {},
      pageSize: 10,
      CompanyList: [],
      dialogEditShow: false,
      rules: {
        name: [{required: true, message: '请输入企业名称'}],
        companyId: [{required: true, message: '请选择企业'}]
      }
    }
  },
  mounted() {
    this.getData(1);
    this.getCompanyList();
  },
  methods: {
    getCompanyList: function () {
      httpReq.get(api.url_getAllCompanyList).then(res => {
        this.CompanyList = res.data;
      })
    },
    getData: function (page) {
      this.searchForm.PageSize = this.pageSize;
      this.searchForm.CurPage = page;
      httpReq.get(api.url_getTeamList, this.searchForm).then(res => {
        this.teamData = res.data;
      })
    },
    showInsertDialog: function () {
      this.editForm = {};
      this.dialogEditShow = true;
    },
    confirmDelete: function (id) {
      this.$confirm('确定删除该队伍吗？', '提示', {confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning'}).then(() => {
        httpReq.post(api.url_deleteTeam, {Id: id}).then(res => {
          if (res.code == 100) {
            this.$message.success('删除成功')
            this.getData(1);
          } else {
            this.$message.error(res.msg);
          }
        })
      })
    },
    confirmEdit: function () {
      var _this = this;
      this.$refs['editForm'].validate(function (v) {
        if (v) {
          var url = _this.editForm.id ? api.url_updateTeam : api.url_insertTeam;
          httpReq.post(url, _this.editForm).then(res => {
            if (res.code == 100) {
              _this.$message.success('操作成功')
              _this.dialogEditShow = false;
              _this.editForm = {};
              _this.getData(1);
            } else {
              _this.$message.error(res.msg)
            }
          })
        } else {
          return false;
        }
      })
    },
    handleCurrentChange: function (val) {
      this.getData(val)
    },
    onSearch: function () {
      this.getData(1);
    },
    showEditDialog: function (obj) {
      this.editForm = obj;
      this.dialogEditShow = true;
    },
    companyChange: function (val) {
      var obj = this.CompanyList.filter(function (t) {
        return t.id == val;
      })[0]
      this.editForm.companyName = obj.name;
    }
  }
}
