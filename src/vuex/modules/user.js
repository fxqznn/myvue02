const state = {
  uname: null,
  role: null
};
const getters = {
  getUname: state => {
    return state.uname;
  },
  getRole: state => {
    return state.role;
  }
};
const actions = {
  setUser: function (context, uname) {
    context.commit("setUname", uname);
  },
  setPerm: function (context, role) {
    context.commit("setRole", role);
  }
};
const mutations = {
  setUname: function (state, uname) {
    state.uname = uname;//将外部参数赋值给state中的数据
  },
  setRole: function (state, role) {
    state.role = role;
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
