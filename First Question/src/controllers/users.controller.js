const dataService = require('../services/data.service');
const { cache } = require('../utils/cache');

const cacheTTL = 300; // 5 minutes

module.exports = {
  getTopUsers: async (req, res) => {
    try {
      const cacheKey = 'topUsers';
      const cachedData = cache.get(cacheKey);
      
      if (cachedData) {
        return res.json(cachedData);
      }

      const topUsers = await dataService.getTopUsers();
      cache.set(cacheKey, topUsers, cacheTTL);
      res.json(topUsers);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch top users' });
    }
  }
};