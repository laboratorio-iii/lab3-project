<template>
  <v-app>
    <template v-if="user._id != undefined">
      <div>
        <v-app-bar app>
          <v-toolbar-title class="headline text-uppercase">
            <span v-text="nombre_proyecto"></span>
            <span class="font-weight-light">Lab3</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
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
      </div>
    </template>
    

    <v-content>
      <router-view/>
    </v-content>

    <template v-if="user._id != undefined">
      <div>
        <navBtn></navBtn>
      </div>
    </template>
    
  </v-app>
</template>

<script>
import navBtn from './components/core/NavBtn'
import navDrawer from './components/core/NavDrawer'

import {mapState, mapMutations} from 'vuex'

export default {
  name: 'App',
  components: {
    navBtn,
    navDrawer,
  },
  data: () => ({
    //
  }),
  computed: {
    ...mapState(['nombre_proyecto', 'color_base', 'user'])
  },
  methods: {
    ...mapMutations(['setDrawer', 'toggleDrawer']),
    onDrawer () {
      this.setDrawer(!this.$store.state.drawer)
    },
  }
};
</script>
