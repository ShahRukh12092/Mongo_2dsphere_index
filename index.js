const express = require('express');
const connectDB = require('./db/db');
const routes = require('./routes');
// Initialize Express app
const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Load Routes
app.use('/api', routes);

// Connect to the database
connectDB();

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
