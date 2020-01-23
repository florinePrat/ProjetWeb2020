const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:Number, required:true},
    address:{type:String, required:true},
    city:{type:String, required:true},
    region:{type:String, required:true},
    postalCode:{type:String, required:true},
    category:{type:String, required:true},
    bail:{type:Number, required:true},
    imageUrl:{type:String, required:true},
    availability:{type:Array, required:true},
    review:{type:Array},
    userId:{type:String, required:true},
});

module.exports = mongoose.model('Room', roomSchema);
