<template lang="pug">
  .home-brandlist.in-stream
    BrandsList(
      :visibility="true"
    )
</template>

<script>
import { mapMutations } from 'vuex'

import BrandsList from '~/components/Header/Lists/BrandsList.vue'

export default {
  name: 'Bilmarken',
  components: {
    BrandsList
  },
  created() {
    this.setIsHomePage(false)
  },
  methods: {
    ...mapMutations('settings', ['setIsHomePage'])
  }
}
</script>
