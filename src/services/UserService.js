import api from '@/services/api'

export default {
  fetchUsers () {
    return api().get('user')
  },

  addUser (params) {
    return api().post('auth/register', params)
  },

  searchUser(params) {
    return api().post('user/search', params)
  },

  searchUserByCity(params) {
    return api().post('user/search/city', params)
  },

  updateUser (params) {
    return api().put('user/' + params.id, params)
  },

  getUser (params) {
    return api().get('user/' + params.id)
  },

  deleteUser (id) {
    return api().delete('user/' + id)
  }
}
