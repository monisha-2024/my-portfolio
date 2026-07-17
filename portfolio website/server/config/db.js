const mongoose = require('mongoose');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

let dbMode = 'sqlite'; // 'mongodb' or 'sqlite'
let sqliteDb = null;

// Connect to the database
const connectDB = async () => {
  const mongoURI = process.env.MONGODB_URI;

  if (mongoURI) {
    try {
      console.log('Attempting to connect to MongoDB...');
      await mongoose.connect(mongoURI);
      dbMode = 'mongodb';
      console.log('MongoDB Connected successfully!');
      return;
    } catch (err) {
      console.error('MongoDB connection failed. Falling back to SQLite. Error:', err.message);
    }
  }

  // Fallback to SQLite
  dbMode = 'sqlite';
  console.log('Using local SQLite database...');
  const dbPath = path.join(__dirname, '..', 'local.db');
  
  return new Promise((resolve, reject) => {
    sqliteDb = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('Could not connect to SQLite database:', err.message);
        reject(err);
      } else {
        console.log('Connected to local SQLite database at:', dbPath);
        initSqliteTables().then(resolve).catch(reject);
      }
    });
  });
};

// Initialize SQLite tables if they do not exist
const initSqliteTables = () => {
  return new Promise((resolve, reject) => {
    sqliteDb.serialize(() => {
      // Projects Table
      sqliteDb.run(`
        CREATE TABLE IF NOT EXISTS projects (
          id TEXT PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT NOT NULL,
          technologies TEXT NOT NULL,
          githubLink TEXT,
          liveLink TEXT,
          imageUrl TEXT,
          category TEXT
        )
      `, (err) => {
        if (err) return reject(err);
      });

      // Messages Table
      sqliteDb.run(`
        CREATE TABLE IF NOT EXISTS messages (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          subject TEXT,
          message TEXT NOT NULL,
          date TEXT NOT NULL
        )
      `, (err) => {
        if (err) return reject(err);
        
        // Seed default projects if table is empty
        seedDefaultProjects().then(resolve).catch(reject);
      });
    });
  });
};

// Seed initial projects so the portfolio is not blank on first run
const seedDefaultProjects = () => {
  return new Promise((resolve, reject) => {
    sqliteDb.get("SELECT COUNT(*) as count FROM projects", [], (err, row) => {
      if (err) return reject(err);
      if (row.count > 0) return resolve();

      console.log('Seeding initial projects to local SQLite database...');
      const defaultProjects = [
        {
          id: '1',
          title: 'Premium E-Commerce Platform',
          description: 'A full-featured digital storefront with visual cart management, real-time inventory checks, and stripe credit card integrations.',
          technologies: JSON.stringify(['React', 'Node.js', 'Express', 'MongoDB', 'Stripe']),
          githubLink: 'https://github.com',
          liveLink: 'https://example.com',
          imageUrl: 'https://picsum.photos/600/400?random=1',
          category: 'Full-Stack'
        },
        {
          id: '2',
          title: 'Interactive 3D Data Visualizer',
          description: 'A dynamic browser rendering tool that transforms raw CSV/JSON records into beautiful, rotating Three.js node networks.',
          technologies: JSON.stringify(['JavaScript', 'Three.js', 'CSS3', 'HTML5']),
          githubLink: 'https://github.com',
          liveLink: 'https://example.com',
          imageUrl: 'https://picsum.photos/600/400?random=2',
          category: 'Frontend'
        },
        {
          id: '3',
          title: 'Automated Microservice Pipeline',
          description: 'High-throughput Node worker pool orchestration framework utilizing Redis pub/sub queues and isolated Docker containers.',
          technologies: JSON.stringify(['Node.js', 'Redis', 'Docker', 'AWS']),
          githubLink: 'https://github.com',
          liveLink: 'https://example.com',
          imageUrl: 'https://picsum.photos/600/400?random=3',
          category: 'Backend'
        }
      ];

      const stmt = sqliteDb.prepare(`
        INSERT INTO projects (id, title, description, technologies, githubLink, liveLink, imageUrl, category)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `);

      for (const p of defaultProjects) {
        stmt.run(p.id, p.title, p.description, p.technologies, p.githubLink, p.liveLink, p.imageUrl, p.category);
      }

      stmt.finalize((err) => {
        if (err) reject(err);
        else {
          console.log('SQLite database successfully seeded.');
          resolve();
        }
      });
    });
  });
};

