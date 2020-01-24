<template>
  <div class="mb-8 flex items-center justify-between rounded">
    <div class="flex items-center">
      <slot />
    </div>
    <button
      v-if="canBeClosed"
      @click="$emit('close')"
      type="button"
      class="group mr-2 p-2"
    >
      <close-icon
        class="block w-2 h-2 fill-green-dark group-hover:fill-green-darker"
      />
    </button>
  </div>
</template>

<script>
import CloseIcon from 'vue-material-design-icons/Close.vue'

export default {
  components: {
    CloseIcon
  },

  props: {
    canBeClosed: {
      type: Boolean,
      default: true
    }
  }
}
</script>
