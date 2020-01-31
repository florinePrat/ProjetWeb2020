const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const roomCtrl = require('../controllers/room');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, roomCtrl.createRoom);
router.put('/:id', auth, multer, roomCtrl.modifyRoom);
router.delete('/:id', auth, roomCtrl.deleteRoom);
router.get('/:id', auth, roomCtrl.getOneRoom);
router.get('/', roomCtrl.getAllRooms);
router.get('/byUser/:id', auth, roomCtrl.getRoomByUser);
router.get('/:category/:city', roomCtrl.getAllSearchRooms);

module.exports = router;
