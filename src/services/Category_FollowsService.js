import api from '@/services/api'

export default {

  followCategory (params) {
    return api().post('category_follows', params)
  },

  getFollower(params) {
    return api().get('category_follows/follower/' + params)
  },

  getFolloweds(params) {
    return api().get('category_follows/followeds/' + params)
  }

}
