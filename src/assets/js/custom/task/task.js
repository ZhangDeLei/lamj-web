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
      newData: [],
      stageData: [],
      dialogCommentShow: false,
      commentData: {},
      curTaskId: 0,
      host: api.url_host,
      showImage: false,
      curUrl: ''
    }
  },
  mounted() {
    this.getData(1);
    this.getNewData();
    this.getStageData();
  },
  methods: {
    getStageData: function () {
      httpReq.get(api.url_getDictListByEnName, {EnName: "Staged"}).then(res => {
        this.stageData = res.data;
      })
    },
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
    //开大任务评论弹框
    openTaskCommen: function (obj) {
      this.dialogCommentShow = true;
      this.curTaskId = obj.id;
      this.getTaskComments(1);
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
    },
    //获取任务评价列表
    getTaskComments: function (curPage) {
      let params = {CompanyId: store.state.user.companyId, TaskId: this.curTaskId, PageSize: 10, CurPage: curPage};
      httpReq.get(api.url_getUserCommentList, params).then(res => {
        this.commentData = res.data;
      });
    },
    //完成任务
    confirmEdit: function () {

    },
    mouseOver: function (obj) {
      this.showImage = true;
      this.curUrl = api.url_host + obj.imageUrl;
    },
    mouseOut: function () {
      this.showImage = false;
      this.curUrl = '';
    }
  }
}
