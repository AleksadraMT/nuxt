import ProductApi from '~/api/product'

export const state = () => ({
  nextPage: 1,
  pagination: {},
  vehicles: []
})

export const getters = {
  getNextPage: (state) => {
    const currentPage = state.pagination.current_page
    const totalPages = state.pagination.total_pages

    return currentPage + 1 <= totalPages ? currentPage + 1 : null
  }
}

export const mutations = {
  setPagination: (state, pagination) => (state.pagination = pagination),
  setVehicles: (state, vehicles) =>
    vehicles.forEach((vehicle) => {
      const allVehicleIds = state.vehicles.map((item) => item.id)

      if (!allVehicleIds.includes(vehicle.id)) state.vehicles.push(vehicle)
    })
}

export const actions = {
  async FETCH_ALL({ commit, rootState, getters }, data) {
    const { toNextPage } = data

    const response = await ProductApi.getAll({
      nextPage: toNextPage ? getters.getNextPage : 1,
      perPage: 15,
      sort: rootState.filters.selectedTypeOfSort,
      auth: rootState.reseller.token,
      financeFormId: rootState.filters.finance_form_id,
      typeId: rootState.filters.type.type.id,
      selectedFilters: rootState.filters.selectedFilters
    })

    commit('setVehicles', response.data.data)
    commit('setPagination', response.data.meta.pagination)
  },
  FETCH_VEHICLE({ commit }) {
    return {}
  }
}
