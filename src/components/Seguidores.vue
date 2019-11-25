<template>
    <v-layout column>
        <v-list>
            <template v-for="(item, index) in items">
        
                <v-list-item :key="item.follower.username">
                    <v-list-item-icon v-if="item.follower._id != user._id">
                        <v-btn v-if="!item.follower.followed" x-small class="font-weight-light" @click="follow(item.follower._id)">
                            <v-icon dark left>done</v-icon>Seguir
                        </v-btn>
                        <v-btn v-else x-small block class="font-weight-light white--text" :color="color_base" @click="follow(item.follower._id)">
                            <v-icon dark left>done</v-icon>Seguido
                        </v-btn>
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title right>{{ item.follower.firstname +" "+ item.follower.lastname }}</v-list-item-title>
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
import { mapState } from 'vuex'
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
            this.items = []
            FollowService.getFollowers(this.$route.params.user).then(response => {
                response.data.followers.forEach((follower, index) => {
                    this.items.push(follower)
                    FollowService.getFollower(follower.follower._id).then(r => {
                        this.items[index].follower.followed = r.data.followed
                    })
                })
            })
        },
        GoToProfile(username){
            this.$router.push({ name: 'profile', params: { user: username } })
        },
        follow(id) {
            FollowService.follow({followed: id, follower: this.$store.state.user._id}).then(response => {
                this.getFollowers()
            })
        }
    } 
}
</script>