import request from '../utils/request'

// 获取文章列表
export function getacticelist (data) {
  return request({
    url: '/api/acticelist',
    method: 'post',
    data
  })
}
// 获取文章阅读量
export function getArticeAmout (data) {
  return request({
    url: '/api/actice/Amout',
    method: 'post',
    data
  })
}
