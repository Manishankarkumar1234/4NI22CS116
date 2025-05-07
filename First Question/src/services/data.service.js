const { groupBy } = require('../utils/helpers');

class DataService {
  constructor() {
    // Hardcoded users array (10 users)
    this.users = [
      { id: "1", name: "Alice Johnson" },
      { id: "2", name: "Bob Smith" },
      { id: "3", name: "Charlie Brown" },
      { id: "4", name: "Diana Prince" },
      { id: "5", name: "Evan Davis" },
      { id: "6", name: "Fiona Gallagher" },
      { id: "7", name: "George Martin" },
      { id: "8", name: "Hannah Lee" },
      { id: "9", name: "Ian Fleming" },
      { id: "10", name: "Jane Doe" },
    ];

    const now = Date.now();
    // Hardcoded posts array (10 posts, various users)
    this.posts = [
      { id: "101", userid: "1", title: "Alice's First Post", body: "This is the first post from Alice.", createdAt: now - 1000000 },
      { id: "102", userid: "2", title: "Bob's Insight", body: "Bob shares an interesting thought.", createdAt: now - 2000000 },
      { id: "103", userid: "3", title: "Charlie on Life", body: "Charlie writes about everyday life.", createdAt: now - 3000000 },
      { id: "104", userid: "1", title: "Alice Again", body: "Alice posts a follow-up to her first post.", createdAt: now - 4000000 },
      { id: "105", userid: "4", title: "Diana's Update", body: "Diana updates everyone on her recent plans.", createdAt: now - 5000000 },
      { id: "106", userid: "5", title: "Evan's Story", body: "Evan recounts a memorable event.", createdAt: now - 6000000 },
      { id: "107", userid: "6", title: "Fiona's Thoughts", body: "Fiona discusses modern art.", createdAt: now - 7000000 },
      { id: "108", userid: "2", title: "Bob's Second Post", body: "Another insight from Bob.", createdAt: now - 8000000 },
      { id: "109", userid: "7", title: "George's Opinion", body: "George shares his take on current events.", createdAt: now - 9000000 },
      { id: "110", userid: "8", title: "Hannah Speaks", body: "Hannah explains her perspective.", createdAt: now - 10000000 },
    ];

    // Hardcoded comments array (representing interactions on posts)
    this.comments = [
      { id: "201", postid: "101", body: "Great post, Alice!" },
      { id: "202", postid: "101", body: "I totally agree." },
      { id: "203", postid: "102", body: "Nice insight, Bob!" },
      { id: "204", postid: "103", body: "Really thoughtful message, Charlie." },
      { id: "205", postid: "104", body: "Looking forward to more from you, Alice." },
      { id: "206", postid: "104", body: "Well written follow up." },
      { id: "207", postid: "104", body: "This resonated with me." },
      { id: "208", postid: "105", body: "Thanks for the update, Diana." },
      { id: "209", postid: "106", body: "Evan, that was an amazing story." },
      { id: "210", postid: "101", body: "Keep the posts coming!" },
      { id: "211", postid: "107", body: "Fiona, you rock!" },
      { id: "212", postid: "108", body: "Another great one, Bob." },
      { id: "213", postid: "108", body: "Loved the details." },
      { id: "214", postid: "109", body: "Solid opinion, George." },
      { id: "215", postid: "110", body: "Inspiring words, Hannah." },
      { id: "216", postid: "110", body: "Very informative post." },
      { id: "217", postid: "110", body: "Keep it up!" },
    ];
  }

  // Instead of fetching from an external API, return hardcoded data
  async fetchPaginatedData(endpoint) {
    if (endpoint === 'users') return this.users;
    if (endpoint === 'posts') return this.posts;
    if (endpoint === 'comments') return this.comments;
    return [];
  }

  async getTopUsers() {
    const allUsers = await this.fetchPaginatedData('users');
    const posts = await this.fetchPaginatedData('posts');

    if (!allUsers || allUsers.length === 0) return [];
    if (!posts || posts.length === 0) return [];

    const usersMap = allUsers.reduce((map, user) => {
      map[user.id] = user;
      return map;
    }, {});

    const postsByUser = groupBy(posts, 'userid');

    const topUsersResult = Object.entries(postsByUser)
      .map(([userId, userPosts]) => {
        const user = usersMap[userId] || { id: userId, name: `User ${userId}` };
        return { id: userId, name: user.name, postCount: userPosts.length };
      })
      .sort((a, b) => b.postCount - a.postCount)
      .slice(0, 5);

    return topUsersResult;
  }

  async getPosts(type) {
    const posts = await this.fetchPaginatedData('posts');
    const comments = await this.fetchPaginatedData('comments');

    if (!posts || posts.length === 0) return [];

    const postsWithDetails = posts.map(post => ({
      ...post,
      commentCount: comments.filter(c => String(c.postid) === String(post.id)).length,
      timestamp: new Date(post.createdAt).getTime()
    }));

    if (type === 'popular') {
      const maxComments = Math.max(0, ...postsWithDetails.map(p => p.commentCount));
      const popularPosts = postsWithDetails.filter(p => p.commentCount === maxComments);
      return popularPosts;
    }

    // Default: return latest 5 posts sorted by timestamp descending
    const latestPosts = postsWithDetails
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 5);
    return latestPosts;
  }
}

module.exports = new DataService();