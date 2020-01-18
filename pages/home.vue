<template>
  <card title="Home">
    <h1>hello {{ $store.state.auth.user }}</h1>
  </card>
</template>

<script>
import Card from '~/components/Card'

export default {
  middleware: 'auth',

  components: {
    Card
  }
}
</script>
