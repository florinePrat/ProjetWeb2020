const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
    date:{type:Date, required: true},
    state:{type:String, required:true},
});

module.exports = mongoose.model('Booking', bookingSchema);
