import request from '../utils/request'

// 获取通知列表
export function getlist (data) {
  return request({
    url: '/api/notificatioin/getall',
    method: 'post',
    data
  })
}
