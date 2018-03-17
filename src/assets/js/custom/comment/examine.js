import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'
import store from '../../../../store/store'

export default {
  name: "examine",
  data() {
    return {
      submissionData: {},
      form: {},
      pageSize: 10,
      dialogConfirm: false,
      currentId: '',
      isSuccess: false,
      levelData: [],
      confirmForm: {},
    }
  },
  mounted() {
    this.getData(1)
    this.getDictList()
  },
  methods: {
    getDictList: function () {
      httpReq.get(api.url_getDictListByEnName, {EnName: 'Submission_Level'}).then(res => {
        this.levelData = res.data;
      })
    },
    getData: function (pages) {
      this.form.CompanyId = store.state.user.companyId;
      this.form.PageSize = this.pageSize;
      this.form.CurPage = pages;
      httpReq.get(api.url_getSubmissionList, this.form).then(res => {
        if (res.code == 100) {
          this.submissionData = res.data;
        }
      })
    },
    handleCurrentChange: function (val) {
      this.getData(val)
    },
    onSearch: function () {
      this.getData(1)
    },
    backConfirm: function (id) {
      this.dialogConfirm = true;
      this.currentId = id;
      this.isSuccess = false;
    },
    successConfirm: function (id) {
      this.dialogConfirm = true;
      this.currentId = id;
      this.isSuccess = true;
    },
    openDoc: function (obj) {
      window.location.href = api.url_host + obj.path
    },
    confirm: function () {
      var url = this.isSuccess ? api.url_adoptSubmission : api.url_backSubmission;
      this.confirmForm.SubmissionId = this.currentId
      this.confirmForm.UserId = store.state.user.id
      this.confirmForm.UserName = store.state.user.nickName
      httpReq.post(url, this.confirmForm).then(res => {
        if (res.code == 100) {
          this.dialogConfirm = false;
          this.$message.success('审核成功')
          this.getData(1)
        } else {
          this.$message.error(res.msg)
        }
      })
    }
  }
}
