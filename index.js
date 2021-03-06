
const express = require('express');
const app = express();
const exphbs  = require('express-handlebars');
const hbs = exphbs.create({ /* config */ });
const path = require('path');
const dotenv = require('dotenv').config();  // For .env environmental variables
const request = require('request');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;


// use body parser middleware
app.use(bodyParser.urlencoded({extended: false}));


// Requesting data with the API

function call_api(finishedAPI, ticker) {
	const apiKey = process.env.API_KEY;
	const apiUrl = `https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${apiKey}`;
	request(apiUrl, { json: true }, (err, res, body) => {
	if (err) {return console.log(err);}
	if (res.statusCode === 200){
		finishedAPI(body);
		};
	});
};


// Set Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

const otherstuff = "hello there, this is other stuff!";

// Set handlebar index GET route
app.get('/', function (req, res) {
	call_api(function(doneAPI) {
			res.render('home', {
	    	stock: doneAPI,
    	});
	}, "fb");  // defaults to FB on the home page.
		
});

// Set handlebar index POST route
app.post('/', function (req, res) {
	call_api(function(doneAPI) {
			//console.log(doneAPI);
			//posted_stuff = req.body.stock_ticker;
			res.render('home', {
	    	stock: doneAPI,
    	});
	}, req.body.stock_ticker);
		
});




// create about page route
app.get('/about.html', function (req, res) {
    res.render('about');
});

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));


app.listen(PORT, () => console.log('Server Listening on port ' + PORT));
