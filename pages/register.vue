<template>
  <card size="sm" title="Register">
    <form @submit.prevent="submit" class="w-full p-6" method="POST">
      <form-field
        :form="form"
        attribute="name"
        required
        autocomplete="name"
        autofocus
      />

      <form-field
        :form="form"
        attribute="account_name"
        required
        autocomplete="account_name"
      />

      <form-field
        :form="form"
        attribute="email"
        label="E-Mail Address"
        type="email"
        required
        autocomplete="email"
      />

      <form-field :form="form" attribute="password" type="password" required />

      <form-field
        :form="form"
        attribute="password_confirmation"
        type="password"
        label="Confirm password"
        required
      />

      <div class="flex flex-wrap">
        <loading-button
          :loading="submitting"
          type="submit"
          class="inline-block align-middle text-center select-none border font-bold whitespace-no-wrap py-2 px-4 rounded text-base leading-normal no-underline text-gray-100 bg-blue-500 hover:bg-blue-700"
          >Register</loading-button
        >

        <p class="w-full text-xs text-center text-gray-700 mt-8 -mb-4">
          Already have an account?
          <nuxt-link
            class="text-blue-500 hover:text-blue-700 no-underline"
            to="login"
            >Login</nuxt-link
          >
        </p>
      </div>
    </form>
  </card>
</template>

<script>
import FormField from '~/components/FormField'
import Card from '~/components/Card'
import LoadingButton from '~/components/LoadingButton'

export default {
  middleware: 'guest',

  components: {
    LoadingButton,
    Card,
    FormField
  },

  data: () => ({
    submitting: false,

    form: {
      email: '',
      account_name: '',
      password: '',
      password_confirmation: ''
    }
  }),

  methods: {
    async submit() {
      try {
        this.submitting = true

        await this.$store.dispatch('auth/register', { form: this.form })

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
