import axios from "axios";
import {tokenHeaders} from './headers';

const burl = process.env.REACT_APP_API_URL;

export default {

    createBooking: function (date, state, ownerId, customerId, roomId) {
        return axios.post(burl + '/api/booking/', {
            'date': date,
            'state': "awaitingValidation",
            'ownerId': ownerId,
            'customerId': customerId,
            'roomId': roomId,
        }, {
            headers: tokenHeaders
        })
    },

    requestBooking: function ({_id, myState}) {
        return axios.put(burl + '/api/booking/' + _id, {
            'state': myState,
        }, {
            headers: tokenHeaders
        })
    },

    deleteBooking:function(_id){
        return axios.delete(burl + '/api/booking/' + _id , {
            headers: tokenHeaders
        })
    },

    getByUser: async function (userId) {
        try {
            const res = await axios.get(burl + '/api/booking/byUser/' + userId, {
                headers: tokenHeaders
            });
            console.log('bbbbbbbbbbbbbbbb', res.data.booking);
            return res && res.data && res.data.booking
                ? res.data.booking
                : {error : 'erreur lors de la récupération des réservations'}
        } catch (error) {
            return error
        }
    },

    getByRoom: async function (roomId) {
        try {
            const res = await axios.get(burl + '/api/booking/byRoom/' + roomId, {
                headers: tokenHeaders
            });
            console.log('bbbbbbbbbbbbbbbb', res.data.booking);
            return res && res.data && res.data.booking
                ? res.data.booking
                : {error : 'erreur lors de la récupération des réservations'}
        } catch (error) {
            return error
        }
    },

    getByOwner : async function (ownerId){
        try {
            const res = await axios.get(burl + '/api/booking/byOwner/' + ownerId, {
                headers: tokenHeaders
            });
            return res && res.data && res.data.booking
                ? res.data.booking
                : {error : 'erreur lors de la récupération des réservations'}
        }catch(error){
            return error
        }
    }

}
