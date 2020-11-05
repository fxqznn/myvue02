import Vue from 'vue'
import Router from 'vue-router'
import mainFrame from '@/components/mainFrame';
import login from '@/components/login'
import managerEdge from "../components/managerEdge";
import changePass from '@/components/changePass';
import userManage from '@/components/userManage'
import StudentList from '@/components/StudentList';
import studentMsg from '@/components/studentMsg'
import empManage from '@/components/empManage'
import courseManage from '@/components/courseManage'
import studentManage from '@/components/studentManage'


import axios from 'axios'
import managerEdit from "../components/managerEdit";


axios.defaults.baseURL = 'http://localhost:8081/'
Vue.prototype.axios = axios

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "courseManage",
      component: courseManage
    },
    {
      path: '/mainFrame',
      name: 'mainFrame',
      component: mainFrame,
      children:[
        {path:'changePass',name:'changePass',component:changePass},
        {path:'userManage',name:'userManage',component:userManage},
        {path:'empManage',name:'empManage',component:empManage},
        {path:'studentManage',name:'studentManage',component:studentManage},
        {path:'managerEdit/:sid',name:'managerEdit',component:managerEdit},
        {path: 'StudentList', name: 'StudentList', component: StudentList},
        {path: 'studentMsg/:sid', name: 'studentMsg', component: studentMsg}
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
      path: '/managerEdit/:eid',
      name: 'managerEdit',
      component: managerEdit
    },
    {
      path: '/studentMsg/:sid',
      name: 'studentMsg',
      component: studentMsg
    }
  ]
})
