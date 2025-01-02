const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/user');
const userExperienceRoutes = require('./routes/userExperience');
const companyRoutes = require('./routes/company');
const fileRoutes = require('./routes/file');
const documentRoutes = require('./routes/document');
const fs = require('fs');
const app = express();
const cors = require('cors'); // Import the cors package
const { auth, requiredScopes } = require('express-oauth2-jwt-bearer');
const dotenv = require('dotenv');

dotenv.config();

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/cv_db', {})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));


const corsOptions = {
  origin: '*', // Allow only this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow these methods
  allowedHeaders: '*' // Allow these headers
};

app.use(cors(corsOptions));


const checkJwt = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
  tokenSigningAlg: 'RS256',
});

// Routes
app.get('/api/protected', checkJwt,
  requiredScopes('read:current_user'),
  (req, res) => {
    res.json({
      message: 'Access granted', user: req.auth.payload
    });
  });

app.use('/api/users', checkJwt, userRoutes);
app.use('/api/user-experiences', checkJwt, userExperienceRoutes);
app.use('/api/companies', checkJwt, companyRoutes);
app.use('/api/documents', checkJwt, documentRoutes);
app.use('/api/files', checkJwt, fileRoutes);

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

