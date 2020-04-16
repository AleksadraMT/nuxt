<template lang="pug">
  div(:class="customClass" v-if="collection.length > 1" )
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
import translate from '~/lang/lang.js'

export default {
  mixins: [Helper],
  props: {
    customClass: {
      type: String,
      default: ''
    }
  },
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
    changeCollection(item) {
      window.location.replace(
        window.location.origin +
          `/${translate('sv', item.toLowerCase()).replace(/[ö]/g, 'o')}`
      )
    }
  }
}
</script>
