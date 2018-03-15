import api from "../../../plugins/http/api";
import store from "../../../../store/store";
import httpReq from "../../../plugins/http/httpService";

export default {
  name: "person-task",
  data(){
    return {
      form: {},
      taskData: {},
      pageSize: 10,
      multipleSelection: [],
      newData: [],
      stageData: []
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
      this.form.UserId = store.state.user.id;
      httpReq.get(api.url_getTaskListByUserId, this.form).then(res => {
        this.taskData = res.data;
      })
    },
    onSearch: function () {
      this.getData(1);
    },
    openPage: function (url) {
      window.open(url);
    },
    handleSelectionChange: function (val) {
      val.forEach(t => {
        this.multipleSelection.push(t.id);
      })
    }
  }
}
