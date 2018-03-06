import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'

export default {
  name: "company-mgr",
  data() {
    return {
      companyData: {},
      searchForm: {},
      editForm: {},
      pageSize: 10,
      dialogEditShow: false,
      rules: {
        name: [{required: true, message: '请输入企业名称'}],
        shortName: [{required: true, message: '请输入企业简称'}],
        concatUserName: [{required: true, message: '请输入联系人'}],
        concatUserPhone: [{required: true, message: '请输入联系人号码'}],
        address: [{required: true, message: '请输入地址'}],
        expiredDate: [{required: true, message: '请选择有效期'}]
      }
    }
  },
  mounted() {
    this.getData(1);
  },
  methods: {
    getData: function (page) {
      this.searchForm.PageSize = this.pageSize;
      this.searchForm.CurPage = page;
      httpReq.get(api.url_getCompanyList, this.searchForm).then(res => {
        this.companyData = res.data;
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
      this.$confirm('确认删除该企业信息吗？', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        httpReq.post(api.url_deleteCompany, {Id: id}).then(res => {
          if (res.code == 100) {
            this.$message.success('删除成功')
            this.getData(1)
          } else {
            this.$message.error(res.msg);
          }
        })
      })
    },
    confirmEdit: function () {
      this.$refs['editForm'].validate((v) => {
        if (v) {
          var url = this.editForm.id ? api.url_updateCompany : api.url_insertCompany;
          httpReq.post(url, this.editForm).then(res => {
            if (res.code == 100) {
              this.dialogEditShow = false;
              this.getData(1);
            } else {
              this.$message.error(res.msg);
            }
          })
        } else {
          return false;
        }
      })
    },
    handleCurrentChange: function (val) {
      this.getData(val);
    },
    onSearch:function () {
      this.getData(1)
    }
  }
}
