import axios from 'axios';
import {basicHeaders, tokenHeaders} from './headers';

const burl = process.env.REACT_APP_API_URL;

export default {
    createRoom: function (title, address, city, postalCode, userId, token) {
        return axios.post(burl + '/api/room/', {
            'title': title,
            'address': address,
            'city': city,
            'postalCode': postalCode,
            'userId': userId,
            'token': token,
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        })
    },

    deleteRoom: function (_id) {
        return axios.delete(burl + '/api/room/' + _id, {
            headers: tokenHeaders
        })
    },

    getAllRooms: function () {
        return axios.get(burl + '/api/publicRoom/', {
            headers: basicHeaders
        })
    },

    createOtherRoom: function (title, address, city, postalCode, userId) {
        return axios.post(burl + '/api/room/', {
            'title': title,
            'address': address,
            'city': city,
            'postalCode': postalCode,
            'userId': userId,
        }, {
            headers: tokenHeaders
        })
    },

    updateRoom: function ({title, description, address, category, city, postalCode, price, bail, _id, state}) {
        return axios.put(burl + '/api/room/' + _id, {
            'title': title,
            'address': address,
            'city': city,
            'postalCode': postalCode,
            'description': description,
            'bail': bail,
            'price': price,
            'category': category,
            'state': state,
        }, {
            headers: tokenHeaders
        })
    },

    createReview: function (reviews, roomId, _id) {
        console.log(_id);
        return axios.put(burl + '/api/room/review/' + roomId, {
            reviews,
            _id
        }, {
            headers: tokenHeaders
        })
    },


    createOpenedDates: function (openedDates, roomId) {
        console.log("openedDates : ", openedDates ,' et room id : ', roomId);
        return axios.post(burl + '/api/availability/', {
            openedDates,
            roomId
        }, {
            headers: tokenHeaders
        })
    },

    getOpenedDates: function (roomId) {
        console.log('room id : ', roomId);
        return axios.get(burl + '/api/availability/' + roomId, {
            headers: tokenHeaders
        })
    },


    createClosedDates: function (closedDates, roomId) {
        console.log("closedDates : ", closedDates ,' et room id : ', roomId);
        return axios.post(burl + '/api/availability/', {
            closedDates,
            roomId
        }, {
            headers: tokenHeaders
        })
    },

    addOpenedDates: function (openedDates, availabilityId) {
        return axios.put(burl + '/api/availability/' + availabilityId, {
            openedDates
        }, {
            headers: tokenHeaders
        })
    },

    createOpenedWeekDays: function (openedWeekDays, roomId) {
        console.log("openedWeekDays : ", openedWeekDays ,' et room id : ', roomId);
        return axios.post(burl + '/api/availability/', {
            openedWeekDays,
            roomId
        }, {
            headers: tokenHeaders
        })
    },


    addPictureRoom: function ({imageUrl, _id}) {
        return axios.put(burl + '/api/room/' + _id, {
            'imageUrl': imageUrl,
        }, {
            headers: tokenHeaders
        })
    },

    updateRoomAvailabilities: function (availability, roomId) {
        return axios.post(burl + '/api/availability/', {
            dispo : availability,
            roomId
        }, {
            headers: tokenHeaders
        })
    },

    publishRoom: function ({state, _id}) {
        return axios.put(burl + '/api/room/' + _id, {
            'state': state,
        }, {
            headers: tokenHeaders
        })
    },


    getAllSearchRooms: function (category, city) {
        console.log(burl + `/api/publicRoom?${category ? "category=" + category + "&" : ""}${city ? "city=" + city : ""}`);
        return axios.get(burl +  `/api/publicRoom/search?${category ? "category=" + category + "&" : ""}${city ? "city=" + city : ""}`, {
            headers: basicHeaders
        })
    },

    getOneRoom: function (roomId) {
        return axios.get(burl + '/api/room/' + roomId, {
            headers: tokenHeaders
        })
    },

    getRoomByUser: async function (userId) {
        try {
            const res = await axios.get(burl + '/api/room/byUser/' + userId, {
                headers: tokenHeaders
            });
            console.log("attention utils : ", res.data.room);
            return res && res.data && res.data.room
                ? res.data.room
                : {error: 'erreur lors de la récupération des salles'};

        } catch (error) {

        }
    },

}



