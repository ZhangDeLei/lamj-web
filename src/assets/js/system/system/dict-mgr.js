import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'

export default {
  name: "dict-mgr",
  data() {
    return {
      form: {},
      editForm: {},
      dictData: {},
      pageSize: 10,
      dialogEditShow: false,
      rules: {
        name: [{required: true, message: '请输入字典名称'}],
        enName: [{required: true, message: '请输入英文名称'}],
        label: [{required: true, message: '请输入字典值名称'}]
      }
    }
  },
  mounted() {
    this.getData(1);
  },
  methods: {
    getData: function (curPage) {
      this.form.CurPage = curPage;
      this.form.PageSize = this.pageSize;
      httpReq.get(api.url_getDictList, this.form).then(res => {
        if (res.code == 100) {
          this.dictData = res.data;
        }
      })
    },
    onSearch: function () {
      this.getData(1);
    },
    confirmDelete: function (id) {
      this.$confirm('确定删除当前字典值吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        httpReq.post(api.url_deleteDict, {Id: id}).then(res => {
          if (res.code == 100) {
            this.$message.success('删除成功');
            this.getData(1);
          }
        })
      })
    },
    confirmEdit: function () {
      this.$refs['editForm'].validate((v) => {
        if (v) {
          var url = this.editForm.id ? api.url_updateDict : api.url_insertDict;
          this.editForm.status = this.editForm.status == 1 || this.editForm.status ? 1 : 0;
          httpReq.post(url, this.editForm).then(res => {
            if (res.code == 100) {
              this.dialogEditShow = false;
              this.$message.success('操作成功')
              this.getData(1);
            } else {
              this.editForm.status = this.editForm.status == 1;
              this.$message.error(res.msg);
            }
          })
        } else {
          return false;
        }
      })

    },
    showEditDialog: function (item) {
      this.editForm = {};
      this.editForm = item;
      this.editForm.status = item.status == 1;
      this.editForm.type = this.editForm.type + '';
      this.dialogEditShow = true;
    },
    showInsertDialog: function () {
      this.editForm = {};
      this.dialogEditShow = true;
    },
    handleCurrentChange: function (val) {
      this.getData(val);
    }
  }
}
