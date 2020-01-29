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
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        })
    },

}
