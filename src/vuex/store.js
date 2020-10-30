import Vue from "vue";
//引入vuex，类似vue-router
import Vuex from "vuex";
import student from "./modules/student";
import user from "./modules/user"

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    student,
    user
  }
});
export default store;
