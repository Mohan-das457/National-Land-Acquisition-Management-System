const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const path = require('path');
const rateLimit = require('express-rate-limit');
const swaggerUi = require('swagger-ui-express');

const config = require('./config');
const apiRoutes = require('./routes');
const errorHandler = require('./middleware/errorHandler');
const swaggerDoc = require('./swagger/swagger.json');

const app = express();

// Security headers (permit Leaflet maps, CDN tiles, and inline styles for government templates)
app.use(helmet({
  contentSecurityPolicy: false,
  crossOriginEmbedderPolicy: false
}));

app.use(cors({
  origin: true,
  credentials: true
}));

// Request logger (in non-test environments)
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

// Rate Limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: {
    success: false,
    error: 'TOO_MANY_REQUESTS',
    message: 'Too many requests from this IP address. Please try again after 15 minutes.'
  }
});
app.use('/api/', limiter);

// Parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Interactive Swagger API Documentation
app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Mount REST API v1
app.use('/api/v1', apiRoutes);

// Serve Frontend Static Assets & Web App Pages
const rootDir = path.resolve(__dirname, '..');
app.use(express.static(rootDir));

// Serve root request
app.get('/', (req, res) => {
  res.sendFile(path.join(rootDir, 'index.html'));
});

// Centralized error handling
app.use(errorHandler);

module.exports = app;
