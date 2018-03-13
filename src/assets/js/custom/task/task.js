import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'
import store from '../../../../store/store'

export default {
  name: "task-mgr",
  data() {
    return {
      form: {},
      taskData: {},
      pageSize: 10
    }
  },
  computed: {
    getTime: function (date) {
      return 'aaaa';
    }
  },
  mounted() {
    this.getData(1);
  },
  methods: {
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
    }
  }
}
