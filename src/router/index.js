import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AnimalTest from '@/components/AnimalTest'
import Breakfast from '@/components/Breakfast'
import Foods2Breakfast from '@/components/Foods2Breakfast'
import Potato from '@/components/foods/Potato'
import Tomato from '@/components/foods/Tomato'
import BreakfastFrame from '@/components/BreakfastFrame'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      meta: {
        title: 'HelloWorld'
      },
      component: HelloWorld
    }, {
      path: '/at/:from',
      name: 'AnimalTestPage',
      meta: {
        title: 'AnimalTestPage'
      },
      component: AnimalTest
    }, {
      path: '/bf',
      name: 'breakfast',
      component: Breakfast,
      props: {default: true, datee: 10, time: '07:30'}
    }, {
      path: '/bf/foods',
      name: 'foods2Breakfast',
      component: Foods2Breakfast,
      alias: '/bf/foo'
    }, {
      path: '/bf/food',
      redirect: '/bf/foods'
    }, {
      path: '/bf/frame',
      name: 'foods2Breakfast',
      component: BreakfastFrame,
      children: [
        {
          path: '',
          components: {
            potato: Potato,
            tomato: Tomato
          }
        }
      ]
    }
  ]
})
