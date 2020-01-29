import axios from 'axios';
import {tokenHeaders} from './headers';

const burl = "http://localhost:3000/api/room";

export default {
    createRoom : function(title,address,city,postalCode,userId,token){
        return axios.post(burl + '/',{
            'title' : title,
            'address' : address,
            'city' : city,
            'postalCode' : postalCode,
            'userId' : userId,
            'token' : token,
        },{
            headers: {'Content-Type': 'application/json',
                'Authorization' : 'Bearer ' + token
            }
        })
    },
}
