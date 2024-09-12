'use strict';

const API_URL = 'http://127.0.0.1:3005/';

const downBtn = document.querySelector('.download-code');

const aiBtn = document.querySelector('.ai-assistant');

const clearBtn = document.querySelector('.button-clear');
let divResponse = document.querySelector('.ai-response');

document.querySelector('.btn-submit').addEventListener('click', sendPostRequest);

window.addEventListener('keydown', function (e) {
	if (e.key == 'Enter') {
		sendPostRequest();
	}
});

document.querySelector('.btn-clear-ai').addEventListener('click', function () {
	divResponse.textContent = ' ';
	document.getElementById('prompt').value = ' ';
});

async function sendPostRequest() {
	try {
		let userInput = document.getElementById('prompt').value;
		let response = await fetch('http://127.0.0.1:3005/getchat', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				content: userInput,
			}),
		});

		if (!response.ok) {
			throw new Error('Network response was not ok');
		}

		let responseData = await response.text();
		divResponse.textContent = responseData;
	} catch (error) {
		console.error('Error:', error);
	}
}

document.querySelector('.download-code').addEventListener('click', save);

function download(filename, text) {
	const element = document.createElement('a');
	element.setAttribute('href', 'data:pjavascript;charset=utf-8,' + encodeURIComponent(text));
	element.setAttribute('download', filename);

	element.style.display = 'none';
	document.body.appendChild(element);

	element.click();

	document.body.removeChild(element);
}
function save() {
	download('code.txt', editor.getValue());
}

clearBtn.addEventListener('click', function () {
	editor.session.setValue('');
});
