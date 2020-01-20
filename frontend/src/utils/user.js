import axios from 'axios';
import {basicHeaders} from './headers';

const burl = "http://localhost:3000/api/user";
// this is the request for authentification
export default {
    getUserTasks : async (firstName) => {
        return axios.get(burl + '/getUserTasks', {
            'firstName': firstName,
        }, {
            headers: basicHeaders
        });
    },
}
