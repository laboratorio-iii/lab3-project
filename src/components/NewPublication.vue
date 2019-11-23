<template>
    <v-content>
        <v-container grid-list-xs>
            <v-layout row wrap align-center justify-center>
                <v-flex>
                    <v-card class="mx-auto" max-width="400">
                        <v-img class="white--text" height="150px" src="https://cdn.vuetifyjs.com/images/cards/plane.jpg">
                            <!-- <v-card-title class="align-end fill-height">Registrar cuenta</v-card-title> -->
                        </v-img>

                        <v-card-text>
                            <v-form @submit="addPost">
                                <v-layout row wrap>
                                    <v-flex xs12>
                                        <v-text-field :color="color_base"
                                            
                                            label="Titulo de la publicación"
                                            id="titulo"
                                            v-model="title"
                                        ></v-text-field>
                                    </v-flex>

                                    <v-flex xs12>
                                        <v-file-input
                                            label="Imagen de la publicacón"
                                            filled
                                            prepend-icon="camera_alt"
                                            :color="color_base"
                                        ></v-file-input>
                                    </v-flex>

                                    <v-flex xs12>
                                        <v-textarea
                                            outlined
                                            
                                            label="Descripción de la publicación."
                                            value=""
                                            :color="color_base"
                                            v-model="description"
                                        ></v-textarea>
                                    </v-flex>

                                    <v-flex xs12>
                                        <v-select :color="color_base"
                                            v-model="category"
                                            :items="categories"
                                            menu-props="auto"
                                            label="Categoría"
                                            hide-details
                                            prepend-icon="tag"
                                            single-line
                                        ></v-select>
                                    </v-flex>
                                        
                                    <v-flex xs12>
                                        <v-text-field :color="color_base"

                                            label="Precio"
                                            id="precio"
                                            v-model="price"
                                            prepend-icon="money"
                                        ></v-text-field>
                                    </v-flex>
                                    
                                </v-layout>
                                
                                <v-btn type="submit" block class="ma-a" outlined :color="color_base">
                                    <v-icon left>share</v-icon>Publicar
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
import PostService from '@/services/PostService'
import CategoryService from '@/services/CategoryService'

export default {
    data: () => ({
        title: '',
        description: '',
        category: '',
        categories: [],
        price: ''
    }),
    mounted () {
        this.getCategories()
    },
    computed: {
        ...mapState(['color_base', 'user'])
    },
    methods: {
        getCategories () {
            CategoryService.fetchCategories().then(response=>{
                response.data.categories.forEach((category, index) => {
                    this.categories.push(category.name)
                })
            })
        },
        async addPost (e) {
            e.preventDefault()
            await PostService.addPost({
                user: this.$store.state.user._id,
                title: this.title,
                description: this.description,
                category: this.category,
                image: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
                price: this.price
            })
            this.$router.push({ name: 'home' })
        }
    }
}
</script>