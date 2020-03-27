import LandingsApi from '~/api/landings'

export const state = () => ({
  allLandings: {},
  brandLanding: {},
  modelsLandings: {},
  categoriesLandings: {}
})

export const getters = {
  getAllLandings: (state) => state.allLandings,
  getBrandLanding: (state) => state.brandLanding,
  getModelsLandings: (state) => state.modelsLandings,
  getCategoriesLandings: (state) => state.categoriesLandings
}

export const mutations = {
  setAllLandings: (state, all) => (state.allLandings = all),
  setBrandLanding: (state, one) => (state.brandLanding = one),
  setModelsLandings: (state, all) => (state.modelsLandings = all),
  setCategoriesLandings: (state, all) => (state.categoriesLandings = all)
}

export const actions = {
  async FETCH_ALL_LANDINGS({ commit, rootState }) {
    const response = await LandingsApi.getAll(rootState.reseller.token)

    commit('setAllLandings', response.data.data)
  },
  async FETCH_BRAND_LANDING({ commit, rootState }) {
    const response = await LandingsApi.getBrandLanding()

    commit('setBrandLanding', response.data)
  },
  async FETCH_ALL_CATEGORIES_LANDINGS({ commit, rootState }) {
    const response = await LandingsApi.getAllCategoriesLandings(
      rootState.reseller.token
    )

    commit('setCategoriesLandings', response.data.data)
  }
}
