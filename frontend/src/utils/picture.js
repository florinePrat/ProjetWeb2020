import axios from 'axios';

const burl = process.env.REACT_APP_API_URL;
// this is the request for authentification
export default {

    sendPicture : function (avatar) {
        return axios.put(burl + '/images/addPicture', {
            'imageUrl' : avatar
        },{
            headers:{
                'Content-Type': 'multipart/form-data',
                'Authorization' : 'Bearer ' + localStorage.getItem('token')
            }
        })
    },

}
