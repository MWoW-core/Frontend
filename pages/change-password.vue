<template>
  <card class="p-4 mb-2">
    <template #heading>
      <heading>
        <h1>Change password</h1>
      </heading>
    </template>

    <form
      @submit.prevent="submit"
      class="w-full p-6 text-brand text-shadow"
      method="POST"
    >
      <form-field
        :form="form"
        attribute="current_password"
        type="password"
        required
      />

      <form-field
        :form="form"
        attribute="password"
        type="password"
        title="New password"
        required
      />

      <form-field
        :form="form"
        attribute="password_confirmation"
        type="password"
        title="Confirm new password"
        required
      />

      <loading-button
        :loading="state === states.CHANGING"
        :class="{
          'text-white ripple-bg-brand': state === states.DEFAULT,
          'text-white ripple-bg-red-500': state === states.ERROR,
          'text-gray-700 bg-green-200': state === states.CHANGED
        }"
        type="submit"
        class="w-full align-middle text-center select-none font-bold whitespace-no-wrap p-4 text-base leading-normal no-underline"
        >{{ state }}</loading-button
      >
    </form>
  </card>
</template>

<script>
import { mapState } from 'vuex'
import Card from '~/components/Card'
import Heading from '~/components/Heading'
import FormField from '~/components/FormField'
import LoadingButton from '~/components/LoadingButton'

const states = {
  DEFAULT: 'Change password',
  CHANGING: 'Changing password...',
  CHANGED: 'Password changed.',
  ERROR: 'There were some errors...'
}

export default {
  middleware: 'auth',

  components: {
    Card,
    Heading,
    FormField,
    LoadingButton
  },

  data: () => ({
    states,
    state: states.DEFAULT,

    form: {
      current_password: '',
      password: '',
      password_confirmation: ''
    }
  }),

  computed: {
    ...mapState({
      user: (state) => state.auth.user
    })
  },

  methods: {
    async submit() {
      try {
        this.state = states.CHANGING

        await this.$store.dispatch('auth/changePassword', { form: this.form })

        this.state = states.CHANGED
      } catch (e) {
        this.state = states.ERROR
        this.errors = e
      }
    }
  }
}
</script>
