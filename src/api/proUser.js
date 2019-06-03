import request from '@/utils/request'

export function listProUser(query) {
  return request({
    url: '/proUser/list',
    method: 'get',
    params: query
  })
}

export function deleteProUser(data) {
  return request({
    url: '/proUser/delete',
    method: 'post',
    data
  })
}

export function publishProUser(data) {
  return request({
    url: '/proUser/create',
    method: 'post',
    data
  })
}

export function detailProUser(id) {
  return request({
    url: '/proUser/detail',
    method: 'get',
    params: { id }
  })
}

export function editProUser(data) {
  return request({
    url: '/proUser/update',
    method: 'post',
    data
  })
}

export function listCatAndBrand() {
  return request({
    url: '/proUser/catAndBrand',
    method: 'get'
  })
}
