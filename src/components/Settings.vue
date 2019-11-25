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
                                            name="username"
                                            label="Usuario"
                                            id="username"
                                            v-model="user.username"
                                        ></v-text-field>
                                    </v-flex>

                                    <!-- <v-flex>
                                        <v-text-field :color="color_base"
                                            :append-icon="show ? 'visibility' : 'visibility_off'"
                                            :rules="[rules.required]"
                                            :type="show ? 'text' : 'password'"
                                            name="password"
                                            label="Contraseña"
                                            @click:append="show = !show"
                                            id="rpass"
                                            v-model="user.password"
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
                                    </v-flex> -->
                                </v-layout>
                                
                                <v-btn block class="ma-a" outlined :color="color_base" @click="updateUser">
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
import { mapState, mapMutations } from 'vuex'
import UserService from '@/services/UserService'

export default {
    data: () => ({
        show: false,
        rules: {
            required: value => !!value || 'Requerido',
            min: v => v.length >= 8 || 'Mínimo 8 caracteres',
        }
    }),
    mounted() {
        this.onNavBtn()
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
         onPickFile() {
             this.$refs.fileInput.click()
         },
         updateUser() {
             event.preventDefault()
            UserService.updateUserSettings(this.user)
        }
    },
}
</script>