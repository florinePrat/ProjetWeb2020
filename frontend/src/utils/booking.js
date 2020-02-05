import axios from "axios";
import {tokenHeaders} from './headers';

const burl = "http://localhost:3000/api/booking";

export default {

    createBooking: function (date, state, ownerId, customerId, roomId) {
        return axios.post(burl + '/', {
            'date': date,
            'state': "awaitingValidation",
            'ownerId': ownerId,
            'customerId': customerId,
            'roomId': roomId,
        }, {
            headers: tokenHeaders
        })
    },

    requestBooking: function ({_id, state}) {
        return axios.put(burl + '/' + _id, {
            'state': state,
        }, {
            headers: tokenHeaders
        })
    },

    deleteBooking:function(_id){
        return axios.delete(burl + '/' + _id , {
            headers: tokenHeaders
        })
    },

}
