/* eslint-disable no-empty-pattern */

import ResellerApi from '~/api/reseller'

export const state = () => ({
  resellerInfo: {},
  token: '',
  finFormsCollectionName: 'privat'
})

export const mutations = {
  setResellerInfo: (state, data) => {
    state.resellerInfo = data
  },
  setToken: (state, token) => (state.token = token),
  setFinFormsCollectionName: (state, name) =>
    (state.finFormsCollectionName = name)
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
  }
}

export const actions = {
  async FETCH_AUTH({ commit }) {
    const response = await ResellerApi.get()

    commit('setResellerInfo', response.data)
    commit('setToken', `Bearer ${response.data.token}`)
  },
  async GET({}, data) {
    try {
      return await this.$axios({
        method: 'GET',
        url: data.url,
        headers: {
          'X-Partner-Key': process.env.NUXT_ENV_PARTNER_KEY
        }
      })
    } catch (error) {
      throw new Error(error)
    }
  },
  SET({ commit }, data) {
    commit(data.mutation, data.data)
  }
}
