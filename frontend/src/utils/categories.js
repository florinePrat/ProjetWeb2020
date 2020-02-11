import axios from 'axios';
import {basicHeaders} from './headers';

const burl = "http://localhost:3000/api/room/categories";

export default {
    getAllCategories:function(){
        return axios.get(burl + '/',{
            headers: basicHeaders
        })
    }
};
