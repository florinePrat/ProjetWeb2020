const AvailabilityController = require('../models/availability');
let recentDate = new Date();

const createAvailability = async (AvailabilityObject) => {
    try{
        const Availability = new AvailabilityController({
            ...AvailabilityObject,
        });
        return await Availability.save();
    }catch (error) {
        console.log(error.message);
        throw error
    }
};


const modifyAvailability = async (AvailabilityObject,_id) => {
    try{
        return await AvailabilityController.updateOne({_id: _id}, {...AvailabilityObject, _id: _id})
    }catch (error) {
        console.log(error.message);
        throw error
    }
};


const deleteAvailability = async (_id) => {
    try{
        return await AvailabilityController.deleteOne({_id})
    }catch (error) {
        console.log(error.message);
        throw error
    }
};

const getAvailability = async (roomId) => {
    try{
        const availability = await AvailabilityController.find({$and : [{roomId: roomId}, {"openedDates.start" : {$gt: recentDate}}]});
        console.log("availability", availability);
        return availability
    }catch (error) {
        console.log(error.message);
        throw error
    }
};

/*const getAvailabilityBySearch = async (day, month, year) => {
    try{

        return await AvailabilityController.find({$and : [{dispo: day}, {date : {$gt: recentDate}}]})
    }catch (error) {
        console.log(error.message);
        throw error
    }
};*/

module.exports = {
    deleteAvailability,
    //getAvailabilityBySearch,
    getAvailability,
    modifyAvailability,
    createAvailability
};
