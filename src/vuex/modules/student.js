const state = {
  sid: null,
  imgpath: null
};
const getters = {
  getSid: state => {
    return state.sid;
  },
  getPath: state => {
    return state.imgpath;
  }
};
const actions = {
  setStudent: function (context, sid) {
    context.commit("setSid", sid);
  },
  setImg: function (context, path) {
    context.commit("setPath", path)
  }
};
const mutations = {
  setSid: function (state, sid) {
    state.sid = sid;
  },
  setPath: function (state, path) {
    state.imgpath = path;//将外部参数赋值给state中的数据
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
