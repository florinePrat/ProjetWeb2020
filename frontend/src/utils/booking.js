import axios from "axios";
import {basicHeaders, tokenHeaders} from './headers';

const burl = "http://localhost:3000/api/booking";

export default {

    createBooking: function (date, state, ownerId, customerId) {
        return axios.post(burl + '/', {
            'date': date,
            'state': "awaitingValidation",
            'ownerId': ownerId,
            'customerId': customerId,
        }, {
            headers: tokenHeaders
        })
    },
}
