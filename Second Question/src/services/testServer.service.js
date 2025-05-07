const axios = require('axios');
const config = require('../config');
const authService = require('./auth.service');

class TestServerService {
  async fetchData(endpoint) {
    if (Date.now() >= config.TOKEN_EXPIRY) {
      await authService.refreshToken();
    }
  
    const headers = {
      Authorization: `Bearer ${config.ACCESS_TOKEN}`
    };
  
    return axios.get(endpoint, { headers });
  }
}

module.exports = new TestServerService();