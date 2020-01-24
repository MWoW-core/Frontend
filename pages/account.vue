<template>
  <div class="w-full mb-2">
    <alert
      v-if="user.account.status === 'Banned'"
      class="p-2 m-1 bg-red-500 text-white"
    >
      <h1>Your account is banned.</h1>
    </alert>

    <div class="flex flex-col items-center">
      <card class="p-2 text-lg" title="Account details">
        <div class="p-4">
          <span>
            <online-indicator-icon
              :class="user.account.online ? 'text-green-300' : 'text-red-500'"
            />
            {{ user.account.status }}
          </span>

          <span class="px-1">
            <p v-tooltip="'username'"><key-icon /> {{ user.account_name }}</p>
            <p v-tooltip="'email'"><at-icon /> {{ user.account.email }}</p>
          </span>

          <hr class="border border-b border-gray-300" />

          <span class="px-1">
            <p v-tooltip="'Expansion'">
              <game-pad-icon /> {{ user.account.expansion }}
            </p>

            <p v-tooltip="'Vote points'"><vote-icon /> {{ user.account.vp }}</p>

            <p v-tooltip="'Donation points'">
              <cart-icon /> {{ user.account.dp }}
            </p>
          </span>

          <hr class="border border-b border-gray-300" />

          <span class="px-1">
            <p v-tooltip="'Registration date'">
              <calendar-text-icon /> {{ toHumanDate(user.account.joindate) }}
            </p>
            <p v-tooltip="'Last login'">
              <calendar-check-icon />
              {{ toHumanDateTime(user.account.last_login) }}
            </p>
          </span>

          <hr class="border border-b border-gray-300" />

          <span class="px-1">
            <p v-tooltip="'Last IP'">
              <map-marker-icon /> {{ user.account.last_ip }}
            </p>
            <p v-tooltip="'Last attempt IP'">
              <map-marker-icon /> {{ user.account.last_attempt_ip }}
            </p>
          </span>
        </div>
      </card>

      <card class="p-2" title="Account bans">
        <alert
          v-if="activeBans.length === 0"
          class="p-2 m-1 bg-green-500 text-white"
        >
          <h1><check-icon /> Your account has no bans.</h1>
        </alert>

        <ul v-else class="list-none p-4">
          <li
            v-for="(ban, index) in activeBans"
            :key="index"
            class="border-b p-4 border-gray-300"
          >
            <p v-tooltip="'Banned by'"><gavel-icon /> {{ ban.bannedby }}</p>
            <p v-tooltip="'Banned at'">
              <calendar-text-icon />{{ toHumanDateTime(ban.bandate) }}
            </p>
            <p v-tooltip="'Ban reason'"><pencil-icon />{{ ban.banreason }}</p>
          </li>
        </ul>
      </card>
    </div>
  </div>
</template>

<!--
But for the UCP,
  Pass reset,
  unstuck,
  vote panel,
  store panel,
  account details
-->

<script>
import { mapState } from 'vuex'
import OnlineIndicatorIcon from 'vue-material-design-icons/CheckboxBlankCircle'
import KeyIcon from 'vue-material-design-icons/Key'
import AtIcon from 'vue-material-design-icons/At'
import GamePadIcon from 'vue-material-design-icons/GamepadSquare'
import VoteIcon from 'vue-material-design-icons/Vote'
import CartIcon from 'vue-material-design-icons/Cart'
import CalendarCheckIcon from 'vue-material-design-icons/CalendarCheck'
import CalendarTextIcon from 'vue-material-design-icons/CalendarText'
import MapMarkerIcon from 'vue-material-design-icons/MapMarker'
import Card from '~/components/Card'

export default {
  middleware: 'auth',

  components: {
    Card,
    Alert: () => import('~/components/Alert'),
    CheckIcon: () => import('vue-material-design-icons/Check'),
    GavelIcon: () => import('vue-material-design-icons/Gavel'),
    PencilIcon: () => import('vue-material-design-icons/Pencil'),
    OnlineIndicatorIcon,
    KeyIcon,
    AtIcon,
    GamePadIcon,
    VoteIcon,
    CartIcon,
    CalendarCheckIcon,
    CalendarTextIcon,
    MapMarkerIcon
  },

  computed: {
    ...mapState({
      user: (state) => state.auth.user
    }),

    activeBans() {
      return this.user.account.bans.filter((ban) => ban.active)
    }
  }
}
</script>
