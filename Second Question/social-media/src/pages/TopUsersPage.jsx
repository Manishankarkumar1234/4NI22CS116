import { useState, useEffect } from 'react';
import { getTopUsers } from '../services/apiService';
import { Typography, List, ListItem, ListItemAvatar, Avatar, ListItemText, Paper, CircularProgress, Alert, Box, Divider, Chip } from '@mui/material';
import { Star as StarIcon, Article as ArticleIcon } from '@mui/icons-material';

function TopUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const data = await getTopUsers();
        setUsers(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch top users. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh"><CircularProgress size={50} /></Box>;
  if (error) return <Alert severity="error" sx={{ mt: 2, mx: 'auto', maxWidth: 'md' }}>{error}</Alert>;

  return (
    <Paper elevation={1} sx={{ p: { xs: 2, md: 3 }, backgroundColor: 'background.paper', borderRadius: 2 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Top Users
      </Typography>
      {users.length === 0 && !loading && (
        <Typography variant="h6" align="center" sx={{ mt: 5, color: 'text.secondary' }}>
          No top users found yet.
        </Typography>
      )}
      <List>
        {users.map((user, index) => (
          <Box key={user.id || index}>
            <ListItem sx={{ 
              py: 2, 
              my: 1, 
              backgroundColor: index < 3 ? 'action.hover' : 'transparent', // Highlight top 3
              borderRadius: '8px',
              transition: 'background-color 0.3s',
              '&:hover': {
                backgroundColor: 'action.selected'
              }
            }}>
              <ListItemAvatar>
                <Avatar 
                  sx={{ 
                    width: 56, 
                    height: 56, 
                    mr: 2, 
                    bgcolor: index === 0 ? 'secondary.main' : (index === 1 ? 'primary.light' : 'grey.700') 
                  }} 
                  src={`https://i.pravatar.cc/150?u=${user.id}`} 
                  alt={user.name}
                >
                  {user.name ? user.name.charAt(0) : '?'}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="h6" component="span" sx={{ fontWeight: 'medium' }}>
                    {`${index + 1}. ${user.name || 'Unknown User'}`}
                    {index < 3 && <StarIcon sx={{ color: 'warning.main', ml: 1, verticalAlign: 'middle', fontSize: '1.2rem' }} />}
                  </Typography>
                }
                secondary={
                  <Chip 
                    icon={<ArticleIcon />} 
                    label={`${user.postCount !== undefined ? user.postCount : 0} Posts`} 
                    size="small" 
                    sx={{ mt: 0.5 }}
                  />
                }
              />
            </ListItem>
            {index < users.length - 1 && <Divider variant="inset" component="li" />}
          </Box>
        ))}
      </List>
    </Paper>
  );
}

export default TopUsersPage;