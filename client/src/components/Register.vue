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

                                    <v-flex>
                                        <v-text-field :color="color_base"
                                            name="email"
                                            label="Correo electrónico"
                                            id="email"
                                        ></v-text-field>
                                    </v-flex>

                                    <v-flex>
                                        <v-text-field :color="color_base"
                                            :append-icon="show ? 'visibility' : 'visibility_off'"
                                            :rules="[rules.required]"
                                            :type="show ? 'text' : 'password'"
                                            name="password"
                                            label="Contraseña"
                                            @click:append="show = !show"
                                            id="rpass"
                                        ></v-text-field>
                                    </v-flex>
                                    <v-flex>
                                        <v-text-field :color="color_base"
                                            :append-icon="show ? 'visibility' : 'visibility_off'"
                                            :rules="[rules.required]"
                                            :type="show ? 'text' : 'password'"
                                            name="rpassword"
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

export default {
    data: () => ({
        show: false,
        date: new Date().toISOString().substr(0, 10),
        menu: false,
        rules: {
            required: value => !!value || 'Requerido',
            min: v => v.length >= 8 || 'Mínimo 8 caracteres',
        }
    }),
    computed: {
    ...mapState(['color_base'])
  }
}
</script>