export default async function({ route, redirect, store, commit }) {
  if (route.params.type) {
    if (
      store.state.filters.type.type.name.toLowerCase() !== route.params.type
    ) {
      const type = store.state.filters.types.find(
        (item) =>
          item.type.name.toLowerCase() === route.query.type.toLowerCase()
      )
      commit('filters/setType', type)
    }
  }

  if (route.query.financeform) {
    const routeFinForm = route.query.financeform
      .replace(/-/g, ' ')
      .toLowerCase()

    if (store.state.filters.finance_form_name.toLowerCase() !== routeFinForm) {
      const newFinForm = store.state.reseller.resellerInfo.financeForms.find(
        (item) => item.name.toLowerCase() === routeFinForm
      )

      commit('filters/setFinanceFormId', newFinForm.id)
      commit('filters/setFinanceFormName', newFinForm.name)
    }
  }

  await store.dispatch('product/FETCH_VEHICLE', route.query)
  await store.dispatch('product/FETCH_CALC_DEPENDENCIES')
}
