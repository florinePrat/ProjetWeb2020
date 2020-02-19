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
    openedDates:[{
        start: Date,
        end: Date,
    }],
    closedDates:[{
        start: Date,
        end: Date,
    }],
    openedWeekDays:[{
        day: {type: Number, min: 0, max: 6},
        startHours: Date,
        endHours: Date,
    }],
    rangeReservationParams: {
        periodicity: {type: String, enum: ["minutes", "hours", "day"]},
        number: {type: Number, min: 1},
    },
    bookings: [{type:mongoose.Schema.Types.ObjectId, ref : 'Booking'}],
    review:{type:Array, default:''},
    userId:{type:mongoose.Schema.Types.ObjectId, ref : 'User', required:true},
    state:{type:String, default:"unpublish"}, //status false : not published
});

module.exports = mongoose.model('Room', roomSchema);
