import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Films from '@/components/Films'
import FilmCreate from '@/components/FilmCreate'
import FilmDetails from '@/components/FilmDetails'
import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Register'
import store from '../store' // your vuex store 

const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/films',
      name: 'Films',
      component: Films
    },
    
    {
      path: '/films/create',
      name: 'FilmCreate',
      component: FilmCreate,
      beforeEnter: ifAuthenticated
    },
    {
      path: '/films/:slug',
      name: 'FilmDetails',
      component: FilmDetails
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Register',
      component: Register
    },


  ]
})
