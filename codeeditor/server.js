'use strict';

const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(cors());

app.set('view engine', 'ejs');

// Define the directory containing the static files
const publicDirectoryPath = path.join(__dirname, '/');

// Serve static files from the 'assets' directory
app.use('/', express.static(publicDirectoryPath));

// Serve the 'index.html' file from the root
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the Express server
const port = 3000;
app.listen(port, () => {
	console.log(`Server is up and running on port ${port}`);
});
