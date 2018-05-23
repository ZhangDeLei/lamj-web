import store from '../../store/store'
import api from '../plugins/http/api'
import http from '../plugins/http/httpService'

export default {
  name: "system-main",
  data() {
    return {
      companyData: [],
      total: {}
    };
  },
  mounted() {
    this.getCompanyByExpired();
    this.getTotal();
  },
  methods: {
    getCompanyByExpired: function () {
      http.get(api.url_getCompanyByExpired).then(res => {
        this.companyData = res.data;
      });
    },
    getTotal: function () {
      http.get(api.url_chartSystemMainTotal).then(res => {
        this.total = res.data;
      });
    }
  }
}
