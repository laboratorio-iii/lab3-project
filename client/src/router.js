import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/notifications',
      name: 'notifications',
      component: () => import('./views/Notifications.vue')
    },
    {
      path: '/chats',
      name: 'chats',
      component: () => import('./views/Chat.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('./views/Profile.vue')
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('./views/Settings.vue')
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('./views/Users.vue')
    },
    {
      path: '/publications',
      name: 'publications',
      component: () => import('./views/Publications.vue')
    },
    {
      path: '/categories',
      name: 'categories',
      component: () => import('./views/Categories.vue')
    },
    {
      path: '/publication/create',
      name: 'publication-create',
      component: () => import('./views/NewPublication.vue')
    },
    {
      path: '/likes',
      name: 'likes',
      component: () => import('./views/Reacciones.vue')
    },
  ]
})
