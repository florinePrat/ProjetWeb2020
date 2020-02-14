const mongoose = require('mongoose');

const availabilitySchema = mongoose.Schema({
    dispo:{type:Array,  default:''},
    roomId:{type:String, required:true},
});

module.exports = mongoose.model('Availability', availabilitySchema);
