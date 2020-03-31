/* eslint-disable no-empty-pattern */

import ResellerApi from '~/api/reseller'

export const state = () => ({
  resellerInfo: {},
  token: '',
  financeFormCollectionName: '',
  siteStyle: {},
  metaDescription:
    'Sök, jämför & beställ din bil online. Stort urval och bra priser!'
})

export const mutations = {
  setResellerInfo: (state, data) => (state.resellerInfo = data),
  setToken: (state, token) => (state.token = token),
  setFinanceFormsCollectionName: (state, name) =>
    (state.financeFormCollectionName = name),
  setSiteStyle: (state, style) => (state.siteStyle = style)
}

export const getters = {
  getResellerInfo: (state) => state.resellerInfo,
  getFormsCollection: (state, rootState) => {
    const finForms = state.resellerInfo.financeForms

    if (!(finForms && finForms.data.length)) return []

    const sortedCollection = [
      ...new Set(finForms.data.map((item) => rootState.filters.type.type.id))
    ]

    return sortedCollection[0] !== 'Private'
      ? sortedCollection.reverse()
      : sortedCollection
  },
  getFilteredFinanceForms: (state, rootState) => (form) => {
    const finForms = state.resellerInfo.financeForms
    const financeForms = finForms && !!finForms.data.length ? finForms.data : []

    if (!financeForms.length) return []

    const filteredFinanceForms = financeForms.filter(
      (item) => rootState.filter.type.toLowerCase() === form
    )

    return filteredFinanceForms
  },
  getSiteStyle: (state) => state.siteStyle
}

export const actions = {
  async FETCH_AUTH({ commit }) {
    const response = await ResellerApi.get()

    commit('setResellerInfo', response.data)
    commit('setToken', `Bearer ${response.data.token}`)
  },
  async FETCH_STYLE({ commit, state, rootState }) {
    const response = await ResellerApi.getBuilder({
      auth: state.token,
      financeFormId: rootState.filters.finance_form_id,
      typeId: rootState.filters.type.type.id
    })

    commit('setSiteStyle', response.data)
  },
  UPDATE_COLLECTION_NAME({ commit }, name) {
    commit('setFinanceFormsCollectionName', name)
  }
}
