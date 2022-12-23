const router = require('express').Router();
const thoughtsRoutes = require('./thoughtRoutes');
const usersRoutes = require('./userRoutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;