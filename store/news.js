export const state = () => ({
  news: [],
  categories: [],
  currentlyShown: null
})

export const mutations = {
  SET_NEWS(state, news) {
    state.news = news
  },

  SET_CATEGORIES(state, categories) {
    state.categories = categories
  },

  SET_CURRENTLY_SHOWN(state, article) {
    state.currentlyShown = article
  }
}

export const actions = {
  async fetch({ commit }, { query }) {
    const news = await this.$axios.$get('/api/news', {
      params: query
    })

    commit('SET_NEWS', news)
  },

  async show({ commit }, { slug }) {
    const article = await this.$axios.$get(`/api/news/${slug}`)

    commit('SET_CURRENTLY_SHOWN', article)
  },

  async fetchCategories({ commit }) {
    const categories = await this.$axios.$get('/api/news-categories')

    commit('SET_CATEGORIES', categories)
  },

  async comment(_store, { article, comment }) {
    await this.$axios.post('/api/comments', {
      commentable_type: 'News',
      commentable_id: article.id,
      comment
    })
  }
}
