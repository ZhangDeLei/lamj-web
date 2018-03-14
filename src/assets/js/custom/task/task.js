import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'
import store from '../../../../store/store'

export default {
  name: "task-mgr",
  data() {
    return {
      form: {},
      taskData: {},
      pageSize: 10,
      multipleSelection: [],
      newData: []
    }
  },
  computed: {},
  mounted() {
    this.getData(1);
    this.getNewData();
  },
  methods: {
    getNewData: function () {
      httpReq.get(api.url_getAllNewAuthList).then(res => {
        this.newData = res.data;
      })
    },
    getTime: function (date) {
      return date.split(' ')[0];
    },
    getData: function (page) {
      this.form.PageSize = this.pageSize;
      this.form.CurPage = page;
      this.form.CompanyId = store.state.user.companyId;
      httpReq.get(api.url_getTaskList, this.form).then(res => {
        this.taskData = res.data;
      })
    },
    onSearch: function () {
      this.getData(1);
    },
    openPage: function (url) {
      window.open(url);
    },
    openEditPage: function (id) {
      this.$router.push({name: 'task-edit', params: {id: id}, query: {name: '编辑任务'}})
    },
    handleSelectionChange: function (val) {
      val.forEach(t => {
        this.multipleSelection.push(t.id);
      })
    },
    commitDelete: function (id) {
      this.$confirm('确定删除该任务吗？', '提示', {confirmButtonText: '确认', cancelButtonText: '取消', type: 'warning'}).then(() => {
        httpReq.post(api.url_deleteTask, {Id: id}).then(res => {
          if (res.code == 100) {
            this.$message.success('删除成功')
            this.getData(1);
          } else {
            this.$message.error(res.msg)
          }
        })
      })
    },
    batchCommitDelete: function () {
      if (this.multipleSelection == null || this.multipleSelection.length == 0) {
        this.$message.warning('请选择一条数据')
      } else {
        httpReq.post(api.url_deleteTaskByIds, this.multipleSelection).then(res => {
          if (res.code == 100) {
            this.$message.success('删除成功')
            this.getData(1);
          } else {
            this.$message.error(res.msg)
          }
        })
      }
    }
  }
}
