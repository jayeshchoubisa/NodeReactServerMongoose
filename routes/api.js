var express = require('express');
var router = express.Router();

router.use('/auth',require('../apis/auth.api'));


module.exports = router;
