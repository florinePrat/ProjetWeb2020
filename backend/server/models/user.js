const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email:{type:String, required: true, unique:true},
  firstName:{type:String, default:'Prénom '},
  password:{type:String, default:' '},
  statePassword:{type:Boolean, default: false},
  imageUrl:{type:String, default:'/user.png'},
  phoneNumber:{type:Number, required:true},
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
