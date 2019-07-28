<template>
    <v-content>
        <v-container grid-list-xs>
            <v-card>
                <v-layout row wrap>
                    <v-flex xs4>
                        <v-avatar
                            class="mx-auto my-2 d-block grey lighten-2"
                            size="100"
                        >
                            <img
                            src="https://randomuser.me/api/portraits/men/78.jpg"
                            >
                  
                        </v-avatar>
                        <v-btn fab dark x-small :color="color_base" class="mx-2"
                            @click="onPickFile">
                                <v-icon dark>camera_alt</v-icon>
                        </v-btn>
            
                        <input type="file" style="display: none;" ref="fileInput">
                    </v-flex>
                    <v-divider vertical></v-divider>
                    <v-flex xs7>
                        <v-card-text class="text-xs-center">
                            <h4 class="text--primary font-weight-light">Bruce Wayne</h4>
                            
                            <v-divider></v-divider>
                            <h6 class="gray--text">Se unió el 27/07/2019.</h6>
                            <v-divider></v-divider>
                            <p class="font-weight-light">Barquisimeto, Venezuela</p>
                            <v-btn x-small class="font-weight-light">
                                <v-icon dark left>done</v-icon>Seguir
                            </v-btn>
                            <v-btn fab dark x-small color="gray" class="mx-5    ">
                                    <v-icon dark>edit</v-icon>
                            </v-btn>
                        </v-card-text>
                    </v-flex>  
                </v-layout>
            </v-card>

            <v-tabs
                v-model="tab"
                background-color="transparent"
                :color="color_base"
                grow
                class="mb-1"
                >
                <v-tab
                    v-for="item in items"
                    :key="item"
                    v-text="item"
                >
                </v-tab>
                </v-tabs>

                <v-tabs-items v-model="tab">
                <v-tab-item
                    v-for="item in items"
                    :key="item"
                >
                    <component :is="item"></component>
                    
                </v-tab-item>
            </v-tabs-items>
        </v-container>
    </v-content>
</template>

<script>
import {mapState} from 'vuex'
import Publicaciones from './Publicaciones'
import Seguidores from './Seguidores'

export default {
    components: {
        Publicaciones,
        Seguidores
    },
    data: () => ({
        tab: null,
        items: [
            'Publicaciones', 'Seguidores', 'Seguidos',
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    }),
    computed: {
        ...mapState(['color_base'])
    },
    methods: {
         onPickFile() {
             this.$refs.fileInput.click()
         }
    },
}
</script>