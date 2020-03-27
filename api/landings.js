import axios from 'axios'

class LandingsApi {
  async getAll(auth) {
    try {
      return await axios({
        method: 'GET',
        url: process.env.BASE_URL + 'reseller/brand-landings',
        headers: {
          Accept: 'application/json',
          'X-Partner-Key': process.env.NUXT_ENV_PARTNER_KEY,
          'Content-Type': 'application/json',
          Authorization: auth
        }
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async getBrandLanding(auth, id) {
    try {
      return await axios({
        method: 'GET',
        url: `${process.env.BASE_URL}reseller/brand-landings/${id}`,
        headers: {
          Accept: 'application/json',
          'X-Partner-Key': process.env.NUXT_ENV_PARTNER_KEY,
          'Content-Type': 'application/json',
          Authorization: auth
        }
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  async getAllCategoriesLandings(auth) {
    try {
      return await axios({
        method: 'GET',
        url: `${process.env.BASE_URL}reseller/category-landings`,
        headers: {
          Accept: 'application/json',
          'X-Partner-Key': process.env.NUXT_ENV_PARTNER_KEY,
          'Content-Type': 'application/json',
          Authorization: auth
        }
      })
    } catch (err) {
      throw new Error(err)
    }
  }
}

export default new LandingsApi()
