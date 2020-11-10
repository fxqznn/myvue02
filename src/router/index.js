import Vue from 'vue'
import Router from 'vue-router'
import mainFrame from '@/components/mainFrame';
import login from '@/components/login';
import managerEdge from "../components/managerEdge";
import changePass from '@/components/changePass';
import CourseScoreList from '@/components/CourseScoreList';
import userManage from '@/components/userManage';
import StudentList from '@/components/StudentList';
import studentMsg from '@/components/studentMsg';
import empManage from '@/components/empManage';
import courseManage from '@/components/courseManage';
import studentManage from '@/components/studentManage';
import termManage from '@/components/termManage';
import termCourse from '@/components/termCourse'
import menuManage from '@/components/menuManage';
import deptManage from '@/components/deptManage'


import axios from 'axios'
import managerEdit from "../components/managerEdit";
import StudentDetails from "../components/StudentDetails";
import AbilitiesScoreList from "../components/AbilitiesScoreList";
import abilityChange from "../components/abilityChange";


axios.defaults.baseURL = 'http://localhost:8081/';
Vue.prototype.axios = axios;

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
        {path: '/managerEdit/:eid/:ename', name: 'managerEdit', component: managerEdit},
        {path: '/managerEdge', name: 'managerEdge', component: managerEdge},
        {path:'changePass',name:'changePass',component:changePass},
        {path: '/abilityChange', name: 'abilityChange', component: abilityChange},
        {path:'/userManage',name:'userManage',component:userManage},
        {path:'/empManage',name:'empManage',component:empManage},
        {path:'/studentManage',name:'studentManage',component:studentManage},
        {path:'/courseManage',name:'courseManage',component:courseManage},
        {path:'/termManage',name:'termManage',component:termManage},
        {path:'/menuManage',name:'menuManage',component:menuManage},
        {path:'/deptManage',name:'deptManage',component:deptManage},
        {path: '/StudentList', name: 'StudentList', component: StudentList},
        {path: '/studentMsg/:sid/:tid', name: 'studentMsg', component: studentMsg},
        {path: '/termCourse', name: 'termCourse', component: termCourse},
        {path:'/StudentDetails', name:'StudentDetails', component:StudentDetails,
          children: [
            {path:'/CourseScoreList',name:'CourseScoreList',component:CourseScoreList},
            {path:'/AbilitiesScoreList/:type',name:'AbilitiesScoreList',component:AbilitiesScoreList}
          ]}
      ]
    }
  ]
})
