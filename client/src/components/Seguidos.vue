<template>
    <v-layout column>
        <v-list>
            <template v-for="(item, index) in items">
                <v-divider v-if="!item.last" inset :key="index"></v-divider>
                <v-list-item :key="item.title">
                    <v-list-item-icon>
                    <v-btn x-small class="font-weight-light white--text" :color="color_base">
                        <v-icon left>done</v-icon>Seguido
                    </v-btn>
                    </v-list-item-icon>

                    <v-list-item-content>
                    <v-list-item-title v-text="item.title" right></v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-avatar>
                    <v-img :src="item.avatar"></v-img>
                    </v-list-item-avatar>
                </v-list-item>

            </template>
        </v-list>
    </v-layout>
</template>

<script>
import {mapState} from 'vuex'

export default {
    data: () => ({
        items: [
          { last: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg' },
          { title: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
          { title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
          { title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        ],
    }),
    computed: {
        ...mapState(['color_base'])
    },
}
</script>