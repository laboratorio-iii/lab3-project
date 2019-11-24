<template>
    <v-content>
        <v-container grid-list-xs>
            <v-card>
                <v-layout row wrap>
                    <v-flex xs4>
                        <v-avatar
                            class="mx-auto my-5 d-block grey lighten-2"
                            size="100"
                        >
                            <img
                            :src="user_found.image"
                            >
                  
                        </v-avatar>
                        <!-- <v-btn v-if="user_found._id == user._id" fab dark x-small :color="color_base" class="mx-2"
                            @click="onPickFile">
                                <v-icon dark>camera_alt</v-icon>
                        </v-btn> -->
            
                        <input type="file" style="display: none;" ref="fileInput">
                    </v-flex>
                    <v-divider vertical></v-divider>
                    <v-flex xs7>
                        <v-card-text class="text-xs-center">
                            <h4 class="text--primary font-weight-light">
                                {{ user_found.firstname +" "+ user_found.lastname }}
                            </h4>
                            
                            <v-divider></v-divider>
                            <h6 class="gray--text">Se unió el {{ user_found.createdAt }}</h6>
                            <v-divider></v-divider>
                            <p class="font-weight-light">{{ user_found.city.name +", "+ user_found.city.state.name}}</p>
                            
                            <template v-if="user_found._id == user._id">
                                <v-btn fab dark x-small :color="color_base" class="mx-2"
                                    @click="onPickFile">
                                        <v-icon dark>camera_alt</v-icon>
                                </v-btn>
                                <v-btn small color="gray" class="mx-5" @click="dialog = true">
                                        <v-icon dark>edit</v-icon>
                                </v-btn>
                            </template>

                            <template v-else>
                                <v-btn v-if="!user_found.followed" x-small block class="font-weight-light" @click="follow(user_found._id)">
                                    <v-icon dark left>done</v-icon>Seguir
                                </v-btn>

                                <v-btn v-else x-small block class="font-weight-light white--text" :color="color_base" @click="follow(user_found._id)">
                                    <v-icon dark left>done</v-icon>Seguido
                                </v-btn>

                            </template>

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
                                            v-model="user_found.firstname"
                                        ></v-text-field>
                                    </v-flex>

                                    <v-flex xs6>
                                        <v-text-field :color="color_base"
                                            name="apellido"
                                            label="Apellidos"
                                            id="apellido"
                                            v-model="user_found.lastname"
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
                                        <v-select :color="color_base"
                                        v-model="user_found.city.state.name"
                                        :items="states"
                                        label="Estado"
                                        @change="getCities(user_found.city.state.name)"
                                        ></v-select>
                                    </v-flex>

                                    <v-flex xs12 sm6 d-flex>
                                        <v-select :color="color_base"
                                        :model="user_found.city.name"
                                        :items="cities"
                                        label="Ciudad"
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
import { mapState, mapMutations } from 'vuex'
import UserService from '@/services/UserService'
import StateService from '@/services/StateService'
import CityService from '@/services/CityService'
import FollowService from '@/services/FollowService'

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
        user_found: {
            city: {
                name: '',
                state: {
                    name: ''
                }
            }
        },
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
        states: [],
        cities: []
    }),
    mounted() {
        this.onNavBtn(),
        this.getStates(),
        this.getUser()
        // console.log(this.$route.params.user)
    },
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
            this.setActiveBtn()
        },
        getUser(){
            UserService.getUser(this.$route.params.user).then(response => {
                this.user_found = response.data.user
                FollowService.getFollower(response.data.user._id).then(r => {
                    this.user_found.followed = r.data.followed
                })
            })
        },
        getStates () {
            StateService.fetchStates().then(response=>{
                response.data.states.forEach((state, index) => {
                    this.states.push(state.name)
                })
            })
        },
        getCities (param) {
            this.cities = []
            CityService.fetchCitiesByState(param).then(response=>{
                if(typeof response.data.cities === 'object'){
                    this.cities.push(response.data.cities.name)
                } else{
                    response.data.cities.forEach((city, index) => {
                        this.cities.push(city.name)
                    })
                }
            })
        },
        onPickFile() {
            this.$refs.fileInput.click()
        },
        follow(id) {
            FollowService.follow({followed: id, follower: this.$store.state.user._id}).then(response => {
                // console.log(response.data.result)
            })
            this.getUser()
        }
    },
}
</script>