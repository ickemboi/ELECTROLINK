const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000; // Use port 3000 unless there is a preconfigured port

app.use(bodyParser.json());

// Serve static files (HTML, CSS, JS, images, etc.) from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route to handle requests to the homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// MySQL database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'kemboi2024',
  database: 'electrician_connect'
});

db.connect(err => {
  if (err) {
      throw err;
  }
  console.log('MySQL connected...');
});

// Route to handle form submission
app.post('/subscribe', (req, res) => {
  const email = req.body.email;

  if (!email) {
      return res.status(400).send('Email is required');
  }

  const query = 'INSERT INTO subscribers (email) VALUES (?)';

  db.query(query, [email], (err, result) => {
      if (err) {
          return res.status(500).send('Database error');
      }
      res.send('Subscription successful');
  });
});

// Serve static files
app.use(express.static('public'));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});






