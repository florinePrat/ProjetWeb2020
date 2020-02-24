const mongoose = require('mongoose');

const availabilitySchema = mongoose.Schema({
    category: {type: String, enum: ["weekDay", "openedDates", "closedDates"]},
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
    roomId:{type:mongoose.Schema.Types.ObjectId, ref : 'Room', required:true},
});



module.exports = mongoose.model('Availability', availabilitySchema);
