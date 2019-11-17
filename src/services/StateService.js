import api from '@/services/api'

export default {
  fetchStates() {
    return api().get('state')
  }

}
