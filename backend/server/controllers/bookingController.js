const BookingController = require('../models/booking');

const createBooking = async (bookingObject) => {
    try{
        console.log(bookingObject.date);
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
        console.log('ici : ', bookingObject);
        return await BookingController.findOneAndUpdate({_id: _id}, {...bookingObject, _id: _id},{new:true})
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
        return await BookingController.find({$and : [{customerId: customerId}, {"date.start" : {$gt: recentDate}}]})
    }catch (error) {
        console.log(error.message);
        throw error
    }
};

const getBookingByRoom = async (roomId) => {
    try{
        return await BookingController.find({$and : [{roomId: roomId}, {"date.start" : {$gt: recentDate}}]})
    }catch (error) {
        console.log(error.message);
        throw error
    }
};

const getBookingByOwner = async (ownerId) => {
    try{
        return await BookingController.find({$and : [{ownerId: ownerId}, {state: "awaitingValidation"}, {"date.start" : {$gt: recentDate}}]})
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
    getBookingByRoom,
    modifyBooking,
    createBooking
};
