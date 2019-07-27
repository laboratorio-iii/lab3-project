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

                    <v-btn icon>
                        <v-icon>fa fa-comment</v-icon>
                    </v-btn>

                    <v-btn icon>
                        <v-icon>fa fa-paper-plane</v-icon>
                    </v-btn>
                    </v-card-actions>
                </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-content>
</template>

<script>
export default {
    // <td :class="{tareaRealizada: tarea.hecho}">
    data: () => ({
      posts: [
        { title: 'Pre-fab homes', img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        descripcion: 'Lorem ipsum dolor sit amet consectetur adipiscing elit commodo, taciti vulputate at praesent eu aliquam pulvinar.',
        price: 20, liked: true, xsflex: 12, mdflex: 6, color: '' },
        { title: 'Favorite road trips', img: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
        descripcion: 'Lorem ipsum dolor sit amet consectetur, adipiscing elit conubia mi eu accumsan, aliquet nascetur pellentesque dictumst.',
        price: 60, liked: false, xsflex: 12, mdflex: 6, color: '' },
        { title: 'Best airlines', img: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
        descripcion: 'Lorem ipsum dolor sit amet consectetur adipiscing elit urna, euismod sagittis metus sapien facilisi tortor habitasse.',
        price: 40, liked: false, xsflex: 12, mdflex: 6, color: '' },
        { title: 'Lorem ipsum dolor.', img: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
        descripcion: 'Lorem ipsum dolor sit amet consectetur adipiscing elit nec, aptent praesent donec per lacus fringilla varius.',
        price: 30, liked: false, xsflex: 12, mdflex: 6, color: '' },
      ],
    }),
    methods: {
        like(i) {
            this.posts[i].liked ? [this.posts[i].color = 'none', this.posts[i].liked = false] :
             [this.posts[i].color = 'primary', this.posts[i].liked = true]
        }
    },
    created() {
        this.posts.forEach(element => {
            element.liked ? element.color = 'primary' : element.color = 'none'
        });
    
  }
}
</script>
