<template lang="pug">
  div 
    div Header
    div {{ getResellerInfo }}
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapGetters('global', ['getResellerInfo'])
  }
}
</script>
