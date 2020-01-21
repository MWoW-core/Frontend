<template>
  <card class="w-full px-4 py-2 mb-2 text-brand" color="black" title="Login">
    <template #heading>
      <heading>
        <h1>
          Login
        </h1>

        <small class="text-xs text-gray-700 mt-8 -mb-4 lead">
          Don't have an account?
          <nuxt-link class="text-white hover:underline text-xs" to="register"
            >Register</nuxt-link
          >
        </small>
      </heading>
    </template>

    <form
      @submit.prevent="submit"
      class="w-full p-6 text-brand text-shadow"
      method="POST"
    >
      <form-field
        :form="form"
        attribute="email"
        label="E-Mail Address"
        required
        autocomplete="email"
        autofocus
      />

      <form-field :form="form" attribute="password" type="password" required />

      <div class="flex flex-wrap items-center">
        <div class="flex mb-6">
          <input
            id="remember"
            v-model="form.remember"
            type="checkbox"
            name="remember"
          />

          <label class="text-sm text-gray-700 ml-3" for="remember">
            Remember Me
          </label>
        </div>

        <nuxt-link
          to="password/reset"
          class="text-sm text-blue-500 hover:text-blue-700 whitespace-no-wrap no-underline ml-auto"
          >Forgot Your Password?</nuxt-link
        >
      </div>

      <loading-button
        :loading="state === states.LOGGING_IN"
        :class="{
          'text-white ripple-bg-brand': state === states.DEFAULT,
          'text-white ripple-bg-red-500': state === states.ERROR,
          'text-gray-700 bg-green-200': state === states.LOGGED_IN
        }"
        type="submit"
        class="w-full align-middle text-center select-none font-bold whitespace-no-wrap p-4 text-base leading-normal no-underline"
        >{{ state }}</loading-button
      >
    </form>
  </card>
</template>

<script>
import FormField from '~/components/FormField'
import LoadingButton from '~/components/LoadingButton'
import Card from '~/components/Card'
import Heading from '~/components/Heading'

const states = {
  DEFAULT: 'Login',
  LOGGING_IN: 'Logging in...',
  LOGGED_IN: 'Logged in.',
  ERROR: 'There were some errors...'
}

export default {
  middleware: 'guest',

  components: {
    Card,
    LoadingButton,
    FormField,
    Heading
  },

  data: () => ({
    states,
    state: null,
    errors: null,

    form: {
      email: '',
      password: '',
      remember: true
    }
  }),

  created() {
    this.state = states.DEFAULT
  },

  methods: {
    async submit() {
      try {
        this.state = states.LOGGING_IN

        await this.$store.dispatch('auth/login', { form: this.form })

        this.state = states.LOGGED_IN

        await this.$router.push({ path: '/home' })
      } catch (e) {
        this.state = states.ERROR
        this.errors = e
      }
    }
  }
}
</script>
