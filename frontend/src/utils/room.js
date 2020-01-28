import axios from 'axios';
import {tokenHeaders} from './headers';

const burl = "http://localhost:3000/api/room";

export default {
    createRoom : function(title,description,price,address,city,region,postalCode,category,bail,imageUrl,userId){
        return axios.post(burl + '/',{
            'title' : title,
            'description' : description,
            'price' : price,
            'address' : address,
            'city' : city,
            'region' : region,
            'postalCode' : postalCode,
            'category' : category,
            'bail' : bail,
            'imageUrl' : imageUrl,
            'userId' : userId,
        },{
            headers: tokenHeaders
        })
    },
}
