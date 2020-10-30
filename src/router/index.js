import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import mainFrame from '@/components/mainFrame'
import changePass from '@/components/changePass'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/mainFrame',
      name: 'mainFrame',
      component: mainFrame
    },
    {
      path:'/changePass',
      name: 'changePass',
      component: changePass
    }
  ]
})
