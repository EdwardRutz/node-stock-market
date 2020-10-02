const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();
const hbs = exphbs.create({ /* config */ });

const path = require('path');
const dotenv = require('dotenv').config();

const PORT = process.env.PORT || 5000;
// console.log(process.env);

// Set Handlebars Middleware
// Register `hbs.engine` with the Express app.
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// Set handlebar routes
const moreStuff = "Hello, here is more stuff..."
app.get('/', (req, res) => {
  res.render('home', {
    stuff: moreStuff
  });
});

// Create About.html page route
app.get('/about.html', (req, res) => {
  res.render('about');
});

// Set static folder.
app.use(express.static(path.join(__dirname, 'public')));



app.listen(PORT, () => {
  console.log('Server listening on port ', + PORT);
  // console.log(`Example app listening at http://localhost:${port}`)
});
