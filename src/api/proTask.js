import request from '@/utils/request'

export function listProTask(query) {
  return request({
    url: '/proTask/list',
    method: 'get',
    params: query
  })
}

export function listProTaskOnlyPro(query) {
  return request({
    url: '/pro/detailOnlyPro',
    method: 'get',
    params: query
  })
}

export function deleteProTask(data) {
  return request({
    url: '/proTask/delete',
    method: 'post',
    data
  })
}

export function publishProTask(data) {
  return request({
    url: '/proTask/create',
    method: 'post',
    data
  })
}

export function detailProTask(id) {
  return request({
    url: '/proTask/detail',
    method: 'get',
    params: { id }
  })
}

export function editProTask(data) {
  return request({
    url: '/proTask/update',
    method: 'post',
    data
  })
}

export function listCatAndBrand() {
  return request({
    url: '/proTask/catAndBrand',
    method: 'get'
  })
}
