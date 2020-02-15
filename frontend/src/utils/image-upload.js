import axios from 'axios';

const burl = process.env.REACT_APP_API_URL;

export default {
    upload:function(image){
        console.log('image',image);
        console.log('token',localStorage.getItem('token'));

        const formdata = new FormData();
        console.log(image);
        formdata.append("image", image);


        return axios.post(burl + '/api/image-upload', formdata,
            {
                headers : {'Content-Type': 'application/octet-stream',
                    'Authorization': 'Bearer ' + localStorage.getItem('token')}

            })
    }
};
