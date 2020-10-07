const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const hbs = exphbs.create({ /* config */ });
const path = require('path');
const dotenv = require('dotenv').config();  // For .env environmental variables
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;


// Use body-parser middleware
app.use(bodyParser.urlencoded({extended:false}));


// Requesting data with the API





function call_api(finishedAPI, ticker) {
  const apiKey = process.env.API_KEY;
  const apiUrl = `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${apiKey}`;

  request(apiUrl, { json: true }, (err, res, body) => {
    if (err) {
      console.log('--------- Error ---------');
      console.log('There is an error');
      return console.log(err);
    }
    
    if (res.statusCode === 200){
      finishedAPI(body);
    }
  });
}

// Set Handlebars Middleware
// Register `hbs.engine` with the Express app.
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');


// Set handlebar index  GET route
app.get('/', (req, res) => {
  call_api((doneAPI) => {
        res.render('home', {
        stock: doneAPI
      });
  });
});


// Set handlebar index POST route
app.post('/', (req, res) => {
  call_api((doneAPI) => {
        res.render('home', {
        stock: doneAPI,
      });
  }, req.body.stock_ticker);
  console.log('app.post = ', req.body.stock_ticker);
});

// Create About.html page route
app.get('/about.html', (req, res) => {
  res.render('about');
});

// Set static folder.
app.use(express.static(path.join(__dirname, 'public')));



app.listen(PORT, () => {
  console.log('Server listening on port ', + PORT);
  // console.log(`Server listening  on port ${PORT} at http://localhost:${PORT}`);
});






// Other ways to create a readable API URL
// const apiUrl = apiBaseUrl + apiStock + '/quote?token=' + apiKey;

// This way also works...
   // const apiUrl = `${apiBaseUrl}${apiStock}/batch?types=quote&token=${apiKey}`;

// Using the iexapis sample api
// const apiBaseUrl = 'https://sandbox.iexapis.com/stable/stock/';
// const apiStock = 'fb';
// const apiKey = process.env.API_KEY2;
// const apiUrl = apiBaseUrl + apiStock + '/batch?types=quote&token=' + apiKey; 


