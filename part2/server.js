const express = require('express');
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// setup handlebars view engine
const handlebars = require('express-handlebars');

app.engine('handlebars', handlebars({ defaultLayout: 'main' }));

app.set('view engine', 'handlebars');

// static resources
app.use(express.static(__dirname + '/public'));

// Use the zipCode module
const cities = require('./zipCodeModule_v2');

// GET request to the homepage

app.get('/', (req, res) => {
	res.render('homeView');
});

// GET /zip
app.get('/zip', (req, res) => {
	// get zip from query url
	const zip = req.query.id;
	// check if id exist
	if (zip) {
		// get result by zip
		const result = cities.lookupByZipCode(zip);
		const data = { data: result };
		res.render('lookupByZipView', data); // render view
	} else {
		res.render('lookupByZipForm'); // no zip present render lookupByZipForm
	}
});

// POST /zip
app.post('/zip', (req, res) => {
	// get zip from form's request body
	const zip = req.body.id;
	// get result by zip
	const result = cities.lookupByZipCode(zip);
	// check result
	if (result) {
		const data = { data: result };
		res.render('lookupByZipView', data); // render view
	} else {
		// no results found 
		res.status(404);
		res.render('404');
	}

});

// Implement the JSON, XML, & HTML formats

app.get('/zip/:id', (req, res) => {
	// get zip param
	const zip = req.params.id;
	// get result by zip
	const result = cities.lookupByZipCode(zip);

	// make sure the result is found
	if (result) {
		const data = { data: result };

		// check the header JSON, XML, & HTML formats
		const header = req.headers.accept;
		console.log('header', header);
		if (header.includes('application/json')) {
			res.json(result); // send json result
		} else if (header === 'application/xml') {
			// define the xml format
			const xml = `<?xml version="1.0"?>
				<zipCode id="${result._id}">
					<city>${result.city}</city>
					<state>${result.state}</state>
					<pop>${result.pop}</pop>
				</zipCode>
			`;
			res.type('application/xml');
			res.send(xml); // send xml result
		} else {
			console.log('reading the zip view');
			res.render('lookupByZipView', data); // render view
		}
	} else {
		res.status(404).send('Not found.');
	}


});


// GET /city
app.get('/city', (req, res) => {
	// get city and state from query url
	const city = req.query.city;
	const state = req.query.state;
	if (city && state) {
		// get result by zip
		const result = cities.lookupByCityState(city.toUpperCase(), state.toUpperCase());
		if (result.data.length > 0) {
			res.render('lookupByCityStateView', result); // render view
		} else {
			// no data found 
			res.status(404);
			res.render('404');
		}

	} else {
		res.render('lookupByCityStateForm'); // not present render lookupByZipForm
	}
});

// POST /city
app.post('/city', (req, res) => {
	// get city and state from form's request body
	const city = req.body.city;
	const state = req.body.state;
	// get result by city and state
	const result = cities.lookupByCityState(city.toUpperCase(), state.toUpperCase());
	// check result
	if (result) {
		res.render('lookupByCityStateView', result); // render view
	} else {
		// no results found 
		res.status(404);
		res.render('404');
	}
});

// Implement the JSON, XML, & HTML formats

app.get('/city/:city/state/:state', (req, res) => {
	// get city and state from the params
	const city = req.params.city;
	const state = req.params.state;

	// get result by city and state
	const result = cities.lookupByCityState(city.toUpperCase(), state.toUpperCase());
	// console.log(result);
	// make sure the result is found
	if (result.data.length > 0) {
		// check the header JSON, XML, & HTML formats
		const header = req.headers.accept;
		console.log('header', header);
		if (header.includes('application/json')) {
			res.json(result); // send json result
		} else if (header === 'application/xml') {
			console.log(result.data);
			// define the xml format
			let xml = `<?xml version="1.0"?>
				<cityState city="${result.city}" state="${result.state}">
			`;
			// loop the data add entry to xml
			result.data.forEach(item => {
				xml += `<entry zip="${item.zip}" pop="${item.pop}" />`;
			});
			// add closing tag for xml
			xml += "</cityState>";

			res.type('application/xml');
			res.send(xml); // send xml result
		} else {
			res.render('lookupByCityStateView', result); // render view
		}
	} else {
		res.status(404).send('Not found.');
	}
});



app.get('/pop', (req, res) => {


});

// Implement the JSON, XML, & HTML formats

app.get('/pop/:state', (req, res) => {


});


app.use((req, res) => {
	res.status(404);
	res.render('404');
});

app.listen(3000, () => {
	console.log('http://localhost:3000');
});




