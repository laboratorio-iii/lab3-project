<template>
    <v-layout column>
        <v-list>
            <template v-for="(item, index) in items">
        
                <v-list-item :key="item.follower.username" @click="debug">
                    <v-list-item-icon>
                    <v-btn v-if="item.follower._id != user._id" x-small class="font-weight-light">
                        <v-icon dark left>done</v-icon>Seguir
                    </v-btn>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title right>{{ item.follower.firstname +" "+ item.follower.lastname}}</v-list-item-title>
                        <span class="grey--text caption" v-text="item.follower.username"></span>
                    </v-list-item-content>

                    <v-list-item-avatar>
                    <v-img :src="item.follower.image"></v-img>
                    </v-list-item-avatar>
                </v-list-item>
                <v-divider inset :key="index"></v-divider>

            </template>
        </v-list>
    </v-layout>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import FollowService from '@/services/FollowService'

export default {
    data: () => ({
        items: [],
    }),
    mounted(){
        this.getFollowers()
    },
    computed: {
        ...mapState(['color_base', 'user']),
    },
    methods: {
        debug() {
            console.log(event.target)
        },
        getFollowers() {
            FollowService.getFollowers(this.$route.params.user).then(response => {
                response.data.followers.forEach((follower, index) => {
                    this.items.push(follower)
                    FollowService.getFollower(follower._id).then(r => {
                        this.items[index].follower.followed = r.data.followed
                    })
                })
            })
        }
    } 
}
</script>