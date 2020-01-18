<template>
  <div class="flex items-center">
    <div class="flex w-full bg-black shadow rounded">
      <dropdown
        class="px-4 md:px-6 rounded-l border-r border-brand hover:bg-grey-lightest focus:border-white focus:shadow-outline focus:z-10"
        placement="bottom-start"
      >
        <div class="flex items-baseline">
          <span class="text-grey-darkest hidden md:inline">
            Filter
          </span>
          <menu-down-icon class="pt-1" icon="chevron-down" />
        </div>
        <div
          slot="dropdown"
          class="mt-2 px-4 py-6 w-screen shadow-lg bg-brand rounded"
          :style="{ maxWidth: `${maxWidth}px` }"
        >
          <slot />
        </div>
      </dropdown>

      <input
        class="relative w-full px-6 py-3 rounded-r focus:shadow-outline bg-black"
        autocomplete="off"
        type="text"
        name="search"
        :placeholder="placeholder"
        :value="value"
        @input="$emit('change', $event.target.value)"
      />
    </div>
    <button
      class="mx-2 p-2 text-sm text-white ripple-bg-brand shadow-inner rounded"
      type="button"
      @click="$emit('reset')"
    >
      Reset
    </button>

    <slot name="buttons" />
  </div>
</template>

<script>
import MenuDownIcon from 'vue-material-design-icons/MenuDown.vue'
import Dropdown from '~/components/Dropdown'

export default {
  components: {
    Dropdown,
    MenuDownIcon
  },
  props: {
    placeholder: {
      type: String,
      default: 'Search…'
    },
    value: String,
    maxWidth: {
      type: Number,
      default: 300
    }
  }
}
</script>
