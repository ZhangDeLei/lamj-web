import httpReq from '../../../plugins/http/httpService'
import api from '../../../plugins/http/api'
import store from '../../../../store/store'

export default {
  name: "patrol-list",
  data() {
    return {
      newList: []
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData: function () {
      var companyId = store.state.user.companyId;
      httpReq.get(api.url_getNewAuthListByCompanyId, {CompanyId: companyId}).then(res => {
        this.newList = res.data;
        console.log(this.newList)
      })
    }
  }
}
