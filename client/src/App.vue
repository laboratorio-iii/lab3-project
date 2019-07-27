<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span v-text="nombre_proyecto"></span>
        <span class="font-weight-light">Lab3</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn
        text
        @click="drawer =! drawer"
      > -->
      <v-btn
        text
        @click.stop="onDrawer"
      >
        <v-avatar
            size="36"
            class="red"
          >
            <img src="https://randomuser.me/api/portraits/men/78.jpg" alt="alt">
          </v-avatar>
      </v-btn>
    </v-app-bar>

    <navDrawer></navDrawer>

    <v-content>
      <router-view/>
    </v-content>

    <v-bottom-navigation app
      :value="activeBtn"
      grow
      :color="color_base"
    >
      <v-btn>
        <span>Inicio</span>
        <v-icon>home</v-icon>
      </v-btn>

      <v-btn>
        <span>Búsqueda</span>
        <v-icon>search</v-icon>
      </v-btn>

      <v-btn>
        <span>Notificaciones</span>
        <v-icon>favorite</v-icon>
      </v-btn>

      <v-btn>
        <span>Mensajería</span>
        <v-icon>chat</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import navDrawer from './components/core/NavDrawer'

import {mapState, mapMutations} from 'vuex'

export default {
  name: 'App',
  components: {
    navDrawer,
  },
  data: () => ({
    activeBtn: 0,
  }),
  computed: {
    ...mapState(['nombre_proyecto', 'color_base'])
  },
  methods: {
    ...mapMutations(['setDrawer', 'toggleDrawer']),
    onDrawer () {
      this.setDrawer(!this.$store.state.drawer)
    },
  }
};
</script>
