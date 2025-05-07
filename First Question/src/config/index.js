require('dotenv').config();

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 3000,
  TEST_SERVER: 'http://20.244.56.144/evaluation-service',
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  ACCESS_TOKEN: null,
  TOKEN_EXPIRY: null
};