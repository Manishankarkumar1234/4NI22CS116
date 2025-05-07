const axios = require('axios');
const config = require('../config');
const { cache } = require('../utils/cache');

class AuthService {
  async refreshToken() {
    try {
      console.log('Attempting to refresh token with:', {
        email: process.env.REGISTERED_EMAIL,
        rollNo: process.env.ROLL_NO,
        accessCode: process.env.ACCESS_CODE,
        clientID: process.env.CLIENT_ID
      });
      
      const response = await axios.post(`${config.TEST_SERVER}/auth`, {
        email: process.env.REGISTERED_EMAIL,
        name: process.env.REGISTERED_NAME,
        rollNo: process.env.ROLL_NO,
        accessCode: process.env.ACCESS_CODE,
        clientID: config.CLIENT_ID,
        clientSecret: config.CLIENT_SECRET
      });

      config.ACCESS_TOKEN = response.data.access_token;
      config.TOKEN_EXPIRY = Date.now() + (response.data.expires_in * 1000);
      console.log('Token refresh successful');
      return true;
    } catch (error) {
      console.error('Token refresh failed:', error.message);
      if (error.response) {
        console.error('Server response:', error.response.data);
      }
      return false;
    }
  }

  async getAuthHeader() {
    if (!config.ACCESS_TOKEN || Date.now() >= config.TOKEN_EXPIRY) {
      await this.refreshToken();
    }
    return { Authorization: `Bearer ${config.ACCESS_TOKEN}` };
  }
}

module.exports = new AuthService();