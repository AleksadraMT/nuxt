<template lang="pug">
  .abstract-forms.hide-on-small
    label(
      class="abstract-forms-item"
      v-for="(item, key) in collection"
      :key="key"
    )
      input(
        type="radio"
        name="abstract-form"
        class="abstract-forms-input"
        :value="`${item.toLowerCase()}`"
        :checked="item.toLowerCase() === finFormsCollectionName"
        @change="changeCollection(item)"
      )
      span(:class="{'active-collection': item.toLowerCase() === finFormsCollectionName}") {{ getCollectionName(item) }}
</template>

<script>
import { mapGetters } from 'vuex'

import Helper from '~/mixins/Helper'

export default {
  mixins: [Helper],
  computed: {
    ...mapGetters({
      collection: 'reseller/getFormsCollection'
    }),
    finFormsCollectionName: {
      get() {
        return this.$store.state.reseller.finFormsCollectionName
      },
      set(value) {
        this.$store.commit('reseller/setfinFormsCollectionName', value)
      }
    }
  },
  methods: {
    changeCollection() {}
  }
}
</script>
