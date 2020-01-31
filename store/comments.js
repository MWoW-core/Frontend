export const actions = {
  async delete(_store, { id }) {
    await this.$axios.$delete(`/api/comments/${id}`)
  },

  async update(_store, { id, comment }) {
    await this.$axios.$put(`/api/comments/${id}`, {
      comment
    })
  }
}
