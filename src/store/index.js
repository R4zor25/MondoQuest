import { createStore } from 'vuex'
import http from '@/services/http'

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
      return http.post('/api/user/auth/login', { username, password })
        .then(({ data }) => {
          commit('setUser', data)
          return data
        })
    },
    register({ commit }, { username, password }) {
      return http.post('/api/user/auth/register', { username, password })
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
