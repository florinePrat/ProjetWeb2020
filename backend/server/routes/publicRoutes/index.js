const express = require('express');
const router = express.Router();

router.use('/publicRoom', require("./rooms"));
router.use('/auth', require("./auth"));


module.exports =  router;

