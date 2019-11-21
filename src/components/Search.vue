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
                            <!-- <v-divider inset :key="index"></v-divider> -->
                            <v-list-item :key="index" @click="debug">
                                <v-list-item-icon>
                                <v-btn x-small class="font-weight-light">
                                    <v-icon dark left>done</v-icon>Seguir
                                </v-btn>
                                </v-list-item-icon>

                                <v-list-item-content>
                                <v-list-item-title v-text="user.username" right></v-list-item-title>
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
                                    v-model="category_value"
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
                                :src="post.img"
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
                                    <span class="text--primary" v-text="post.descripcion"></span>
                                </v-card-text>

                                <v-card-actions>
                                <v-spacer></v-spacer>

                                <v-btn icon
                                :color="post.color"
                                @click="like(index)">
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

        </v-container>
    </v-content>
</template>

<script>
import {mapState} from 'vuex'
import UserService from '@/services/UserService'
import CityService from '@/services/CityService'

export default {
    data: () => ({
        tab: null,
        items: [
            'Usuarios', 'Publicaciones',
        ],
        search: '',
        users: [
        //   { last: true, title: 'Jason Oner', avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg', },
        //   { title: 'Travis Howard', avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg' },
        //   { title: 'Ali Connors', avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg' },
        //   { title: 'Cindy Baker', avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg' },
        ],
        city: '',
        cities: [],
        posts: [
        // { title: 'Pre-fab homes', img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        // descripcion: 'Lorem ipsum dolor sit amet consectetur adipiscing elit commodo, taciti vulputate at praesent eu aliquam pulvinar.',
        // price: 20, liked: true, xsflex: 12, mdflex: 6, color: '' },
        // { title: 'Favorite road trips', img: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
        // descripcion: 'Lorem ipsum dolor sit amet consectetur, adipiscing elit conubia mi eu accumsan, aliquet nascetur pellentesque dictumst.',
        // price: 60, liked: false, xsflex: 12, mdflex: 6, color: '' },
        // { title: 'Best airlines', img: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
        // descripcion: 'Lorem ipsum dolor sit amet consectetur adipiscing elit urna, euismod sagittis metus sapien facilisi tortor habitasse.',
        // price: 40, liked: false, xsflex: 12, mdflex: 6, color: '' },
        // { title: 'Lorem ipsum dolor.', img: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
        // descripcion: 'Lorem ipsum dolor sit amet consectetur adipiscing elit nec, aptent praesent donec per lacus fringilla varius.',
        // price: 30, liked: false, xsflex: 12, mdflex: 6, color: '' },
      ],
      categories: ['Hogar', 'Teconología',],
      category_value: ['Hogar', 'Teconología',],
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
    mounted() {
        this.getCities()
    },
    computed: {
        ...mapState(['color_base'])
    },
    methods: {
        debug() {
            console.log('debug!')
        },
        like(i) {
            this.posts[i].liked ? [this.posts[i].color = 'none', this.posts[i].liked = false] :
             [this.posts[i].color = this.likedColor, this.posts[i].liked = true]
        },
        getCities () {
            CityService.fetchCities().then(response => {
                response.data.cities.forEach((city, index) => {
                    this.cities.push(city.name)
                })
            })
        },
        // searchUser(input, cities) {
        //     UserService.searchUser({input, cities}).then(response => {
        //         response.data.users.forEach(user => {
        //             console.log(user)
        //             this.users.push(user)
        //         })
        //     })
        // },
        searchUser(input, cities) {
            if(cities == ''){
                UserService.searchUser({input}).then(response => {
                    response.data.users.forEach(user => {
                        console.log(user)
                        this.users.push(user)
                    })
                })
            }else{
                cities.forEach(city=>{
                    UserService.searchUserByCity({input, city}).then(response => {
                        response.data.users.forEach(user => {
                            console.log(user)
                            this.users.push(user)
                        })
                    })
                })
            }
        },
        buscar() {
            if(this.tab == 0){
                this.users = []
                this.searchUser(this.search, this.city)
            }else{
                console.log('Buscar post: ', this.search)
            }
        }
    },
    created() {
        this.posts.forEach(element => {
            element.liked ? element.color = this.likedColor : element.color = 'none'
        });
    },
}
</script>