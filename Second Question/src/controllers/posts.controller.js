const dataService = require('../services/data.service');
const { cache } = require('../utils/cache');

const cacheTTL = 300; // 5 minutes

module.exports = {
  getPosts: async (req, res) => {
    try {
      const { type } = req.query;
      const cacheKey = type ? `posts_${type}` : 'posts_latest';
      const cachedData = cache.get(cacheKey);
      
      if (cachedData) {
        return res.json(cachedData);
      }

      const posts = await dataService.getPosts(type);
      cache.set(cacheKey, posts, cacheTTL);
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch posts' });
    }
  }
};