<template>
  <nav
    class="my-8 w-full border-b border-brand text-gray-500"
    aria-label="Breadcrumb"
  >
    <slot tag="ol" :classes="listClasses">
      <ol :class="listClasses">
        <li class="flex items-center">
          <slot name="home-link">
            <nuxt-link href="/">
              <home-icon size="2x" class="text-brand" />
              <chevron-right-icon size="2x" />
            </nuxt-link>
          </slot>
        </li>

        <slot
          name="links"
          :URLFragments="URLFragments"
          classes="flex items-center"
        >
          <li
            v-if="URLFragments.length > 0"
            v-for="(fragment, i) in URLFragments"
            :key="i"
            class="flex items-center"
          >
            <slot name="link" :fragment="fragment">
              <nuxt-link :href="fragment" class="text-brand font-bold">
                {{ fragment }}
              </nuxt-link>
              <chevron-right-icon icon="chevron-right" size="2x" />
            </slot>
          </li>
        </slot>
      </ol>
    </slot>
  </nav>
</template>

<script>
import HomeIcon from 'vue-material-design-icons/Home.vue'
import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue'

export default {
  name: 'Breadcrumbs',

  components: {
    HomeIcon,
    ChevronRightIcon
  },

  computed: {
    URLFragments() {
      return this.$nuxt.page.url.split('/').filter(String)
    },

    listClasses() {
      return 'list-none p-0 inline-flex'
    }
  }
}
</script>
