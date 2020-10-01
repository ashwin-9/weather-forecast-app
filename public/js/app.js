const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const p1 = document.getElementById('message-1');
const p2 = document.getElementById('message-2');

weatherForm.addEventListener('submit', (evt) => {
	evt.preventDefault();
	p1.textContent = 'Loading...';
	p2.textContent = '';

	const location = search.value;
	makerequest(location);
	search.value = '';
});

const makerequest = (location) => {
	fetch(`http://localhost:3000/weather?address=${location}`).then((res) => {
		res.json().then((data) => {
			if (data.error) {
				p1.textContent = '';
				p2.textContent = data.error;
			} else {
				p1.textContent = data.location;
				p2.textContent = data.forecast;
			}
		});
	});
};
