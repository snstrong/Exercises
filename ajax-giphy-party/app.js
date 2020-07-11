const form = document.querySelector('form');
form.addEventListener('submit', async function(e) {
	e.preventDefault();
	const input = document.querySelector('#searchTerm');
	try {
		let src = await getGIF(input.value);
		appendGIF(makeGIF(src));
	} catch (err) {
		console.log(err);
		alert('No matching GIFs found! Please try again.');
	}
	input.value = '';
});

const rmvBtn = document.getElementById('remove');
rmvBtn.addEventListener('click', function() {
	document.getElementById('GIFarea').innerHTML = null;
});

function appendGIF(gif) {
	return document.getElementById('GIFarea').append(gif);
}

function makeGIF(src) {
	const img = document.createElement('IMG');
	img.src = src;
	console.log(`makeGIF src: ${src}`);
	return img;
}

async function getGIF(searchTerm) {
	let offset = Math.round(Math.random() * 1000);
	let url = `https://api.giphy.com/v1/gifs/search?api_key=ChCJqA15cCbdYYei158hBEUsiIXLoeJJ&q=${searchTerm}&limit=1&offset=${offset}&rating=g&lang=en`;
	let res = await axios.get(url);
	let url1 = `https://api.giphy.com/v1/gifs/${res.data.data[0].id}?api_key=ChCJqA15cCbdYYei158hBEUsiIXLoeJJ`;
	let res1 = await axios.get(url1);
	let src = res1.data.data.images.downsized_large.url;
	console.log('SOURCE: ' + src);
	return src;
}
