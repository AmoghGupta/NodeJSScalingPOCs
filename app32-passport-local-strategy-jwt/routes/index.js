const router = require('express').Router();
//localhost:3000/users/{controller}
router.use('/users', require('./users'));

module.exports = router;