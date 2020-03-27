export default async function({ route, store }) {
  await store.dispatch('reseller/FETCH_AUTH')

  await store.dispatch('landing/FETCH_ALL_LANDINGS')

  await store.dispatch('landing/FETCH_ALL_CATEGORIES_LANDINGS')
}
