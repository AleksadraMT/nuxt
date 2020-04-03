export const state = () => ({
  maintenanceMode: false,
  subMenuVisibility: false,
  brandListVisible: false,
  categoriesListVisible: false,
  isHomePage: true,
  homeDelivery: false,
  deliveryTime: false,
  driving_license: false,
  person_number: false,
  bankId: {},
  salesForce: {},
  calendar: {},
  terms: []
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
  setIsHomePage: (state, status) => (state.isHomePage = status),
  setHomeDelivery: (state, value) => (state.homeDelivery = value),
  setDeliveryTime: (state, value) => (state.deliveryTime = value),
  setDrivingLicense: (state, value) => (state.driving_license = value),
  setPersonNumber: (state, value) => (state.person_number = value),
  setBankId: (state, value) => (state.bankId = value),
  setSalesForce: (state, value) => (state.salesForce = value),
  setCalendar: (state, value) => (state.calendar = value),
  setTerms: (state, value) => (state.terms = value)
}

export const actions = {
  SET_ALL({ commit, rootState }) {
    const settings = rootState.reseller.resellerInfo.settings

    commit('setHomeDelivery', settings.homeDelivery)
    commit('setDeliveryTime', settings.deliveryTime)
    commit('setDrivingLicense', settings.driving_license)
    commit('setPersonNumber', settings.person_number)
    commit('setBankId', settings.bankId)
    commit('setSalesForce', settings.salesForce)
    commit('setCalendar', settings.calendar)
    commit('setTerms', settings.terms)
  },
  SET({ commit }, data) {
    commit(data.mutation, data.value)
  }
}
