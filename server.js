const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const cors = require('cors');
const session = require('express-session');
const PORT = process.env.PORT || 3000; // Use port 3000 unless there is a preconfigured port

app.use(bodyParser.json());
// Middleware setup
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors()); // Add CORS middleware

app.use(session({
    secret: '123asdfghjdfvbn', 
    resave: false,
    saveUninitialized: true
}));

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


app.use(express.static('public'));

// Serve static files
app.use(express.static('public'));


// Route for quote submmission
app.post('/submitQuote', (req, res) => {
  const { name, email, phone, message} = req.body;
  const sql = 'INSERT INTO quotes (name, email, phone, message) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, email, phone,message], (err, result) => {
      if (err) {
         return res.status(500).send('Quote request failed!!');
        }
      res.send('Quote request submited!');
  });
});

// JWT secret
const jwtSecret = 'your_jwt_secret';

// User registration
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).send('All fields are required');
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const query = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
  db.query(query, [name, email, hashedPassword], (err, results) => {
    if (err) {
      return res.status(500).send('Server error');
    }
    res.status(201).send('User registered');
  });
});

// User login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send('All fields are required');
  }

  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], async (err, results) => {
    if (err) {
      return res.status(500).send('Server error');
    }

    if (results.length === 0) {
      return res.status(401).send('Invalid credentials');
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: '1h' });
    res.json({ token });
  });
});

// Middleware for protected routes
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization').replace('Bearer ', '');

  if (!token) {
    return res.status(401).send('Access denied');
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).send('Invalid token');
  }
};

// Protected route example
app.get('/protected', authMiddleware, (req, res) => {
  res.send('This is a protected route');
});


//To access protected content
const token = localStorage.getItem('token');

fetch('/protected', {
  method: 'GET',
  headers: { 'Authorization': `Bearer ${token}` }
})
  .then(response => response.text())
  .then(data => {
    console.log(data);
  });



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});






