import api from '@/services/api'

export default {
  like (params) {
    return api().post('like/' + params)
  },
  getLike(params) {
    return api().get('like/' + params)
  }

}
