<template lang="pug">
  .filter-uniq-type-container.finance-form-mobile(
    v-show="isFormsVisible"
  )
    .container-user
      .finance-form-mobile-row.filter-uniq-type.text-sm-right
        .filter-title-uniq Välj finansform &#8811;
        div
          .filter-item-uniq
            DropDown(
              option-label="name"
              option-value="id"
              label=""
              :value="financeFormId"
              :options="financeFormsFilteredSweden"
              :disabled="false"
              :multiple="false"
              @click="UPDATE_FINANCE_FORM(financeFormsFiltered.find((item) => item.id === $event))"
            )
</template>

<script>
import { mapState, mapActions } from 'vuex'

import FinanceFormsMixin from './FinanceFormsMixin'
import translate from '~/lang/lang.js'
import Helper from '~/mixins/Helper.js'

import DropDown from '~/components/Common/DropDown.vue'

export default {
  name: 'FinanceFormsMobile',
  components: {
    DropDown
  },
  mixins: [Helper, FinanceFormsMixin],
  computed: {
    ...mapState('filters', {
      financeFormId: (state) => state.finance_form_id
    }),
    financeFormsFilteredSweden() {
      const newObj = JSON.parse(JSON.stringify(this.financeFormsFiltered))

      return newObj.map((item) => {
        item.name = translate('sv', item.name)

        return item
      })
    }
  },
  watch: {
    financeForms: {
      handler(n) {
        if (n.length) {
          this.$set(
            this.$data,
            'isFormsVisible',
            this.isMobile() && this.financeFormsFiltered.length > 1
          )
        }
      },
      deep: true
    }
  },
  methods: {
    translate,
    ...mapActions('filters', ['UPDATE_FINANCE_FORM']),
    setFormsVisibily() {
      const visibility = this.isMobile() && this.financeFormsFiltered.length > 1

      this.$set(this.$data, 'isFormsVisible', visibility)
    }
  }
}
</script>

<style lang="sass">
.finance-form-mobile
  background-color: #bbbabb
  margin: 2px 0

  &-row
    display: flex
    align-items: center
    justify-content: center

    > *
      width: 50%
</style>
