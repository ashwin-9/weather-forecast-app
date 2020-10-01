const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for express config
const publicDir = path.join(__dirname, '../public');
const viewDir = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewDir);
hbs.registerPartials(partialsPath);

//Set up static directory to serve
app.use(express.static(publicDir));

app.get('/', (req, res) => {
	res.render('index', { title: 'Weather App', name: 'Ashwin' });
});

app.get('/about', (req, res) => {
	res.render('about', { title: 'About Me', name: 'Ashwin' });
});

app.get('/help', (req, res) => {
	res.render('help', { title: 'Help', name: 'Ashwin', message: 'We are here to help You! :)' });
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		return res.send({
			error: 'Please provide an Address! -_-'
		});
	}

	geocode(req.query.address, (err, { location, longitude, latitude } = {}) => {
		if (err) {
			return res.send({
				error: err
			});
		}

		forecast(longitude, latitude, (err, data) => {
			if (err) {
				return res.send({
					error: err
				});
			}
			return res.send({
				location,
				address: req.query.address,
				forecast: data
			});
		});
	});
});

app.get('/help/*', (req, res) => {
	res.render('404', { title: '404', name: 'Ashwin', message: 'Help Article Not Found! :(' });
});

app.get('*', (req, res) => {
	res.render('404', { title: '404', name: 'Ashwin', message: 'Page Not Found! :(' });
});

app.listen(3000, () => {
	console.log('Server is up and Running!');
});
