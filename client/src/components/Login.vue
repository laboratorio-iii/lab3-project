<template>
    <v-container grid-list-xs fluid>
        <v-layout row wrap align-center justify-center>
            <v-flex xs8>
                <v-card class="mx-auto" max-width="400">
                    <v-img class="white--text" height="100px" src="https://cdn.vuetifyjs.com/images/cards/docks.jpg">
                        <v-card-title class="align-end fill-height">Inicio de sesión</v-card-title>
                    </v-img>

                    <v-card-text>
                        <v-form>
                            <v-text-field color="yellow darken-3"
                                name="email"
                                label="Correo electrónico"
                                id="email"
                            ></v-text-field>
                            <v-text-field color="yellow darken-3"
                                :append-icon="show ? 'visibility' : 'visibility_off'"
                                :rules="[rules.required]"
                                :type="show ? 'text' : 'password'"
                                name="password"
                                label="Contraseña"
                                @click:append="show = !show"
                            ></v-text-field>
                            <v-btn type="submit" block class="ma-a" tile outlined color="orange">
                                <v-icon left>open_in_new</v-icon>Iniciar sesión
                            </v-btn>
                        </v-form>
                        <div class="pa-5 text-center" >
                            <span>¿No tienes una cuenta? ¡Regístrate!</span><br>
                            <router-link :to="{ name: 'register' }" class="blue--text"> Crear una cuenta</router-link>
                        </div>
                    </v-card-text>
                    <v-btn block tile outlined color="error">
                        <v-icon left>fa fa-google-plus-square</v-icon>Iniciar con Google
                    </v-btn>
                    <v-btn block tile outlined color="info">
                        <v-icon left>fa fa-facebook-official</v-icon>Iniciar con Facebook
                    </v-btn>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        show: false,
        email: 'admin',
        password: 'admin',
        rules: {
            required: value => !!value || 'Requerido',
            min: v => v.length >= 8 || 'Mínimo 8 caracteres',
        }
    })
}
</script>
