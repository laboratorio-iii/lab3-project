import api from '@/services/api'

export default {
  addComment (params) {
    return api().post('comment', params)
  },
  getComments(params) {
    return api().get('comment/' + params)
  }

}
