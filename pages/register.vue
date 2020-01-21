<template>
  <card class="w-full px-4 py-2 mb-2 text-brand" color="black">
    <template #heading>
      <heading>
        <h1>
          Register
        </h1>

        <small class="text-xs text-gray-700 mt-8 -mb-4 lead">
          Already have an account?
          <nuxt-link class="text-white hover:underline text-xs" to="login"
            >Login</nuxt-link
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
        attribute="name"
        required
        autocomplete="name"
        autofocus
      >
        <template #help>
          <span class="flex flex-col text-shadow">
            <small class="lead">
              Will show on the forum, comments and posts.
            </small>

            <small class="lead">
              it can be a security issue if like or equal to your account name.
            </small>
          </span>
        </template>
      </form-field>

      <form-field
        :form="form"
        attribute="account_name"
        required
        autocomplete="account_name"
        help="You'll use this for logging in to the game."
      />

      <form-field
        :form="form"
        attribute="email"
        label="E-Mail Address"
        type="email"
        required
        autocomplete="email"
        help="You'll use this for logging in to the site and services."
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
          :loading="state === states.REGISTERING"
          :class="{
            'text-white ripple-bg-brand': state === states.DEFAULT,
            'text-white ripple-bg-red-500': state === states.ERROR,
            'text-gray-700 bg-green-200': state === states.REGISTERED
          }"
          type="submit"
          class="w-full align-middle text-center select-none font-bold whitespace-no-wrap p-4 text-base leading-normal no-underline"
          >{{ state }}</loading-button
        >
      </div>
    </form>
  </card>
</template>

<script>
import FormField from '~/components/FormField'
import Card from '~/components/Card'
import Heading from '~/components/Heading'
import LoadingButton from '~/components/LoadingButton'

const states = {
  DEFAULT: 'Register',
  REGISTERING: 'Registering...',
  REGISTERED: 'Registered.',
  ERROR: 'There were some errors...'
}

export default {
  middleware: 'guest',

  components: {
    LoadingButton,
    Card,
    Heading,
    FormField
  },

  data: () => ({
    states,
    state: null,
    errors: null,

    form: {
      email: '',
      account_name: '',
      password: '',
      password_confirmation: ''
    }
  }),

  watch: {
    form: {
      handler() {
        this.toggleDefaultState()
      },

      deep: true
    }
  },

  created() {
    this.toggleDefaultState()
  },

  methods: {
    toggleDefaultState() {
      this.state = states.DEFAULT
    },

    async submit() {
      try {
        this.state = states.REGISTERING

        await this.$store.dispatch('auth/register', { form: this.form })

        this.state = states.REGISTERED

        await this.$router.push({ path: '/home' })
      } catch (e) {
        this.errors = e
        this.state = states.ERROR
      }
    }
  }
}
</script>
