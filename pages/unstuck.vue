<template>
  <div class="w-full mb-2">
    <div class="flex flex-col items-center">
      <card class="p-2">
        <template #heading>
          <heading>
            <h1>WIP</h1>
          </heading>
        </template>
      </card>
    </div>
  </div>
</template>

<script>
import Card from '~/components/Card'
import Heading from '~/components/Heading'

export default {
  middleware: 'auth',

  components: {
    Card,
    Heading
  }
}
</script>
