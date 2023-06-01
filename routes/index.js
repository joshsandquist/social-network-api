const express = require('express');
//importing routes
const userRoutes = require('./api/userRoutes');
const thoughtRoutes = require('./api/thoughtRoutes');

const router =  express.Router();

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;