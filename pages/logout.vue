<template>
  <card
    title="Thanks for the visit, hope to see you another time! :)"
    class="w-full px-4 py-2 mb-2 text-brand"
    color="black"
  >
    <div class="flex items-center">
      <img
        class="w-full"
        src="https://o.aolcdn.com/images/dims?quality=85&image_uri=http%3A%2F%2Fwww.blogcdn.com%2Fwow.joystiq.com%2Fmedia%2F2007%2F11%2Fwaving.jpg&client=amp-blogside-v2&signature=6c5838d19caf4291440569f55c2fcc259b289743"
      />
    </div>
  </card>
</template>

<script>
import Card from '~/components/Card'

export default {
  components: {
    Card
  },

  mounted() {
    this.$store.dispatch('auth/logout')
  }
}
</script>