// Define Mongoose Schema for MongoDB
const MongoProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [String],
  githubLink: String,
  liveLink: String,
  imageUrl: String,
  category: String
});

const MongoProject = mongoose.models.Project || mongoose.model('Project', MongoProjectSchema);

const MongoMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: String,
  message: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const MongoMessage = mongoose.models.Message || mongoose.model('Message', MongoMessageSchema);


// UNIFIED DATABASE API METHODS
const dbAPI = {
  getMode: () => dbMode,

  // Projects API
  getProjects: async () => {
    if (dbMode === 'mongodb') {
      return await MongoProject.find();
    } else {
      return new Promise((resolve, reject) => {
        sqliteDb.all("SELECT * FROM projects", [], (err, rows) => {
          if (err) return reject(err);
          // Parse technologies back to array
          const projects = rows.map(r => ({
            ...r,
            _id: r.id, // Map SQLite id to _id for unified frontend compatibility
            technologies: JSON.parse(r.technologies)
          }));
          resolve(projects);
        });
      });
    }
  },

  getProjectById: async (id) => {
    if (dbMode === 'mongodb') {
      return await MongoProject.findById(id);
    } else {
      return new Promise((resolve, reject) => {
        sqliteDb.get("SELECT * FROM projects WHERE id = ?", [id], (err, row) => {
          if (err) return reject(err);
          if (!row) return resolve(null);
          resolve({
            ...row,
            _id: row.id,
            technologies: JSON.parse(row.technologies)
          });
        });
      });
    }
  },

  createProject: async (data) => {
    if (dbMode === 'mongodb') {
      const newProj = new MongoProject(data);
      return await newProj.save();
    } else {
      return new Promise((resolve, reject) => {
        const id = Date.now().toString(); // Generate unique text id
        const technologies = JSON.stringify(data.technologies || []);
        sqliteDb.run(`
          INSERT INTO projects (id, title, description, technologies, githubLink, liveLink, imageUrl, category)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `, [
          id,
          data.title,
          data.description,
          technologies,
          data.githubLink || '',
          data.liveLink || '',
          data.imageUrl || '',
          data.category || ''
        ], function(err) {
          if (err) return reject(err);
          resolve({ id, _id: id, ...data });
        });
      });
    }
  },

  updateProject: async (id, data) => {
    if (dbMode === 'mongodb') {
      return await MongoProject.findByIdAndUpdate(id, data, { new: true });
    } else {
      return new Promise((resolve, reject) => {
        const technologies = JSON.stringify(data.technologies || []);
        sqliteDb.run(`
          UPDATE projects
          SET title = ?, description = ?, technologies = ?, githubLink = ?, liveLink = ?, imageUrl = ?, category = ?
          WHERE id = ?
        `, [
          data.title,
          data.description,
          technologies,
          data.githubLink || '',
          data.liveLink || '',
          data.imageUrl || '',
          data.category || '',
          id
        ], function(err) {
          if (err) return reject(err);
          resolve({ id, _id: id, ...data });
        });
      });
    }
  },

  deleteProject: async (id) => {
    if (dbMode === 'mongodb') {
      return await MongoProject.findByIdAndDelete(id);
    } else {
      return new Promise((resolve, reject) => {
        sqliteDb.run("DELETE FROM projects WHERE id = ?", [id], function(err) {
          if (err) return reject(err);
          resolve(true);
        });
      });
    }
  },

  // Messages API
  getMessages: async () => {
    if (dbMode === 'mongodb') {
      return await MongoMessage.find().sort({ date: -1 });
    } else {
      return new Promise((resolve, reject) => {
        sqliteDb.all("SELECT * FROM messages ORDER BY date DESC", [], (err, rows) => {
          if (err) return reject(err);
          resolve(rows.map(r => ({ ...r, _id: r.id })));
        });
      });
    }
  },

  createMessage: async (data) => {
    if (dbMode === 'mongodb') {
      const newMessage = new MongoMessage(data);
      return await newMessage.save();
    } else {
      return new Promise((resolve, reject) => {
        const id = Date.now().toString();
        const date = new Date().toISOString();
        sqliteDb.run(`
          INSERT INTO messages (id, name, email, subject, message, date)
          VALUES (?, ?, ?, ?, ?, ?)
        `, [
          id,
          data.name,
          data.email,
          data.subject || '',
          data.message,
          date
        ], function(err) {
          if (err) return reject(err);
          resolve({ id, _id: id, date, ...data });
        });
      });
    }
  }
};

module.exports = { connectDB, dbAPI };
