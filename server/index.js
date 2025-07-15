require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const session = require('express-session');
const passport = require('passport');
const DBConfig = require('./src/config/dbConfig');

const app = express();

// Setup request logging to access.log file
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

// Security middleware
app.use(helmet());

// Enable CORS with default options (can be customized)
app.use(cors());

// Parse JSON and cookies
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true,
  // cookie: { secure: true }
}));

// Initialize passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Rate limiting to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Create API End Point
app.use('/api/v1/', require('./src/routes/web.route'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Connect to MongoDB
DBConfig.connectMongoDb(process.env.MONGO_CONNECTION);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
