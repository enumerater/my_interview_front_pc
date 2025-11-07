import request from '@/utils/requests'

export const login = (data) => {
  return request({
    url: '/auth/login',
    method: 'POST',
    data
  })
}