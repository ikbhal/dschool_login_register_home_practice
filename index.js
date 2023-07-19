const express = require('express');
const session = require('express-session');

const app = express();

// Middleware to enable form URL-encoded support
app.use(express.urlencoded({ extended: true }));

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Configure session middleware
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
}));

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  if (req.session && req.session.userId) {
    return next();
  } else {
    return res.redirect('/login');
  }
};

// Hardcoded user data
const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
  { id: 1, username: 'u', password: 'p' },
];

// Registration page
app.get('/register', (req, res) => {
  res.send('Registration page');
});

// Registration form submission
app.post('/register', (req, res) => {
  // Process registration data and create new user
  // ...
  res.redirect('/login');
});

app.get('/login', (req, res) => {
    res.render('login');
  });
  

// Login form submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Find user in the hardcoded user data
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Create session for authenticated user
    req.session.userId = user.id;
    res.redirect('/home');
  } else {
    res.redirect('/login');
  }
});

// Home page
app.get('/home', isAuthenticated, (req, res) => {
    res.render('home', { username: req.session.userId });
  });

app.get('/', (req,res) => {
    
});
// Logout
app.get('/logout', (req, res) => {
  // Destroy session and redirect to login page
  req.session.destroy();
  res.redirect('/login');
});

// Start the server
app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
