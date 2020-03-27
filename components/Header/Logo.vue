<template lang="pug">
    router-link.logo(:to="{name: 'base', params: {base: $route.params.base}}")
      //- TODO add v-if="logoFont"
      //- TODO add :src="logoFont.logo" 
      //- img(:alt="reseller.name") 
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters({
      reseller: 'reseller/getResellerInfo'
    })
  }
}
</script>
