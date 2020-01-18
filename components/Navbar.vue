<template>
  <header class="bg-black text-brand text-shadow shadow md:flex">
    <div
      class="md:flex-no-shrink md:w-64 px-6 py-4 flex items-center justify-between md:justify-center"
    >
      <nuxt-link class="mt-1" to="/">M-WoW</nuxt-link>

      <dropdown class="md:hidden" placement="bottom-end">
        <menu-icon />

        <div
          slot="dropdown"
          class="mt-2 px-8 py-4 shadow-lg bg-black rounded flex flex-col w-full"
        >
          <navbar-left class="flex flex-col" />

          <template v-if="$store.state.auth.user">
            <nuxt-link class="p-4 text-brand text-shadow" to="/home"
              >Home</nuxt-link
            >
            <nuxt-link
              class="p-4  text-brand text-shadow"
              to="logout"
              method="post"
              >Logout</nuxt-link
            >
          </template>

          <template v-else>
            <nuxt-link class="p-4  text-brand text-shadow" to="/login"
              >Login</nuxt-link
            >

            <nuxt-link class="p-4  text-brand text-shadow" to="/register"
              >Register</nuxt-link
            >
          </template>
        </div>
      </dropdown>
    </div>

    <div
      v-if="$store.state.auth.user"
      class="md:flex hidden bg-black border-b w-full p-4 md:py-0 md:px-12 justify-between items-center"
    >
      <navbar-left class="flex items-center text-center" />

      <dropdown placement="bottom-end">
        <div class="flex items-center cursor-pointer select-none group">
          <div
            class="text-grey-darkest group-hover:text-brand text-shadow focus:text-brand text-shadow mr-1 whitespace-no-wrap"
          >
            <img
              :src="$store.state.auth.user.photo_url"
              :alt="$store.state.auth.user.name"
              class="w-8 h-8"
            />
          </div>
          <menu-down-icon
            class="w-5 h-5 group-hover:fill-brand fill-grey-darkest focus:fill-brand"
            icon="chevron-down"
          />
        </div>
        <div slot="dropdown" class="mt-2 py-2 bg-black rounded text-sm">
          <nuxt-link class="block px-6 py-2  text-brand text-shadow" to="/home">
            <home-icon />Home
          </nuxt-link>
          <nuxt-link
            class="block px-6 py-2  text-brand text-shadow"
            to="logout"
            method="post"
          >
            <Logout-icon />Logout
          </nuxt-link>
        </div>
      </dropdown>
    </div>

    <div
      v-else
      class="bg-black text-brand border-b w-full p-4 justify-between items-center flex"
    >
      <div>
        <navbar-left />
      </div>

      <div>
        <nuxt-link class="mx-2 px-4 py-2   text-brand text-shadow" to="/login"
          >Login</nuxt-link
        >

        <nuxt-link
          class="mx-2 px-4 py-2   text-brand text-shadow"
          to="/register"
          >Register</nuxt-link
        >
      </div>
    </div>
  </header>
</template>

<script>
import MenuIcon from 'vue-material-design-icons/Menu.vue'
import MenuDownIcon from 'vue-material-design-icons/MenuDown.vue'
import HomeIcon from 'vue-material-design-icons/Home.vue'
import LogoutIcon from 'vue-material-design-icons/Logout.vue'

import Dropdown from '~/components/Dropdown'
import NavbarLeft from '~/components/NavbarLeft'

export default {
  components: {
    MenuIcon,
    MenuDownIcon,
    HomeIcon,
    LogoutIcon,
    NavbarLeft,
    Dropdown
  }
}
</script>
