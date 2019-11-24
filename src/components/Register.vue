<template>
    <v-content>
        <v-container grid-list-xs>
            <v-layout row wrap align-center justify-center>
                <v-flex>
                    <v-card class="mx-auto" max-width="400">
                        <v-img class="white--text" height="100px" src="https://cdn.vuetifyjs.com/images/cards/plane.jpg">
                            <v-card-title class="align-end fill-height">Registrar cuenta</v-card-title>
                        </v-img>

                        <v-card-text>
                            <v-form @submit="addUser">
                                <v-layout row wrap>
                                    <v-flex xs6>
                                        <v-text-field :color="color_base"
                                            
                                            label="Nombre"
                                            id="nombre"
                                            v-model="firstname"
                                        ></v-text-field>
                                    </v-flex>

                                    <v-flex xs6>
                                        <v-text-field :color="color_base"
                                            
                                            label="Apellidos"
                                            id="apellido"
                                            v-model="lastname"
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

                                    <v-flex>
                                        <v-select :color="color_base"
                                            v-model="state"
                                            :items="states"
                                            menu-props="auto"
                                            label="Seleccionar estado"
                                            hide-details
                                            prepend-icon="map"
                                            single-line
                                            @change="getCities(state)"
                                        ></v-select>
                                    </v-flex>

                                    <v-flex>
                                        <v-select :color="color_base"
                                            v-model="city"
                                            :items="cities"
                                            menu-props="auto"
                                            label="Seleccionar ciudad"
                                            hide-details
                                            prepend-icon="map"
                                            single-line
                                        ></v-select>
                                    </v-flex>

                                    <v-flex>
                                        <v-text-field :color="color_base"
                                            
                                            label="Correo electrónico"
                                            id="email"
                                            v-model="username"
                                        ></v-text-field>
                                    </v-flex>

                                    <v-flex>
                                        <v-text-field :color="color_base"
                                            :append-icon="show ? 'visibility' : 'visibility_off'"
                                            :rules="[rules.required]"
                                            :type="show ? 'text' : 'password'"
                                            
                                            label="Contraseña"
                                            @click:append="show = !show"
                                            id="rpass"
                                            v-model="password"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex>
                                        <v-text-field :color="color_base"
                                            :append-icon="show ? 'visibility' : 'visibility_off'"
                                            :rules="[rules.required]"
                                            :type="show ? 'text' : 'password'"
                                            
                                            label="Repita su contraseña"
                                            @click:append="show = !show"
                                        ></v-text-field>
                                    </v-flex>
                                </v-layout>
                                
                                <v-btn type="submit" block class="ma-a" outlined :color="color_base">
                                    <v-icon left>open_in_new</v-icon>Crear cuenta
                                </v-btn>
                            </v-form>
                            <div class="pa-5 text-center" >
                                <span>¿Ya tienes una cuenta? ¡Inicia sesión aquí!</span><br>
                                <router-link :to="{ name: 'login' }" class="indigo--text"> Iniciar sesión</router-link>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
import {mapState} from 'vuex'
import UserService from '@/services/UserService'
import StateService from '@/services/StateService'
import CityService from '@/services/CityService'

export default {
    data: () => ({
        show: false,
        firstname: '',
        lastname: '',
        date: new Date().toISOString().substr(0, 10),
        state: '',
        states: [],
        city: '',
        cities: [],
        username: '',
        password: '',
        menu: false,
        rules: {
            required: value => !!value || 'Requerido',
            min: v => v.length >= 8 || 'Mínimo 8 caracteres',
        }
    }),
    mounted () {
        this.getStates()
    },
    computed: {
    ...mapState(['color_base'])
    },
    methods: {
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
        async addUser (e) {
            e.preventDefault()
            await UserService.addUser({
                username: this.username,
                password: this.password,
                image: 'https://randomuser.me/api/portraits/men/78.jpg',
                person: {
                    firstname: this.firstname,
                    lastname: this.lastname,
                    date: this.date,
                    state: this.state,
                    city: this.city
                }
            })
            // this.$swal(
            //     'Great!',
            //     `Your user has been added!`,
            //     'success'
            // )
            this.$router.push({ name: 'login' })
        }
    }
}
</script>