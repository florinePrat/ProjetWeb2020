const express = require('express');
const router = express.Router();


router.post('/',  require('./createAvailability'));
router.put('/:id',  require('./modifyAvailability'));
router.delete('/:id',  require('./deleteAvailability'));
router.get('/:roomId',  require('./getAvailability'));
//router.get('/bySearch/:date', require('./getAvailabilityBySearch'));

module.exports = router;
