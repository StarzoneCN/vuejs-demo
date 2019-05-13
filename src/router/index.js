import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import HelloServerPage from '@/components/HelloServerPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/helloServerPage',
      name: 'HelloServerPage',
      component: HelloServerPage
    }
  ],
  base: '/vueDemo/'
})
