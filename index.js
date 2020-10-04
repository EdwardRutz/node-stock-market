const express = require('express');
const exphbs  = require('express-handlebars');

const app = express();
const hbs = exphbs.create({ /* config */ });

const path = require('path');
const dotenv = require('dotenv').config();  // For .env environmental variables
const request = require('request');

const PORT = process.env.PORT || 5000;
// console.log(process.env);

// Creating the API URL
// const apiBaseUrl = 'https://cloud.iexapis.com/stable/stock/'
const apiStock = 'fb';
const apiKey = process.env.API_KEY;
// const apiUrl = apiBaseUrl + apiStock + '/quote?token=' + apiKey;

// This way also works...
   // const apiUrl = `${apiBaseUrl}${apiStock}/batch?types=quote&token=${apiKey}`;

// const apiUrl = `https://cloud.iexapis.com/stable/stock/${apiStock}/quote?token=${apiKey}`;
const apiUrl = `https://cloud.iexapis.com/stable/stock/${apiStock}/quote?token=${apiKey}`;

// Using the iexapis sample api
// const apiBaseUrl = 'https://sandbox.iexapis.com/stable/stock/';
// const apiStock = 'fb';
// const apiKey = process.env.API_KEY2;
// const apiUrl = apiBaseUrl + apiStock + '/batch?types=quote&token=' + apiKey; 

request(apiUrl, { json: true }, (err, res, body) => {
  // if (err) {return  console.log(err);}
  if (err) {
    console.log('--------- Error ---------');
    console.log('There is an error');
    console.log(err);
  }

  if (res.statusCode === 200){
    console.log('******************* Stock Info *******************');
    console.log(body);
    console.log('******************* End *******************')
  }
});

// request('https://cloud.iexapis.com/stock/fb/quote?token=pk_8f0f8271d5a547d496a81c030d3a95da', { json: true }, (err, res, body) => {
//   if (err) {return  console.log(err);}
//   console.log('--------- Error ---------');
//   console.log('There is an error');
//   if (res.statusCode === 200){
//     console.log('******************* Stock Info *******************');
//     console.log(body);
//   }
// });



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
