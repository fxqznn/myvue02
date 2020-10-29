import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import login from '@/components/login'
import Top from '@/components/Top'
import managerEdge from "../components/managerEdge";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: login
    },
    {
      path: '/HelloWorld',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/Top',
      name: 'Top',
      component: Top
    },
    {
      path: '/managerEdge',
      name: 'managerEdge',
      component:managerEdge
    }
  ]
})
