import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AnimalTest from '@/components/AnimalTest'
import Breakfast from '@/components/Breakfast'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      meta: {
        title: 'HelloWorld'
      },
      component: HelloWorld
    },
    {
      path: '/at/:from',
      name: 'AnimalTestPage',
      meta: {
        title: 'AnimalTestPage'
      },
      component: AnimalTest
    },
    {
      path: '/bf',
      name: 'breakfast',
      component: Breakfast
    }
  ]
})
