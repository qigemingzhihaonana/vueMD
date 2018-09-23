import axios from '@utils/fetch'

export function fetch (query) {
  return axios({
    url: '/selectAllMenu',
    method: 'get',
    params: query
  })
}
