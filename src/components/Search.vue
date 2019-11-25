<template>
    <v-content>
        <v-container grid-list-xs>
            <v-layout row wrap>
                <v-flex xs12>
                    <v-text-field
                        append-icon="search"
                        label="Buscar"
                        single-line
                        hide-details
                        :color="color_base"
                        v-model="search"
                        @keyup="buscar()"
                    ></v-text-field>
                </v-flex>
            </v-layout>
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
                    <div v-if="item == 'Usuarios'">
                        <v-layout row wrap align-center>
                            <v-flex x12>
                                <v-select
                                    v-model="city"
                                    :items="cities"
                                    attach
                                    chips
                                    label="Ciudades"
                                    multiple
                                    :color="color_base"
                                ></v-select>
                            </v-flex>
                        </v-layout>
                        <template v-for="(user, index) in users">
                            <v-list-item :key="index" @click="GoToProfile(user.username)">
                                <v-list-item-icon>
                                    <v-btn v-if="!user.followed" x-small block class="font-weight-light" @click="follow(user._id)">
                                        <v-icon dark left>done</v-icon>Seguir
                                    </v-btn>

                                    <v-btn v-else x-small block class="font-weight-light white--text" :color="color_base" @click="follow(user._id)">
                                        <v-icon dark left>done</v-icon>Seguido
                                    </v-btn>
                                </v-list-item-icon>

                                <v-list-item-content>
                                <v-list-item-title right>{{ user.firstname +" "+ user.lastname }}</v-list-item-title>
                                <span class="grey--text caption" v-text="user.username"></span>
                                </v-list-item-content>

                                <v-list-item-avatar>
                                <v-img :src="user.image"></v-img>
                                </v-list-item-avatar>
                            </v-list-item>
                            <v-divider inset :key="user._id"></v-divider>
                        </template>
                    </div>

                    <div v-if="item == 'Publicaciones'">
                        <v-layout row wrap align-center>
                            <v-flex x12>
                                <v-select
                                    v-model="category"
                                    :items="categories"
                                    attach
                                    chips
                                    label="Categorias"
                                    multiple
                                    :color="color_base"
                                ></v-select>
                            </v-flex>
                        </v-layout>
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
                                            </v-chip></span>
                                        <span v-if="post.shared" class="float-right mr-3"><v-chip
                                            color="blue"
                                            label
                                            small
                                            text-color="white"
                                            >{{"Autor: " + post.author.firstname}}
                                            <v-icon left>mdi-label</v-icon>
                                        </v-chip></span><br>
                                        <span class="text--primary" v-text="post.description"></span>
                                    </v-card-text>

                                    <v-card-actions>
                                        <div class="grey--text ml-1 caption">
                                            <v-icon v-if="post.shared">fa fa-retweet</v-icon>
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
                                    
                                    <v-btn v-if="post.user._id != user._id" icon @click="sharePost(post)">
                                        <v-icon>fa fa-share-alt</v-icon>
                                    </v-btn>
                                    </v-card-actions>
                                </v-card>
                                
                                </v-flex>
                        </v-layout>
                    </div>
                    
                </v-tab-item>
            </v-tabs-items>

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

        </v-container>
    </v-content>
</template>

<script>
import { mapState } from 'vuex'
import UserService from '@/services/UserService'
import PostService from '@/services/PostService'
import LikeService from '@/services/LikeService'
import CommentService from '@/services/CommentService'
import FollowService from '@/services/FollowService'
import CityService from '@/services/CityService'
import CategoryService from '@/services/CategoryService'

export default {
    data: () => ({
        tab: null,
        items: [
            'Usuarios', 'Publicaciones',
        ],
        search: '',
        users: [],
        city: '',
        cities: [],
        posts: [],
        post: {
            id: '',
            index: ''
        },
        category: '',
        categories: [],
        comments: [],
        new_comment: '',
        msg_dialog: false,
        comments_dialog: false,
        likedColor: 'red',
    }),
    mounted() {
        this.getCities(),
        this.getCategories()
    },
    computed: {
        ...mapState(['color_base','user'])
    },
    methods: {
        debug() {
            console.log('debug!')
        },
        async like(i) {
            const response = await LikeService.like({post: i, user: this.$store.state.user._id})
            this.searchPost(this.search, this.categories)
            // console.log(response.data.result)
        },
        getCities () {
            CityService.fetchCities().then(response => {
                response.data.cities.forEach((city, index) => {
                    this.cities.push(city.name)
                })
            })
        },
        getCategories () {
            CategoryService.fetchCategories().then(response => {
                response.data.categories.forEach((category, index) => {
                    this.categories.push(category.name)
                })
            })
        },
        searchUser(input, cities) {
            this.users = []
            if(this.search != ''){
                if(cities == ''){
                    UserService.searchUser({input}).then(response => {
                        response.data.users.forEach((user, index) => {
                            if(user._id != this.$store.state.user._id){
                                this.users.push(user)
                                FollowService.getFollower(user._id).then(r => {
                                    this.users[index].followed = r.data.followed
                                })
                            }
                        })
                    })
                }else{
                    cities.forEach(city=>{
                        UserService.searchUserByCity({input, city}).then(response => {
                            response.data.users.forEach((user, index) => {
                                if(user._id != this.$store.state.user._id){
                                    this.users.push(user)
                                    FollowService.getFollower(user._id).then(r => {
                                        this.users[index].followed = r.data.followed
                                    })
                                }
                            })
                        })
                    })
                }
            }
        },
        searchPost(input, categories) {
            this.posts = []
            if(this.search != ''){
                if(categories == ''){
                    PostService.searchPost({input}).then(response => {
                        response.data.posts.forEach((post, index) => {
                            this.posts.push(post)
                            LikeService.getLikesByUser(post._id).then(r => {
                                this.posts[index].liked = r.data.liked
                            })
                        })
                    })
                }else{
                    categories.forEach(category=>{
                        PostService.searchPostByCategory({input, category}).then(response => {
                            response.data.posts.forEach((post, index) => {
                                this.posts.push(post)
                                LikeService.getLikesByUser(post._id).then(r => {
                                    this.posts[index].liked = r.data.liked
                                })
                            })
                        })
                    })
                }
            }
        },
        buscar() {
            if(this.tab == 0){
                this.users = []
                this.searchUser(this.search, this.city)
            }else{
                this.posts = []
                this.searchPost(this.search, this.category)
            }
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
        GoToProfile(username){
            this.$router.push({ name: 'profile', params: { user: username } })
        },
        follow(id) {
            FollowService.follow({followed: id, follower: this.$store.state.user._id}).then(response => {
                // console.log(response.data.result)
            })
        },
        sharePost(post) {
            event.preventDefault()
            PostService.addPost({
                user: this.$store.state.user._id,
                title: post.title,
                description: post.description,
                category: post.category.name,
                image: post.image,
                price: post.price,
                shared: true,
                author: post.user._id
            }).then(response => {
                this.$router.push({ name: 'home' })
            })
        }
    },
    // created() {
    //     this.posts.forEach(element => {
    //         element.liked ? element.color = this.likedColor : element.color = 'none'
    //     });
    // },
}
</script>