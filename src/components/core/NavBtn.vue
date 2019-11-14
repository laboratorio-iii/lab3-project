<template>
    <div id="navBtn">
        <v-bottom-navigation app
            v-model="activeBtnValue"
            grow
            :color="color_base"
            >
            <v-btn v-for="(btn, index) in btns" :key="index" 
            @click.stop="onNavBtn" :to="{ name: btn.route }" exact>
                <span v-text="btn.title"></span>
                <v-icon v-text="btn.icon"></v-icon>
            </v-btn>
        </v-bottom-navigation>
    </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'

export default {
    data: () => ({
        btns: [
            {title: 'Inicio', icon: 'home', route: 'home'},
            {title: 'Búsqueda', icon: 'search', route: 'search'},
            {title: 'Notificaciones', icon: 'favorite', route: 'notifications'},
            {title: 'Mensajería', icon: 'chat', route: 'chats'},
        ]
    }),
    computed: {
        ...mapState(['color_base']),
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