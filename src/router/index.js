import Vue from 'vue'
import Router from 'vue-router'
import mainFrame from '@/components/mainFrame';
import login from '@/components/login'
import managerEdge from "../components/managerEdge";
import changePass from '@/components/changePass';
import userManage from '@/components/userManage'
import StudentList from '@/components/StudentList';
import studentMsg from '@/components/studentMsg'


import axios from 'axios'
import managerEdit from "../components/managerEdit";


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
      children:[
        {path:'changePass',name:'changePass',component:changePass},
        {path:'userManage',name:'userManage',component:userManage}
      ]
    },
    {
      path: '/managerEdge',
      name: 'managerEdge',
      component: managerEdge
    },
    {
      path: '/StudentList',
      name: 'StudentList',
      component: StudentList
    },
    {
      path: '/managerEdit/:sid',
      name: 'managerEdit',
      component: managerEdit
    },
    {
      path: '/studentMsg',
      name: 'studentMsg',
      component: studentMsg
    }
  ]
})
