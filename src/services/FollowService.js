import api from '@/services/api'

export default {

  follow (params) {
    return api().post('follows', params)
  },

  getFollower(params) {
    return api().get('follows/follower/' + params)
  },

  getFollowers(params) {
      return api().get('follows/followers/' + params)
  },

  getFolloweds(params) {
    return api().get('follows/followeds/' + params)
  }

}
