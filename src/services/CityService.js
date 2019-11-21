import api from '@/services/api'

export default {
  fetchCitiesByState(params) {
    return api().get('city/' + params)
  },
  fetchCities() {
    return api().get('city')
  }

}
