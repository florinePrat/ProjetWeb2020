import React, {useState} from "react";
import {Button} from "reactstrap";
import MyDatesPicker from '../OpenedDatesPicker';
import API from "../../../utils/room";

export default (roomId) =>{
        const [dates, setDates] = useState([]);
        const [id] = useState(roomId.roomId);

        function send  (event) {
            console.log('id : ', id);
            API.createOpenedDates(dates, id).then(res => {
                console.log("openedDates send")
            }, error => {
                console.log(error.response.data.error);
            })
        }

        return <div>
            <MyDatesPicker
                dates={dates}
                setDates={setDates}
            />
            <Button color={'success'} onClick={send}>Envoyer ces dates</Button>
        </div>
};

