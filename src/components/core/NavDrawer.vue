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
                <template v-for="(item, index) in items">
                    <v-list-item v-if="!item.admin" :key="index"
                        :to="{ name: item.route }"
                        color="grey darken-4">
                        <v-list-item-icon>
                            <v-icon v-text="item.icon"></v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title v-text="item.title"></v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                   
                    <v-list-group v-else :key="index"
                        :prepend-icon="item.icon"
                        color="grey darken-4"
                        >
                        <template v-slot:activator>
                        <v-list-item-title v-text="item.title"></v-list-item-title>
                        </template>

                        <v-list-item
                            v-for="(admin, i) in admins"
                            :key="i"
                            :to="{ name: admin[2] }"
                            color="grey darken-4"
                        >
                            <v-list-item-title v-text="admin[0]"></v-list-item-title>
                            <v-list-item-icon>
                            <v-icon v-text="admin[1]"></v-icon>
                            </v-list-item-icon>
                        </v-list-item>
        
                    </v-list-group>
                    
                </template>

                <v-list-item @click="logout"
                    color="grey darken-4">
                    <v-list-item-icon>
                        <v-icon>power_settings_new</v-icon>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>Salir</v-list-item-title>
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
          { title: 'Nueva publicación', icon: 'add_circle', route: 'publication-create', admin: false },
          { title: 'Mi perfil', icon: 'account_circle', route: 'profile', admin: false },
          { title: 'Acceso', icon: 'lock', route: 'settings', admin: false },
          { title: 'Mis reacciones', icon: 'favorite', route: 'likes' , admin: false },
          { title: 'Gestionar', icon: 'pan_tool', route: '', admin: true },
        //   { title: 'Salir', icon: 'power_settings_new', route: 'login', admin: false },
        ],
        admins: [
            ['Usuarios', 'people_outline', 'users'],
            ['Publicaciones', 'photo_library', 'publications'],
            ['Categorias', 'spellcheck', 'categories'],
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
        ...mapMutations(['setDrawer', 'toggleDrawer', 'setUser']),
        debug() {
            console.log(event.target)
        },
        logout() {
            window.localStorage.removeItem('_token')
            this.setUser({})
            this.$router.push({ name: 'login' })
        }
    },
}
</script>