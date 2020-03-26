<template lang="pug">
  div
    Header
    nuxt
    Footer
</template>

<script>
import Header from './Header'
import Footer from './Footer'

export default {
  components: {
    Header,
    Footer
  },
  middleware: 'auth'
}
</script>
