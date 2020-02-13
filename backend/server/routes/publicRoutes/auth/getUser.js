const userController = require('../../../controllers/userController');
module.exports = async (req, res, next) => {
    const user = await userController.getUserById(req.params.id);
    return res.status(200).json({
        phoneNumber: user.phoneNumber,
        success: true,
        message: 'Connected !'
    });
};