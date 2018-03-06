import axios from 'axios'
import store from '../../../store/store'
import api from '../http/api'
import {Loading, Message} from 'element-ui'

var instance = axios.create({
  baseURL: api.url_local,
  timeout: 5000
});
let loading;
instance.interceptors.request.use(config => {
  loading = Loading.service({
    fullscreen: true,
    lock: true,
    text: '正在加载,请稍后...',
    spinner: 'el-icon-loading'
  })
  config.data = JSON.stringify(config.data);
  if (store.state.token) {
    config.headers['Authorization'] = store.state.token;
  }
  config.headers['Content-Type'] = 'application/json;charset=UTF-8';
  config.headers['Access-Control-Allow-Origin'] = '*';
  config.headers['Access-Control-Allow-Methods'] = 'POST,GET,OPTIONS,DELETE,PUT';
  config.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization,version';
  config.headers['version'] = 1;
  return config;
}, error => {
  loading.close();
  Message({
    showClose: true,
    message: error.message,
    type: 'error'
  })
  return Promise.reject(error);
})
instance.interceptors.response.use(response => {
  loading.close();
  if (response.data.code == 200) {
    Message({
      showClose: true,
      message: response.data.msg,
      type: 'error'
    })
  } else if (response.data.code == 201) {
    Message({
      showClose: true,
      message: '账户不存在',
      type: 'error'
    })
  } else if (response.data.code == 202) {
    Message({
      showClose: true,
      message: '密码错误',
      type: 'error'
    })
  } else if (response.data.code == 203) { //未登录
    this.$router.push({path: '/'});
  } else if (response.data.code == 205) {
    Message({showClose: true, message: '当前企业已经超过有效期，请先续费', type: 'error'});
  }
  return response.data;
}, error => {
  loading.close();
  Message({
    message: error.message,
    type: 'error',
    duration: 5 * 1000
  })
  return Promise.reject(error);
})
var appendParams = function (param) {
  var params = "";
  for (var v in param) {
    if (params.length > 0) {
      params += "&";
    }
    params += v + "=" + param[v];
  }
  return params.length > 0 ? "?" + params : "";
}
var configUploadHeader = {
  headers: {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,DELETE,PUT',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization,version',
    'version': 1
  }
};
var configHtmlHeader = {
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST,GET,OPTIONS,DELETE,PUT',
    'Access-Control-Allow-Headers': 'Content-Type,Authorization,version',
    'version': 1
  }
};
export default {

  get(url, param) {
    return instance.get(url + appendParams(param), "");
  },
  post(url, param) {
    return instance.post(url, param);
  },
  upload(url, formData) {
    var config = configUploadHeader;
    return this.common(url, formData, config);
  },
  html(url) {
    var path = api.url_host + url;
    var config = configHtmlHeader;
    config.accept = 'text/html, text/plain';
    if (store.state.token) {
      config.headers.Authorization = store.state.token;
    }
    return axios.post(path, {}, config);
  },
  common(url, param, config) {
    var path = api.url_local + url;
    if (store.state.token) {
      config.headers.Authorization = store.state.token;
    }
    return axios.post(path, param, config);
  }
}

