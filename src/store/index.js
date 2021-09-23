import { createStore } from 'vuex'

export default createStore({
  state: {
    // 登录状态
    isLogin: false,
    // 用户头像
    userImg: "http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50"
  },
  mutations: {
    updateIsLogin(state, data) {
      state.isLogin = data
    },
    Img(state, data) {
      state.userImg = data
    }
  },
  actions: {
  },
  modules: {
  }
})
