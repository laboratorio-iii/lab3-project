import api from '@/services/api'

export default {
  like (params) {
    return api().post('like', params)
  },
  getLikesByUser(params) {
    return api().get('like/user/' + params)
  }

}
