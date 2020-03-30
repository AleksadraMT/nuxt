export const state = () => ({
  maintenanceMode: false
})

export const getters = {
  getMaintenanceMode: (state) => state.maintenanceMode
}

export const mutations = {
  setMaintenanceMode: (state, value) => (state.maintenanceMode = value)
}

export const actions = {
  SET({ commit }, data) {
    commit(data.mutation, data.value)
  }
}
