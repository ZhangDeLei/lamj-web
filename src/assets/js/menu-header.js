import store from '../../store/store'
export default {
  name: 'menu-header',
  data() {
    return {NickName: store.state.user.nickName};
  }
}
