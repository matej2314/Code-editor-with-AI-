'use strict';

const path = require('path');
const dotenv = require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

const app = express();

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

app.use(cors());
app.use(express.json());

app.post('/getchat', async (req, res) => {
	console.log(req.body);
	let prompt = req.body.content;

	try {
		// Wywołanie API OpenAI
		let completion = await openai.chat.completions.create({
			model: 'gpt-3.5-turbo',
			messages: [
				{ role: 'system', content: 'capital city of Poland' },
				{ role: 'user', content: prompt },
			],
		});

		return res.send(completion.choices[0].message.content);
	} catch (error) {
		console.error('Error from OpenAI:', error.response ? error.response.data : error.message);
		return res.status(500).send('Something went wrong');
	}
});

app.listen(3005, () => {
	console.log('Server is running on port 3005');
});
