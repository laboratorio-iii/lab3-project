<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>{{ nombre_proyecto }} </span>
        <span class="font-weight-light">Lab3</span>
      </v-toolbar-title>
      <!-- <v-spacer></v-spacer> -->
      <!-- <v-btn
        text
        href="#"
        target="_blank"
      >
        <span class="mr-2">Botón</span>
        <v-icon>open_in_new</v-icon>
      </v-btn> -->
    </v-app-bar>

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

import {mapState} from 'vuex'

export default {
  name: 'App',
  data: () => ({
    activeBtn: 0,
  }),
  computed: {
    ...mapState(['nombre_proyecto', 'color_base'])
  }
};
</script>
