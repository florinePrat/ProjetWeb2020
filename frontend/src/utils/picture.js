import axios from 'axios';

const burl = "http://localhost:3000/images";
// this is the request for authentification
export default {

    sendPicture : function (avatar) {
        return axios.put(burl + '/addPicture', {
            'imageUrl' : avatar
        },{
            headers:{
                'Content-Type': 'multipart/form-data',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods' : 'DELETE, POST, GET, OPTIONS',
                'Access-Control-Allow-Headers':'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        })
    },

}
