import FilterApi from '~/api/filter'

export const state = () => ({
  finance_form_id: null,
  finance_form_name: '',
  types: {},
  type: ''
})

export const getters = {
  getTypes: (state) => state.types,
  getType: (state) => state.type
}

export const mutations = {
  setFinanceFormId: (state, id) => (state.finance_form_id = id),
  setFinanceFormName: (state, name) => (state.finance_form_name = name),
  setTypes: (state, types) => (state.types = types),
  setType: (state, type) => (state.type = type)
}

export const actions = {
  async FETCH_TYPES({ commit, state, rootState }) {
    const response = await FilterApi.getTypes({
      auth: rootState.reseller.token,
      financeFormId: state.finance_form_id
    })

    const type = response.data.data.find((item) => item.default)

    commit('setTypes', response.data.data)
    commit('setType', type)
  },
  UPDATE_DEFAULTS({ commit, dispatch, rootState }) {
    const { financeForms, settings } = rootState.reseller.resellerInfo
    const financeFormsArr = financeForms.data ? financeForms.data : financeForms
    const financeFormCollectionName = settings.defaultFinanceFormType.toLowerCase()
    let urlFormName

    if (process.client) {
      // when direct url to the car take finance form from the URL of the car
      const urlForm = window.location.search
        .replace('?', '')
        .split('&')
        .find((item) => item.includes('financeform'))
      urlFormName = urlForm
        ? urlForm.replace('financeform=', '').replace('-', ' ')
        : ''
    }

    const defaultForm = financeFormsArr.find((item) => {
      // if client and we have data about finane form in the url
      if (process.client && urlFormName) {
        return (
          item.name.toLowerCase() === urlFormName &&
          item.type.toLowerCase() === financeFormCollectionName
        )
      } else {
        return (
          item.default && item.type.toLowerCase() === financeFormCollectionName
        )
      }
    })

    commit('setFinanceFormId', defaultForm.id)
    commit('setFinanceFormName', defaultForm.name)
  }
}
