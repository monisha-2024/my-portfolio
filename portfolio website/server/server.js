require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const { connectDB } = require('./config/db');

const app = express();

// Initialize Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Define Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/messages', require('./routes/messageRoutes'));

// Simple testing status endpoint
app.get('/api/status', (req, res) => {
  res.json({
    status: 'Running',
    databaseMode: require('./config/db').dbAPI.getMode()
  });
});

// Serve static assets in production (built React frontend)
const clientBuildPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientBuildPath));

// For SPA routing, redirect fallback requests to index.html
app.get('*', (req, res) => {
  // If the request doesn't start with /api, serve the built index.html
  if (!req.url.startsWith('/api')) {
    res.sendFile(path.join(clientBuildPath, 'index.html'), (err) => {
      if (err) {
        // If dist hasn't been built yet, output a helpful development status message
        res.status(200).send(`
          <html>
            <head>
              <title>Portfolio API Server</title>
              <style>
                body { font-family: sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; background: #0f172a; color: #f8fafc; margin: 0; }
                .container { text-align: center; border: 1px solid #334155; padding: 2.5rem; border-radius: 12px; background: #1e293b; max-width: 500px; box-shadow: 0 4px 20px rgba(0,0,0,0.3); }
                h1 { color: #38bdf8; margin-top: 0; }
                p { line-height: 1.6; color: #94a3b8; }
                code { background: #0f172a; padding: 0.2rem 0.5rem; border-radius: 4px; color: #38bdf8; }
              </style>
            </head>
            <body>
              <div class="container">
                <h1>Portfolio API Server</h1>
                <p>The backend server is running in <strong>${require('./config/db').dbAPI.getMode()}</strong> database mode.</p>
                <p>To view the user interface, make sure to start the React client using <code>npm run dev</code> or build the project using <code>npm run build</code>.</p>
              </div>
            </body>
          </html>
        `);
      }
    });
  } else {
    res.status(404).json({ msg: 'API Route Not Found' });
  }
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    // Connect Database
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
