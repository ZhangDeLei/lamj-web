import store from "../../../../store/store";
import api from "../../../plugins/http/api";
import httpReq from "../../../plugins/http/httpService";

export default {
  name: "article-browse",
  data() {
    return {
      articleData: {},
      form: {},
      pageSize: 10,
      typeData: [],
      LevelData: []
    }
  },
  mounted() {
    this.getData(1)
    this.getDictList();
    this.getLevelList();
  },
  methods: {
    getLevelList: function () {
      httpReq.get(api.url_getArticleLevelList, {CompanyId: store.state.user.companyId, Status: true}).then(res => {
        this.LevelData = res.data;
      })
    },
    getDictList: function () {
      httpReq.get(api.url_getDictListByEnName, {EnName: 'Article_Type'}).then(res => {
        this.typeData = res.data;
      })
    },
    getData: function (pages) {
      this.form.CompanyId = store.state.user.companyId;
      this.form.PageSize = this.pageSize;
      this.form.CurPage = pages;
      httpReq.get(api.url_getArticleList, this.form).then(res => {
        this.articleData = res.data;
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
