import request from '@/utils/request'

export function listProUserPay(query) {
  return request({
    url: '/proUserPay/list',
    method: 'get',
    params: query
  })
}

export function deleteProUserPay(data) {
  return request({
    url: '/proUserPay/delete',
    method: 'post',
    data
  })
}

export function publishProUserPay(data) {
  return request({
    url: '/proUserPay/create',
    method: 'post',
    data
  })
}

export function detailProUserPay(id) {
  return request({
    url: '/proUserPay/detail',
    method: 'get',
    params: { id }
  })
}

export function editProUserPay(data) {
  return request({
    url: '/proUserPay/update',
    method: 'post',
    data
  })
}

export function listCatAndBrand() {
  return request({
    url: '/proUserPay/catAndBrand',
    method: 'get'
  })
}
