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
import ElementTestPage from '@/components/element/Test'
import TestPage from '@/components/TestPage'
import VideoM3u8 from '@/components/media/VideoM3u8'
import IView from '@/components/iview/Index'
import _404 from '@/components/error/404'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  // mode: 'history',
  routes: [
    { path: '/index', redirect: to => {
      console.log(to)
      // 方法接收 目标路由 作为参数
      // return 重定向的 字符串路径/路径对象
      //   return '/'
        return {name: 'HelloWorld'}
    }},
    {
      path: '/',
      name: 'HelloWorld',
      meta: {
        title: 'HelloWorld'
      },
      component: HelloWorld,
      alias: '/hello'
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
        },
        {
          path: 'testPage', name: 'testPage', component: ElementTestPage
        }
      ]
    },
    {
      path: '/ele/testPage', name: 'elementTestPage', component: ElementTestPage
    },
    {path: '/iview', name: 'iview-index', component: IView},
    {path: '/media', name: 'media', component: VideoM3u8},
    {path: '/tp', name: 'testPage', component: TestPage},
    {path: '*', name: '_404', component: _404}
  ]
})
