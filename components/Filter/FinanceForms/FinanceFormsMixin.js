import { mapState, mapGetters } from 'vuex'

export default {
  data: () => ({
    isFormsVisible: true
  }),
  computed: {
    ...mapState('reseller', {
      financeFormCollectionName: (state) => state.financeFormCollectionName,
      financeForms: (state) =>
        state.resellerInfo.financeForms &&
        !!state.resellerInfo.financeForms.data.length
          ? state.resellerInfo.financeForms.data
          : []
    }),
    ...mapGetters('reseller', ['getFilteredFinanceForms']),
    ...mapState('filters', {
      financeFormId: (state) => state.finance_form_id
    }),
    financeFormsFiltered() {
      const filteredFinanceForms = this.getFilteredFinanceForms(
        this.financeFormCollectionName
      )

      return !filteredFinanceForms.length ? [] : filteredFinanceForms
    }
  },
  mounted() {
    const _this = this
    _this.setFormsVisibily()

    window.addEventListener('resize', function() {
      _this.setFormsVisibily()
    })

    this.financeFormsFiltered.filter((item) => {
      if (item.default && this.financeFormId === null)
        return this.updateFinanceForm(item)
    })
  }
}
