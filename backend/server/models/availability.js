const mongoose = require('mongoose');

const availabilitySchema = mongoose.Schema({
    dispo: [
        {
            start: {type: Date, default: ''},
            end: {type: Date, default: ''}
        }
    ],
    roomId:{type:mongoose.Schema.Types.ObjectId, ref : 'Room', required:true},
});



module.exports = mongoose.model('Availability', availabilitySchema);
