<template>
  <main class="flex-grow bg-black cursor-gauntlet">
    <portal-target name="dropdown" slim />

    <div class="flex flex-col">
      <div class="min-h-screen flex flex-col">
        <navbar />

        <img src="~/static/header.png" />

        <div class="flex flex-col items-center mt-4">
          <nuxt />
        </div>
      </div>
    </div>

    <footer class="flex items-center">
      <portal-target name="footer" slim />

      <nav v-if="$store.state.auth.user" class="flex flex-wrap mt-0 m-auto">
        <nuxt-link to="/account" class="block px-6 py-2 text-brand text-shadow">
          <account-icon /> Account
        </nuxt-link>

        <nuxt-link
          class="block px-6 py-2 text-brand text-shadow"
          to="/change-password"
        >
          <lock-reset-icon />Change password
        </nuxt-link>

        <nuxt-link class="block px-6 py-2 text-brand text-shadow" to="/unstuck">
          <fork-lift-icon />Unstuck
        </nuxt-link>

        <nuxt-link class="block px-6 py-2 text-brand text-shadow" to="/vote">
          <vote-icon />Vote
        </nuxt-link>

        <nuxt-link class="block px-6 py-2 text-brand text-shadow" to="/store">
          <cart-icon />Store
        </nuxt-link>
      </nav>
    </footer>
  </main>
</template>

<script>
import 'vue-material-design-icons/styles.css'
import Navbar from '~/components/Navbar'

export default {
  layoutTransition: 'fade',

  head: () => ({
    bodyAttrs: {
      class: 'flex flex-col min-h-screen'
    }
  }),

  components: {
    Navbar,
    AccountIcon: () => import('vue-material-design-icons/Account'),
    LockResetIcon: () => import('vue-material-design-icons/LockReset'),
    ForkLiftIcon: () => import('vue-material-design-icons/Forklift'),
    VoteIcon: () => import('vue-material-design-icons/Vote'),
    CartIcon: () => import('vue-material-design-icons/Cart')
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
