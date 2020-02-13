const express = require('express');
const router = express.Router();


router.post('/',  require('./createRoom'));
router.put('/:id',  require('./modifyRoom'));
router.delete('/:id',  require('./deleteRoom'));
router.get('/:id',  require('./getOneRoom'));
router.get('/byUser/:id',  require('./getRoomByUser'));

module.exports = router;
