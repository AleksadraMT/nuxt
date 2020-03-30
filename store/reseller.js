/* eslint-disable no-empty-pattern */

import ResellerApi from '~/api/reseller'

export const state = () => ({
  resellerInfo: {},
  token: '',
  financeFormCollectionName: '',
  finance_form_id: null,
  finance_form_name: '',
  types: {},
  type: '',
  siteStyle: {},
  metaDescription:
    'Sök, jämför & beställ din bil online. Stort urval och bra priser!'
})

export const mutations = {
  setResellerInfo: (state, data) => (state.resellerInfo = data),
  setToken: (state, token) => (state.token = token),
  setFinanceFormsCollectionName: (state, name) =>
    (state.financeFormCollectionName = name),
  setFinanceFormId: (state, id) => (state.finance_form_id = id),
  setFinanceFormName: (state, name) => (state.finance_form_name = name),
  setTypes: (state, types) => (state.types = types),
  setType: (state, type) => (state.type = type),
  setSiteStyle: (state, style) => (state.siteStyle = style)
}

export const getters = {
  getResellerInfo: (state) => state.resellerInfo,
  getFormsCollection: (state) => {
    const finForms = state.resellerInfo.financeForms

    if (!(finForms && finForms.data.length)) return []

    const sortedCollection = [
      ...new Set(finForms.data.map((item) => item.type))
    ]

    return sortedCollection[0] !== 'Private'
      ? sortedCollection.reverse()
      : sortedCollection
  },
  getFilteredFinanceForms: (state) => (form) => {
    const finForms = state.resellerInfo.financeForms
    const financeForms = finForms && !!finForms.data.length ? finForms.data : []

    if (!financeForms.length) return []

    const filteredFinanceForms = financeForms.filter(
      (item) => item.type.toLowerCase() === form
    )

    return filteredFinanceForms
  },
  getTypes: (state) => state.types,
  getType: (state) => state.type,
  getSiteStyle: (state) => state.siteStyle
}

export const actions = {
  async FETCH_AUTH({ commit }) {
    const response = await ResellerApi.get()

    commit('setResellerInfo', response.data)
    commit('setToken', `Bearer ${response.data.token}`)
  },
  async FETCH_TYPES({ commit, state }) {
    const response = await ResellerApi.getTypes({
      auth: state.token,
      financeFormId: state.finance_form_id
    })

    const type = response.data.data.find((item) => item.default)

    commit('setTypes', response.data.data)
    commit('setType', type)
  },
  async FETCH_STYLE({ commit, state }) {
    const response = await ResellerApi.getBuilder({
      auth: state.token,
      financeFormId: state.finance_form_id,
      typeId: state.type.type.id
    })

    commit('setSiteStyle', response.data)
  },
  UPDATE_DEFAULTS({ commit, state }) {
    const { financeForms, settings } = state.resellerInfo
    const financeFormsArr = financeForms.data ? financeForms.data : financeForms
    let urlFormName

    commit(
      'setFinanceFormsCollectionName',
      settings.defaultFinanceFormType.toLowerCase()
    )

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
          item.type.toLowerCase() === state.financeFormCollectionName
        )
      } else {
        return (
          item.default &&
          item.type.toLowerCase() === state.financeFormCollectionName
        )
      }
    })

    commit('setFinanceFormId', defaultForm.id)
    commit('setFinanceFormName', defaultForm.name)
  }
}
