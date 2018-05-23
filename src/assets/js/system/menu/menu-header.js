import store from '../../../../store/store'
import api from '../../../plugins/http/api'
import http from '../../../plugins/http/httpService'

export default {
  name: 'menu-header',
  data() {
    return {
      NickName: store.state.user.nickName,
      androidPath: '',
      iosPath: ''
    };
  },
  mounted() {
    this.getAndroidDown();
    this.getiOSDown();
  },
  methods: {
    gotoMain: function () {
      if (store.state.user.typeCode == '0001') {
        this.$router.push({name: 'system-main'})
      } else {
        this.$router.push({name: 'custom-main'})
      }
    },
    getAndroidDown: function () {
      http.get(api.url_getAppByNewForAndroid).then(res => {
        this.androidPath = api.url_host + res.data.url;
      })
    },
    getiOSDown: function () {
      http.get(api.url_getAppByNewForiOS).then(res => {
        this.iosPath = api.url_host + res.data.url;
      });
    }
  }
}
