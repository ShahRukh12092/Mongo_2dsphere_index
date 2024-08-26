const express = require('express');
const router = express.Router();

const locationRoutes = require('./locationRoutes');

// Use location routes
router.use('/locations', locationRoutes);

module.exports = router;
