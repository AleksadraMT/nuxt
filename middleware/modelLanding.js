export default async function({ route, redirect, store, commit }) {
  store.commit('filters/removeSelectedFilters')

  const routeBrand = route.params.brandLanding
  // eslint-disable-next-line no-unused-vars
  const routeModel = route.params.modelLanding
  const allLandings = store.state.landing.allLandings

  if (!allLandings.length) {
    return redirect(`/${route.params.base}/notfound`)
  }

  const landingData = allLandings.find((item) => {
    return item.brand.name.toLowerCase().replace(/' '/g, '-') === routeBrand
  })

  if (!landingData) {
    return redirect(`/${route.params.base}/notfound`)
  }

  const landingId = landingData.id
  const landingTypeId = landingData.type.id
  const brandId = landingData.brand.id

  const type = store.state.filters.types.find((item) => {
    return item.type.id === landingTypeId
  })

  store.commit('filters/setType', type)
  await store.dispatch('landing/FETCH_BRAND_LANDING', { id: landingId })

  const modelLandings = store.state.landing.brandLanding.modelLandings.data

  const currentRoute = `/${route.params.brandLanding}/${route.params.modelLanding}`

  const modelData = modelLandings.find((item) => item.url === currentRoute)

  store.commit('filters/setSelectedFilters', {
    name: 'brands',
    values: [brandId]
  })

  if (typeof modelData !== 'undefined') {
    store.commit('landing/setModelData', modelData)
  } else {
    return redirect(`/${route.params.base}/notfound`)
  }

  store.commit('filters/setSelectedFilters', {
    name: 'models',
    values: [modelData.model_id]
  })

  await store.dispatch('filters/FETCH_FILTERS')

  await store.dispatch('product/FETCH_ALL', { toNextPage: false })
}
