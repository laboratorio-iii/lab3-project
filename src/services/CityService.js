import api from '@/services/api'

export default {
  fetchCities(params) {
    return api().get('city/' + params)
  }

}
