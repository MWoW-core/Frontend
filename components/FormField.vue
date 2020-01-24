<template>
  <div class="flex flex-wrap mb-6">
    <slot class="labelClasses" name="label">
      <label :classes="labelClasses" :for="attribute" :value="labelValue">{{
        labelValue
      }}</label>
    </slot>

    <slot
      :attribute="attribute"
      :classes="inputClasses"
      :form="form"
      :hasErrors="hasErrors"
      name="input"
    >
      <input
        v-bind="$attrs"
        :id="attribute"
        :name="attribute"
        :class="inputClasses"
        v-model="form[attribute]"
      />
    </slot>

    <slot />

    <div class="flex flex-wrap flex-col">
      <slot name="help">
        <small class="lead">
          {{ help }}
        </small>
      </slot>

      <slot :has-errors="hasErrors" errors="errors" name="errors">
        <ul v-show="hasErrors" class="text-red-500 text-xs italic mt-4">
          <li v-for="(error, i) in errors" :key="i">{{ error }}</li>
        </ul>
      </slot>
    </div>
  </div>
</template>

<script>
import { startCase } from 'lodash'

export default {
  name: 'FormField',

  props: {
    form: {
      type: Object,
      default() {
        return {}
      }
    },

    attribute: {
      type: String,
      default: ''
    },

    label: {
      type: String,
      default: ''
    },

    help: {
      type: String,
      default: ''
    }
  },

  computed: {
    errors() {
      return this.$store.state.validation.errors[this.attribute]
    },

    hasErrors() {
      return Array.isArray(this.errors)
    },

    inputClasses() {
      let classes =
        'shadow appearance-none border rounded w-full py-2 px-3 bg-gray-100 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'

      if (this.hasErrors) {
        classes += 'border-red-500'
      }

      return classes
    },

    labelClasses() {
      return 'block text-gray-700 text-sm font-bold mb-2'
    },

    labelValue() {
      return this.label || startCase(this.attribute)
    }
  },

  methods: {
    startCase
  }
}
</script>
