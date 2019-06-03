import request from '@/utils/request'

export function listPro(query) {
  return request({
    url: '/pro/list',
    method: 'get',
    params: query
  })
}

export function deletePro(data) {
  return request({
    url: '/pro/delete',
    method: 'post',
    data
  })
}

export function publishPro(data) {
  return request({
    url: '/pro/create',
    method: 'post',
    data
  })
}

export function detailPro(id) {
  return request({
    url: '/pro/detail',
    method: 'get',
    params: { id }
  })
}

export function editPro(data) {
  return request({
    url: '/pro/update',
    method: 'post',
    data
  })
}

export function listCatAndBrand() {
  return request({
    url: '/pro/catAndBrand',
    method: 'get'
  })
}
