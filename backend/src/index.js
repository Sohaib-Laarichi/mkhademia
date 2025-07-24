require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import middleware
const { 
  generalLimiter, 
  securityHeaders, 
  corsOptions, 
  requestLogger, 
  errorHandler, 
  notFoundHandler,
  extractIP 
} = require('./middleware/security');

// Import routes
const authRoutes = require('./routes/auth');
const freelancersRoutes = require('./routes/freelancers');
const leadsRoutes = require('./routes/leads');

const app = express();
const PORT = process.env.PORT || 5000;

// Trust proxy (important for rate limiting and IP extraction)
app.set('trust proxy', 1);

// Apply security middleware
app.use(extractIP);
app.use(securityHeaders);
app.use(cors(corsOptions));
app.use(requestLogger);
app.use(generalLimiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: process.env.npm_package_version || '1.0.0'
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/freelancers', freelancersRoutes);
app.use('/api/leads', leadsRoutes);

// API documentation endpoint
app.get('/api', (req, res) => {
  res.json({
    name: 'Mkhedmin.ma API',
    description: 'Find Moroccan digital freelancers instantly',
    version: '1.0.0',
    endpoints: {
      auth: {
        'POST /api/auth/register': 'Register new freelancer',
        'POST /api/auth/login': 'Login user',
        'POST /api/auth/refresh': 'Refresh access token',
        'GET /api/auth/me': 'Get current user profile',
        'PATCH /api/auth/preferences': 'Update user preferences',
        'PATCH /api/auth/password': 'Change password',
        'POST /api/auth/logout': 'Logout user',
        'DELETE /api/auth/account': 'Delete account'
      },
      freelancers: {
        'GET /api/freelancers': 'Search freelancers with filters',
        'GET /api/freelancers/featured': 'Get featured freelancers',
        'GET /api/freelancers/stats': 'Get platform statistics',
        'GET /api/freelancers/:slug': 'Get freelancer profile',
        'POST /api/freelancers': 'Create freelancer profile (auth)',
        'PUT /api/freelancers/:id': 'Update freelancer profile (auth)',
        'POST /api/freelancers/:id/portfolio': 'Add portfolio item (auth)',
        'PUT /api/freelancers/:id/portfolio/:portfolioId': 'Update portfolio item (auth)',
        'DELETE /api/freelancers/:id/portfolio/:portfolioId': 'Delete portfolio item (auth)',
        'PATCH /api/freelancers/:id/visibility': 'Update profile visibility (auth)'
      },
      leads: {
        'POST /api/leads': 'Create new lead (public)',
        'GET /api/leads/verify/:token': 'Verify lead email',
        'GET /api/leads': 'Get leads for freelancer (auth)',
        'GET /api/leads/stats': 'Get lead statistics (auth)',
        'GET /api/leads/:id': 'Get specific lead (auth)',
        'PATCH /api/leads/:id/status': 'Update lead status (auth)',
        'PATCH /api/leads/:id/priority': 'Update lead priority (auth)',
        'POST /api/leads/:id/notes': 'Add note to lead (auth)',
        'DELETE /api/leads/:id': 'Delete lead (auth)'
      }
    }
  });
});

// 404 handler for unknown routes
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

// MongoDB connection with retry logic
const connectDB = async () => {
  try {
    const mongoOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      bufferCommands: false // OK
    };
    

    await mongoose.connect(process.env.MONGODB_URI, mongoOptions);
    console.log('✅ MongoDB connected successfully');
    
    // Log database info
    const dbName = mongoose.connection.db.databaseName;
    console.log(`📊 Connected to database: ${dbName}`);
    
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
    
    // Retry connection after 5 seconds
    console.log('🔄 Retrying connection in 5 seconds...');
    setTimeout(connectDB, 5000);
  }
};

// Handle MongoDB connection events
mongoose.connection.on('connected', () => {
  console.log('🔗 Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('❌ Mongoose connection error:', err);
});

mongoose.connection.on('disconnected', () => {
  console.log('🔌 Mongoose disconnected from MongoDB');
});

// Graceful shutdown
process.on('SIGINT', async () => {
  console.log('\n🛑 Received SIGINT. Shutting down gracefully...');
  
  try {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
    process.exit(1);
  }
});

process.on('SIGTERM', async () => {
  console.log('\n🛑 Received SIGTERM. Shutting down gracefully...');
  
  try {
    await mongoose.connection.close();
    console.log('✅ MongoDB connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during shutdown:', error);
    process.exit(1);
  }
});

// Start server
const startServer = async () => {
  await connectDB();
  
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📚 API Documentation: http://localhost:${PORT}/api`);
    console.log(`❤️  Health Check: http://localhost:${PORT}/api/health`);
  });

  // Handle server errors
  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      console.error(`❌ Port ${PORT} is already in use`);
      process.exit(1);
    } else {
      console.error('❌ Server error:', error);
    }
  });
};

// Start the application
startServer().catch((error) => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
}); 