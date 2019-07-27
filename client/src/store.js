import Vue from 'vue'
import Vuex from 'vuex'

import { set, toggle } from './utils/vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nombre_proyecto: 'Proyecto',
    color_base: 'amber darken-4',
    drawer: null,
  },
  mutations: {
    setDrawer: set('drawer'),
    toggleDrawer: toggle('drawer')
  },
  actions: {

  }
})
