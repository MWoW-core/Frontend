export const state = () => ({
  news: [],
  categories: []
})

export const mutations = {
  SET_NEWS(state, news) {
    state.news = news
  },

  SET_CATEGORIES(state, categories) {
    state.categories = categories
  }
}

export const actions = {
  async fetch({ commit }, { query }) {
    const news = await this.$axios.$get('/api/news', {
      params: query
    })

    commit('SET_NEWS', news)
  },

  async fetchCategories({ commit }) {
    const categories = await this.$axios.$get('/api/news-categories')

    commit('SET_CATEGORIES', categories)
  }
}
