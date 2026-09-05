const express = require('express');
const requestLogger = require('./middleware/logger');
const postRoutes = require('./routes/postRoutes');

const app = express();

// 1. JSON Body Parser Middleware
// Must be registered before routes so req.body is available for POST and PUT requests
app.use(express.json());

// 2. Custom Request Logger Middleware
// Intercepts every incoming request and logs method, URL, and timestamp
app.use(requestLogger);

// 3. API Discovery & Info Endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    name: 'The Data Hub',
    description: 'RESTful API Server - Sprint 09 Track B (Fullstack Developer)',
    status: 'online',
    endpoints: {
      'GET /posts': 'Retrieve all blog posts',
      'GET /posts/:id': 'Retrieve a specific blog post by ID',
      'POST /posts': 'Create a new blog post (requires title, content)',
      'PUT /posts/:id': 'Update an existing blog post by ID',
      'DELETE /posts/:id': 'Delete a blog post by ID',
      'POST /login': 'Mock authentication returning mock JWT'
    }
  });
});

// 4. Mount Blog Posts REST Routes
app.use('/posts', postRoutes);

// 5. Mock Login Endpoint (Phase 3 - Auth Scaffolding)
// Accepts email and password in req.body, returns a mock JWT string
app.post('/login', (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // NOTE: This is mock authentication scaffolding for Sprint 09, not production auth.
  return res.status(200).json({
    message: 'Login successful',
    token: 'mock-jwt-token'
  });
});

// 6. 404 Route Not Found Handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// 7. Global Error Handler Middleware
// Ensures the server never crashes and avoids exposing raw stack traces to clients
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err.message || err);
  res.status(500).json({ error: 'Internal server error' });
});

// 8. Port Configuration
// Port 5000 as strictly mandated by Sprint 09 Track B assignment
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
