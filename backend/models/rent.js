const mongoose = require('mongoose');

const rentSchema = mongoose.Schema({
    dateDebut:{type:Date, required: true},
    dateFin:{type:Date, required: true},
    state:{type:String, required:true},
});

module.exports = mongoose.model('Rent', rentSchema);
