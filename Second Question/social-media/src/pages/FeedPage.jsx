import { useState, useEffect } from 'react';
import { getFeedPosts } from '../services/apiService';
import { Typography, Card, CardContent, CardMedia, Grid, Paper, CircularProgress, Alert, Box, Button, Avatar, CardHeader, IconButton, Chip } from '@mui/material';
import { Refresh as RefreshIcon, Comment as CommentIcon, Person as PersonIcon, CalendarToday as CalendarTodayIcon } from '@mui/icons-material';

function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = async (isInitialLoad = false) => {
    if (!isInitialLoad) setLoading(true); // Show loading spinner for manual refresh
    try {
      const data = await getFeedPosts();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch feed posts. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(true); // Initial load
    const interval = setInterval(() => fetchPosts(false), 60000); // Refresh every 60 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading && posts.length === 0) return <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh"><CircularProgress size={50} /></Box>;
  if (error && posts.length === 0) return <Alert severity="error" sx={{ mt: 2, mx: 'auto', maxWidth: 'md' }}>{error}</Alert>;

  return (
    <Box>
      <Paper elevation={1} sx={{ p: { xs: 2, md: 3 }, mb: 3, backgroundColor: 'background.paper' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
            Live Feed
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => fetchPosts(false)}
            disabled={loading}
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <RefreshIcon />}
          >
            Refresh
          </Button>
        </Box>
        {error && <Alert severity="warning" sx={{ mb: 2 }}>{error} Displaying latest available data.</Alert>}
      </Paper>

      {posts.length === 0 && !loading && (
        <Typography variant="h6" align="center" sx={{ mt: 5, color: 'text.secondary' }}>
          No posts in the feed yet. Check back soon!
        </Typography>
      )}

      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%', borderRadius: 2 }}>
              <CardHeader
                avatar={
                  <Avatar 
                    sx={{ bgcolor: 'primary.main' }} 
                    src={`https://i.pravatar.cc/150?u=${post.userid}`}
                    alt={`User ${post.userid}`}
                  >
                    {post.userid ? `U${post.userid.toString().slice(0,1)}` : '?'}
                  </Avatar>
                }
                titleTypographyProps={{ variant: 'subtitle1', fontWeight: 'medium' }}
                title={post.title || `Post ${post.id}`}
                subheader={
                  <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary', mt: 0.5 }}>
                    <CalendarTodayIcon sx={{ fontSize: '1rem', mr: 0.5 }} />
                    <Typography variant="caption">
                      {new Date(post.timestamp || post.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                }
              />
              <CardMedia
                component="img"
                height="180"
                image={`https://picsum.photos/seed/${post.id}/600/400`} // Higher res images
                alt={post.title || 'Post image'}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: '60px' }}>
                  {post.body ? (post.body.length > 100 ? `${post.body.substring(0, 97)}...` : post.body) : 'No content available.'}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Chip
                    icon={<CommentIcon />}
                    label={`${post.commentCount !== undefined ? post.commentCount : 0} Comments`}
                    size="small"
                    variant="outlined"
                  />
                   <Chip
                    icon={<PersonIcon />}
                    label={`User ${post.userid}`}
                    size="small"
                    variant="outlined"
                    component="span" // To avoid console warning with Avatar inside Chip if user name was an Avatar
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default FeedPage;