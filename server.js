const express = require('express');
const path = require('path'); // Added path module

const app = express();
const PORT = process.env.PORT || 3001;

// Require routes
const apiRoutes = require('./Routes/api-routes');
const htmlRoutes = require('./Routes/html-routes');

const publicPath = path.join(__dirname, 'public');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(publicPath));

// Define routes
app.use('/', htmlRoutes);
app.use('/api', apiRoutes); // Updated API routes prefix

app.listen(PORT, () =>
	console.log(`Listening for requests on port ${PORT}!`) // Fixed console log syntax
);
