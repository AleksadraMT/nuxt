<template lang="pug">
  .container-user.finance-forms-collection(
    v-show="isFormsVisible"
  )
    .finance-forms-title Välj finansform:
    .finance-forms-list
      label.finance-forms-label.custom-check(
        v-for="(item, key) in financeFormsFiltered"
        :for="`finance-form-${key}`"
        :key="key"
      )
        input(
          type="radio"
          name="finance-form"
          class="custom-check-input finance-forms-input"
          :id="`finance-form-${key}`"
          :checked="item.id === financeFormId"
          :value="item.name"
          @change="changeFinanceForm(item)"
        )
        .check
          Check
        .custom-check-text
          span.finance-forms-text {{ translate('sv', item.name) }}
</template>

<script>
import { mapActions } from 'vuex'

import FinanceFormsMixin from './FinanceFormsMixin'
import translate from '~/lang/lang.js'
import Helper from '~/mixins/Helper.js'

export default {
  name: 'FinanceForms',
  components: {
    Check: () => import('@/components/svg/check')
  },
  mixins: [Helper, FinanceFormsMixin],
  watch: {
    financeForms: {
      handler(n) {
        if (n.length) {
          this.$set(
            this.$data,
            'isFormsVisible',
            !this.isMobileWidth() && this.financeFormsFiltered.length > 1
          )
        }
      },
      deep: true
    }
  },
  methods: {
    translate,
    ...mapActions('filters', ['CHANGE_FINANCE_FORM']),
    changeFinanceForm(form) {
      this.CHANGE_FINANCE_FORM({ form })

      // TODO we need to set new filters
      // await this.resetParams()

      // await this.getAllFilterData()

      // await this.getVehicles(false)
    },
    setFormsVisibily() {
      const visibility =
        !this.isMobileWidth() && this.financeFormsFiltered.length > 1

      this.$set(this.$data, 'isFormsVisible', visibility)
    }
  }
}
</script>
