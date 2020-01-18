<template>
  <div class="m-2 p-4 flex flex-wrap">
    <template v-for="link in links">
      <a
        :key="link"
        class="mr-1 mb-1 px-4 py-3 border rounded text-sm text-brand"
        :class="link === meta.current_page ? 'bg-gray-300' : 'bg-white'"
        href="#"
        @click="
          $router.push({
            path: $route.path,
            query: {
              ...$route.query,
              page: link
            }
          })
        "
        >{{ link }}</a
      >
    </template>
  </div>
</template>

<script>
export default {
  props: {
    meta: Object
  },

  computed: {
    links() {
      if (this.meta) {
        return [...Array(this.meta.last_page + 1).keys()].slice(1)
      }

      return []
    }
  }
}
</script>
