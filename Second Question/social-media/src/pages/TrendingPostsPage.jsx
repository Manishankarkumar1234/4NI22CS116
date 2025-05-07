import { useState, useEffect } from 'react';
import { getTrendingPosts } from '../services/apiService';
import { Typography, Card, CardContent, CardMedia, Grid, Paper, CircularProgress, Alert, Box, Avatar, CardHeader, Chip } from '@mui/material';
import { Whatshot as WhatshotIcon, Comment as CommentIcon, Person as PersonIcon, CalendarToday as CalendarTodayIcon } from '@mui/icons-material';

function TrendingPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const data = await getTrendingPosts();
        setPosts(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch trending posts. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh"><CircularProgress size={50} /></Box>;
  if (error) return <Alert severity="error" sx={{ mt: 2, mx: 'auto', maxWidth: 'md' }}>{error}</Alert>;

  return (
    <Paper elevation={1} sx={{ p: { xs: 2, md: 3 }, backgroundColor: 'background.paper', borderRadius: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3, display: 'flex', alignItems: 'center' }}>
        <WhatshotIcon color="error" sx={{ fontSize: '2.5rem', mr: 1 }} /> Trending Posts
      </Typography>
      {posts.length === 0 && !loading && (
         <Typography variant="h6" align="center" sx={{ mt: 5, color: 'text.secondary' }}>
          No trending posts found at the moment.
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
                image={`https://picsum.photos/seed/${post.id}/600/400`}
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
                    color="secondary" // Highlight comment count for trending
                    variant="filled"
                  />
                   <Chip
                    icon={<PersonIcon />}
                    label={`User ${post.userid}`}
                    size="small"
                    variant="outlined"
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
}

export default TrendingPostsPage;