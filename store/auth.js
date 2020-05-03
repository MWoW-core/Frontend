import Cookie from 'cookie'
import Cookies from 'js-cookie'

export const state = () => ({
  user: null,
  token: null,
  intendedUrl: null
})

export const mutations = {
  SET_USER(state, user) {
    state.user = user
  },

  SET_TOKEN(state, token) {
    state.token = token
  },

  SET_INTENDED_URL(state, intendedUrl) {
    state.intendedUrl = intendedUrl
  }
}

export const actions = {
  updateToken({ commit }, token) {
    commit('SET_TOKEN', token)

    this.$axios.setToken(token, 'Bearer')

    if (process.browser) {
      if (token) {
        Cookies.set('auth-token', token)
      } else {
        Cookies.remove('auth-token')
      }
    }
  },

  fetchToken({ dispatch }) {
    const cookieStr = process.browser
      ? document.cookie
      : this.$ctx.req.headers.cookie

    const cookies = Cookie.parse(cookieStr || '') || []
    const token = cookies['auth-token']

    if (token) {
      dispatch('updateToken', token)
    }
  },

  reset({ dispatch, commit }) {
    commit('SET_USER', null)
    dispatch('updateToken', null)
  },

  async csrf() {
    await this.$axios.$get('/sanctum/csrf-cookie')
  },

  async changePassword({ dispatch }, { form }) {
    await dispatch('csrf')

    await this.$axios.$post('/api/change-password', form)
  },

  async user({ dispatch, commit }) {
    try {
      const data = await this.$axios.$get(`/api/user`)
      commit('SET_USER', data)
    } catch (e) {
      dispatch('reset')
    }
  },

  async fetch({ state, dispatch }) {
    dispatch('fetchToken')

    if (!state.token) {
      return
    }

    await dispatch('user')
  },

  async register({ dispatch }, { form }) {
    await dispatch('csrf')

    const data = await this.$axios.$post('/register', form)

    dispatch('updateToken', data.token)

    await dispatch('fetch')
  },

  async login({ dispatch }, { form }) {
    await dispatch('csrf')

    const data = await this.$axios.$post(`/login`, form)
    dispatch('updateToken', data.token)
    await dispatch('fetch')
  },

  async logout({ dispatch, state }) {
    await dispatch('csrf')

    await this.$axios.$post(`/logout`)

    dispatch('reset')
  },

  pullIntendedUrl({ commit, state }, fallback = '/') {
    const url = state.intendedUrl
    commit('SET_INTENDED_URL', null)

    return url || fallback
  }
}

export const getters = {
  loggedIn(state) {
    return state.user !== null
  }
}
