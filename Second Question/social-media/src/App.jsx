import { Routes, Route, Link as RouterLink, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, Box, Button, Tabs, Tab } from '@mui/material';
import { Feed, TrendingUp, People } from '@mui/icons-material'; // Icons
import TopUsersPage from './pages/TopUsersPage';
import TrendingPostsPage from './pages/TrendingPostsPage';
import FeedPage from './pages/FeedPage';

function App() {
  const location = useLocation();

  const getTabValue = () => {
    if (location.pathname === '/top-users') return 1;
    if (location.pathname === '/trending') return 2;
    return 0; // Default to Feed
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            Social<span style={{ color: '#7986cb' }}>Insights</span>
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            <Button startIcon={<Feed />} color="inherit" component={RouterLink} to="/" sx={{ fontWeight: location.pathname === '/' ? 'bold' : 'normal' }}>Feed</Button>
            <Button startIcon={<People />} color="inherit" component={RouterLink} to="/top-users" sx={{ fontWeight: location.pathname === '/top-users' ? 'bold' : 'normal' }}>Top Users</Button>
            <Button startIcon={<TrendingUp />} color="inherit" component={RouterLink} to="/trending" sx={{ fontWeight: location.pathname === '/trending' ? 'bold' : 'normal' }}>Trending</Button>
          </Box>
        </Toolbar>
      </AppBar>
      
      {/* Main content area */}
      <Container component="main" sx={{ flexGrow: 1, py: 4, px: { xs: 2, md: 3 } }}>
        <Routes>
          <Route path="/" element={<FeedPage />} />
          <Route path="/top-users" element={<TopUsersPage />} />
          <Route path="/trending" element={<TrendingPostsPage />} />
          <Route path="*" element={<Typography variant="h4" align="center" sx={{ mt: 5 }}>Page Not Found</Typography>} />
        </Routes>
      </Container>

      {/* Bottom Navigation for smaller screens (optional, but good for mobile UX) */}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, display: { xs: 'block', md: 'none' }, zIndex: 1000 }} elevation={3}>
        <Tabs
          value={getTabValue()}
          // onChange={(event, newValue) => { /* Handle navigation if needed, RouterLink handles it now */ }}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="bottom navigation tabs"
        >
          <Tab icon={<Feed />} label="Feed" component={RouterLink} to="/" />
          <Tab icon={<People />} label="Top Users" component={RouterLink} to="/top-users" />
          <Tab icon={<TrendingUp />} label="Trending" component={RouterLink} to="/trending" />
        </Tabs>
      </Paper>
      {/* Add padding to the bottom of the content to avoid overlap with fixed bottom navigation */}
      <Box sx={{ height: { xs: '56px', md: '0' }, flexShrink: 0 }} /> 
    </Box>
  );
}

export default App;