import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'

const service = axios.create({
  baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/244346' : 'http://rap2api.taobao.org/app/mock/244346',
  withCredentials: true
  // headers:{'AuthToken':'admin'}
})

service.interceptors.request.use((config) => {
  config.data = Object.assign({}, config.data, {
    AuthToken: 'admin'
    // AuthToken : window.localStorage.getItem('AuthToken')
  })
  return config
})

service.interceptors.response.use((resp) => {
  if (resp.data.code === 200) {
    return resp.data
  } else {
    // 处理请求错误
    this.$message.error(resp.data.errMsg)
  }
})

export default service
