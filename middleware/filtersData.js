export default async function({ route, redirect, store }) {
  await store.dispatch('filters/FETCH_FILTERS')
}
