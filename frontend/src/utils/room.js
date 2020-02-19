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

    unPublishRoom: function ({state, _id}) {
        return axios.put(burl + '/api/room/' + _id, {
            'state': state,
        }, {
            headers: tokenHeaders
        })
    },

    getAllSearchRooms: function (category, city) {
        console.log(burl + '/api/publicRoom/' + category + '/' + city);
        return axios.get(burl + '/api/publicRoom/' + category + '/' + city, {
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
            return res && res.data && res.data.room
                ? res.data.room
                : {error: 'erreur lors de la récupération des salles'};

        } catch (error) {

        }
    },

}



