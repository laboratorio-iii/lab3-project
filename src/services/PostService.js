import api from '@/services/api'

export default {

  async fetchPosts () {
    return api().get('post')
  },

  addPost (params) {
    return api().post('post', params)
  },

  searchPost(params) {
    return api().post('post/search', params)
  },

  searchPostByCategory(params) {
    return api().post('post/search/category', params)
  },

  getPostsByUser (params) {
    return api().get('post/user/' + params)
  },

  deletePost (id) {
    return api().delete('post/' + id)
  }
}
