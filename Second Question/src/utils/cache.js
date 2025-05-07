const NodeCache = require('node-cache');

const cache = new NodeCache({ stdTTL: 600, checkperiod: 120 });

const initializeCache = () => {
  console.log('Cache initialized');
};

module.exports = {
  cache,
  initializeCache
};