import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import user from './modules/user'
import notifications from './modules/notifications'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    notifications
  },
  getters
})

export default store
