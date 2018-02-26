import {Message} from 'element-ui'

export default {
  showErr: function (msg) {
    Message({showClose: true, message: msg, type: 'error', duration: 1000})
  },
  showSuc: function (msg) {
    Message({showClose: true, message: msg, type: 'success', duration: 2000})
  }
}
