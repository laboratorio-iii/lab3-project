<template>
    <v-content>
        <v-container grid-list-md>

            <template>
                <v-row justify="center">
                    <v-dialog v-model="dialog_categories" persistent max-width="320">
                    <template v-slot:activator="{ on }">
                        <v-btn :color="color_base" dark v-on="on">Ver categorías</v-btn>
                    </template>
                    <v-card>
                        <v-card-title class="headline">Lista de categorías</v-card-title>
                        

                    <template v-for="(category, index) in categories">
                        <v-list-item :key="index">
                            <v-list-item-content>
                                <v-list-item-title right>{{ category.name }}</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-icon>
                                <v-btn v-if="!category.followed" x-small class="font-weight-light" @click="followCategory(category._id)">
                                    <v-icon dark left>done</v-icon>Seguir
                                </v-btn>

                                <v-btn v-else x-small class="font-weight-light white--text" :color="color_base" @click="followCategory(category._id)">
                                    <v-icon dark left>done</v-icon>Seguido
                                </v-btn>
                            </v-list-item-icon>

                            

                            <v-list-item-avatar>
                            </v-list-item-avatar>
                        </v-list-item>
                    </template>

                        
                        <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="orange darken-1" text @click="refreshPosts">Aceptar</v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                </v-row>
            </template>

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
                        <span v-text="post.price"></span>
                        <span class="float-right"><v-chip
                            :color="color_base"
                            label
                            small
                            v-text="post.category.name"
                            text-color="white"
                            >
                            <v-icon left>mdi-label</v-icon>
                            </v-chip></span><br>
                        <span class="text--primary" v-text="post.description"></span>
                    </v-card-text>

                    <v-card-actions>
                        <div class="grey--text ml-1 caption">
                            {{ post.user.firstname +" "+ post.user.lastname +", "}}
                            {{ post.createdAt | formatAgo }}.
                        </div>
                    <v-spacer></v-spacer>
                    

                    <v-btn icon :color="post.liked ? likedColor : 'none'"
                    @click="like(post._id)">
                        <v-icon>favorite</v-icon>
                    </v-btn>

                    <!-- <v-btn icon @click="comments_dialog = true"> -->
                    <v-btn icon @click="showComments(index, post._id)">
                        <v-icon>fa fa-comment</v-icon>
                    </v-btn>
                    
                    <v-btn icon @click="msg_dialog = true">
                        <v-icon>fa fa-paper-plane</v-icon>
                    </v-btn>
                    </v-card-actions>
                </v-card>
                
                </v-flex>
            </v-layout>

            <template id="comments-dialog">
                    <v-layout justify-center>
                        <v-dialog v-model="comments_dialog" max-width="600px" @click:outside="hideComments">
                        
                        <v-card>
                            <v-card-text>
                            <v-container grid-list-md>
                                <v-layout wrap>
                                    <v-list three-line>
                                        <v-subheader>Comentarios</v-subheader>
                                        <template v-for="(comment, c_index) in comments">
                                            <!-- <v-subheader
                                            v-if="comment.header"
                                            :key="comment.header"
                                            v-text="comment.header"
                                            ></v-subheader> -->

                                            <v-divider
                                            :key="comment.title"
                                            inset
                                            color="orange"
                                            ></v-divider>

                                            <v-list-item
                                            :key="c_index"
                                            >
                                            
                                            <v-list-item-avatar>
                                                <v-img :src="comment.user.image"></v-img>
                                            </v-list-item-avatar>

                                            <v-list-item-content>
                                                <v-list-item-title v-html="comment.user.username"></v-list-item-title>
                                                <v-list-item-subtitle v-html="comment.content"></v-list-item-subtitle>
                                            </v-list-item-content>
                                            </v-list-item>
                                        </template>
                                    </v-list>

                                    <v-flex xs12>
                                        <v-form>
                                            <v-textarea
                                            outlined
                                            name="mgs-body"
                                            label="Escriba su comentario aquí"
                                            value=""
                                            v-model="new_comment"
                                            :color="color_base"
                                            auto-grow
                                            hint="Pulsa enter para enviar"
                                            rows="1"
                                            @keyup="addComment(post.id, post.index)"
                                            ></v-textarea>
                                        </v-form>
                                    </v-flex>

                                </v-layout>
                            </v-container>
                            </v-card-text>
                        </v-card>
                        </v-dialog>
                    </v-layout>
                </template>

            <template id="msg-dialog">
                <v-layout justify-center>
                    <v-dialog v-model="msg_dialog" max-width="600px" @abort="debug">
                    
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
import { mapState } from 'vuex'
import PostService from '@/services/PostService'
import LikeService from '@/services/LikeService'
import CommentService from '@/services/CommentService'
import CategoryService from '@/services/CategoryService'
import Category_FollowsService from '@/services/Category_FollowsService'
import FollowService from '@/services/FollowService'

export default {
    data: () => ({
      posts: [],
      post: {
          id: '',
          index: ''
      },
      comments: [],
      categories: [],
      new_comment: '',
      msg_dialog: false,
      comments_dialog: false,
      dialog_categories: false,
      likedColor: 'red',
    }),
    mounted () {
        this.getPosts()
        this.getCategories()
    },
    computed: {
        ...mapState(['color_base', 'user'])
    },
    methods: {
        debug() {
            console.log(event.target)
        },
        async like(i) {
            const response = await LikeService.like({post: i, user: this.$store.state.user._id})
            this.getPosts()
            // console.log(response.data.result)
        },
        getPosts () {
            this.posts = []
            PostService.fetchPosts().then(response => {
                response.data.posts.forEach((post, index) => {
                    FollowService.getFollower(post.user._id).then(res => {
                        Category_FollowsService.getFollower(post.category._id).then(resp=> {
                            if(res.data.followed || post.user._id == this.user._id || resp.data.followed){
                                LikeService.getLikesByUser(post._id).then(r => {
                                    post.liked = r.data.liked
                                    this.posts.push(post)
                                })
                            }
                        })
                    })
                })
            })
        },
        showComments(index, id) {
            this.comments = []
            this.comments_dialog = true
            this.post.index = index
            this.post.id = id

            CommentService.getComments(id).then(response => {
                response.data.comments.forEach(comment => {
                    this.comments.push(comment)
                })
            })
        },
        hideComments() {
            this.comments = []
        },
        addComment(post, i) {
            if (event.keyCode === 13) {
                CommentService.addComment({
                    post: post,
                    user: this.$store.state.user._id,
                    content: this.new_comment
                })
                this.comments.push({
                    post: post,
                    user: {
                        username: this.$store.state.user.username,
                        image: this.$store.state.user.image
                    },
                    content: this.new_comment
                })
                this.new_comment = ''
            }
        },
        getCategories () {
            CategoryService.fetchCategories().then(response=>{
                response.data.categories.forEach((category, index) => {
                    this.categories.push(category)
                    Category_FollowsService.getFollower(category._id).then(r => {
                        this.categories[index].followed = r.data.followed
                    })
                })
            })
        },
        followCategory(id) {
            Category_FollowsService.followCategory({category: id, user: this.$store.state.user._id}).then(response => {
                this.categories = []
                this.getCategories()
            })
        },
        refreshPosts() {
            this.dialog_categories = false
            this.getPosts()
        }
    },
    // created() {
    //     this.getPosts()
    // },
}
</script>
