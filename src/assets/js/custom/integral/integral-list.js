import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'
import store from '../../../../store/store'

export default {
  name: "integral-list",
  data() {
    return {
      integralData: {},
      sourceList: [],
      userList: [],
      form: {},
      pageSize: 10
    }
  },
  mounted() {
    this.getDictList();
    this.getData(1);
    this.getUserList();
  },
  methods: {
    getData: function (pages) {
      this.form.PageSize = this.pageSize;
      this.form.CurPage = pages;
      this.form.CompanyId = store.state.user.companyId;
      httpReq.get(api.url_getIntegralRecordByCompany, this.form).then(res => {
        this.integralData = res.data;
      })
    },
    getUserList: function () {
      httpReq.get(api.url_getAllUserListByCompanyId, {CompanyId: store.state.user.companyId}).then(res => {
        this.userList = res.data;
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
