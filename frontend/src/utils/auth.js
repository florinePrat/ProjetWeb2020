import axios from 'axios';
import {basicHeaders, tokenHeaders} from './headers';

const burl = "http://localhost:3000/api/auth";
// this is the request for authentification
export default {
    login : async (email,password) => {
        return await axios.post(burl + '/login', {
            'email': email,
            'password': password
        }, {
            headers: basicHeaders
        });
    },
    signup : function(email,firstName,phoneNumber){
        return axios.post(burl + '/signup',{
            'email' : email,
            'phoneNumber' : phoneNumber,
            'firstName' : firstName,
        },{
            headers: basicHeaders
        })
    },

   /* createPassword : function(password, statePassword, _id){
        return axios.put(burl + '/password/' + _id,{
            'password' : password,
            'statePassword' : true,
        },{
            headers: tokenHeaders
        })
    },*/

    isAuth : function() {
        console.log(localStorage.getItem('token'));
        return localStorage.getItem('token') !== null;
    },

    logout : function() {
        localStorage.clear();
        return true;
    }
}
