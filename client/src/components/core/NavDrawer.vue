<template>
    <div id="navDrawer">
        <v-navigation-drawer app v-model="drawerValue" temporary right width="200">
            <template v-slot:prepend>
                <v-list-item two-line>
                <v-list-item-avatar>
                    <img src="https://randomuser.me/api/portraits/men/78.jpg">
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>Bruce Wayne</v-list-item-title>
                    <v-list-item-subtitle>Usuario</v-list-item-subtitle>
                </v-list-item-content>
                </v-list-item>
            </template>

            <v-divider></v-divider>

            <v-list dense>
                <v-list-item
                v-for="item in items"
                :key="item.title"
                >
                <v-list-item-icon>
                    <v-icon v-text="item.icon"></v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
    data: () => ({
        items: [
          { title: 'Mi perfil', icon: 'account_circle' },
          { title: 'Mis reacciones', icon: 'favorite' },
          { title: 'Gestionar', icon: 'pan_tool' },
          { title: 'Salir', icon: 'power_settings_new' },
        ],
    }),
    computed: {
        ...mapState(['color_base']),
            drawerValue: {
                get () {
                    return this.$store.state.drawer
                },
                set (val) {
                    this.setDrawer(val)
                }
            },
    },
    methods: {
        ...mapMutations(['setDrawer', 'toggleDrawer']),
    },
}
</script>