const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    title:{type:String, required:true},
    description:{type:String,  default:''},
    price:{type:Number,  default:''},
    address:{type:String, required:true},
    city:{type:String, required:true},
    postalCode:{type:String, required:true},
    category:{type:String,  default:''},
    bail:{type:Number,  default:'100'},
    imageUrl:{type:String, default:''},
    availability:{type:Array,  default:''},
    review:{type:Array, default:''},
    userId:{type:String, required:true},
    state:{type:String, default:"unpublish"}, //status false : not published
});

module.exports = mongoose.model('Room', roomSchema);
