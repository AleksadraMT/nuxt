export default async function({ route, redirect, store, commit }) {
  store.commit('filters/removeSelectedFilters')

  const landingType = route.params.type
  const typeData = store.state.filters.types.find((item) => {
    return (
      item.type.name
        .replace(/-/g, ' ')
        .replace(/[åÅ]/g, 'a')
        .replace(/[öÖ]/g, 'o')
        .toLowerCase() === landingType
    )
  })

  if (!typeData) {
    return redirect(`/${route.params.base}/notfound`)
  }

  store.commit('filters/setType', typeData)

  await store.dispatch('filters/FETCH_FILTERS')

  const landing = store.state.landing.categoriesLandings.find(
    (item) => item.url === `/${route.params.type}/${route.params.category}`
  )

  if (!landing) {
    return redirect(`/${route.params.base}/notfound`)
  }

  const id = landing.category.id

  store.commit('filters/setSelectedFilters', {
    name: 'categories',
    values: [id]
  })

  await store.dispatch('product/FETCH_ALL', { toNextPage: false })
}
