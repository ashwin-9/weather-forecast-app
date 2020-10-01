const request = require('request');

const forecast = (lat, lon, callback) => {
	const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=87d87a0f43ce5b00e6969fe20f7d8e21`;

	request(
		{
			url,
			json: true
		},
		(err, { body }) => {
			if (err) {
				callback('Unable to connect to weather service! :(', undefined);
			} else if (body.cod === '400') {
				callback('Unable to find location! :(', undefined);
			} else {
				let { temp } = body.current;
				let { description } = body.daily[0].weather[0];
				let { min, max } = body.daily[0].temp;
				callback(
					undefined,
					`There is ${description}. The temperature is ${temp} degrees. The min temperature is ${min} degrees and max temperature is ${max}`
				);
			}
		}
	);
};

module.exports = forecast;
