import { login } from '../../api/user'
import { getToken, setToken, getAvatar, setAvatar, removeAvatar, removeToken, getRoot, setRoot, setName, getName, removeName } from '../../utils/auth'

const getDefaultState = () => {
  return {
    token: getToken(),
    name: getName(),
    avatar: getAvatar() || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
    root: getRoot()
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROOT: (state, root) => {
    state.root = root
  }

}

const actions = {
  // user login
  login ({ commit }, userInfo) {
    userInfo.username = userInfo.username.trim()
    return new Promise((resolve, reject) => {
      login(userInfo).then(response => {
        commit('RESET_STATE')
        const { data } = response
        commit('SET_TOKEN', data.authToken)
        commit('SET_NAME', userInfo.username)
        commit('SET_ROOT', userInfo.root)
        setName(userInfo.username)
        setRoot(userInfo.root)
        setToken(data.authToken)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },
  save_avatar ({ commit }, avatarUrl) {
    setAvatar(avatarUrl)
    commit('SET_AVATAR', avatarUrl)
  },
  logout ({ commit }) {
    commit('SET_TOKEN', '')
    commit('SET_NAME', '')
    commit('SET_ROOT', '')
    commit('SET_AVATAR', 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png')
    removeToken()
    removeName()
    removeAvatar()
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
