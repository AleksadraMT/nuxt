export default function({ route, store }) {
  store
    .dispatch('global/FETCH_POST', {
      url: 'reseller/auth'
    })
    .then((response) => {
      store.dispatch('global/SET', {
        mutation: 'updateResellerInfo',
        data: response.data
      })
    })
}
