import Vue from 'vue'
import Vuex from 'vuex'
import * as types from './types'

Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: {
      get id() {
        return localStorage.getItem('id')
      },
      get companyId() {
        return localStorage.getItem('companyId')
      },
      get nickName() {
        return localStorage.getItem('nickName')
      }
    },
    get token() {
      return localStorage.getItem('token');
    },
    title: ''
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      localStorage.setItem('token', data.token);
      localStorage.setItem('id', data.user.id)
      localStorage.setItem('companyId', data.user.companyId)
      localStorage.setItem('nickName', data.user.nickName)
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('id')
      localStorage.removeItem('companyId')
      localStorage.removeItem('nickName')
    },
    [types.TITLE]: (state, data) => {
    }
  }
})
