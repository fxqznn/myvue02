import Vue from "vue";
//引入vuex，类似vue-router
import Vuex from "vuex";
Vue.use(Vuex);
const store = new Vuex.Store({
  state:{//状态，要存储的数据
    count:0,
    uname:null
  },
  mutations:{
    //在该属性中，定义方法，set方法，用于给数据赋值
    setUname:function (state,uname) {
      
      state.uname = uname;//将外部参数赋值给uname
    }
  },
  actions:{
    //作用同mutations,用于提供方法给数据赋值
    //调用mutations中的方法，类似于dao和service的关系
    //最大优点，支持异步操作
    //第一个参数为mutations对象
    //第二个参数为传递进来的数据
    setUser:function (context,uname) {
      context.commit("setUname",uname);
    }
  },
  getters:{
    name:state => {
      return state.uname;
    }
  }

})
export default  store;


