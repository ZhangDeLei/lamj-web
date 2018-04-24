import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'

export default {
  name: "company-new-mgr",
  data() {
    return {
      baseUrl:api.url_host,
      searchForm: {},
      editForm: {Ids: []},
      CompanyList: [],
      newData: {},
      newList: [],
      dialogRelatShow: false,
      pageSize: 10,
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1;
      },
      rules: {
        CompanyId: [{required: true, message: '请选择企业'}]
      }
    }
  },
  computed: {
    getTransData: function () {
      var data = [];
      this.newList.forEach(t => {
        data.push({key: t.id, label: t.name})
      })
      return data;
    }
  },
  mounted() {
    this.getCompanyList();
    this.getNewList();
    this.getData(1);
  },
  methods: {
    getCompanyList: function () {
      httpReq.get(api.url_getAllCompanyList).then(res => {
        this.CompanyList = res.data;
      })
    },
    getNewList: function () {
      httpReq.get(api.url_getAllNewAuthList).then(res => {
        this.newList = res.data;
      })
    },
    getNewListByCompanyId: function (companyId) {
      this.editForm.Ids = [];
      httpReq.get(api.url_getNewAuthListByCompanyId, {CompanyId: companyId}).then(res => {
        res.data.forEach(t => {
          this.editForm.Ids.push(t.newId);
        })
      })
    },
    getData: function (pages) {
      this.searchForm.PageSize = this.pageSize;
      this.searchForm.CurPage = pages;
      httpReq.get(api.url_getNewCompanyByPage, this.searchForm).then(res => {
        this.newData = res.data;
      })
    },
    handleCurrentChange: function (val) {
      this.getData(val)
    },
    companyChange: function (val) {
      this.getNewListByCompanyId(val);
    },
    confirmDelete: function (obj) {
      this.$confirm('确认删除该信息吗？', '提示', {confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning'}).then(() => {
        httpReq.post(api.url_deleteCompanyNewByCompanyIdAndNewId, {
          CompanyId: obj.companyId,
          NewId: obj.newId
        }).then(res => {
          if (res.code == 100) {
            this.$message.success('删除成功')
            this.getData(1);
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    onSearch: function () {
      this.getData(1)
    },
    showRelatDialog: function () {
      this.dialogRelatShow = true;
      this.form = {};
    },
    confirmRelat: function () {
      var _this = this;
      this.$refs['editForm'].validate(function (v) {
        if (v) {
          httpReq.post(api.url_insertCompanyNew, _this.editForm).then(res => {
            if (res.code == 100) {
              _this.dialogRelatShow = false;
              _this.$message.success('操作成功');
              _this.getData(1)
            } else {
              _this.$message.error(res.msg)
            }
          })
        }
      })
    }
  }
}
