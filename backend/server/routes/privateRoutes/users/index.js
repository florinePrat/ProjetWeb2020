const express = require('express');
const router = express.Router();

router.put('/:id',  require('./changeAvatar'));

module.exports = router;
