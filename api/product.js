import axios from 'axios'

class ProductApi {
  async getVehicle(data) {
    const { id, auth, financeFormId, typeId } = data

    try {
      return await axios({
        method: 'POST',
        url: process.env.BASE_URL + `vehicles/${id}`,
        headers: {
          Accept: 'application/json',
          'X-Partner-Key': process.env.NUXT_ENV_PARTNER_KEY,
          'Content-Type': 'application/json',
          Authorization: auth
        },
        data: {
          financeFormId,
          typeId
        }
      })
    } catch (err) {
      throw new Error(err)
    }
  }
}

// eslint-disable-next-line no-undef
export default new ProductApi()
