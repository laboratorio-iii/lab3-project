<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>{{ nombre_proyecto }} </span>
        <span class="font-weight-light">Lab3</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
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
  </v-app>
</template>

<script>

import {mapState} from 'vuex'

export default {
  name: 'App',
  data: () => ({
    //
  }),
  computed: {
    ...mapState(['nombre_proyecto'])
  }
};
</script>
