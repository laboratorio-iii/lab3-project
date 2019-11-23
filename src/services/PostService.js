import api from '@/services/api'

export default {

  // async fetchPosts (params) {
  //     return api().get('post/' + params)
  // },
  async fetchPosts () {
    return api().get('post')
  },

  addPost (params) {
    return api().post('post', params)
  },

  getPost (params) {
    return api().get('post/' + params.id)
  },

  deletePost (id) {
    return api().delete('post/' + id)
  }
}
