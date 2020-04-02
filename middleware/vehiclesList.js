export default async function({ store }) {
  await store.dispatch('filters/FETCH_FILTERS')
  await store.dispatch('product/FETCH_ALL', { toNextPage: true })
}
