const express = require('express');

const router = express.Router();

/*router.post('/', auth, roomCtrl.createRoom);
router.put('/:id', auth, roomCtrl.modifyRoom);
router.delete('/:id', auth, roomCtrl.deleteRoom);
router.get('/:id', auth, roomCtrl.getOneRoom);
router.get('/', roomCtrl.getAllRooms);
router.get('/byUser/:id', auth, roomCtrl.getRoomByUser);
router.get('/:category/:city', roomCtrl.getAllSearchRooms);*/

router.post('/', require('./createRoom'));
router.put('/:id',require('./modifyRoom'));
router.delete('/:id', require('./deleteRoom'));
router.get('/:id', require('./getOneRoom'));
router.get('/byUser/:id', require('./getRoomByUser'));


module.exports = router;
