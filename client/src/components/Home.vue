<template>
    <v-content>
        <v-container grid-list-md>
            <v-layout
                wrap
            >
                <v-flex
                v-for="post in posts"
                :key="post.title"
                v-bind="{ [`xs${post.flex}`]: true }"
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

                    <v-btn icon>
                        <v-icon>favorite</v-icon>
                    </v-btn>

                    <v-btn icon>
                        <v-icon>bookmark</v-icon>
                    </v-btn>

                    <v-btn icon>
                        <v-icon>share</v-icon>
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
    data: () => ({
      posts: [
        { title: 'Pre-fab homes', img: 'https://cdn.vuetifyjs.com/images/cards/house.jpg',
        descripcion: 'Lorem ipsum dolor sit amet consectetur adipiscing elit commodo, taciti vulputate at praesent eu aliquam pulvinar.',
        price: 20, flex: 12 },
        { title: 'Favorite road trips', img: 'https://cdn.vuetifyjs.com/images/cards/road.jpg',
        descripcion: 'Lorem ipsum dolor sit amet consectetur, adipiscing elit conubia mi eu accumsan, aliquet nascetur pellentesque dictumst.',
        price: 60, flex: 12 },
        { title: 'Best airlines', img: 'https://cdn.vuetifyjs.com/images/cards/plane.jpg',
        descripcion: 'Lorem ipsum dolor sit amet consectetur adipiscing elit urna, euismod sagittis metus sapien facilisi tortor habitasse.',
        price: 40, flex: 12 },
        { title: 'Lorem ipsum dolor.', img: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg',
        descripcion: 'Lorem ipsum dolor sit amet consectetur adipiscing elit nec, aptent praesent donec per lacus fringilla varius.',
        price: 30, flex: 12 },
      ],
    }),
}
</script>