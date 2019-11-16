<template>
    <v-content>
        <v-container grid-list-md>
            <v-layout
                wrap
            >
                <v-flex
                v-for="(post, index) in posts"
                :key="index"
                v-bind="{ [`xs${post.xsflex}, md${post.mdflex}`]: true }"
                >
                <v-card>
                    <v-img
                    :src="post.image"
                    class="white--text"
                    height="150px"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                    >
                    <v-card-title
                        class="fill-height align-end"
                        v-text="post.title"
                    ></v-card-title>
                    </v-img>

                    <v-card-text>Precio: $
                        <span v-text="post.price"></span><br>
                        <span class="text--primary" v-text="post.description"></span>
                    </v-card-text>

                    <v-card-actions>
                    <v-spacer></v-spacer>

                    <v-btn icon :color="post.color"
                    @click="like(post._id)">
                        <v-icon>favorite</v-icon>
                    </v-btn>

                    <v-btn icon @click="comments_dialog = true">
                        <v-icon>fa fa-comment</v-icon>
                    </v-btn>
                    
                    <v-btn icon @click="msg_dialog = true">
                        <v-icon>fa fa-paper-plane</v-icon>
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-flex>
            </v-layout>

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

            <template id="comments-dialog">
                <v-layout justify-center>
                    <v-dialog v-model="comments_dialog" max-width="600px">
                    
                    <v-card>
                        <v-card-text>
                        <v-container grid-list-md>
                            <v-layout wrap>
                                <v-list three-line>
                                    <template v-for="(comment, index) in comments">
                                        <v-subheader
                                        v-if="comment.header"
                                        :key="comment.header"
                                        v-text="comment.header"
                                        ></v-subheader>

                                        <v-divider
                                        v-else-if="comment.divider"
                                        :key="index"
                                        :inset="comment.inset"
                                        color="orange"
                                        ></v-divider>

                                        <v-list-item
                                        v-else
                                        :key="comment.title"
                                        @click="debug"
                                        >
                                        <v-list-item-avatar>
                                            <v-img :src="comment.avatar"></v-img>
                                        </v-list-item-avatar>

                                        <v-list-item-content>
                                            <v-list-item-title v-html="comment.user"></v-list-item-title>
                                            <v-list-item-subtitle v-html="comment.body"></v-list-item-subtitle>
                                        </v-list-item-content>
                                        </v-list-item>
                                    </template>
                                </v-list>
                            
                            <v-flex xs12>
                                <v-textarea
                                outlined
                                name="mgs-body"
                                label="Escriba su comentario aquí"
                                value=""
                                :color="color_base"
                                auto-grow
                                hint="Pulsa enter para enviar"
                                rows="1"
                                ></v-textarea>
                            </v-flex>

                            </v-layout>
                        </v-container>
                        </v-card-text>
                    </v-card>
                    </v-dialog>
                </v-layout>
            </template>

            <v-btn
                :color="color_base"
                dark
                large
                fixed
                bottom
                right
                fab
                style="margin-bottom: 50px"
                :to="{ name: 'publication-create' }"
                >
                <v-icon>add</v-icon>
            </v-btn>

        </v-container>
    </v-content>
</template>

<script>
import {mapState} from 'vuex'
import PostService from '@/services/PostService'
import LikeService from '@/services/LikeService'

export default {
    data: () => ({
      posts: [],
      comments: [
        { header: 'Comentarios' },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          user: 'Ali Connors',
          body: "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          user: 'Jennifer',
          body: "Wish I could come, but I'm out of town this weekend.",
        },
        { divider: true, inset: true },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          user: 'Sandra Adams',
          body: "Do you have Paris recommendations? Have you ever been?",
        },
      ],
      msg_dialog: false,
      comments_dialog: false,
      likedColor: 'red',
    }),
    mounted () {
        this.getPosts()
    },
    methods: {
        debug() {
            console.log(event.target)
        },
        async like(i) {
            const response = await LikeService.like(i)
            console.log(response.data.result)
        },
        async getPosts () {
            const response = await PostService.fetchPosts()
            this.posts = response
            console.log(this.posts)
        },
    },
    // created() {

    // },
  computed: {
        ...mapState(['color_base'])
    }
}
</script>
