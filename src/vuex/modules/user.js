const state = {
  uid: null,
  uname: null,
  role: null
};
const getters = {
  getUid: state => {
    return state.uid
  },
  getUname: state => {
    return state.uname;
  },
  roleGetter: state => {
    return state.role;
  }
};
const actions = {
  setId: function (context, uid) {
    context.commit("setUid", uid);
  },
  setUser: function (context, uname) {
    context.commit("setUname", uname);
  },
  setPerm: function (context, role) {
    context.commit("setRole", role);
  }
};
const mutations = {
  setUid: function (state, uid) {
    state.uid = uid;
  },
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
