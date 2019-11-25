<template>
    <div id="navBtn">
        <v-bottom-navigation app
            v-model="activeBtnValue"
            grow
            :color="color_base"
            >
            <template v-for="(btn, index) in btns">
                <v-btn v-if="!btn.params" :key="index" 
                @click.stop="onNavBtn" :to="{ name: btn.route }" exact>
                    <span v-text="btn.title"></span>
                    <v-icon v-text="btn.icon"></v-icon>
                </v-btn>
                <v-btn v-else :key="index" 
                @click.stop="onNavBtn" :to="{ name: btn.route, params: { user: user.username } }" exact>
                    <span v-text="btn.title"></span>
                    <v-icon v-text="btn.icon"></v-icon>
                </v-btn>
            </template>
            
        </v-bottom-navigation>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
    data: () => ({
        btns: [
            { title: 'Inicio', icon: 'home', route: 'home', params: false },
            { title: 'Búsqueda', icon: 'search', route: 'search', params: false },
            { title: 'Notificaciones', icon: 'favorite', route: 'notifications', params: false},
            // { title: 'Mensajería', icon: 'chat', route: 'chats'}
            { title: 'Perfil', icon: 'account_circle', route: 'profile', params: true }
        ]
    }),
    computed: {
        ...mapState(['color_base', 'user']),
        activeBtnValue: {
            get () {
                return this.$store.state.activeBtn
            },
            set (val) {
                this.setActiveBtn(val)
            }
        }, 
    },
    methods: {
        ...mapMutations(['setActiveBtn']),
        onNavBtn () {
            this.setActiveBtn(this.$store.state.activeBtn)
        },
    },
}
</script>