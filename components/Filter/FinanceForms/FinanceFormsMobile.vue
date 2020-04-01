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
              v-model="financeFormId"
              :options="financeFormsFilteredSweden"
              :disabled="false"
              :multiple="false"
              @click="changeFinanceForm($event)"
            )
</template>

<script>
import { mapActions } from 'vuex'

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
    financeFormId: {
      get() {
        return this.$store.state.filters.finance_form_id
      },
      set(value) {
        const form = this.financeFormsFiltered.find((item) => item.id === value)

        this.CHANGE_FINANCE_FORM({ form })
      }
    },
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
            this.isMobileWidth() && this.financeFormsFiltered.length > 1
          )
        }
      },
      deep: true
    }
  },
  methods: {
    translate,
    ...mapActions('filters', ['CHANGE_FINANCE_FORM']),
    changeFinanceForm() {
      // TODO we need to set new filters
      // await this.resetParams()
      // await this.getAllFilterData()
      // await this.getVehicles(false)
    },
    setFormsVisibily() {
      const visibility =
        this.isMobileWidth() && this.financeFormsFiltered.length > 1

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
