<template>
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

                <v-btn icon @click="showComments(index, post._id)">
                    <v-icon>fa fa-comment</v-icon>
                </v-btn>
                
                <v-btn icon @click="msg_dialog = true">
                    <v-icon>fa fa-paper-plane</v-icon>
                </v-btn>
                </v-card-actions>
            </v-card>
            
        </v-flex>
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
    </v-layout>
    
</template>

<script>
import { mapState } from 'vuex'
import PostService from '@/services/PostService'
import LikeService from '@/services/LikeService'
import CommentService from '@/services/CommentService'

export default {
    data: () => ({
        posts: [],
        post: {
            id: '',
            index: ''
        },
        comments: [],
        new_comment: '',
        msg_dialog: false,
        comments_dialog: false,
        likedColor: 'red'
    }),
    mounted() {
        this.getPosts()
    }, 
    computed: {
        ...mapState(['color_base'])
    },
    methods: {
        async like(i) {
            const response = await LikeService.like({post: i, user: this.$store.state.user._id})
            this.getPosts()
            // console.log(response.data.result)
        },
        getPosts() {
            PostService.getPostsByUser(this.$route.params.user).then(response => {
                this.posts = response.data.posts
                response.data.posts.forEach((post, index) => {
                    LikeService.getLikesByUser(post._id).then(r => {
                        this.posts[index].liked = r.data.liked
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
        }
    }
}
</script>