import axios from 'axios'
const orderApi = 'http://192.168.4.50:7054/'
module.exports = {
    getJdAddress (api, id = '') {
      return axios.get(`${api}${id}`)
    }
  }