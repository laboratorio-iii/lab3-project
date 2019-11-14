<template>
    <v-content>
        <v-container grid-list-xs>
            <v-card
                max-width="500"
                class="mx-auto"
            >

            <v-list two-line subheader>
                <v-subheader>Más recientes</v-subheader>

                <v-list-item
                    v-for="item in items"
                    :key="item.title"
                    @click="debug"
                >
                    <v-list-item-avatar>
                    <v-img :src="item.avatar"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                    <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-icon>
                    <v-icon :color="item.active ? color_base : 'grey'" v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                </v-list-item>
            </v-list>

            <v-divider></v-divider>

            <v-list subheader>
                <v-subheader>Más notificaciones</v-subheader>

                <v-list-item
                    v-for="item in items2"
                    :key="item.title"
                    @click="debug"
                >
                    <v-list-item-avatar>
                    <v-img :src="item.avatar"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                    <v-list-item-title v-text="item.title"></v-list-item-title>
                    <v-list-item-subtitle v-text="item.subtitle"></v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-icon>
                    <v-icon :color="item.active ? color_base : 'grey'" v-text="item.icon"></v-icon>
                    </v-list-item-icon>
                </v-list-item>
            </v-list>
            </v-card>
        </v-container>
    </v-content>
</template>

<script>
import {mapState} from 'vuex'

export default {
    data: () => ({
      items: [
        { 
            active: true, title: 'Jason Oner', icon: 'favorite',
            subtitle: 'reaccionó a tu publicación', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' 
        },
        { 
            active: true, title: 'Ranee Carlson', icon: 'done',
            subtitle: 'te comenzó a seguir', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' 
        },
        { 
            active: true, title: 'Cindy Baker', icon: 'favorite',
            subtitle: 'reaccionó tu publicación', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' 
        },
        { 
            active: true, title: 'Ali Connors', icon: 'done',
            subtitle: 'te comenzó a seguir', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' 
        },
      ],
      items2: [
        { 
            title: 'Travis Howard', icon: 'favorite', 
            subtitle: 'reaccionó tu publicación', avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg' },
        { 
            title: 'Ali Connors', icon: 'done',
            subtitle: 'te comenzó a seguir', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' 
        },
        { 
            title: 'Cindy Baker', icon: 'favorite',
            subtitle: 'reaccionó tu publicación', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' 
        },
      ],
    }),
    computed: {
      ...mapState(['color_base']),
    },
    methods: {
        debug() {
            console.log(event.target)
        }
    } 
}
</script>