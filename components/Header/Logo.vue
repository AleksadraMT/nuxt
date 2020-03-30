<template lang="pug">
    router-link.logo(:to="{name: 'base', params: {base: $route.params.base}}" v-if="style.logoFont")
      img(:src="style.logoFont.logo" :alt="info.name")
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      style: 'reseller/getSiteStyle',
      info: 'reseller/getResellerInfo'
    })
  }
}
</script>
