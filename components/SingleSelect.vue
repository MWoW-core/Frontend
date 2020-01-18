<template>
  <select
    :value="value"
    :id="attribute"
    class="mt-1 w-full p-2 appearance-none ripple-bg-black text-brand rounded"
    @change="(event) => $emit('change', event.target.value)"
  >
    <slot>
      <option v-for="(option, index) in options" :key="index" :value="option">{{
        option
      }}</option>
    </slot>
  </select>
</template>

<script>
export default {
  name: 'SingleSelect',

  model: {
    prop: 'value',
    event: 'change'
  },

  props: {
    attribute: String,
    value: String,
    options: [Array, Object]
  }
}
</script>
