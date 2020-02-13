import axios from 'axios';
import {basicHeaders} from './headers';

const burl = process.env.REACT_APP_API_URL;
// this is the request for authentification
export default {
    login : async (email,password) => {
        return await axios.post(burl + '/auth/login', {
            'email': email,
            'password': password
        }, {
            headers: basicHeaders
        });
    },
    signup : function(email,firstName,phoneNumber){
        return axios.post(burl + '/auth/signup',{
            'email' : email,
            'phoneNumber' : phoneNumber,
            'firstName' : firstName,
        },{
            headers: basicHeaders
        })
    },

    sendEmail : function(email){
       return axios.get(burl + '/auth/hasPassword/' + email,{
       },{
           headers: basicHeaders
       })
   },


    isAuth : function() {
        console.log(localStorage.getItem('token'));
        return localStorage.getItem('token') !== null;
    },

    logout : function() {
        localStorage.clear();
        return true;
    }
}
