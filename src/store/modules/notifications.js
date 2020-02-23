import { getlist } from '../../api/notifications'

const state = {
  list: []
}

const mutations = {
  SET_LIST: (state, list) => {
    state.list = list
  }
}

const actions = {
  getlist ({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      getlist(userInfo).then(response => {
        commit('SET_LIST', response.data.list)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
  readAll ({ commit }) {
    const list = state.list.map(item => {
      item.hasRead = true
      return item
    })
    commit('SET_LIST', list)
  },
  readById ({ commit }, id) {
    const list = state.list.map(item => {
      if (item.id === id) {
        item.hasRead = true
      }
      return item
    })
    commit('SET_LIST', list)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
