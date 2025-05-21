// server.js (Node.js backend example)
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = new sqlite3.Database(':memory:'); // In-memory DB for demo, use file for persistence

// Create users table and add a sample user with hashed password
db.serialize(() => {
  db.run(`CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT UNIQUE, password TEXT)`);
  const passwordHash = bcrypt.hashSync('admin123', 10);
  db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, ['admin', passwordHash]);
});

// Login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
    if (err) return res.status(500).json({ error: 'DB error' });
    if (!user) return res.status(401).json({ error: 'Invalid credentials' });

    // Compare hashed password
    bcrypt.compare(password, user.password, (err, result) => {
      if (result) {
        // Normally, generate token here (JWT etc). For demo, just success.
        res.json({ success: true, username: user.username });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
