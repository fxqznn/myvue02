import Vue from 'vue'
import Router from 'vue-router'
import mainFrame from '@/components/mainFrame';
import login from '@/components/login'
import managerEdge from "../components/managerEdge"
import changePass from '@/components/changePass'


import axios from 'axios'
import empScoreList from "../components/empScoreList";

axios.defaults.baseURL = 'http://localhost:8081/'
Vue.prototype.axios = axios

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "login",
      component: login
    },
    {
      path: '/mainFrame',
      name: 'mainFrame',
      component: mainFrame,
      children: [
        {
          path: 'changePass',
          name: 'changePass',
          component: changePass
        }
      ]
    },
    {
      path: '/managerEdge',
      name: 'managerEdge',
      component: managerEdge
    }, {
      path: '/empScoreList',
      name: 'empScoreList',
      component: empScoreList
    }
  ]
})
