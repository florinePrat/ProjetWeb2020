const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/hasPassword/:email', userCtrl.sendEmail);
//router.put('/password/:id', auth, userCtrl.createPassword);
router.put('/:id', auth,  multer, userCtrl.addPicture);

module.exports = router;
