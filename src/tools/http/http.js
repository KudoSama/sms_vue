import axios from 'axios'
import Vue from 'vue'
import {Message} from 'element-ui'

axios.defaults.baseURL = process.env.BASE_URL
axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => response, error => Promise.resolve(error.response))

function checkStatus (response) {
  if (response.status === 200 || response.status === 304 || response.status === 0) {
    return response
  }
  if (response.status >= 500) {
    return {
      data: {
        code: -500,
        status: false,
        message: response.statusText,
        data: response.statusText
      }
    }
  }
  return {
    data: {
      code: -404,
      status: false,
      message: response.statusText,
      data: response.statusText
    }
  }
}

function checkCode (res, errMsg) {
  if (!res.data.status) {
    switch (res.data.code) {
      case -404:
        Message.error(res.data.message || '未知异常')
        break
      case -500:
        Message.error('服务器连接错误！')
        break
      case 70005:
        Message.error('您需要重新登录！')
        break
      default:
        errMsg ? Message.error(errMsg) : Message.error(res.data.message || '未知异常')
    }
    this.$axios.post('/api/user/refresh')
    this.$router.push('/login')
    this.$router.go(0)
  }
  return res.data
}

export default {
  POST (url, data, errMsg) {
    const CancelToken = axios.CancelToken
    return axios.post(url, data, {
      timeout: 30000,
      cancelToken: new CancelToken(function executor (c) {
        Vue.$httpRequestList.push(c)
      })
    }).then(checkStatus).then(res => checkCode(res, errMsg))
  },
  GET (url, params, errMsg) {
    const CancelToken = axios.CancelToken
    return axios.get(url, {
      params: {
        _t: +(new Date()), // 时间戳，表示唯一
        ...params
      },
      timeout: 30000,
      cancelToken: new CancelToken(function executor (c) {
        Vue.$httpRequestList.push(c)
      })
    }).then(checkStatus).then(res => checkCode(res, errMsg)) // checkstates 验证后端返回值/checkcode异常
  },
  DELETE (url, errMsg) {
    const CancelToken = axios.CancelToken
    return axios.delete(url, {
      timeout: 30000,
      cancelToken: new CancelToken(function executor (c) {
        Vue.$httpRequestList.push(c)
      })
    }).then(checkStatus).then(res => checkCode(res, errMsg))
  },
  PUT (url, data, errMsg) {
    const CancelToken = axios.CancelToken
    return axios.put(url, data, {
      timeout: 30000,
      cancelToken: new CancelToken(function executor (c) {
        Vue.$httpRequestList.push(c)
      })
    }).then(checkStatus).then(res => checkCode(res, errMsg))
  },
  EXPORT (url, data, errMsg) {
    const CancelToken = axios.CancelToken
    return axios.post(url, data, {
      responseType: 'blob',
      timeout: 30000,
      cancelToken: new CancelToken(function executor (c) {
        Vue.$httpRequestList.push(c)
      })
    }).then(checkStatus).then(res => res.data)
  }
}
