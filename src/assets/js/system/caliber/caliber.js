import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'

export default {
  name: "caliber-mgr",
  data() {
    return {
      form: {},
      editForm: {},
      caliberData: [],
      dialogEditShow: false,
      pageSize: 10,
      rules: {
        name: [{required: true, message: '请输入口径名称'}]
      }
    }
  },
  mounted() {
    this.getData(1);
  },
  methods: {
    getData: function (pages) {
      this.form.PageSize = this.pageSize;
      this.form.CurPage = pages;
      httpReq.get(api.url_getCaliberList, this.form).then(res => {
        this.caliberData = res.data;
      })
    },
    handleCurrentChange: function (val) {
      this.getData(val);
    },
    confirmEdit: function () {
      var _this = this;
      this.$refs['editForm'].validate(function (v) {
        if (v) {
          var url = _this.editForm.id ? api.url_updateCaliber : api.url_insertCaliber;
          httpReq.post(url, _this.editForm).then(res => {
            if (res.code == 100) {
              _this.dialogEditShow = false;
              _this.$message.success('操作成功');
              _this.getData(1);
            } else {
              _this.$message.error('操作成功');
            }
          })
        }
      });
    },
    confirmDelete: function (id) {
      this.$confirm('确认删除该口径吗？', '提示', {confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning'}).then(() => {
        httpReq.post(api.url_deleteCaliber, {Id: id}).then(res => {
          if (res.code == 100) {
            this.$message.success('删除成功')
            this.getData(1);
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    showEditDialog: function (obj) {
      this.editForm = obj;
      this.dialogEditShow = true;
    },
    onSearch: function () {
      this.getData(1);
    },
    showInsertDialog: function () {
      this.editForm = {};
      this.dialogEditShow = true;
    }
  }
}
