import api from '@/services/api'
import LikeService from '@/services/LikeService'

export default {

  async fetchPosts () {
    const response = await api().get('post')
    const posts = response.data.posts
    posts.forEach(async element => {
        const likeResult = await LikeService.getLike(element._id)
        element.liked = likeResult.data.liked
        element.xsflex = 12
        element.mdflex = 6
        element.liked ? element.color = 'red' : element.color = 'none'
    });
    return posts
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
