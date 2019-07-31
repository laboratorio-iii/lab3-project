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
                            <p class="font-weight-light">Barquisimeto, Lara</p>
                            <v-btn x-small class="font-weight-light">
                                <v-icon dark left>done</v-icon>Seguir
                            </v-btn>
                            <v-btn fab dark x-small color="gray" class="mx-5" @click="dialog = true">
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
            <template id="dialog">
                <v-layout justify-center>
                    <v-dialog v-model="dialog" max-width="600px">
                    
                    <v-card>
                        <v-card-title>
                        <span class="headline">Datos personales</span>
                        </v-card-title>
                        <v-card-text>
                        <v-container grid-list-md>
                            <v-form>
                                <v-layout row wrap>
                                    <v-flex xs6>
                                        <v-text-field :color="color_base"
                                            name="nombre"
                                            label="Nombre"
                                            id="nombre"
                                        ></v-text-field>
                                    </v-flex>

                                    <v-flex xs6>
                                        <v-text-field :color="color_base"
                                            name="apellido"
                                            label="Apellidos"
                                            id="apellido"
                                        ></v-text-field>
                                    </v-flex>

                                    <v-flex>
                                        <v-menu
                                            v-model="menu"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            transition="scale-transition"
                                            offset-y
                                            full-width
                                            min-width="290px"
                                        >
                                            <template v-slot:activator="{ on }">
                                                <v-text-field :color="color_base"
                                                    v-model="date"
                                                    label="Fecha de nacimiento"
                                                    prepend-icon="event"
                                                    readonly
                                                    v-on="on"
                                                ></v-text-field>
                                            </template>
                                            <v-date-picker :color="color_base" v-model="date" @input="menu = false"></v-date-picker>
                                        </v-menu>
                                    </v-flex>

                                    <v-flex xs12 sm6 d-flex>
                                        <v-select
                                        :items="estados"
                                        label="Estado"
                                        :color="color_base"
                                        ></v-select>
                                    </v-flex>

                                    <v-flex xs12 sm6 d-flex>
                                        <v-select
                                        :items="ciudades"
                                        label="Ciudad"
                                        :color="color_base"
                                        ></v-select>
                                    </v-flex>
                                    
                                </v-layout>
                            </v-form>
                        </v-container>
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn :color="color_base" text @click="dialog = false">Salir</v-btn>
                        <v-btn :color="color_base" text @click="dialog = false">Guardar datos</v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                </v-layout>
            </template>
        </v-container>
    </v-content>
</template>

<script>
import {mapState} from 'vuex'
import Publicaciones from './Publicaciones'
import Seguidores from './Seguidores'
import Seguidos from './Seguidos'

export default {
    components: {
        Publicaciones,
        Seguidores,
        Seguidos,
    },
    data: () => ({
        tab: null,
        dialog: false,
        show: false,
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        rules: {
            required: value => !!value || 'Requerido',
            min: v => v.length >= 8 || 'Mínimo 8 caracteres',
        },
        items: [
            'Publicaciones', 'Seguidores', 'Seguidos',
        ],
        estados: ['Lara', 'Zulia'],
        ciudades: ['Barquisimeto', 'Maracaibo'],
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