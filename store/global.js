import Vue from 'vue'

/* eslint-disable no-empty-pattern */
export const state = () => ({
  resellerInfo: {}
})

export const getters = {
  getResellerInfo: (state) => state.resellerInfo
}

export const mutations = {
  updateResellerInfo: (state, data) => {
    Vue.set(state, 'resellerInfo', data)
  }
}

export const actions = {
  async FETCH_POST({}, data) {
    try {
      return await this.$axios({
        method: 'POST',
        url: data.url,
        headers: {
          'X-Partner-Key': process.env.NUXT_ENV_PARTNER_KEY
        }
      })
    } catch (error) {
      return console.error(error)
    }
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
      return console.error(error)
    }
  },
  SET({ commit }, data) {
    commit(data.mutation, data.data)
  }
}
