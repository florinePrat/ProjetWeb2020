const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    date:{type:Date, required: true},
    state:{type:String,required:true}, // [valid, awaitingValidation, refused]
    roomId : {type:String, required:true},
    ownerId : {type:String, required:true},
    customerId : {type:String, required:true},
});

module.exports = mongoose.model('Booking', bookingSchema);
