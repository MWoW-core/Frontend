<template>
  <div class="flex flex-wrap justify-center">
    <div :class="size ? `max-w-${size}` : null" class="w-full">
      <div
        class="flex flex-col break-words rounded shadow-md"
        :class="`bg-${color}`"
      >
        <slot name="heading">
          <heading v-if="title">
            {{ title }}
          </heading>
        </slot>

        <slot />
      </div>
    </div>
  </div>
</template>

<script>
import Heading from './Heading'

export default {
  name: 'Card',

  components: { Heading },

  props: {
    title: {
      type: String,
      default: null
    },

    size: {
      type: String,
      default: null
    },

    color: {
      type: String,
      default: 'white'
    }
  }
}
</script>
