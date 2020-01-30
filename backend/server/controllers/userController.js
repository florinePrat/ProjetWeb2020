const User = require('../models/user');
const passwordEncryption = require('../encryption/passwordEncryption');

getUserById = async (id) => {
    try {
        return await User.findById(id)
    } catch (error) {
        console.log("Impossible de trouver l'utilisateur");
        throw error
    }
};
const createUser = async (email, firstName, phoneNumber) => {
   // const hashedPassword = await passwordEncryption.passwordEncryption(password);
    try {
        const user = new User({
            firstName: firstName,
            email: email,
            phoneNumber : phoneNumber
        });
        const savedUser= await user.save();
        return savedUser
    } catch (error) {
        console.log(error.message);
        throw error
    }
};


const getUserByEmail = async(email) => {
    try {
        const user = await User.find({ email : email});
        return user[0];
    } catch(error) {
        console.log("erreur lors de la recherche de l'utilisateur par email");
        return error;
    }
};

const createPassword = async (_id,password) => {
    try {
        const hashedPassword = await passwordEncryption.passwordEncryption(password);
        console.log('hashpassword', hashedPassword);
        const user= await User.findOneAndUpdate({_id:_id},{password:hashedPassword},{new:true});
        console.log(user)
        return user;
    } catch (error) {
        console.log(error.message);
        throw error
    }
};


module.exports = {
    getUserById,
    createUser,
    getUserByEmail,
    createPassword,
};
