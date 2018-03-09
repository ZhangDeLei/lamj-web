import httpReq from "../../../plugins/http/httpService";
import api from "../../../plugins/http/api";

export default {
  name: "caliber-list",
  data() {
    return {
      form: {},
      caliberData: [],
      pageSize: 10
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
    onSearch: function () {
      this.getData(1);
    }
  }
}
