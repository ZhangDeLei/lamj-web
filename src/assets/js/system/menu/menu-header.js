import store from '../../../../store/store'

export default {
  name: 'menu-header',
  data() {
    return {NickName: store.state.user.nickName};
  },
  methods: {
    gotoMain: function () {
      if (store.state.user.typeCode == '0001') {
        this.$router.push({name: 'system-main'})
      } else {
        this.$router.push({name: 'custom-main'})
      }
    }
  }
}
