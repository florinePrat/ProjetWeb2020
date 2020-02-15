import axios from 'axios';
import {basicHeaders, tokenHeaders} from './headers';

const burl = process.env.REACT_APP_API_URL;

export default {
    getUser : async (_id) => {
        return await axios.get(burl + '/api/auth/getUser/'+ _id, {
            headers: basicHeaders
        });
    },

    changeAvatar : async (imageUrl,_id) => {
        return await axios.put(burl + '/api/user/'+ _id,{
            'imageUrl' : imageUrl,
        } ,{
            headers: tokenHeaders
        });
    }

}
