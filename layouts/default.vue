<template>
  <div class="bg-black cursor-gauntlet">
    <portal-target name="dropdown" slim />

    <div class="flex flex-col">
      <div @click="hideDropdownMenus" class="min-h-screen flex flex-col">
        <navbar />

        <img src="~/static/header.png" />

        <div class="flex flex-col items-center mt-4">
          <nuxt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-material-design-icons/styles.css'
import Navbar from '~/components/Navbar'

export default {
  layoutTransition: 'fade',

  components: {
    Navbar
  },

  data: () => ({
    showUserMenu: false
  }),

  methods: {
    hideDropdownMenus() {
      this.showUserMenu = false
    }
  }
}
</script>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
