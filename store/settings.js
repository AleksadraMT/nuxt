export const state = () => ({
  maintenanceMode: false,
  subMenuVisibility: false,
  brandListVisible: false,
  categoriesListVisible: false,
  isHomePage: true
})

export const getters = {
  getMaintenanceMode: (state) => state.maintenanceMode
}

export const mutations = {
  setMaintenanceMode: (state, value) => (state.maintenanceMode = value),
  setSubMenuVisibility: (state, value) => (state.subMenuVisibility = value),
  setBrandListVisible: (state, value) => (state.brandListVisible = value),
  setCategoriesListVisible: (state, value) =>
    (state.categoriesListVisible = value),
  setIsHomePage: (state, status) => (state.isHomePage = status)
}

export const actions = {
  SET({ commit }, data) {
    commit(data.mutation, data.value)
  }
}
