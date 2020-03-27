import axios from 'axios'

class ResellerApi {
  async get() {
    try {
      return await axios({
        method: 'POST',
        url: process.env.BASE_URL + 'reseller/auth',
        headers: {
          Accept: 'application/json',
          'X-Partner-Key': process.env.NUXT_ENV_PARTNER_KEY,
          'Content-Type': 'application/json'
        }
      })
    } catch (err) {
      throw new Error(err)
    }
  }
}

// eslint-disable-next-line no-undef
export default new ResellerApi()
