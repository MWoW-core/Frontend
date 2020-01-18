<template>
  <div class="mb-8 flex items-center justify-between rounded">
    <div class="flex items-center">
      <div class="mx-4 py-4 text-white text-sm font-medium">
        <slot />
      </div>
    </div>
    <button
      v-if="canBeClosed"
      type="button"
      class="group mr-2 p-2"
      @click="$emit('close')"
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
