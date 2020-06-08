import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Films from '@/components/Films'
import FilmCreate from '@/components/FilmCreate'
import FilmDetails from '@/components/FilmDetails'


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
      path: '/film/:slug',
      name: 'FilmDetails',
      component: FilmDetails
    },
    {
      path: '/film/create',
      name: 'FilmCreate',
      component: FilmCreate
    },
  ]
})
