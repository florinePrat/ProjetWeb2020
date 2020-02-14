const BookingController = require('../models/booking');

const createBooking = async (bookingObject) => {
    try{
        const booking = new BookingController({
            ...bookingObject,
        });
        return await booking.save();
    }catch (error) {
        console.log(error.message);
        throw error
    }
};


const modifyBooking = async (bookingObject,_id) => {
    try{
        return await BookingController.updateOne({_id: _id}, {...bookingObject, _id: _id})
    }catch (error) {
        console.log(error.message);
        throw error
    }
};


const deleteBooking = async (_id) => {
    try{
        return await BookingController.deleteOne({_id})
    }catch (error) {
        console.log(error.message);
        throw error
    }
};

const getOneBooking = async (_id) => {
    try{
        return await BookingController.findOne({_id})
    }catch (error) {
        console.log(error.message);
        throw error
    }
};

let recentDate = new Date();

const getBookingByUser = async (customerId) => {
    try{
        return await BookingController.find({$and : [{customerId: customerId}, {date : {$gt: recentDate}}]})
    }catch (error) {
        console.log(error.message);
        throw error
    }
};

const getBookingByOwner = async (ownerId) => {
    try{
        return await BookingController.find({$and : [{ownerId: ownerId}, {state: "awaitingValidation"}, {date : {$gt: recentDate}}]})
    }catch (error) {
        console.log(error.message);
        throw error
    }
};

module.exports = {
    deleteBooking,
    getOneBooking,
    getBookingByUser,
    getBookingByOwner,
    modifyBooking,
    createBooking
};
