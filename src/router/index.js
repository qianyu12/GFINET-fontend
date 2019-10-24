import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Test from '@/components/Test'
import LearnElm from '@/pages/LearnElm'
import RegisterAndLogin from '@/pages/RegisterAndLogin'
import RegisterFirstPage from '@/pages/RegisterFirstPage'
import RegisterSecondPage from '@/pages/RegisterSecondPage'
import TraderSys from '@/pages/TraderSys'
import SalesSys from '@/pages/SalesSys'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    }, {
      path: '/test',
      name: 'Test',
      component: Test
    }, {
      path: '/learnElm',
      name: 'learnElm',
      component: LearnElm,
      children: [{
        path: 'hello',
        components: {
          a: HelloWorld
        }
      }, {
        path: 'test2',
        components: {
          a: Test
        }
      }]
    }, {
      path: '/registerAndLogin',
      component: RegisterAndLogin,
      children: [{
        path: 'firstPage',
        components: {
          content: RegisterFirstPage
        },
        meta: {
          title: 'Applt for an Account'
        }
      }, {
        path: 'secondPage',
        components: {
          content: RegisterSecondPage
        },
        meta: {
          title: 'Applt for an Account'
        }
      }]
    }, {
      path: '/index',
      redirect: '/registerAndLogin/firstPage',
      meta: {
        title: 'Applt for an Account'
      }
    }, {
      path: '/traderSys',
      name: 'TraderSys',
      component: TraderSys,
      meta: {
        title: 'trader system'
      }
    }, {
      path: '/salesSys',
      name: 'SalesSys',
      component: SalesSys,
      meta: {
        title: 'sale system'
      }
    }
  ]
})
