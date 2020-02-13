import axios from 'axios';
import {basicHeaders} from './headers';

const burl = process.env.REACT_APP_API_URL;

export default {
    getAllCategories:function(){
        return axios.get(burl + '/api/publicRoom/categories/',{
            headers: basicHeaders
        })
    }
};
