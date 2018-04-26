import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'
import store from '../../../../store/store'

export default {
  name: "submission-list",
  data() {
    return {
      submissionData: {},
      form: {},
      levelData: [],
      pageSize: 10
    }
  },
  mounted() {
    this.getData(1);
    this.getDictList();
  },
  methods: {
    getDictList: function () {
      httpReq.get(api.url_getArticleLevelList, {CompanyId: store.state.user.companyId, Status: true}).then(res => {
        this.levelData = res.data;
      })
    },
    getData: function (pages) {
      this.form.CompanyId = store.state.user.companyId;
      this.form.UserId = store.state.user.id;
      this.form.PageSize = this.pageSize;
      this.form.CurPage = pages;
      httpReq.get(api.url_getSubmissionListByUserId, this.form).then(res => {
        this.submissionData = res.data;
      })
    },
    handleCurrentChange: function (val) {
      this.getData(val)
    },
    onSearch: function () {
      this.getData(1)
    },
    deleteItem: function (id) {
      this.$confirm('确认删除该投稿吗？', '提示', {confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning'}).then(() => {
        httpReq.post(api.url_deleteSubmission, {Id: id}).then(res => {
          if (res.code == 100) {
            this.$message.success('删除成功')
            this.getData(1)
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    openDetail: function (id) {
      this.$router.push({name: 'submission-add', params: {id: id}, query: {name: '编辑文稿'}})
    },
    openDoc: function (obj) {
      window.location.href = api.url_host + obj.path
    }
  }
}
