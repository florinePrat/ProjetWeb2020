import React, {useState} from "react";
import {Button} from "reactstrap";
import MyDatesWeeksPicker from '../OpenedWeekDaysPicker';
import API from "../../../utils/room";

export default (roomId) =>{
    const [weekDays, setWeekDays] = useState([]);
    const [id] = useState(roomId.roomId);

    function send  (event) {
        console.log('id : ', id, ' et opendweekdays : ', weekDays);
        API.createOpenedWeekDays(weekDays, id).then(res => {
            console.log("openedDates send")
        }, error => {
            console.log(error.response.data.error);
        })
    }

    return <div>
        <MyDatesWeeksPicker
            weekDays={weekDays}
            setWeekDays={setWeekDays}
        />
        <Button color={'success'} onClick={send}>Envoyer ces dates reccurentes</Button>
    </div>
};

