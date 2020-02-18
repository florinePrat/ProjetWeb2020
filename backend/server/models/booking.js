const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    date:{type:Date, required: true},
    state:{type:String,required:true}, // [valid, awaitingValidation, refused]
    roomId : {type:mongoose.Schema.Types.ObjectId, ref : 'Room', required:true},
    ownerId : {type:mongoose.Schema.Types.ObjectId, ref : 'User', required:true},
    customerId : {type:mongoose.Schema.Types.ObjectId, ref : 'User', required:true},
});

module.exports = mongoose.model('Booking', bookingSchema);
