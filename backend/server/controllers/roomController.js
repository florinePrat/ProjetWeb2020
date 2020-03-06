const RoomController = require('../models/room');

const createRoom = async (roomObject) => {
    try{
        const room = new RoomController({
            ...roomObject,
        });
        return await room.save();
    }catch (error) {
        console.log(error.message);
        throw error
    }
};

const modifyRoom = async (roomObject,_id) => {
    try{
        return await RoomController.findOneAndUpdate({_id: _id}, {...roomObject, _id: _id}, {new:true})
    }catch (error) {
        console.log(error.message);
        throw error
    }
};

const deleteRoom = async (_id) => {
    try{
        return await RoomController.deleteOne({_id})
    }catch (error) {
        console.log(error.message);
        throw error
    }
};

const getOneRoom = async (_id) => {
    try{
        return await RoomController.findOne({_id})
    }catch (error) {
        console.log(error.message);
        throw error
    }
};

const getAllRooms = async () => {
    try{
        return await RoomController.find({state:"published"})
    }catch (error) {
        console.log(error.message);
        throw error
    }
};

const getAllSearchRooms = async (category, city) => {
    try{
        if (category !== 'null' && city !== 'null') {
            return await RoomController.find(
                {
                    $and:
                        [
                            {$and: [{category: category}, {city: city}]},
                            {state: "published"}
                        ]
                })
        }else{
            return await RoomController.find(
                {
                    $and:
                        [
                            {$or: [{category: category}, {city: city}]},
                            {state: "published"}
                        ]
                })
        }
    }catch (error) {
        console.log(error.message);
        throw error
    }
};

const getRoomByUser = async (userId) => {
    try{
        return await RoomController.find({userId: userId})
    }catch (error) {
        console.log(error.message);
        throw error
    }
};

module.exports = {
    createRoom,
    modifyRoom,
    deleteRoom,
    getOneRoom,
    getAllRooms,
    getAllSearchRooms,
    getRoomByUser
};

