<template>
  <card size="sm" title="Login">
    <form @submit.prevent="submit" class="w-full p-6" method="POST">
      <form-field
        :form="form"
        attribute="email"
        label="E-Mail Address"
        required
        autocomplete="email"
        autofocus
      />

      <form-field :form="form" attribute="password" type="password" required />

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

      <div class="flex flex-wrap items-center">
        <loading-button
          :loading="submitting"
          class="bg-blue-500 hover:bg-blue-700 text-gray-100 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >Login</loading-button
        >

        <nuxt-link
          to="password/reset"
          class="text-sm text-blue-500 hover:text-blue-700 whitespace-no-wrap no-underline ml-auto"
          >Forgot Your Password?</nuxt-link
        >

        <p class="w-full text-xs text-center text-gray-700 mt-8 -mb-4">
          Don't have an account?
          <nuxt-link
            class="text-blue-500 hover:text-blue-700 no-underline"
            to="register"
            >Register</nuxt-link
          >
        </p>
      </div>
    </form>
  </card>
</template>

<script>
import FormField from '~/components/FormField'
import LoadingButton from '~/components/LoadingButton'
import Card from '~/components/Card'

export default {
  middleware: 'guest',

  components: {
    Card,
    LoadingButton,
    FormField
  },

  data: () => ({
    submitting: false,

    form: {
      email: '',
      password: '',
      remember: true
    }
  }),

  methods: {
    async submit() {
      try {
        this.submitting = true

        await this.$store.dispatch('auth/login', { form: this.form })

        await this.$router.push({ path: '/home' })
      } catch (e) {
        // console.log(e)
      } finally {
        this.submitting = false
      }
    }
  }
}
</script>
