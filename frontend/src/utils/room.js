import axios from 'axios';
import {tokenHeaders} from './headers';

const burl = "http://localhost:3000/api/room";

export default {
    createRoom: function (title, address, city, postalCode, userId, token) {
        return axios.post(burl + '/', {
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

    updateRoom: function ({title , description, address, category, city, postalCode, price, bail, _id, state}) {
        return axios.put(burl + '/' + _id, {
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

    publishRoom: function ({state, _id}) {
        return axios.put (burl + '/' +_id, {
            'state': state,
        },{
            headers: tokenHeaders
        })
    },

    unPublishRoom: function ({state, _id}) {
        return axios.put (burl + '/' +_id, {
            'state': state,
        },{
            headers: tokenHeaders
        })
    },



}
