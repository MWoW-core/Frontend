<template>
  <div class="w-full mb-2">
    <div class="flex flex-col items-center">
      <card class="p-2">
        <template #heading>
          <heading>
            <h1>Hello {{ user.name }}.</h1>
          </heading>
        </template>

        <h3>You can navigate at the bottom.</h3>
      </card>

      <card class="p-2" title="Latest events">
        <ul class="list-none p-4">
          <li
            v-for="event in user.events"
            :key="event.id"
            class="border-b border-gray-300 p-4"
          >
            <p v-tooltip="'Event'"><star-icon /> {{ event.event }}</p>
            <p v-tooltip="'Created'">
              <calendar-text-icon />{{ toHumanDateTime(event.created_at) }}
            </p>
          </li>
        </ul>
      </card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CalendarTextIcon from 'vue-material-design-icons/CalendarText'
import StarIcon from 'vue-material-design-icons/Star'
import Card from '~/components/Card'
import Heading from '~/components/Heading'

export default {
  middleware: 'auth',

  components: {
    Card,
    Heading,
    CalendarTextIcon,
    StarIcon
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user
    })
  }
}
</script>
