<template>
    <v-content>
        <v-container grid-list-xs>
            <v-list three-line>
                <template v-for="(item, index) in items">
                    <v-subheader
                    v-if="item.header"
                    :key="item.header"
                    v-text="item.header"
                    ></v-subheader>

                    <v-divider
                    v-else-if="item.divider"
                    :key="index"
                    :inset="item.inset"
                    color="orange"
                    ></v-divider>

                    <v-list-item
                    v-else
                    :key="item.title"
                    @click="debug"
                    >
                    <v-list-item-avatar>
                        <v-img :src="item.avatar"></v-img>
                    </v-list-item-avatar>

                    <v-list-item-content>
                        <v-list-item-title v-html="item.title"></v-list-item-title>
                        <v-list-item-subtitle v-html="item.subtitle"></v-list-item-subtitle>
                    </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>

            <v-btn
                :color="color_base"
                dark
                large
                fixed
                bottom
                right
                fab
                style="margin-bottom: 50px"
                @click="msg_dialog = true"
                >
                <v-icon>fa fa-paper-plane</v-icon>
            </v-btn>


            <template id="msg-dialog">
                <v-layout justify-center>
                    <v-dialog v-model="msg_dialog" max-width="600px">
                    
                    <v-card>
                        <v-card-title>
                        <span class="headline">Mensaje directo</span>
                        </v-card-title>
                        <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                            <v-flex xs12>
                                <v-text-field :color="color_base" label="Destinario*" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-text-field :color="color_base" label="Título del mensaje*" required></v-text-field>
                            </v-flex>
                            <v-flex xs12>
                                <v-textarea
                                outlined
                                name="mgs-body"
                                label="Cuerpo del mensaje."
                                value=""
                                :color="color_base"
                            ></v-textarea>
                            </v-flex>

                            </v-layout>
                        </v-container>
                        </v-card-text>
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn :color="color_base" text @click="msg_dialog = false">Salir</v-btn>
                        <v-btn :color="color_base" text @click="msg_dialog = false">Enviar</v-btn>
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

export default {
    data: () => ({
        items: [
        { header: 'Mensajes' },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: "<span class='text--primary'>Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: "<span class='text--primary'>to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.",
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle: "<span class='text--primary'>Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?",
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Birthday gift',
          subtitle: "<span class='text--primary'>Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?",
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
          subtitle: "<span class='text--primary'>Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.",
        },
      ],
      msg_dialog: false,
    }),
    computed: {
        ...mapState(['color_base'])
    },
    methods: {
        debug() {
            console.log(event.target)
        }
    }    
}
</script>