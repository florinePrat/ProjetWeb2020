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
    imageUrl:{type:String, default:'https://imageslocatme.s3.eu-west-3.amazonaws.com/room.jpg'},
    bookings: [{type:mongoose.Schema.Types.ObjectId, ref : 'Booking'}],
    availabilities: [{type:mongoose.Schema.Types.ObjectId, ref : 'Availability'}],
    reviews:[{
        stars: Number,
        review: String,
    }],
    userId:{type:mongoose.Schema.Types.ObjectId, ref : 'User', required:true},
    state:{type:String, default:"unpublish"}, //status false : not published
});

module.exports = mongoose.model('Room', roomSchema);
