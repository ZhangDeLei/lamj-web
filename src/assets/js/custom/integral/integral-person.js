import api from "../../../plugins/http/api";
import store from "../../../../store/store";
import httpReq from "../../../plugins/http/httpService";

export default {
  name: "integral-person",
  data() {
    return {
      integralData: {},
      sourceList: [],
      form: {},
      pageSize: 10
    }
  },
  mounted() {
    this.getDictList();
    this.getData(1);
  },
  methods: {
    getData: function (pages) {
      this.form.PageSize = this.pageSize;
      this.form.CurPage = pages;
      this.form.UserId = store.state.user.id;
      httpReq.get(api.url_getIntegralRecordByUserId, this.form).then(res => {
        this.integralData = res.data;
      })
    },
    getDictList: function () {
      httpReq.get(api.url_getDictListByEnName, {EnName: 'Source'}).then(res => {
        this.sourceList = res.data;
      })
    },
    handleCurrentChange: function (val) {
      this.getData(val)
    },
    onSearch: function () {
      this.getData(1)
    }
  }
}
