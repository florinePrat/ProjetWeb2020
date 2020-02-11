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

    requestBooking: function ({_id, state}) {
        return axios.put(burl + '/api/booking/' + _id, {
            'state': state,
        }, {
            headers: tokenHeaders
        })
    },

    deleteBooking:function(_id){
        return axios.delete(burl + '/api/booking/' + _id , {
            headers: tokenHeaders
        })
    },

}
