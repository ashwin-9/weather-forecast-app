const request = require('request');

const geocode = (address, callback) => {
	const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
		address
	)}.json?access_token=pk.eyJ1IjoiYXNoNyIsImEiOiJja2ZwamtxdnYwOW1rMnRwYmFrZ3NpaXQ2In0.t5-0eZf10FpM0BeFk2hDqQ&limit=1`;

	request(
		{
			url,
			json: true
		},
		(err, { body }) => {
			if (err) {
				callback('Unable to connect to location services! :(', undefined);
			} else if (body.message === 'Not Found' || body.features.length === 0) {
				callback('Place doesnot exist! :( Try another search!');
			} else {
				let { center } = body.features[0];
				let { place_name } = body.features[0];
				callback(undefined, {
					latitude: center[1],
					longitude: center[0],
					location: place_name
				});
			}
		}
	);
};

module.exports = geocode;
