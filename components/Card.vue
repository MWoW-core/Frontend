<template>
  <div :class="size ? `max-w-${size}` : null" class="w-full">
    <div :class="`bg-${color}`" class="flex flex-col break-words shadow-md">
      <slot name="heading">
        <heading v-if="title">
          {{ title }}
        </heading>
      </slot>

      <slot />
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
