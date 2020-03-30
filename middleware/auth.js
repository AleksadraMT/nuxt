import translate from '~/lang/lang'

export default async function({ route, redirect, store, commit }) {
  await store.dispatch('reseller/FETCH_AUTH')

  await store.dispatch('reseller/UPDATE_DEFAULTS')

  await store.dispatch('reseller/FETCH_TYPES')

  await store.dispatch('reseller/FETCH_STYLE')

  await store.dispatch('landing/FETCH_ALL_LANDINGS')

  await store.dispatch('landing/FETCH_ALL_CATEGORIES_LANDINGS')

  if (route.query.type) {
    const type = store.state.reseller.types.find(
      (item) => item.type.name.toLowerCase() === route.query.type.toLowerCase()
    )

    commit('reseller/setType', type)
  }

  if (!route.params.base) {
    const base = translate('sv', store.state.reseller.financeFormCollectionName)

    return redirect(`/${base}`)
  }
}
