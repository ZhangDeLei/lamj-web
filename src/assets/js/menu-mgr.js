import httpReq from '../../assets/plugins/http/httpService'
import api from '../../assets/plugins/http/api'

export default {
  name: "menu-list",
  data() {
    return {
      menuList: []
    }
  },
  mounted: function () {
    this.getMenuList();
  },
  methods: {
    getMenuList: function () {
      httpReq.get(api.url_getMenuListByTree, "").then(res => {
        if(res.code == 100){
          this.menuList = res.data;
        }
      });
    }
  }
}
