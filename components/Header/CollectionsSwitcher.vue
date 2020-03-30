<template lang="pug">
  .abstract-forms.hide-on-small( v-if="collection.length > 1" )
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
        :checked="item.toLowerCase() === financeFormCollectionName"
        @change="changeCollection(item)"
      )
      span(:class="{'active-collection': item.toLowerCase() === financeFormCollectionName}") {{ getCollectionName(item) }}
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
    financeFormCollectionName: {
      get() {
        return this.$store.state.reseller.financeFormCollectionName
      },
      set(value) {
        this.$store.commit('reseller/setFinanceFormsCollectionName', value)
      }
    }
  },
  methods: {
    changeCollection() {}
  }
}
</script>
