<template>
    <v-content>
        <v-container grid-list-xs>
            <v-layout row wrap align-center justify-center>
                <v-flex>
                    <v-card class="mx-auto" max-width="400">

                        <v-card-title primary-title>
                            Información de acceso
                        </v-card-title>

                        <v-card-text>
                            <v-form>
                                <v-layout row wrap>

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
                                    <v-icon left>edit</v-icon>Guardar cambios
                                </v-btn>
                            </v-form>
                            
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