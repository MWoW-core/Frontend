<template>
  <button
    @click="$emit('click', $event)"
    :disabled="loading"
    class="flex items-center"
  >
    <loading-icon v-if="loading" spin class="mr-2" />
    <slot />
  </button>
</template>

<script>
import LoadingIcon from 'vue-material-design-icons/Loading.vue'

export default {
  components: {
    LoadingIcon
  },

  props: {
    loading: Boolean
  }
}
</script>
