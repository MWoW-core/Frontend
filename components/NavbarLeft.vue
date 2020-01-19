<template>
  <div>
    <portal-target name="navbar" slim />

    <a
      :href="downloadRealmlistURL"
      target="_blank"
      class="text-brand text-shadow border-r border-l border-brand px-2"
    >
      Download Realmlist
    </a>

    <a
      class="text-brand text-shadow px-2"
      href="magnet:?xt=urn:btih:b296ea8947b36c68f6e022f5a642ecc406ad8968&dn=World%20of%20Warcraft%203.3.5a%20%28no%20install%29"
    >
      Download 3.3.5a
    </a>
  </div>
</template>

<script>
export default {
  computed: {
    downloadRealmlistURL() {
      return `${process.env.API_URL}/download-realmlist`
    }
  }
}
</script>
