const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String, required:true},
    price:{type:Number, required:true},
    place:{type:String, required:true},
    category:{type:String, required:true},
    bail:{type:Number, required:true},
    option:{type:String, required:true},
    imageUrl:{type:String, required:true},
    availability:{type:Array, required:true},
    review:{type:Array, required:true},
    userId:{type:String, required:true},
});

module.exports = mongoose.model('Room', roomSchema);
