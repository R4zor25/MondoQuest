import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },
    logout(state) {
      state.user = null
      localStorage.removeItem('user')
    },
  },
  actions: {
    login({ commit }, { username, password }) {
      return axios.post('http://192.168.0.39:8081/api/user/auth/login', { username, password })
        .then(({ data }) => {
          commit('setUser', data)
          return data
        })
    },
    register({ commit }, { username, password }) {
      return axios.post('http://192.168.0.39:8081/api/user/auth/register', { username, password })
        .then(({ data }) => {
          commit('setUser', data)
          return data
        })
    },
    logout({ commit }) {
      commit('logout')
    }
  },
  getters: {
    isAuthenticated: state => !!state.user,
    getUser: state => state.user,
  }
})

export default store
