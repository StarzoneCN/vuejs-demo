import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AnimalTest from '@/components/AnimalTest'
import Breakfast from '@/components/Breakfast'
import Foods2Breakfast from '@/components/Foods2Breakfast'
import Potato from '@/components/foods/Potato'
import Tomato from '@/components/foods/Tomato'
import BreakfastFrame from '@/components/BreakfastFrame'
import ElementIndex from '@/components/element/ElementIndex'
import ElementBasic from '@/components/element/ElementBasic'
import ElementBasic2 from '@/components/element/ElementBasic'
import TestPage from '@/components/TestPage'
import VideoM3u8 from '@/components/media/VideoM3u8'
import _404 from '@/components/error/404'
import Index from '@/components/Index'

Vue.use(Router)

export default new Router({
  // mode: 'hash',
  mode: 'history',
  routes: [
    { path: '/index', redirect: to => {
      // 方法接收 目标路由 作为参数
      // return 重定向的 字符串路径/路径对象
      //   return '/'
        return {name: 'Index'}
    }},
    {
      path: '',
      name: 'Index',
      meta: {
        title: 'Index'
      },
      component: Index,
      alias: '/index'
    },
    {
      path: '/hello',
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
    },
    {
      path: '/el/:showFlag', name: 'element', component: ElementIndex, props: true, children: [
        {
          path: '', components: {
            default: ElementBasic,
            basic2: ElementBasic2
          }
        },
        {
          path: 'basic', name: 'basic', component: ElementBasic
        }
      ]
    },
    {path: '/media', name: 'media', component: VideoM3u8},
    {path: '/tp', name: 'testPage', component: TestPage},
    {path: '*', name: '_404', component: _404}
  ]
})
