const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/hasPassword/:email', userCtrl.sendEmail);
router.put('/:id', auth,  multer, userCtrl.addPicture);
router.get('/getUser/:id', auth,userCtrl.getUserById);

// for test
router.delete('/:id', userCtrl.deleteUserForMochaTest);

module.exports = router;
