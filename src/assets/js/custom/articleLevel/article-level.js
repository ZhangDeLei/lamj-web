import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'
import store from '../../../../store/store'

export default {
  name: "article-level",
  data() {
    return {
      searchForm: {Name: ''},
      editForm: {status: true},
      dialogEditShow: false,
      articleData: [],
      rules: {
        name: [{required: true, message: '请输入名称'}],
        sortBy: [{required: true, message: '请输入排序值'}]
      }
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData: function () {
      this.searchForm.CompanyId = store.state.user.companyId;
      httpReq.get(api.url_getArticleLevelList, this.searchForm).then(res => {
        if (res.code == 100) {
          this.articleData = res.data;
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    confirmEdit: function () {
      let _t = this;
      this.$refs['editForm'].validate(function (v) {
        if (v) {
          _t.editForm.companyId = parseInt(store.state.user.companyId);
          _t.editForm.createUserId = store.state.user.id;
          _t.editForm.createUserName = store.state.user.nickName;
          let url = _t.editForm.id ? api.url_articleLevelUpdate : api.url_articleLevelInsert;
          httpReq.post(url, _t.editForm).then(res => {
            if (res.code == 100) {
              _t.dialogEditShow = false;
              _t.getData();
            } else {
              _this.$message.error(res.msg)
            }
          })
        }
      })
    },
    showInsertDialog: function () {
      this.dialogEditShow = true;
      this.editForm = {};
      this.editForm.status = true;
    },
    confirmDelete: function (id) {
      this.$confirm('确认删除该级别吗？', '提示', {confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning'}).then(() => {
        httpReq.post(api.url_articleLevelDelete, {Id: id}).then(res => {
          if (res.code == 100) {
            this.getData();
          } else {
            this.$message.error(res.msg)
          }
        })
      });
    },
    showEditDialog: function (obj) {
      this.editForm = obj;
      this.dialogEditShow = true;
    }
  }
}
