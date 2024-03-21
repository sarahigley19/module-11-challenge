const express = require('express');
const path = require('path');

const router = express.Router();

// Route to index.html
router.get('/', (req, res) => {
	try {

		res.sendFile(path.join(__dirname, '../public/index.html'));
	} catch (error) {
		console.error('Error serving index.html:', error);
		res.status(500).send('Internal server error');
	}
});
router.get('/notes', (req, res) => {
	try {

		res.sendFile(path.join(__dirname, '../public/notes.html'));
	} catch (error) {
		console.error('Error serving index.html:', error);
		res.status(500).send('Internal server error');
	}
});

module.exports = router;
