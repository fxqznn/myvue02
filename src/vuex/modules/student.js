const state = {
  sid: null,
  pic: null
};
const getters = {
  getSid: state => {
    return state.sid;
  },
  getPath: state => {
    return state.pic;
  }
};
const actions = {
  setStudent: function (context, sid) {
    context.commit("setSid", sid);
  },
  setImg: function (context, pic) {
    context.commit("setPath", pic)
  }
};
const mutations = {
  setSid: function (state, sid) {
    state.sid = sid;
  },
  setPic: function (state, pic) {
    state.pic = pic;//将外部参数赋值给state中的数据
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
