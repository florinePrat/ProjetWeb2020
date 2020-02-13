const express = require('express');
const router = express.Router();

router.use('/room', require("./rooms"));
router.use('/auth', require("./auth"));


module.exports =  router;

