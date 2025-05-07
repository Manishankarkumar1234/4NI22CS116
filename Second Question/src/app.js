const express = require('express');
const config = require('./config');
const apiRoutes = require('./routes/api');
const { initializeCache } = require('./utils/cache');
const cors = require('cors');  // Make sure cors is installed

const app = express();

// Middleware
app.use(cors());  // Add CORS middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize cache
initializeCache();

// API Routes
app.use('/api', apiRoutes);

// Error handling with improved logging
app.use((err, req, res, next) => {
  console.error('Error details:', err);
  console.error('Stack trace:', err.stack);
  res.status(500).json({ error: 'Internal Server Error', message: err.message });
});

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});