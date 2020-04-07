<template lang="pug">
  .vehicle-desc-block
    .model-title
      h1 {{ title }}
    .model-desc
      span {{ description }}
    .d-none.d-md-block
      .check-list-title.m-t-40 {{ includes.headline }}
      div.check-list(v-if="hasIncludes")
        div.check-list-item(v-for="item in includesList")
          i.fas.fa-check.check-list-circle
          span.check-list-text {{ item.text }}

</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'VehicleDescription',
  props: {
    title: {
      type: String,
      default: ''
    },
    description: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState('reseller', {
      includes: (state) =>
        state.siteStyle.includes && !!state.siteStyle.includes.data.length
          ? state.siteStyle.includes.data[0]
          : {}
    }),
    hasIncludes() {
      return !!this.includes.items && !!this.includes.items.data.length
    },
    includesList() {
      return this.includes.items.data
    }
  }
}
</script>
