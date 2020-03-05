const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
  email:{type:String, required: true, unique:true},
  firstName:{type:String, required: true},
  password:{type:String, default:null},
  imageUrl:{type:String, default:'https://imageslocatme.s3.eu-west-3.amazonaws.com/user.png'},
  phoneNumber:{type:Number, required:true},
  review:{type:Array, default:''},
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
